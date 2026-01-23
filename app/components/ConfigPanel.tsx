'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/app/lib/utils'
import { Button } from '@/app/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover'
import {
  CATEGORY_MAP,
  getIconsByCategory,
  getCategories,
  type IconCategory,
  type IconInfo,
} from '@/app/lib/icons'
import type { BadgeConfig } from '@/app/lib/types'

interface ConfigPanelProps {
  config: BadgeConfig
  onConfigChange: (config: BadgeConfig) => void
  translations: {
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
    categories: Record<string, string>
  }
}

export function ConfigPanel({ config, onConfigChange, translations: t }: ConfigPanelProps) {
  const [categoryOpen, setCategoryOpen] = React.useState(false)
  const [nameOpen, setNameOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<IconCategory>('model')

  const categories = getCategories()
  const icons = React.useMemo(() => getIconsByCategory(selectedCategory), [selectedCategory])

  const handleCategoryChange = (category: IconCategory) => {
    setSelectedCategory(category)
    setCategoryOpen(false)
  }

  const handleIconChange = (icon: IconInfo) => {
    onConfigChange({
      ...config,
      name: icon.id,
      line2: icon.fullTitle || icon.title,
    })
    setNameOpen(false)
  }

  const selectedIcon = icons.find((icon) => icon.id === config.name)

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Section: Select Icon */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
          {t.selectIcon}
        </h3>

        {/* Category Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">{t.category}</label>
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={categoryOpen}
                className="h-11 w-full cursor-pointer justify-between text-sm sm:h-10"
              >
                {t.categories[selectedCategory] || CATEGORY_MAP[selectedCategory]}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder={t.searchCategory} />
                <CommandList>
                  <CommandEmpty>{t.noResults}</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category}
                        value={category}
                        onSelect={() => handleCategoryChange(category)}
                        className="min-h-[44px] cursor-pointer"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedCategory === category ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {t.categories[category] || CATEGORY_MAP[category]}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Name Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">{t.name}</label>
          <Popover open={nameOpen} onOpenChange={setNameOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={nameOpen}
                className="h-11 w-full cursor-pointer justify-between text-sm sm:h-10"
              >
                <span className="flex items-center gap-2 truncate">
                  {selectedIcon && (
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: selectedIcon.color }}
                    />
                  )}
                  {selectedIcon ? selectedIcon.fullTitle : t.selectName}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder={t.searchName} />
                <CommandList>
                  <CommandEmpty>{t.noResults}</CommandEmpty>
                  <CommandGroup>
                    {icons.map((icon) => (
                      <CommandItem
                        key={icon.id}
                        value={`${icon.id} ${icon.title} ${icon.fullTitle}`}
                        onSelect={() => handleIconChange(icon)}
                        className="min-h-[44px] cursor-pointer"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            config.name === icon.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        <span
                          className="mr-2 h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: icon.color }}
                        />
                        <span className="truncate">{icon.fullTitle}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Section: Customize Text */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
          {t.customizeText}
        </h3>

        {/* Line 1 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="line1" className="text-xs font-medium text-muted-foreground">
            {t.line1}
          </label>
          <input
            id="line1"
            type="text"
            value={config.line1}
            onChange={(e) => onConfigChange({ ...config, line1: e.target.value })}
            placeholder={t.line1Placeholder}
            className="h-11 rounded-lg border border-input bg-background px-4 text-base text-foreground placeholder-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 sm:h-10 sm:text-sm"
          />
        </div>

        {/* Line 2 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="line2" className="text-xs font-medium text-muted-foreground">
            {t.line2}
          </label>
          <input
            id="line2"
            type="text"
            value={config.line2}
            onChange={(e) => onConfigChange({ ...config, line2: e.target.value })}
            placeholder={t.line2Placeholder}
            className="h-11 rounded-lg border border-input bg-background px-4 text-base text-foreground placeholder-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 sm:h-10 sm:text-sm"
          />
        </div>
      </div>

      {/* Section: Badge Theme */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
          {t.badgeTheme}
        </h3>
        <div className="flex gap-3">
          <Button
            variant={config.theme === 'light' ? 'default' : 'outline'}
            onClick={() => onConfigChange({ ...config, theme: 'light' })}
            className="h-11 flex-1 cursor-pointer sm:h-10"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {t.light}
          </Button>
          <Button
            variant={config.theme === 'dark' ? 'default' : 'outline'}
            onClick={() => onConfigChange({ ...config, theme: 'dark' })}
            className="h-11 flex-1 cursor-pointer sm:h-10"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            {t.dark}
          </Button>
        </div>
      </div>
    </div>
  )
}
