import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import toc from '@lobehub/icons/es/toc'

import iconPathsData from '@/app/lib/icon-paths.json'

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

interface IconData {
  id: string
  title: string
  fullTitle: string
  color: string
  group: string
}

interface IconPathData {
  path: string
  viewBox: string
}

// Get icon data from toc
function getIconData(name: string): IconData | null {
  const icons = toc as IconData[]
  return icons.find((icon) =>
    icon.id.toLowerCase() === name.toLowerCase() ||
    icon.title.toLowerCase() === name.toLowerCase()
  ) || null
}

// Get icon SVG path
function getIconPath(iconId: string): string | null {
  const iconPaths = iconPathsData as Record<string, IconPathData>
  const data = iconPaths[iconId.toLowerCase()]
  return data?.path || null
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name') || 'Claude'
    const line1 = searchParams.get('line1') || 'coding with'
    const theme = (searchParams.get('theme') as 'light' | 'dark') || 'light'

    // Get real icon data
    const iconData = getIconData(name)
    const iconId = iconData?.id || name
    const iconPath = getIconPath(iconId)
    const iconColor = iconData?.color || '#6B7280'
    const displayName = searchParams.get('line2') || iconData?.fullTitle || iconData?.title || name

    const colors = THEMES[theme]
    // For dark theme, use white for icon color to ensure visibility
    const finalIconColor = theme === 'dark' ? '#FFFFFF' : iconColor

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
            padding: 60,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 48,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 72,
                height: 72,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <svg
                width="42"
                height="42"
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
                fontSize: 42,
                fontWeight: 700,
                color: theme === 'light' ? '#1e293b' : '#f8fafc',
              }}
            >
              Coding with AI Badge
            </span>
          </div>

          {/* Badge Preview - Larger and more prominent */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 24,
              borderRadius: 20,
              backgroundColor: colors.background,
              border: `2px solid ${colors.border}`,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transform: 'scale(1.8)',
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            {/* Icon Box with real icon */}
            <div
              style={{
                display: 'flex',
                width: 80,
                height: 80,
                borderRadius: 14,
                backgroundColor: colors.iconBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              {iconPath ? (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill={finalIconColor}
                >
                  <path d={iconPath} fillRule="evenodd" />
                </svg>
              ) : (
                // Fallback: Show first letter in a circle
                <div
                  style={{
                    display: 'flex',
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)`,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
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
                  fontSize: 20,
                  color: colors.text1,
                  marginBottom: 4,
                }}
              >
                {line1}
              </span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: colors.text2,
                }}
              >
                {displayName}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p
            style={{
              marginTop: 60,
              fontSize: 24,
              color: theme === 'light' ? '#64748b' : '#94a3b8',
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Generate beautiful badges for your AI-powered projects
          </p>

          {/* URL hint */}
          <p
            style={{
              marginTop: 16,
              fontSize: 18,
              color: theme === 'light' ? '#94a3b8' : '#64748b',
              textAlign: 'center',
            }}
          >
            coding-with-ai-badge.vercel.app
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
