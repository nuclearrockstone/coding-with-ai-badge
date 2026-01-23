'use client'

import { useMemo } from 'react'

import type { BadgeConfig } from '@/app/lib/types'

interface BadgePreviewProps {
  config: BadgeConfig
  translations: {
    title: string
    lightBg: string
    darkBg: string
  }
}

export function BadgePreview({ config, translations: t }: BadgePreviewProps) {
  const svgUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('name', config.name)
    if (config.line1 !== 'coding with') {
      params.set('line1', config.line1)
    }
    if (config.line2 !== config.name) {
      params.set('line2', config.line2)
    }
    if (config.theme === 'dark') {
      params.set('theme', 'dark')
    }
    return `/api/badge?${params.toString()}`
  }, [config])

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Preview Label */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.title}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Badge Preview Container */}
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {/* Light Background Preview */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-muted-foreground">{t.lightBg}</span>
          <div className="flex items-center justify-center rounded-xl bg-white p-5 shadow-lg ring-1 ring-slate-200 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svgUrl}
              alt="Badge preview on light"
              className="h-auto max-w-full"
            />
          </div>
        </div>

        {/* Dark Background Preview */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-muted-foreground">{t.darkBg}</span>
          <div className="flex items-center justify-center rounded-xl bg-slate-900 p-5 shadow-lg ring-1 ring-slate-700 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svgUrl}
              alt="Badge preview on dark"
              className="h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
