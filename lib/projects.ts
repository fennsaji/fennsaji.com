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
  problem?: string
  architecture?: string
  decisions?: string[]
  results?: string
}

// --- Pure helpers (testable without filesystem) ---

function optionalString(filename: string, field: string, value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') {
    throw new Error(`Project file "${filename}": frontmatter field "${field}" must be a string`)
  }
  return value
}

function optionalStringList(filename: string, field: string, value: unknown): string[] | undefined {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw new Error(
      `Project file "${filename}": frontmatter field "${field}" must be a list of strings (quote items containing ":")`
    )
  }
  return value
}

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
    problem: optionalString(filename, 'problem', data.problem),
    architecture: optionalString(filename, 'architecture', data.architecture),
    decisions: optionalStringList(filename, 'decisions', data.decisions),
    results: optionalString(filename, 'results', data.results),
  }
}

export function hasCaseStudy(project: Project): boolean {
  return Boolean(
    project.problem || project.architecture || project.results || project.decisions?.length
  )
}

export function findBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
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

/** Tags used by at least `min` projects — keeps the filter bar to tags worth filtering on. */
export function getPopularTags(projects: Project[], min = 2): string[] {
  const counts = new Map<string, number>()
  const uniqueTagsPerProject = projects.flatMap((p) => Array.from(new Set(p.tech)))
  for (const tag of uniqueTagsPerProject) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .filter(([, count]) => count >= min)
    .map(([tag]) => tag)
    .sort()
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

export function getProjectBySlug(slug: string): Project | undefined {
  return findBySlug(getProjects(), slug)
}
