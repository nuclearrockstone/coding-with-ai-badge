import { ImageResponse } from '@vercel/og'

import { generateBadgeSvg } from '@/app/lib/svg-generator'
import { DEFAULT_CONFIG, SITE_CONFIG } from '@/app/lib/types'

export const runtime = 'edge'

export async function GET(): Promise<ImageResponse> {
  const badgeSvg = await generateBadgeSvg({ name: DEFAULT_CONFIG.name })

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 24,
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
            padding: '32px 40px',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div
              style={{
                color: '#0F172A',
                fontSize: 36,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {SITE_CONFIG.name}
            </div>
            <div
              style={{
                color: '#475569',
                fontSize: 20,
                fontWeight: 400,
                textAlign: 'center',
                maxWidth: 720,
              }}
            >
              {SITE_CONFIG.shortDescription}
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 12,
              }}
            >
              <div
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                    badgeSvg
                  )}")`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  height: 160,
                  width: 520,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
