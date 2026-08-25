import { getProjects, getPopularTags } from '@/lib/projects'
import { TagFilter } from '@/components/TagFilter'
import { FadeIn } from '@/components/FadeIn'

export const metadata = {
  title: 'Projects',
  description: 'Custom blockchain consensus, post-quantum DID identity, Rust backends, and AI-powered products built by Fenn Ignatius Saji.',
  openGraph: {
    title: 'Projects — Fenn Ignatius Saji',
    description: 'Custom blockchain consensus, post-quantum DID identity, Rust backends, and AI-powered products.',
    url: 'https://fennsaji.com/projects',
  },
  alternates: { canonical: 'https://fennsaji.com/projects' },
}

export default function ProjectsPage() {
  const projects = getProjects()
  const tags = getPopularTags(projects)

  return (
    <FadeIn>
      <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">Projects</h1>
      <p className="text-[var(--body)] leading-relaxed max-w-2xl mb-10">
        Blockchain infrastructure, Rust backends, and the products built on top of them —
        from a custom Substrate consensus engine and post-quantum DID identity to finance and
        AI apps people use every day. Click a title for the full write-up.
      </p>
      <TagFilter projects={projects} tags={tags} />
      </div>
    </FadeIn>
  )
}
