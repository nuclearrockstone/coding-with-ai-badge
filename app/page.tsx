'use client'

import { useState, useEffect } from 'react'
import { Github } from 'lucide-react'

import { BadgePreview } from '@/app/components/BadgePreview'
import { ConfigPanel } from '@/app/components/ConfigPanel'
import { UrlCopy } from '@/app/components/UrlCopy'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import { LanguageToggle } from '@/app/components/LanguageToggle'
import { DEFAULT_CONFIG, SITE_CONFIG } from '@/app/lib/types'
import { getIconCount } from '@/app/lib/icons'

import type { BadgeConfig } from '@/app/lib/types'

// 翻译类型
interface Messages {
  common: { title: string; description: string; github: string }
  hero: { title: string; subtitle: string }
  config: {
    selectIcon: string
    category: string
    selectCategory: string
    searchCategory: string
    name: string
    selectName: string
    searchName: string
    noResults: string
    customizeText: string
    line1: string
    line1Placeholder: string
    line2: string
    line2Placeholder: string
    badgeTheme: string
    light: string
    dark: string
  }
  preview: { title: string; lightBg: string; darkBg: string }
  copy: { title: string; directUrl: string; markdown: string; html: string; copy: string; copied: string }
  footer: { poweredBy: string; inspiredBy: string }
  categories: Record<string, string>
}

export default function Home() {
  const [config, setConfig] = useState<BadgeConfig>(DEFAULT_CONFIG)
  const [messages, setMessages] = useState<Messages | null>(null)
  const [iconCount, setIconCount] = useState(0)

  useEffect(() => {
    // 获取语言设置
    const locale = localStorage.getItem('locale') || 'en'
    import(`@/messages/${locale}.json`).then((m) => setMessages(m.default))
    setIconCount(getIconCount())
  }, [])

  if (!messages) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 sm:h-10 sm:w-10 sm:rounded-xl">
              <svg className="h-4 w-4 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground sm:text-lg">{messages.common.title}</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">{iconCount}+ icons available</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary px-2 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 sm:px-4 sm:py-2"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{messages.common.github}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-muted/50 to-transparent py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            {messages.hero.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
            {messages.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:py-12">
        <div className="grid gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Column: Config Panel */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
            <ConfigPanel
              config={config}
              onConfigChange={setConfig}
              translations={{
                ...messages.config,
                categories: messages.categories,
              }}
            />
          </div>

          {/* Right Column: Preview & Copy */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Preview */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <BadgePreview config={config} translations={messages.preview} />
            </div>

            {/* Copy URLs */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <UrlCopy config={config} translations={messages.copy} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div className="text-xs text-muted-foreground sm:text-sm">
              {messages.footer.poweredBy}{' '}
              <a
                href="https://github.com/lobehub/lobe-icons"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium text-primary transition-colors hover:text-primary/80"
              >
                @lobehub/icons
              </a>
              {' '}&{' '}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium text-primary transition-colors hover:text-primary/80"
              >
                Next.js
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
              <span>{messages.footer.inspiredBy}</span>
              <a
                href="https://shields.io"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium text-foreground transition-colors hover:text-foreground/80"
              >
                shields.io
              </a>
              <span>&</span>
              <a
                href="https://skillicons.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium text-foreground transition-colors hover:text-foreground/80"
              >
                skillicons.dev
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
