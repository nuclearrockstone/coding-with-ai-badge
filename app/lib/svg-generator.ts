// SVG 生成逻辑 - 使用 @lobehub/icons 的真实数据
import toc from '@lobehub/icons/es/toc'

import iconPathsData from './icon-paths.json'

export interface BadgeParams {
  name: string
  line1?: string
  line2?: string
  theme?: 'light' | 'dark'
}

interface IconData {
  id: string
  title: string
  fullTitle: string
  color: string
  colorGradient?: string
  group: string
}

interface IconPathData {
  path: string
  viewBox: string
}

interface BadgeConfig {
  iconId: string
  iconColor: string
  iconTitle: string
  iconPath: string | null
  line1: string
  line2: string
  theme: 'light' | 'dark'
}

// 图标路径数据
const iconPaths = iconPathsData as Record<string, IconPathData>

// 从 toc 获取图标信息
function getIconData(name: string): IconData | null {
  const icons = toc as IconData[]
  return icons.find((icon) => 
    icon.id.toLowerCase() === name.toLowerCase() ||
    icon.title.toLowerCase() === name.toLowerCase()
  ) || null
}

// 获取图标 SVG 路径
function getIconPath(iconId: string): string | null {
  const data = iconPaths[iconId.toLowerCase()]
  return data?.path || null
}

// 获取 badge 配置
function getBadgeConfig(params: BadgeParams): BadgeConfig {
  const iconData = getIconData(params.name)
  const iconId = iconData?.id || params.name
  
  return {
    iconId,
    iconColor: iconData?.color || '#6B7280',
    iconTitle: iconData?.title || params.name,
    iconPath: getIconPath(iconId),
    line1: params.line1 || 'coding with',
    line2: params.line2 || iconData?.fullTitle || iconData?.title || params.name,
    theme: params.theme || 'light',
  }
}

// 主题颜色配置
const THEMES = {
  light: {
    background: '#FFFFFF',
    border: '#E5E7EB',
    iconBg: '#F3F4F6',
    text1: '#6B7280',
    text2: '#1F2937',
  },
  dark: {
    background: '#1F2937',
    border: '#374151',
    iconBg: '#374151',
    text1: '#9CA3AF',
    text2: '#F9FAFB',
  },
}

// Web 安全字体栈 - 确保跨平台一致性
const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

// 生成 Badge SVG - 使用 text 标签和系统字体栈
export async function generateBadgeSvg(params: BadgeParams): Promise<string> {
  const config = getBadgeConfig(params)
  const theme = THEMES[config.theme]
  
  // 字体尺寸
  const line1FontSize = 12
  const line2FontSize = 16
  
  // Badge 尺寸
  const iconBoxSize = 48
  const iconDisplaySize = 28
  const padding = 12
  const gap = 12
  
  // 计算文字宽度（近似值，基于平均字符宽度）
  const line1Width = config.line1.length * 6.5
  const line2Width = config.line2.length * 9
  const textAreaWidth = Math.max(line1Width, line2Width, 80) + 10
  
  const totalWidth = Math.ceil(padding + iconBoxSize + gap + textAreaWidth + padding)
  const totalHeight = 64
  const borderRadius = 12
  const iconBoxRadius = 8

  // 计算位置
  const iconBoxX = padding
  const iconBoxY = (totalHeight - iconBoxSize) / 2
  const iconCenterX = iconBoxX + iconBoxSize / 2
  const iconCenterY = iconBoxY + iconBoxSize / 2
  const textX = padding + iconBoxSize + gap
  const line1Y = 26
  const line2Y = 44

  // 生成图标内容 - 使用真实 SVG 路径或退回到首字母
  // 如果为 dark 主题，则将图标填充直接设为白色以保证可见性
  const iconFillColor = config.theme === 'dark' ? '#FFFFFF' : config.iconColor
  
  const iconContent = config.iconPath
    ? generateRealIcon(config.iconPath, iconFillColor, iconCenterX, iconCenterY, iconDisplaySize)
    : generateFallbackIcon(config.iconTitle, iconFillColor, iconCenterX, iconCenterY, iconDisplaySize)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
  <defs>
    <style type="text/css">
      .badge-text {
        font-family: ${FONT_FAMILY};
        font-style: normal;
      }
    </style>
  </defs>
  
  <!-- Background -->
  <rect x="0.5" y="0.5" width="${totalWidth - 1}" height="${totalHeight - 1}" rx="${borderRadius}" ry="${borderRadius}" fill="${theme.background}" stroke="${theme.border}" stroke-width="1"/>
  
  <!-- Icon Box -->
  <rect x="${iconBoxX}" y="${iconBoxY}" width="${iconBoxSize}" height="${iconBoxSize}" rx="${iconBoxRadius}" ry="${iconBoxRadius}" fill="${theme.iconBg}"/>
  
  <!-- Icon -->
  ${iconContent}
  
  <!-- Line 1 Text -->
  <text x="${textX}" y="${line1Y}" class="badge-text" fill="${theme.text1}" font-size="${line1FontSize}" font-weight="400">${escapeXml(config.line1)}</text>
  
  <!-- Line 2 Text -->
  <text x="${textX}" y="${line2Y}" class="badge-text" fill="${theme.text2}" font-size="${line2FontSize}" font-weight="600">${escapeXml(config.line2)}</text>
</svg>`

  return svg
}

// 生成真实图标（使用 SVG path）
function generateRealIcon(
  pathData: string,
  color: string,
  centerX: number,
  centerY: number,
  size: number
): string {
  // 原始 viewBox 是 0 0 24 24，我们需要缩放和居中
  const scale = size / 24
  const offsetX = centerX - size / 2
  const offsetY = centerY - size / 2
  
  return `<g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">
    <path d="${pathData}" fill="${color}" fill-rule="evenodd"/>
  </g>`
}

// 生成回退图标（圆形 + 首字母）
function generateFallbackIcon(
  title: string,
  color: string,
  centerX: number,
  centerY: number,
  size: number
): string {
  const initial = title.charAt(0).toUpperCase()
  const darkerColor = adjustColor(color, -20)
  
  return `<defs>
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkerColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="${centerX}" cy="${centerY}" r="${size / 2}" fill="url(#iconGradient)"/>
  <text x="${centerX}" y="${centerY}" dominant-baseline="central" text-anchor="middle" fill="white" font-family="${FONT_FAMILY}" font-size="14" font-weight="600">${initial}</text>`
}

// 转义 XML 特殊字符
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// 调整颜色亮度
function adjustColor(color: string, amount: number): string {
  // 如果颜色是 #fff 或 #000 等简写形式，展开它
  let hex = color.replace('#', '')
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('')
  }
  
  const num = parseInt(hex, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
  
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
