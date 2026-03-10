'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project } from '@/lib/projects'

interface TagFilterProps {
  projects: Project[]
  tags: string[]
}

export function TagFilter({ projects, tags }: TagFilterProps) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active
    ? projects.filter((p) => p.tech.includes(active))
    : projects

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
            active === null
              ? 'border-[var(--accent)] text-[var(--accent)]'
              : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]'
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
              active === tag
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
