import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { FadeIn } from '@/components/FadeIn'

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
  knowsAbout: ['Rust', 'Blockchain', 'Substrate', 'Solidity', 'Web3', 'DID', 'TypeScript', 'React'],
  email: 'contact@fennsaji.com',
}

export default function HomePage() {
  const featured = getFeaturedProjects()

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
        <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-4">
          I&apos;m Fenn Ignatius Saji.
          <br />
          I build things that matter.
        </h1>
        <p className="text-[var(--muted)] text-base mb-8">
          Rust · Blockchain · Full-stack · Open source
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href="/projects"
            className="font-mono text-sm border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded hover:bg-[var(--accent)] hover:text-black transition-colors"
          >
            → See my work
          </Link>
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

      {/* Featured projects */}
      <FadeIn delay={0.15}>
        <section>
        <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-6">
          Featured Projects
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
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
    </div>
  )
}
