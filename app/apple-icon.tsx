import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#022240',
          color: '#F36E20',
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          borderRadius: 36,
        }}
      >
        O3
      </div>
    ),
    { ...size },
  )
}
