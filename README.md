# Coding with AI Badge Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

**[🇨🇳 中文](README.zh.md) | English**

> Generate beautiful badges to showcase AI models, tools, and providers in your projects

An online badge generator similar to [shields.io](https://shields.io) and [skillicons.dev](https://skillicons.dev), specifically designed for AI-related technologies. Create stylish badges for your GitHub READMEs, documentation, and websites.

## ✨ Features

- 🎨 **Beautiful Badges**: Modern, clean design with customizable themes
- 🤖 **AI-Focused**: 100+ AI models, tools, and provider icons from [@lobehub/icons](https://github.com/lobehub/lobe-icons)
- 🌍 **Bilingual Support**: English and Chinese interface
- 🎯 **Easy Integration**: Simple URL-based API for embedding
- 🌓 **Theme Support**: Light and dark badge themes
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Real-time Preview**: See changes instantly as you configure
- 📋 **Multiple Formats**: Export as direct URL, Markdown, or HTML

## 🚀 Quick Start

### Web Interface

Visit [https://cwab.nuclearrockstone.xyz.com](https://cwab.nuclearrockstone.xyz.com) to use the interactive badge generator.

### API Usage

Generate badges directly via URL:

```bash
# Basic badge
https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude

# Custom text and theme
https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude&line1=powered%20by&line2=Claude%20AI&theme=dark
```

## 📖 API Documentation

### Endpoint

```
GET /api/badge
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `name` | string | ✅ | - | AI model/tool/provider name (e.g., `claude`, `cursor`, `openai`) |
| `line1` | string | ❌ | `"coding with"` | First line text (top) |
| `line2` | string | ❌ | `{name}` | Second line text (main) |
| `theme` | string | ❌ | `"light"` | Color theme: `light` or `dark` |

### Response

- **Content-Type**: `image/svg+xml`
- **Cache**: 24 hours (public)

### Examples

#### Basic Usage
```html
<!-- Direct URL -->
<img src="https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude" alt="Claude AI">

<!-- Markdown -->
![Claude AI](https://cwab.nuclearrockstone.xyz.com/api/badge?name=claude)
```

#### Custom Text
```html
<img src="https://cwab.nuclearrockstone.xyz.com/api/badge?name=cursor&line1=powered%20by&line2=Cursor%20IDE" alt="Cursor IDE">
```

#### Dark Theme
```html
<img src="https://cwab.nuclearrockstone.xyz.com/api/badge?name=openai&theme=dark" alt="OpenAI">
```

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/coding-with-ai-badge.git
cd coding-with-ai-badge

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 🎨 Available Icons

The badge generator supports 100+ AI-related icons organized into categories:

### 🤖 AI Models
- `claude` - Anthropic Claude
- `gpt` - OpenAI GPT
- `gemini` - Google Gemini
- `llama` - Meta Llama
- And many more...

### 🏢 AI Providers
- `openai` - OpenAI
- `anthropic` - Anthropic
- `google` - Google AI
- `microsoft` - Microsoft Azure
- And more...

### 🛠️ Applications & Tools
- `cursor` - Cursor IDE
- `copilot` - GitHub Copilot
- `chatgpt` - ChatGPT
- `perplexity` - Perplexity AI
- And many others...

> **Note**: Icons are sourced from [@lobehub/icons](https://github.com/lobehub/lobe-icons). Check the repository for the complete list of available icons.

## 🌐 Internationalization

The application supports multiple languages:

- 🇺🇸 English (default)
- 🇨🇳 Chinese (Simplified)

### Adding New Languages

1. Create a new translation file in `messages/{locale}.json`
2. Update the language selector in `components/LanguageToggle.tsx`
3. Follow the existing translation structure

## 🎯 Customization

### Badge Themes

#### Light Theme
```css
background: #FFFFFF
border: #E5E7EB
text1: #6B7280
text2: #1F2937
```

#### Dark Theme
```css
background: #1F2937
border: #374151
text1: #9CA3AF
text2: #F9FAFB
```

### Custom Styling

The generated SVGs use system fonts for maximum compatibility:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

## 🏗️ Project Structure

```
coding-with-ai-badge/
├── app/
│   ├── api/
│   │   └── badge/
│   │       └── route.ts           # Badge SVG generation API
│   ├── components/
│   │   ├── BadgePreview.tsx      # Badge preview component
│   │   ├── ConfigPanel.tsx       # Configuration panel
│   │   ├── UrlCopy.tsx           # URL copy component
│   │   └── ThemeToggle.tsx       # Theme switcher
│   ├── lib/
│   │   ├── svg-generator.ts      # SVG generation logic
│   │   ├── icons.ts              # Icon data management
│   │   └── types.ts              # TypeScript definitions
│   ├── page.tsx                  # Main page
│   └── layout.tsx                # Root layout
├── messages/
│   ├── en.json                   # English translations
│   └── zh.json                   # Chinese translations
├── public/
│   └── fonts/                    # Font files (if needed)
├── AGENTS.md                     # Development guidelines
└── README.md                     # This file
```

## 🔧 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | 16.x |
| **UI Library** | React | 19.x |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **Icons** | @lobehub/icons | latest |
| **SVG Generation** | Satori + @vercel/og | latest |
| **UI Components** | Radix UI | latest |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style (see `AGENTS.md`)
- Use TypeScript for all new code
- Add proper error handling
- Update translations if needed
- Test on both light and dark themes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [shields.io](https://shields.io) - Quality metadata badges for open source projects
- [skillicons.dev](https://skillicons.dev) - Devicons for your README
- [@lobehub/icons](https://github.com/lobehub/lobe-icons) - High-quality AI/LLM icons

---

<div align="center">
  Made with ❤️ by the AI community
</div>

## 🙏 Acknowledgments

- [@lobehub/icons](https://github.com/lobehub/lobe-icons) for the amazing AI icon collection
- [Vercel](https://vercel.com) for the hosting platform
- [shields.io](https://shields.io) for inspiration
- [skillicons.dev](https://skillicons.dev) for design reference

## 📞 Support

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/coding-with-ai-badge/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/coding-with-ai-badge/discussions)

## 🔗 Related Projects

- [shields.io](https://shields.io) - Quality metadata badges for open source projects
- [skillicons.dev](https://skillicons.dev) - Devicons for your README
- [@lobehub/icons](https://github.com/lobehub/lobe-icons) - High-quality AI/LLM icons

---

<div align="center">
  Made with ❤️ by the AI community
</div>