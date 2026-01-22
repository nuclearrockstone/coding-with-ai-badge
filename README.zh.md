# AI Badge 徽章生成器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

**中文 | [🇺🇸 English](README.md)**

> 生成精美的徽章，展示您项目中使用的 AI 模型、工具和提供商

类似于 [shields.io](https://shields.io) 和 [skillicons.dev](https://skillicons.dev) 的在线徽章生成器，专为 AI 相关技术设计。为您的 GitHub README、文档和网站创建时尚的徽章。

## ✨ 特性

- 🎨 **精美徽章**：现代化、简洁的设计，支持自定义主题
- 🤖 **AI 专注**：100+ AI 模型、工具和提供商图标，来自 [@lobehub/icons](https://github.com/lobehub/lobe-icons)
- 🌍 **双语支持**：英文和中文界面
- 🎯 **易于集成**：简单的 URL API，方便嵌入
- 🌓 **主题支持**：浅色和深色徽章主题
- 📱 **响应式设计**：在所有设备上完美运行
- ⚡ **实时预览**：配置时即时查看变化
- 📋 **多种格式**：导出为直接链接、Markdown 或 HTML

## 🚀 快速开始

### Web 界面

访问 [https://coding-with-ai-badge.vercel.app](https://coding-with-ai-badge.vercel.app) 使用交互式徽章生成器。

### API 使用

通过 URL 直接生成徽章：

```bash
# 基础徽章
https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude

# 自定义文字和主题
https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude&line1=powered%20by&line2=Claude%20AI&theme=dark
```

## 📖 API 文档

### 端点

```
GET /api/badge
```

### 参数

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| `name` | string | ✅ | - | AI 模型/工具/提供商名称（如 `claude`、`cursor`、`openai`） |
| `line1` | string | ❌ | `"coding with"` | 第一行文字（顶部） |
| `line2` | string | ❌ | `{name}` | 第二行文字（主要） |
| `theme` | string | ❌ | `"light"` | 颜色主题：`light` 或 `dark` |

### 响应

- **Content-Type**: `image/svg+xml`
- **缓存**: 24 小时（公开）

### 示例

#### 基础用法
```html
<!-- 直接链接 -->
<img src="https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude" alt="Claude AI">

<!-- Markdown -->
![Claude AI](https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude)
```

#### 自定义文字
```html
<img src="https://cwab.nuclearrockstone.xyz.com/api/badge?name=cursor&line1=powered%20by&line2=Cursor%20IDE" alt="Cursor IDE">
```

#### 深色主题
```html
<img src="https://cwab.nuclearrockstone.xyz.com/api/badge?name=openai&theme=dark" alt="OpenAI">
```

## 🛠️ 本地开发

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/coding-with-ai-badge.git
cd coding-with-ai-badge

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env.local
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 打开 http://localhost:3000
```

### 构建与部署

```bash
# 生产环境构建
npm run build

# 启动生产服务器
npm run start

# 运行代码检查
npm run lint
```

## 🎨 可用图标

徽章生成器支持 100+ AI 相关图标，按类别组织：

### 🤖 AI 模型
- `claude` - Anthropic Claude
- `gpt` - OpenAI GPT
- `gemini` - Google Gemini
- `llama` - Meta Llama
- 以及更多...

### 🏢 AI 提供商
- `openai` - OpenAI
- `anthropic` - Anthropic
- `google` - Google AI
- `microsoft` - Microsoft Azure
- 以及更多...

### 🛠️ 应用与工具
- `cursor` - Cursor IDE
- `copilot` - GitHub Copilot
- `chatgpt` - ChatGPT
- `perplexity` - Perplexity AI
- 以及许多其他...

> **注意**：图标来源于 [@lobehub/icons](https://github.com/lobehub/lobe-icons)。查看仓库获取完整图标列表。

## 🌐 国际化

应用支持多种语言：

- 🇺🇸 English（默认）
- 🇨🇳 中文（简体）

### 添加新语言

1. 在 `messages/{locale}.json` 中创建新的翻译文件
2. 更新 `components/LanguageToggle.tsx` 中的语言选择器
3. 遵循现有的翻译结构

## 🎯 自定义

### 徽章主题

#### 浅色主题
```css
background: #FFFFFF
border: #E5E7EB
text1: #6B7280
text2: #1F2937
```

#### 深色主题
```css
background: #1F2937
border: #374151
text1: #9CA3AF
text2: #F9FAFB
```

### 自定义样式

生成的 SVG 使用系统字体以确保最大兼容性：

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

## 🏗️ 项目结构

```
coding-with-ai-badge/
├── app/
│   ├── api/
│   │   └── badge/
│   │       └── route.ts           # Badge SVG 生成 API
│   ├── components/
│   │   ├── BadgePreview.tsx      # Badge 预览组件
│   │   ├── ConfigPanel.tsx       # 配置面板
│   │   ├── UrlCopy.tsx           # URL 复制组件
│   │   └── ThemeToggle.tsx       # 主题切换器
│   ├── lib/
│   │   ├── svg-generator.ts      # SVG 生成逻辑
│   │   ├── icons.ts              # 图标数据管理
│   │   └── types.ts              # TypeScript 定义
│   ├── page.tsx                  # 主页面
│   └── layout.tsx                # 根布局
├── messages/
│   ├── en.json                   # 英文翻译
│   └── zh.json                   # 中文翻译
├── public/
│   └── fonts/                    # 字体文件（如需要）
├── AGENTS.md                     # 开发指南
└── README.md                     # 本文件
```

## 🔧 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| **框架** | Next.js (App Router) | 16.x |
| **UI 库** | React | 19.x |
| **语言** | TypeScript | 5.x |
| **样式** | Tailwind CSS | 4.x |
| **图标** | @lobehub/icons | latest |
| **SVG 生成** | Satori + @vercel/og | latest |
| **UI 组件** | Radix UI | latest |

## 🤝 贡献

我们欢迎贡献！请遵循以下步骤：

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 进行更改
4. 运行测试：`npm run lint`
5. 提交更改：`git commit -m 'Add amazing feature'`
6. 推送到分支：`git push origin feature/amazing-feature`
7. 打开 Pull Request

### 开发指南

- 遵循现有代码风格（见 `AGENTS.md`）
- 所有新代码使用 TypeScript
- 添加适当的错误处理
- 如需要则更新翻译
- 在浅色和深色主题上测试

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [@lobehub/icons](https://github.com/lobehub/lobe-icons) 提供的精美 AI 图标集合
- [Vercel](https://vercel.com) 提供的托管平台
- [shields.io](https://shields.io) 提供的灵感
- [skillicons.dev](https://skillicons.dev) 提供的设计参考

## 🔗 相关项目

- [shields.io](https://shields.io) - 开源项目的质量元数据徽章
- [skillicons.dev](https://skillicons.dev) - README 的开发图标
- [@lobehub/icons](https://github.com/lobehub/lobe-icons) - 高质量 AI/LLM 图标

---

<div align="center">
  由 AI 社区用 ❤️ 制作
</div>