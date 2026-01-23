'use client'

import { useState, useEffect, useCallback } from 'react'
import { Github } from 'lucide-react'

import { BadgePreview } from '@/app/components/BadgePreview'
import { ConfigPanel } from '@/app/components/ConfigPanel'
import { AdvancedSettings } from '@/app/components/AdvancedSettings'
import { UrlCopy } from '@/app/components/UrlCopy'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import { LanguageToggle } from '@/app/components/LanguageToggle'
import { DEFAULT_CONFIG, DEFAULT_ADVANCED_COLORS, SITE_CONFIG } from '@/app/lib/types'
import { getIconCount, getIconById } from '@/app/lib/icons'

import type { BadgeConfig, IconColorMode, AdvancedColorConfig } from '@/app/lib/types'

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
    iconColorMode: string
    colorModeOriginal: string
    colorModePrimary: string
    colorModeContrast: string
  }
  advanced: {
    advancedSettings: string
    customColors: string
    background: string
    border: string
    iconBg: string
    text1Color: string
    text2Color: string
    iconColor: string
    reset: string
  }
  preview: { title: string; lightBg: string; darkBg: string }
  copy: { title: string; directUrl: string; markdown: string; html: string; copy: string; copied: string }
  footer: { poweredBy: string; inspiredBy: string }
  categories: Record<string, string>
}

export function HomePage() {
  const [config, setConfig] = useState<BadgeConfig>(DEFAULT_CONFIG)
  const [advancedColors, setAdvancedColors] = useState<AdvancedColorConfig>(DEFAULT_ADVANCED_COLORS)
  const [messages, setMessages] = useState<Messages | null>(null)
  const [iconCount, setIconCount] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // Parse URL parameters on mount and set initial config
  useEffect(() => {
    // 获取语言设置
    const locale = localStorage.getItem('locale') || 'en'
    import(`@/messages/${locale}.json`).then((m) => setMessages(m.default))
    setIconCount(getIconCount())

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('name')
    const line1 = urlParams.get('line1')
    const line2 = urlParams.get('line2')
    const theme = urlParams.get('theme')
    const colorMode = urlParams.get('colorMode')
    
    // Advanced color parameters
    const background = urlParams.get('background')
    const border = urlParams.get('border')
    const iconBg = urlParams.get('iconBg')
    const text1 = urlParams.get('text1')
    const text2 = urlParams.get('text2')
    const iconColor = urlParams.get('iconColor')

    if (name || line1 || line2 || theme || colorMode) {
      const iconData = name ? getIconById(name) : null
      const newConfig: BadgeConfig = {
        name: name || DEFAULT_CONFIG.name,
        line1: line1 || DEFAULT_CONFIG.line1,
        line2: line2 || (iconData?.fullTitle || iconData?.title || name || DEFAULT_CONFIG.line2),
        theme: theme === 'dark' ? 'dark' : 'light',
        colorMode: (['original', 'primary', 'contrast'].includes(colorMode || '') 
          ? colorMode as IconColorMode 
          : 'original'),
      }
      setConfig(newConfig)
    }
    
    // Set advanced colors if any are present
    if (background || border || iconBg || text1 || text2 || iconColor) {
      setAdvancedColors({
        background: background || undefined,
        border: border || undefined,
        iconBg: iconBg || undefined,
        text1: text1 || undefined,
        text2: text2 || undefined,
        iconColor: iconColor || undefined,
      })
    }
    
    setIsInitialized(true)
  }, [])

  // Update URL when config changes
  const updateUrl = useCallback((newConfig: BadgeConfig, colors: AdvancedColorConfig) => {
    if (!isInitialized) return

    const params = new URLSearchParams()
    params.set('name', newConfig.name)
    if (newConfig.line1 !== DEFAULT_CONFIG.line1) {
      params.set('line1', newConfig.line1)
    }
    if (newConfig.line2 !== newConfig.name) {
      params.set('line2', newConfig.line2)
    }
    if (newConfig.theme === 'dark') {
      params.set('theme', 'dark')
    }
    if (newConfig.colorMode && newConfig.colorMode !== 'original') {
      params.set('colorMode', newConfig.colorMode)
    }
    
    // Add advanced color params
    if (colors.background) params.set('background', colors.background)
    if (colors.border) params.set('border', colors.border)
    if (colors.iconBg) params.set('iconBg', colors.iconBg)
    if (colors.text1) params.set('text1', colors.text1)
    if (colors.text2) params.set('text2', colors.text2)
    if (colors.iconColor) params.set('iconColor', colors.iconColor)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }, [isInitialized])

  // Handle config change
  const handleConfigChange = useCallback((newConfig: BadgeConfig) => {
    setConfig(newConfig)
    updateUrl(newConfig, advancedColors)
  }, [updateUrl, advancedColors])
  
  // Handle advanced colors change
  const handleAdvancedColorsChange = useCallback((colors: AdvancedColorConfig) => {
    setAdvancedColors(colors)
    updateUrl(config, colors)
  }, [updateUrl, config])

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
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 sm:h-10 sm:w-10 sm:rounded-xl">
              <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-foreground sm:text-lg">{messages.common.title}</h1>
              <p className="text-xs text-muted-foreground">{iconCount}+ icons available</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary px-2 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 sm:px-4"
            >
              <Github className="h-5 w-5" />
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
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <ConfigPanel
                config={config}
                onConfigChange={handleConfigChange}
                translations={{
                  ...messages.config,
                  categories: messages.categories,
                }}
              />
            </div>
            
            {/* Advanced Settings */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <AdvancedSettings
                config={config}
                advancedColors={advancedColors}
                onAdvancedColorsChange={handleAdvancedColorsChange}
                translations={messages.advanced}
              />
            </div>
          </div>

          {/* Right Column: Preview & Copy */}
          <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
            {/* Preview */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <BadgePreview config={config} advancedColors={advancedColors} translations={messages.preview} />
            </div>

            {/* Copy URLs */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <UrlCopy config={config} advancedColors={advancedColors} translations={messages.copy} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:gap-4 md:flex-row md:text-left">
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
