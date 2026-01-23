import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Space_Grotesk, DM_Sans } from 'next/font/google'

import { ThemeProvider } from '@/app/components/ThemeProvider'
import { SITE_CONFIG } from '@/app/lib/types'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

async function getMetadataBase(): Promise<URL> {
  const headersList = await headers()
  const hostHeader = headersList.get('x-forwarded-host') ?? headersList.get('host')
  const protocolHeader = headersList.get('x-forwarded-proto')
  const protocol = protocolHeader === 'http' || protocolHeader === 'https' ? protocolHeader : 'https'
  const host = hostHeader?.split(',')[0]?.trim()
  const isValidHost = host ? /^[a-z0-9.-]+(:\d+)?$/i.test(host) : false

  if (host && isValidHost) {
    return new URL(`${protocol}://${host}`)
  }

  return new URL(SITE_CONFIG.domain)
}

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await getMetadataBase()
  const canonicalUrl = new URL('/', metadataBase)

  return {
    metadataBase,
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.title}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      'AI badge generator',
      'coding with AI',
      'badge',
      'AI',
      'Claude',
      'GPT',
      'Cursor',
      'Copilot',
      'shields.io',
      'skillicons',
    ],
    applicationName: SITE_CONFIG.name,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: 'Coding with AI badge preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: ['/api/og'],
    },
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: ['/favicon.ico'],
      other: [
        {
          rel: 'mask-icon',
          url: '/favicon.svg',
          color: '#2563EB',
        },
        {
          rel: 'manifest',
          url: '/site.webmanifest',
        },
      ],
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
