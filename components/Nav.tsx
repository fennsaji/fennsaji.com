'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
]

export function Nav() {
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
                  pathname === href
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
