# AGENTS.md - AI Coding Agent 指南

## 项目概述

本项目是一个在线 Badge 生成器，用于展示项目中使用的 AI 模型、AI 辅助编程工具（IDE/Agent）和 AI 模型提供商。功能类似于 [shields.io](https://shields.io) 和 [skillicons](https://skillicons.dev)。

### 核心功能

1. **后端 API**：用户通过 URL 输入参数，获取 SVG 返回，可嵌入网站或文档
2. **前端界面**：帮助用户直观配置参数、预览效果、复制 URL

---

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.x |
| UI | React | 19.x |
| 语言 | TypeScript | 5.x |
| 样式 | Tailwind CSS | 4.x |
| 图标 | @lobehub/icons | latest |
| 文字矢量化 | 服务端预渲染 (@vercel/og) | - |

---

## 命令参考

```bash
# 开发
npm run dev          # 启动开发服务器 (http://localhost:3000)

# 构建
npm run build        # 生产环境构建
npm run start        # 启动生产服务器

# 代码检查
npm run lint         # ESLint 检查
```

---

## 项目结构

```
coding-with-ai-badge/
├── app/
│   ├── api/
│   │   └── badge/
│   │       └── route.ts       # Badge SVG 生成 API
│   ├── components/            # React 组件
│   │   ├── BadgePreview.tsx   # Badge 预览组件
│   │   ├── ConfigPanel.tsx    # 参数配置面板
│   │   └── UrlCopy.tsx        # URL 复制组件
│   ├── lib/
│   │   ├── svg-generator.ts   # SVG 生成逻辑
│   │   └── icons.ts           # 图标映射工具
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # 前端配置界面
├── public/
│   └── fonts/                 # 用于文字矢量化的字体文件
├── AGENTS.md
├── package.json
└── tsconfig.json
```

---

## 实现方案

### 1. 后端 API 规范

**端点**: `GET /api/badge`

**参数**:

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `name` | string | 是 | - | 模型/工具/提供商名称 (如 `claude`, `cursor`, `openai`) |
| `line1` | string | 否 | `"coding with"` | 第一行解释文字 |
| `line2` | string | 否 | `{name}` | 第二行解释文字，默认为 name 参数值 |
| `theme` | string | 否 | `"light"` | 颜色模式: `light` / `dark` |

**响应**: `Content-Type: image/svg+xml`

**示例**:
```
/api/badge?name=claude&theme=dark
/api/badge?name=cursor&line1=powered%20by&line2=Cursor%20IDE
```

### 2. SVG 生成逻辑

Badge 布局（参考设计图）：
- 左侧：圆角矩形容器，包含模型/工具图标（使用 @lobehub/icons）
- 右侧：两行文字区域
  - Line1: 较小字号，默认 "coding with"
  - Line2: 较大字号，默认为模型/工具/提供商名称

**文字矢量化要求**：
- 使用 @vercel/og 进行服务端渲染，将文字转换为 SVG
- 确保在任何环境下显示效果一致，不依赖客户端字体

### 3. 前端界面规范

功能模块：
- **参数配置面板**: 选择模型/工具/提供商，编辑文字，切换主题
- **实时预览**: 显示生成的 Badge 效果
- **URL 复制**: 一键复制嵌入代码 (Markdown/HTML)
- **引用信息**: 展示依赖项目信息（lobeicon 等）

---

## 代码风格指南

### 导入顺序

按以下顺序组织导入，各组之间空一行：

```typescript
// 1. React/Next.js 核心
import { useState, useEffect } from 'react'
import type { Metadata } from 'next'

// 2. 第三方库
import { Claude } from '@lobehub/icons'

// 3. 内部模块 (使用 @ 别名)
import { generateSvg } from '@/app/lib/svg-generator'

// 4. 类型导入 (type-only imports)
import type { BadgeConfig } from '@/types'
```

### TypeScript 规范

- **严格模式**: 项目启用 `strict: true`，禁止使用 `any`
- **类型优先**: 优先使用 `interface`，复杂类型使用 `type`
- **显式返回类型**: API 路由和公共函数必须声明返回类型

```typescript
// Good
interface BadgeParams {
  name: string
  line1?: string
  line2?: string
  theme?: 'light' | 'dark'
}

export function generateBadge(params: BadgeParams): string {
  // ...
}
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `BadgePreview.tsx`, `ConfigPanel` |
| 函数/变量 | camelCase | `generateSvg`, `badgeConfig` |
| 常量 | SCREAMING_SNAKE_CASE | `DEFAULT_THEME`, `API_ENDPOINT` |
| 类型/接口 | PascalCase | `BadgeParams`, `ThemeConfig` |
| 文件 (非组件) | kebab-case | `svg-generator.ts` |

### 格式化规范

- 使用 2 空格缩进
- 字符串使用单引号（JSX 属性使用双引号）
- 语句末尾不加分号（遵循 Next.js 默认风格）
- 最大行宽 100 字符

### 错误处理

```typescript
// API 路由错误处理
export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    if (!name) {
      return new Response('Missing required parameter: name', { status: 400 })
    }

    const svg = await generateBadge({ name })
    return new Response(svg, {
      headers: { 'Content-Type': 'image/svg+xml' }
    })
  } catch (error) {
    console.error('Badge generation failed:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
```

### React 组件规范

- 使用函数组件 + Hooks
- Props 使用 interface 定义，组件名与文件名一致
- 使用 `'use client'` 指令标记客户端组件

```typescript
'use client'

interface BadgePreviewProps {
  config: BadgeConfig
}

export function BadgePreview({ config }: BadgePreviewProps) {
  // ...
}
```

---

## 依赖说明

### @lobehub/icons

用于获取 AI 模型/工具/提供商的官方图标。

```bash
npm install @lobehub/icons
```

### @vercel/og

用于服务端文字渲染和 SVG 生成：

```bash
npm install @vercel/og
```

---

## 注意事项

1. **SVG 兼容性**: 生成的 SVG 应在 GitHub README、网页、各类 Markdown 渲染器中正常显示
2. **缓存策略**: API 响应应设置适当的缓存头以提高性能
3. **图标可用性**: 检查 @lobehub/icons 是否包含所需图标，不存在时提供降级方案
4. **响应式设计**: 前端界面应适配移动端和桌面端
