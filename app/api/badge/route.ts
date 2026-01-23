import { NextRequest } from 'next/server'

import { generateBadgeSvg } from '@/app/lib/svg-generator'
import type { IconColorMode } from '@/app/lib/svg-generator'

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const line1 = searchParams.get('line1') || undefined
    const line2 = searchParams.get('line2') || undefined
    const theme = searchParams.get('theme') as 'light' | 'dark' | null
    const colorMode = searchParams.get('colorMode') as IconColorMode | null

    if (!name) {
      return new Response('Missing required parameter: name', { 
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    const svg = await generateBadgeSvg({
      name,
      line1,
      line2,
      theme: theme === 'dark' ? 'dark' : 'light',
      colorMode: colorMode && ['original', 'primary', 'contrast'].includes(colorMode) 
        ? colorMode 
        : 'original',
    })

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Badge generation failed:', error)
    return new Response('Internal server error', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}
