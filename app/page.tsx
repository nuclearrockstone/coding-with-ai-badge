import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { HomePage } from '@/app/components/HomePage'
import { SITE_CONFIG, DEFAULT_CONFIG } from '@/app/lib/types'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const headersList = await headers()
  
  // Get the host from headers to build dynamic URL
  const host = headersList.get('host') || new URL(SITE_CONFIG.domain).host
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  const baseUrl = `${protocol}://${host}`
  
  // Extract badge parameters from searchParams
  const name = typeof params.name === 'string' ? params.name : DEFAULT_CONFIG.name
  const line1 = typeof params.line1 === 'string' ? params.line1 : undefined
  const line2 = typeof params.line2 === 'string' ? params.line2 : undefined
  const theme = typeof params.theme === 'string' ? params.theme : undefined
  
  // Build og:image URL with user parameters
  const ogImageParams = new URLSearchParams()
  ogImageParams.set('name', name)
  if (line1) ogImageParams.set('line1', line1)
  if (line2) ogImageParams.set('line2', line2)
  if (theme) ogImageParams.set('theme', theme)
  
  const ogImageUrl = `${baseUrl}/api/og?${ogImageParams.toString()}`
  
  // Generate dynamic title and description
  const displayName = line2 || name
  const title = params.name 
    ? `${displayName} Badge | Coding with AI Badge Generator`
    : 'Coding with AI Badge Generator'
  const description = params.name
    ? `Generate a beautiful badge for ${displayName}. Perfect for GitHub READMEs, documentation, and websites.`
    : 'Generate beautiful badges to showcase AI models, tools, and providers in your projects. Perfect for GitHub READMEs, documentation, and websites.'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Coding with ${displayName} Badge`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default function Page() {
  return <HomePage />
}
