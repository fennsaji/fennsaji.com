'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
]

interface NavProps {
  /** Absolute/relative URL of the resume; when undefined no resume link is rendered. */
  resumeHref?: string
}

export function Nav({ resumeHref }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-0.5 font-mono text-sm hover:opacity-80 transition-opacity"
        >
          <span className="text-[var(--accent)]">&lt;</span>
          <span className="text-[var(--text)]">fs</span>
          <span className="text-[var(--accent)]">/&gt;</span>
        </Link>
        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href || pathname.startsWith(`${href}/`)
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          {resumeHref && (
            <li>
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                resume ↗
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
