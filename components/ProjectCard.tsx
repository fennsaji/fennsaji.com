import Link from 'next/link'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  /** 1-based position shown as a mono index ("01") on featured cards. */
  index?: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col gap-3 hover:border-[var(--accent)] transition-colors">
      {index !== undefined && (
        <span className="font-mono text-xs text-[var(--accent)]">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[var(--text)]">
          <Link href={`/projects/${project.slug}`} className="hover:text-[var(--accent)] transition-colors">
            {project.title}
          </Link>
        </h3>
        {(project.github || project.demo) && (
        <div className="flex gap-3 text-xs shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-mono"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-mono"
            >
              Live ↗
            </a>
          )}
        </div>
        )}
      </div>

      <p className="text-sm text-[var(--muted)] leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-[var(--muted)] border border-[var(--border)] rounded px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
