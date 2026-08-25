import { FadeIn } from '@/components/FadeIn'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Fenn Ignatius Saji — open to Rust, distributed systems, and blockchain infrastructure work.',
  openGraph: {
    title: 'Contact — Fenn Ignatius Saji',
    description: 'Open to Rust, distributed systems, and blockchain infrastructure work.',
    url: 'https://fennsaji.com/contact',
  },
  alternates: { canonical: 'https://fennsaji.com/contact' },
}

const links = [
  { label: 'Email', href: 'mailto:contact@fennsaji.com', display: 'contact@fennsaji.com' },
  { label: 'GitHub', href: 'https://github.com/fennsaji', display: 'github.com/fennsaji' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/fennsaji', display: 'linkedin.com/in/fennsaji' },
]

export default function ContactPage() {
  return (
    <FadeIn>
      <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">Interested in building difficult things?</h1>
      <p className="text-[var(--body)] text-sm mb-12">
        I&apos;m particularly interested in Rust, distributed systems, blockchain infrastructure, and backend engineering roles or collaborations.
      </p>
      <ul className="flex flex-col divide-y divide-[var(--border)]">
        {links.map(({ label, href, display }) => (
          <li key={label} className="flex items-center justify-between py-4">
            <span className="text-sm text-[var(--muted)]">{label}</span>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="font-mono text-sm text-[var(--accent)] hover:opacity-70 transition-opacity"
            >
              {display} ↗
            </a>
          </li>
        ))}
      </ul>
      </div>
    </FadeIn>
  )
}
