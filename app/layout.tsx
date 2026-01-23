import type { Metadata } from 'next'
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

const siteTitle = 'Coding with AI Badge Generator'
const siteDescription = 'Generate beautiful badges to showcase AI models, tools, and providers in your projects. Perfect for GitHub READMEs, documentation, and websites. Similar to shields.io and skillicons.dev.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: siteTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: siteDescription,
  keywords: [
    'badge generator',
    'AI badge',
    'Claude',
    'GPT',
    'ChatGPT',
    'Cursor',
    'Copilot',
    'GitHub Copilot',
    'shields.io',
    'skillicons',
    'README badge',
    'developer tools',
    'AI tools',
    'coding assistant',
    'badge maker',
  ],
  authors: [{ name: 'Coding with AI Badge' }],
  creator: 'Coding with AI Badge',
  publisher: 'Coding with AI Badge',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Coding with AI Badge Generator - Create beautiful badges for your AI-powered projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/api/og'],
  },
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
}

// JSON-LD structured data for the website
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Coding with AI Badge Generator',
  description: siteDescription,
  url: SITE_CONFIG.domain,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'Coding with AI Badge',
    url: SITE_CONFIG.github,
  },
  featureList: [
    'Generate AI model badges',
    'Generate coding tool badges',
    'Support for light and dark themes',
    'Easy copy and embed functionality',
    'Multiple export formats (URL, Markdown, HTML)',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
