import Link from 'next/link'
import type { Project } from '@/lib/projects'

interface ProjectRowProps {
  project: Project
}

/** Compact single-line project entry for "more projects" lists. */
export function ProjectRow({ project }: ProjectRowProps) {
  return (
    <li className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
      <Link
        href={`/projects/${project.slug}`}
        className="font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors sm:w-44 shrink-0"
      >
        {project.title}
      </Link>
      <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">{project.description}</p>
      <span className="font-mono text-xs text-[var(--muted)] shrink-0 hidden sm:inline">
        {project.tech.slice(0, 3).join(' · ')}
      </span>
    </li>
  )
}
