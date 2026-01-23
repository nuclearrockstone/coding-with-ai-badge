import { ImageResponse } from '@vercel/og'

import { generateBadgeSvg } from '@/app/lib/svg-generator'
import { DEFAULT_CONFIG, SITE_CONFIG } from '@/app/lib/types'

export const runtime = 'edge'

function normalizeParam(value: string | null): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export async function GET(request: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url)
  const nameParam = normalizeParam(searchParams.get('name'))
  const line1Param = normalizeParam(searchParams.get('line1'))
  const line2Param = normalizeParam(searchParams.get('line2'))
  const themeParam = normalizeParam(searchParams.get('theme'))
  const name = nameParam ?? DEFAULT_CONFIG.name
  const line1 = line1Param ?? DEFAULT_CONFIG.line1
  const theme = themeParam === 'dark' || themeParam === 'light' ? themeParam : DEFAULT_CONFIG.theme
  let line2 = line2Param ?? DEFAULT_CONFIG.line2
  if (nameParam && !line2Param) {
    // If only the name is customized, let the SVG generator derive line2 from icon data.
    line2 = undefined
  }
  const badgeSvg = await generateBadgeSvg({ name, line1, line2, theme })

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
            display: 'flex',
            flexDirection: 'column',
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
                  display: 'flex',
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
