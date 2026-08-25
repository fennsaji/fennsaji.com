import { ImageResponse } from 'next/og'

export const alt = 'Fenn Ignatius Saji — Rust, Distributed Systems & Blockchain Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ color: '#00ff88', fontSize: 24, fontWeight: 700 }}>&lt;</span>
          <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>fs</span>
          <span style={{ color: '#00ff88', fontSize: 24, fontWeight: 700 }}>/&gt;</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ color: '#00ff88', fontSize: 18, letterSpacing: 4 }}>
            {'// hello world'}
          </div>
          <div style={{ color: '#ffffff', fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
            Fenn Ignatius Saji
          </div>
          <div style={{ color: '#e0e0e0', fontSize: 28, fontWeight: 400 }}>
            Rust · Distributed Systems · Blockchain
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#555555', fontSize: 18 }}>fennsaji.com</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Rust', 'Substrate', 'Cryptography', 'TypeScript'].map((tag) => (
              <div
                key={tag}
                style={{
                  color: '#e0e0e0',
                  fontSize: 14,
                  border: '1px solid #333333',
                  borderRadius: 4,
                  padding: '4px 10px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
