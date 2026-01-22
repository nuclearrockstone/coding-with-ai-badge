'use client'

import { useSyncExternalStore, useCallback } from 'react'
import { Languages } from 'lucide-react'

import { Button } from '@/app/components/ui/button'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
] as const

type LocaleCode = (typeof LOCALES)[number]['code']

// Subscribe function that does nothing (we don't need to listen for changes)
const emptySubscribe = () => () => {}

// Hook to check if component is mounted (client-side)
function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

// Custom hook for localStorage with SSR support
function useLocale(): LocaleCode {
  const getSnapshot = (): LocaleCode => {
    const saved = localStorage.getItem('locale') as LocaleCode | null
    return saved && LOCALES.some(l => l.code === saved) ? saved : 'en'
  }

  const getServerSnapshot = (): LocaleCode => 'en'

  const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function LanguageToggle() {
  const hydrated = useHydrated()
  const locale = useLocale()

  const handleToggle = useCallback(() => {
    const newLocale: LocaleCode = locale === 'en' ? 'zh' : 'en'
    localStorage.setItem('locale', newLocale)
    window.location.reload()
  }, [locale])

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0]

  // Avoid hydration mismatch by showing a placeholder until hydrated
  if (!hydrated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="cursor-pointer gap-1.5"
        disabled
      >
        <Languages className="h-4 w-4" />
        <span className="text-xs font-medium">EN</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="cursor-pointer gap-1.5"
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium">{currentLocale.label}</span>
    </Button>
  )
}
