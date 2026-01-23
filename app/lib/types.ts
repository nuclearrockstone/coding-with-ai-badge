// Badge 配置类型
export interface BadgeConfig {
  name: string
  line1: string
  line2: string
  theme: 'light' | 'dark'
}

// 默认配置
export const DEFAULT_CONFIG: BadgeConfig = {
  name: 'Claude',
  line1: 'coding with',
  line2: 'Claude',
  theme: 'light',
}

// 站点配置
export const SITE_CONFIG = {
  name: 'Coding with AI Badge',
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'https://coding-with-ai-badge.vercel.app',
  github: 'https://github.com/nuclearrockstone/coding-with-ai-badge',
}
