import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'O3 Energy. Commercial and utility-scale solar EPC since 2011.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #022240 0%, #0A1628 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          O3<span style={{ color: '#F36E20' }}>Energy</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#F36E20',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Commercial & utility-scale solar EPC
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              maxWidth: '900px',
            }}
          >
            From site assessment to 25-year warranty. One contract.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: 24,
          }}
        >
          <span>Operating since 2011 · Dallas · San Francisco · Mexico · Guam</span>
          <span style={{ color: '#F36E20', fontWeight: 600 }}>o3energy.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
