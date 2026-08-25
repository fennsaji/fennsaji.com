import { FadeIn } from '@/components/FadeIn'

export const metadata = {
  title: 'About',
  description: 'Fenn Ignatius Saji — senior software engineer building distributed systems, blockchain infrastructure, and ZK identity in Rust and Substrate.',
  openGraph: {
    title: 'About — Fenn Ignatius Saji',
    description: 'Senior software engineer building distributed systems, blockchain infrastructure, and cryptography-backed identity products.',
    url: 'https://fennsaji.com/about',
  },
  alternates: { canonical: 'https://fennsaji.com/about' },
}

const stack = [
  'Rust', 'Substrate', 'Blockchain', 'Cryptography',
  'TypeScript', 'React', 'Next.js', 'Node.js', 'AWS',
]

const interests = [
  'Rust internals & systems programming',
  'Distributed systems & consensus',
  'Blockchain infrastructure',
  'Post-quantum & zero-knowledge cryptography',
  'Decentralised identity',
  'AI-powered products',
]

const timeline = [
  { year: '2023 →', label: 'Lead Blockchain Developer at McKinley Rice — in charge of blockchain development and overall app development, Rust backend, Solidity contracts, identity and cryptography.' },
  { year: '2021 →', label: 'Senior Blockchain Developer at Sovereign Wallet Network — decentralised identity and Web3 architecture' },
  { year: '2021 →', label: 'Blockchain Developer at Squbix Digital — DeFi on Substrate + Rust' },
  { year: '2019 →', label: 'Software Engineer at Perfomatix — MEAN stack, web apps' },
  { year: '2018 →', label: 'Web Developer at ScopeHub LLC — Angular apps and Ethereum Solidity prototypes' },
  { year: '2015 →', label: 'BTech, Electronics & Communication — JMIT' },
]

export default function AboutPage() {
  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="flex items-start justify-between gap-8 mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">About</h1>
        <div className="w-16 h-16 rounded bg-[var(--card)] border border-[var(--border)] flex items-center justify-center font-mono text-sm text-[var(--muted)] shrink-0">
          FS
        </div>
      </div>

      <p className="text-[var(--body)] leading-relaxed mb-6">
        I build distributed systems, blockchain infrastructure, and the backend
        systems and products they run on — from custom consensus engines and
        zero-knowledge identity to financial and AI-powered apps. I started in
        web development, moved into Ethereum and DeFi, then into Substrate and
        decentralised identity, and now spend most of my time deep in Rust and
        backend infrastructure at McKinley Rice and Sovereign Wallet Network.
      </p>

      <p className="text-[var(--body)] leading-relaxed mb-12">
        I like building things end-to-end — from protocol design and backend
        infrastructure through to the product people actually use. I build
        side projects to scratch my own itches and stay sharp.
      </p>

      <section className="mb-12">
        <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">
          Currently interested in
        </p>
        <ul className="flex flex-col gap-2">
          {interests.map((interest) => (
            <li key={interest} className="text-sm text-[var(--body)]">
              <span className="text-[var(--accent)] mr-2">→</span>
              {interest}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-[var(--muted)] border border-[var(--border)] rounded px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section>
        <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">
          Timeline
        </p>
        <ul className="border-l border-[var(--border)] pl-6 flex flex-col gap-4">
          {timeline.map(({ year, label }) => (
            <li key={label} className="text-sm">
              <span className="font-mono text-[var(--accent)] mr-2">{year}</span>
              <span className="text-[var(--body)]">{label}</span>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </FadeIn>
  )
}
