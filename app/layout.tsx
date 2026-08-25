import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://fennsaji.com'),
  title: {
    default: 'Fenn Ignatius Saji',
    template: '%s — Fenn Ignatius Saji',
  },
  description: 'Senior software engineer specialising in Rust, blockchain, and full-stack development. Building DID systems, custom consensus engines, and cross-platform apps.',
  keywords: ['Fenn Ignatius Saji', 'Rust developer', 'blockchain developer', 'Substrate', 'DID', 'Web3', 'full-stack engineer', 'software engineer India'],
  authors: [{ name: 'Fenn Ignatius Saji', url: 'https://fennsaji.com' }],
  creator: 'Fenn Ignatius Saji',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fennsaji.com',
    siteName: 'Fenn Ignatius Saji',
    title: 'Fenn Ignatius Saji — Rust & Blockchain Engineer',
    description: 'Senior software engineer specialising in Rust, blockchain, and full-stack development. Building DID systems, custom consensus engines, and cross-platform apps.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenn Ignatius Saji — Rust & Blockchain Engineer',
    description: 'Senior software engineer specialising in Rust, blockchain, and full-stack development.',
  },
  alternates: {
    canonical: 'https://fennsaji.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
