import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
  year: number
  order?: number
  content: string
}

// --- Pure helpers (testable without filesystem) ---

export function parseProject(filename: string, raw: string): Project {
  const slug = filename.replace(/\.md$/, '')
  const { data, content } = matter(raw)
  if (!data.title || !data.year) {
    throw new Error(`Project file "${filename}" is missing required frontmatter: title and/or year`)
  }
  return {
    slug,
    title: data.title,
    description: data.description,
    tech: data.tech ?? [],
    github: data.github,
    demo: data.demo,
    featured: data.featured ?? false,
    year: data.year,
    order: data.order,
    content,
  }
}

export function filterFeatured(projects: Project[]): Project[] {
  return projects.filter((p) => p.featured)
}

export function sortByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
}

export function getAllTags(projects: Project[]): string[] {
  const tags = new Set(projects.flatMap((p) => p.tech))
  return Array.from(tags).sort()
}

export function sortByYear(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => b.year - a.year)
}

// --- I/O (not unit tested directly) ---

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export function getProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR)
  const projects = files
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), 'utf8')
      return parseProject(filename, raw)
    })
  return sortByYear(projects)
}

export function getFeaturedProjects(): Project[] {
  return sortByOrder(filterFeatured(getProjects()))
}
