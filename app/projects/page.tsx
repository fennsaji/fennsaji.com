import { getProjects, getAllTags } from '@/lib/projects'
import { TagFilter } from '@/components/TagFilter'
import { FadeIn } from '@/components/FadeIn'

export const metadata = {
  title: 'Projects',
  description: 'Blockchain infrastructure, Rust backends, cross-platform apps, and open-source libraries built by Fenn Ignatius Saji.',
  openGraph: {
    title: 'Projects — Fenn Ignatius Saji',
    description: 'Blockchain infrastructure, Rust backends, cross-platform apps, and open-source libraries.',
    url: 'https://fennsaji.com/projects',
  },
  alternates: { canonical: 'https://fennsaji.com/projects' },
}

export default function ProjectsPage() {
  const projects = getProjects()
  const tags = getAllTags(projects)

  return (
    <FadeIn>
      <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-extrabold tracking-tight mb-12">Projects</h1>
      <TagFilter projects={projects} tags={tags} />
      </div>
    </FadeIn>
  )
}
