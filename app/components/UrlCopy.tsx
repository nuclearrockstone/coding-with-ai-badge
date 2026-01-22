'use client'

import { useState, useSyncExternalStore } from 'react'

import type { BadgeConfig } from '@/app/lib/types'

interface UrlCopyProps {
  config: BadgeConfig
  translations: {
    title: string
    directUrl: string
    markdown: string
    html: string
    copy: string
    copied: string
  }
}

// Hook to get the current origin with SSR support
function useOrigin(): string {
  const getSnapshot = () => window.location.origin
  const getServerSnapshot = () => ''
  const subscribe = () => () => {}
  
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function UrlCopy({ config, translations: t }: UrlCopyProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const origin = useOrigin()

  // Build the URL with actual domain from window
  const buildUrl = (): string => {
    const params = new URLSearchParams()
    params.set('name', config.name)
    if (config.line1 !== 'coding with') {
      params.set('line1', config.line1)
    }
    if (config.line2 !== config.name && config.line2 !== '') {
      params.set('line2', config.line2)
    }
    if (config.theme === 'dark') {
      params.set('theme', 'dark')
    }
    // Use actual origin or fallback for SSR
    const baseUrl = origin || 'https://your-domain.com'
    return `${baseUrl}/api/badge?${params.toString()}`
  }

  const url = buildUrl()

  // Generate different format codes
  const formats = {
    url: url,
    markdown: `![Coding with ${config.line2}](${url})`,
    html: `<img src="${url}" alt="Coding with ${config.line2}" />`,
  }

  const handleCopy = async (type: keyof typeof formats) => {
    try {
      await navigator.clipboard.writeText(formats[type])
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.title}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* URL */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">{t.directUrl}</label>
          <button
            onClick={() => handleCopy('url')}
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {copiedType === 'url' ? (
              <>
                <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.copied}
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.copy}
              </>
            )}
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg bg-muted p-3">
          <code className="whitespace-nowrap text-xs text-muted-foreground">{formats.url}</code>
        </div>
      </div>

      {/* Markdown */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">{t.markdown}</label>
          <button
            onClick={() => handleCopy('markdown')}
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {copiedType === 'markdown' ? (
              <>
                <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.copied}
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.copy}
              </>
            )}
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg bg-muted p-3">
          <code className="whitespace-nowrap text-xs text-muted-foreground">{formats.markdown}</code>
        </div>
      </div>

      {/* HTML */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">{t.html}</label>
          <button
            onClick={() => handleCopy('html')}
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {copiedType === 'html' ? (
              <>
                <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.copied}
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.copy}
              </>
            )}
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg bg-muted p-3">
          <code className="whitespace-nowrap text-xs text-muted-foreground">{formats.html}</code>
        </div>
      </div>
    </div>
  )
}
