export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-[var(--muted)]">
        <span className="font-mono">© {new Date().getFullYear()} Fenn Saji</span>
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
