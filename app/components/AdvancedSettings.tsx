'use client'

import * as React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import type { BadgeConfig, AdvancedColorConfig } from '@/app/lib/types'

interface AdvancedSettingsProps {
  config: BadgeConfig
  advancedColors: AdvancedColorConfig
  onAdvancedColorsChange: (colors: AdvancedColorConfig) => void
  translations: {
    advancedSettings: string
    customColors: string
    background: string
    border: string
    iconBg: string
    text1Color: string
    text2Color: string
    iconColor: string
    reset: string
    active: string
  }
}

export function AdvancedSettings({
  config,
  advancedColors,
  onAdvancedColorsChange,
  translations: t,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleColorChange = (key: keyof AdvancedColorConfig, value: string) => {
    onAdvancedColorsChange({
      ...advancedColors,
      [key]: value,
    })
  }

  const handleReset = () => {
    onAdvancedColorsChange({})
  }

  // Theme defaults for display purposes
  const themeDefaults = config.theme === 'light' 
    ? {
        background: '#FFFFFF',
        border: '#E5E7EB',
        iconBg: '#F3F4F6',
        text1: '#6B7280',
        text2: '#1F2937',
      }
    : {
        background: '#1F2937',
        border: '#374151',
        iconBg: '#374151',
        text1: '#9CA3AF',
        text2: '#F9FAFB',
      }

  const colorInputs = [
    { key: 'background' as const, label: t.background, defaultValue: themeDefaults.background },
    { key: 'border' as const, label: t.border, defaultValue: themeDefaults.border },
    { key: 'iconBg' as const, label: t.iconBg, defaultValue: themeDefaults.iconBg },
    { key: 'text1' as const, label: t.text1Color, defaultValue: themeDefaults.text1 },
    { key: 'text2' as const, label: t.text2Color, defaultValue: themeDefaults.text2 },
    { key: 'iconColor' as const, label: t.iconColor, defaultValue: '' },
  ]

  const hasCustomColors = Object.values(advancedColors).some(v => v !== undefined && v !== '')

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:px-4 sm:py-2.5"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t.advancedSettings}
          {hasCustomColors && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {t.active}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:text-sm">
              {t.customColors}
            </h4>
            {hasCustomColors && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="cursor-pointer text-xs"
              >
                {t.reset}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {colorInputs.map(({ key, label, defaultValue }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={advancedColors[key] || defaultValue || '#000000'}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-input bg-background"
                  />
                  <input
                    type="text"
                    value={advancedColors[key] || ''}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    placeholder={defaultValue || 'auto'}
                    className="min-w-0 flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
