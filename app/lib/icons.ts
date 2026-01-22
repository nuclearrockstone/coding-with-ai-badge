// 图标信息类型 - 来自 @lobehub/icons 的 toc
export interface IconInfo {
  id: string
  title: string
  fullTitle: string
  color: string
  colorGradient?: string
  group: 'model' | 'provider' | 'application'
  desc: string
}

// 类别映射
export const CATEGORY_MAP = {
  model: 'AI Models',
  provider: 'AI Providers',
  application: 'Applications & Tools',
} as const

export type IconCategory = keyof typeof CATEGORY_MAP

// 从 @lobehub/icons 导入 toc
import toc from '@lobehub/icons/es/toc'

// 转换 toc 数据为我们需要的格式
export const ICONS_DATA: IconInfo[] = (toc as Array<{
  id: string
  title: string
  fullTitle: string
  color: string
  colorGradient?: string
  group: string
  desc: string
}>).map((item) => ({
  id: item.id,
  title: item.title,
  fullTitle: item.fullTitle,
  color: item.color,
  colorGradient: item.colorGradient,
  group: item.group as IconCategory,
  desc: item.desc,
}))

// 按类别获取图标
export function getIconsByCategory(category: IconCategory): IconInfo[] {
  return ICONS_DATA.filter((icon) => icon.group === category)
}

// 获取所有类别
export function getCategories(): IconCategory[] {
  return ['model', 'provider', 'application']
}

// 根据 ID 获取图标信息
export function getIconById(id: string): IconInfo | undefined {
  return ICONS_DATA.find((icon) => icon.id.toLowerCase() === id.toLowerCase())
}

// 根据名称搜索图标
export function searchIcons(query: string, category?: IconCategory): IconInfo[] {
  const lowerQuery = query.toLowerCase()
  let icons = ICONS_DATA
  
  if (category) {
    icons = icons.filter((icon) => icon.group === category)
  }
  
  return icons.filter(
    (icon) =>
      icon.id.toLowerCase().includes(lowerQuery) ||
      icon.title.toLowerCase().includes(lowerQuery) ||
      icon.fullTitle.toLowerCase().includes(lowerQuery)
  )
}

// 获取图标总数
export function getIconCount(): number {
  return ICONS_DATA.length
}
