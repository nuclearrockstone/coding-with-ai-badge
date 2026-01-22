import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'

import { ThemeProvider } from '@/app/components/ThemeProvider'
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

export const metadata: Metadata = {
  title: 'Coding with AI Badge Generator',
  description: 'Generate beautiful badges to showcase AI models, tools, and providers in your projects. Similar to shields.io and skillicons.dev.',
  keywords: ['badge', 'AI', 'Claude', 'GPT', 'Cursor', 'Copilot', 'shields.io', 'skillicons'],
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
