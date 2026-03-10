import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col gap-3 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[var(--text)]">{project.title}</h3>
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
