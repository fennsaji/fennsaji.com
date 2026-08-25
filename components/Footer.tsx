export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <span className="font-mono">© {new Date().getFullYear()} Fenn Ignatius Saji</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/fennsaji"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/fennsaji"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
