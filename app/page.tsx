import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'
import { hasResume, RESUME_PATH } from '@/lib/site'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectRow } from '@/components/ProjectRow'
import { FadeIn } from '@/components/FadeIn'

const SELECTED_COUNT = 3

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fenn Ignatius Saji',
  url: 'https://fennsaji.com',
  sameAs: [
    'https://github.com/fennsaji',
    'https://linkedin.com/in/fennsaji',
  ],
  jobTitle: 'Senior Software Engineer',
  worksFor: { '@type': 'Organization', name: 'McKinley Rice' },
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  knowsAbout: ['Rust', 'Distributed Systems', 'Blockchain', 'Substrate', 'Post-Quantum Cryptography', 'Decentralized Identity', 'Zero-Knowledge Proofs', 'Solidity', 'Web3', 'TypeScript', 'React'],
  email: 'contact@fennsaji.com',
}

export default function HomePage() {
  const featured = getFeaturedProjects()
  const selected = featured.slice(0, SELECTED_COUNT)
  const more = featured.slice(SELECTED_COUNT)
  const resume = hasResume()

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <FadeIn>
        <section className="mb-24">
        <p className="font-mono text-sm text-[var(--accent)] mb-4">{'// hello world'}</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-5">
          I build systems that scale.
        </h1>
        <p className="text-[var(--body)] text-lg max-w-2xl mb-4">
          I&apos;m Fenn Ignatius Saji — a senior software engineer focused on Rust,
          blockchain infrastructure, and distributed systems.
        </p>
        <p className="font-mono text-sm text-[var(--muted)] mb-8">
          Lead Blockchain Developer @ McKinley Rice · India · 8 years shipping
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/projects"
            className="font-mono text-sm border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
          >
            → See my work
          </Link>
          {resume && (
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm border border-[var(--border)] text-[var(--text)] px-4 py-2 rounded hover:border-[var(--text)] transition-colors"
            >
              Resume ↗
            </a>
          )}
          <a
            href="https://github.com/fennsaji"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </section>
      </FadeIn>

      {/* Selected work */}
      <FadeIn delay={0.15}>
        <section className="mb-20">
        <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-6">
          Selected work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selected.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      </section>
      </FadeIn>

      {/* More projects */}
      {more.length > 0 && (
        <FadeIn delay={0.25}>
          <section>
          <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-2">
            More projects
          </p>
          <ul className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
            {more.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/projects"
              className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              View all projects →
            </Link>
          </div>
        </section>
        </FadeIn>
      )}
    </div>
  )
}
