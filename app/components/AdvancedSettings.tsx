'use client'

import * as React from 'react'
import { ChevronDown, ChevronUp, X, Info } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'

import { Button } from '@/app/components/ui/button'
import type { BadgeConfig, AdvancedColorConfig } from '@/app/lib/types'

const GUIDE_DISMISSED_KEY = 'advanced-settings-guide-dismissed'

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
    guideTitle: string
    guideMessage: string
    dontShowAgain: string
  }
}

// Color picker component that stays open while selecting
function ColorPicker({
  value,
  defaultValue,
  onChange,
}: {
  value: string
  defaultValue: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const displayValue = value || defaultValue || '#000000'

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className="h-8 w-10 cursor-pointer rounded border border-input bg-background p-0.5"
          style={{ backgroundColor: displayValue }}
          aria-label="Select color"
        >
          <span className="sr-only">Select color</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 rounded-lg border border-border bg-background p-3 shadow-lg"
          sideOffset={5}
          onInteractOutside={(e) => {
            // Only close if clicking outside, not inside color picker
            const target = e.target as HTMLElement
            if (target.tagName === 'INPUT' && target.getAttribute('type') === 'color') {
              e.preventDefault()
            }
          }}
        >
          <div className="flex flex-col gap-3">
            <input
              type="color"
              value={displayValue}
              onChange={(e) => onChange(e.target.value)}
              className="h-32 w-32 cursor-pointer rounded border-0 bg-transparent p-0"
            />
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={defaultValue || '#000000'}
              className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export function AdvancedSettings({
  config,
  advancedColors,
  onAdvancedColorsChange,
  translations: t,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [showGuide, setShowGuide] = React.useState(false)
  const [guideDismissed, setGuideDismissed] = React.useState(true)
  
  // Check localStorage on mount to see if guide was dismissed
  React.useEffect(() => {
    const dismissed = localStorage.getItem(GUIDE_DISMISSED_KEY) === 'true'
    setGuideDismissed(dismissed)
  }, [])
  
  // Show guide when custom colors are first set
  const hasCustomColors = Object.values(advancedColors).some(v => v !== undefined && v !== '')
  
  React.useEffect(() => {
    if (hasCustomColors && !guideDismissed) {
      setShowGuide(true)
    }
  }, [hasCustomColors, guideDismissed])
  
  const handleDismissGuide = () => {
    setShowGuide(false)
  }
  
  const handleDontShowAgain = () => {
    localStorage.setItem(GUIDE_DISMISSED_KEY, 'true')
    setGuideDismissed(true)
    setShowGuide(false)
  }

  const handleColorChange = (key: keyof AdvancedColorConfig, value: string) => {
    onAdvancedColorsChange({
      ...advancedColors,
      [key]: value,
    })
  }

  const handleReset = () => {
    onAdvancedColorsChange({})
    setShowGuide(false)
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
          {/* Feature Guide */}
          {showGuide && (
            <div className="relative flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {t.guideTitle}
                </p>
                <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                  {t.guideMessage}
                </p>
                <button
                  onClick={handleDontShowAgain}
                  className="mt-2 text-xs font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  {t.dontShowAgain}
                </button>
              </div>
              <button
                onClick={handleDismissGuide}
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
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
                  <ColorPicker
                    value={advancedColors[key] || ''}
                    defaultValue={defaultValue}
                    onChange={(value) => handleColorChange(key, value)}
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
