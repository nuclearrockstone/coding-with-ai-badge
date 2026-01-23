import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Theme colors
const THEMES = {
  light: {
    background: '#FFFFFF',
    border: '#E5E7EB',
    iconBg: '#F3F4F6',
    text1: '#6B7280',
    text2: '#1F2937',
  },
  dark: {
    background: '#1F2937',
    border: '#374151',
    iconBg: '#374151',
    text1: '#9CA3AF',
    text2: '#F9FAFB',
  },
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name') || 'Claude'
    const line1 = searchParams.get('line1') || 'coding with'
    const line2 = searchParams.get('line2') || name
    const theme = (searchParams.get('theme') as 'light' | 'dark') || 'light'

    const colors = THEMES[theme]
    const iconColor = theme === 'dark' ? '#FFFFFF' : '#E07A3B'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 56,
                height: 56,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: theme === 'light' ? '#1e293b' : '#f8fafc',
              }}
            >
              Coding with AI Badge
            </span>
          </div>

          {/* Badge Preview */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 12,
              borderRadius: 12,
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Icon Box */}
            <div
              style={{
                display: 'flex',
                width: 64,
                height: 64,
                borderRadius: 10,
                backgroundColor: colors.iconBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill={iconColor}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>

            {/* Text */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: colors.text1,
                }}
              >
                {line1}
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: colors.text2,
                }}
              >
                {line2}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p
            style={{
              marginTop: 40,
              fontSize: 20,
              color: theme === 'light' ? '#64748b' : '#94a3b8',
              textAlign: 'center',
              maxWidth: 600,
            }}
          >
            Generate beautiful badges for your AI-powered projects
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG image generation failed:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
