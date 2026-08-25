import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjects, getProjectBySlug, hasCaseStudy } from '@/lib/projects'
import { FadeIn } from '@/components/FadeIn'

export const dynamicParams = false

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const title = `${project.title} — Fenn Ignatius Saji`
  const path = `/projects/${slug}`

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: 'Fenn Ignatius Saji',
      title,
      description: project.description,
      url: path,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      images: ['/opengraph-image'],
    },
    alternates: { canonical: path },
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-3">
      {children}
    </h2>
  )
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    programmingLanguage: project.tech,
    codeRepository: project.github,
    url: `https://fennsaji.com/projects/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Fenn Ignatius Saji',
      url: 'https://fennsaji.com',
    },
  }

  const hasLinks = Boolean(project.github || project.demo)
  const body = project.content.trim()

  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link
          href="/projects"
          className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← All projects
        </Link>

        <div className="flex items-start justify-between gap-4 mt-6 mb-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)]">
            {project.title}
          </h1>
          <span className="font-mono text-sm text-[var(--muted)] shrink-0 pt-1">{project.year}</span>
        </div>

        <p className="text-[var(--body)] leading-relaxed mb-6">{project.description}</p>

        <div className={`flex flex-wrap gap-2 ${hasLinks ? 'mb-8' : 'mb-12'}`}>
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-[var(--muted)] border border-[var(--border)] rounded px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasLinks && (
          <div className="flex gap-4 mb-12">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                Live ↗
              </a>
            )}
          </div>
        )}

        {hasCaseStudy(project) ? (
          <div className="flex flex-col gap-10">
            {project.problem && (
              <section>
                <SectionLabel>Problem</SectionLabel>
                <p className="text-[var(--body)] leading-relaxed">{project.problem}</p>
              </section>
            )}

            {project.architecture && (
              <section>
                <SectionLabel>Architecture</SectionLabel>
                <p className="text-[var(--body)] leading-relaxed">{project.architecture}</p>
              </section>
            )}

            {project.decisions && project.decisions.length > 0 && (
              <section>
                <SectionLabel>Key decisions</SectionLabel>
                <ul className="flex flex-col gap-3">
                  {project.decisions.map((decision) => (
                    <li
                      key={decision}
                      className="text-[var(--body)] leading-relaxed text-sm pl-4 border-l border-[var(--border)]"
                    >
                      {decision}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.results && (
              <section>
                <SectionLabel>Results</SectionLabel>
                <p className="text-[var(--body)] leading-relaxed">{project.results}</p>
              </section>
            )}
          </div>
        ) : (
          body && <p className="text-[var(--body)] leading-relaxed">{body}</p>
        )}
      </div>
    </FadeIn>
  )
}
