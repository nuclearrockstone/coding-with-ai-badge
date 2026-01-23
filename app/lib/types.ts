// Icon color mode options
export type IconColorMode = 'original' | 'primary' | 'contrast'

// Advanced color configuration for custom colors
export interface AdvancedColorConfig {
  background?: string
  border?: string
  iconBg?: string
  text1?: string
  text2?: string
  iconColor?: string
}

// Badge 配置类型
export interface BadgeConfig {
  name: string
  line1: string
  line2: string
  theme: 'light' | 'dark'
  colorMode: IconColorMode
}

// 默认配置
export const DEFAULT_CONFIG: BadgeConfig = {
  name: 'Claude',
  line1: 'coding with',
  line2: 'Claude',
  theme: 'light',
  colorMode: 'original',
}

// Default advanced colors (empty = use theme defaults)
export const DEFAULT_ADVANCED_COLORS: AdvancedColorConfig = {}

// 站点配置
export const SITE_CONFIG = {
  name: 'Coding with AI Badge',
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'https://coding-with-ai-badge.vercel.app',
  github: 'https://github.com/nuclearrockstone/coding-with-ai-badge',
}
