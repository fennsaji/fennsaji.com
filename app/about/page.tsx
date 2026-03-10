import { FadeIn } from '@/components/FadeIn'

export const metadata = {
  title: 'About',
  description: 'Fenn Ignatius Saji — Lead Blockchain Developer with expertise in Rust, Substrate, Solidity, and full-stack development. 6+ years building blockchain infrastructure.',
  openGraph: {
    title: 'About — Fenn Ignatius Saji',
    description: 'Lead Blockchain Developer with expertise in Rust, Substrate, Solidity, and full-stack development.',
    url: 'https://fennsaji.com/about',
  },
  alternates: { canonical: 'https://fennsaji.com/about' },
}

const stack = [
  'Rust', 'TypeScript', 'React', 'Next.js',
  'Substrate', 'Blockchain', 'Angular', 'Node.js', 'AWS',
]

const timeline = [
  { year: '2023 →', label: 'Lead Blockchain Developer at McKinley Rice — in charge of blockchain development and overall app development, Rust backend, Solidity contracts, identity and cryptography.' },
  { year: '2021 →', label: 'Senior Blockchain Developer at Sovereign Wallet Network — self-sovereign identity and Web3 architecture' },
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

      <p className="text-[var(--muted)] leading-relaxed mb-12">
        I&apos;m a software engineer with roots in blockchain and systems programming. I&apos;ve spent the last few years deep in Rust, Substrate, and self-sovereign identity — building infrastructure at McKinley Rice and Sovereign Wallet Network. Before that, MEAN stack web development at Perfomatix, and early Ethereum experiments as a freelancer. I build side projects to scratch my own itches and stay sharp.
      </p>

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
            <li key={year} className="text-sm">
              <span className="font-mono text-[var(--accent)] mr-2">{year}</span>
              <span className="text-[var(--muted)]">{label}</span>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </FadeIn>
  )
}
