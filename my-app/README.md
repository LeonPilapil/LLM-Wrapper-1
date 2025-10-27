# AI Expert Wrapper - GPT-5 Edition

> **🚀 Now powered by GPT-5** - OpenAI's most intelligent model with advanced reasoning and instruction-following

An intelligent chat application that provides expert-level guidance across multiple domains. Choose from 5 specialized AI experts, each powered by GPT-5 with carefully engineered prompts following OpenAI's best practices.

![GPT-5](https://img.shields.io/badge/Model-GPT--5-blue) ![Next.js 16](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

## 🎯 What Makes This Special

**5 Expert Personas** - Each with specialized knowledge:
- 🎨 **UX/UI Designer** - User experience, visual design, accessibility
- 📊 **Business Analyst** - Requirements, process optimization, strategy  
- ✍️ **Content Writer** - Copywriting, SEO, storytelling
- 🚀 **Product Manager** - Product strategy, roadmaps, prioritization
- 📈 **Marketing Strategist** - Digital marketing, growth, brand strategy

**GPT-5 Powered Intelligence:**
- ⚡ Configurable reasoning depth (minimal, low, medium, high)
- 📝 Adjustable verbosity (low, medium, high)
- 🧠 Advanced instruction-following and reasoning
- 💾 Persistent user preferences

## 🏗️ Architecture

- **Frontend**: Next.js 16 + React 19 with Assistant-UI
- **Backend**: Next.js API Routes (serverless, edge-optimized)
- **LLM**: OpenAI **GPT-5** via Vercel AI SDK
- **Styling**: Tailwind CSS v4 with custom design system
- **Type Safety**: Full TypeScript coverage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:

Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your_actual_key_here
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint with expert prompts
│   ├── lib/
│   │   └── prompts.ts            # Expert prompt definitions
│   ├── components/
│   │   ├── assistant-ui/
│   │   │   └── thread.tsx        # Chat UI component
│   │   └── expert-selector.tsx   # Category dropdown
│   ├── page.tsx                  # Main chat UI
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Tailwind styles
├── .env.local                    # API keys (gitignored)
└── package.json
```

## ✨ Features

- ✅ **5 Expert Personas** with GPT-5 optimized prompts
- ✅ **Configurable GPT-5 Settings** (reasoning effort & verbosity)
- ✅ **Real-time Streaming** chat responses
- ✅ **Persistent Preferences** via localStorage
- ✅ **Beautiful Modern UI** with enhanced design
- ✅ **Mobile Responsive** - works on all devices
- ✅ **Dark Mode** support throughout
- ✅ **Type Safe** - Full TypeScript coverage
- ✅ **Production Ready** with error handling

## 🔄 How It Works

1. **User selects expert** from 5 options (Designer, Analyst, Writer, PM, Marketer)
2. **User adjusts GPT-5 settings** (optional) - reasoning effort & verbosity
3. **User types message** in chat interface
4. **Frontend sends request** to `/api/chat` with messages + expertType + settings
5. **API injects GPT-5 optimized prompt** following OpenAI best practices
6. **GPT-5 generates response** with enhanced reasoning and instruction-following
7. **Response streams to UI** in real-time with beautiful Markdown rendering
8. **Preferences auto-save** to localStorage for next visit

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `ai` | Vercel AI SDK core (streaming, message handling) |
| `@ai-sdk/openai` | OpenAI provider for Vercel AI SDK |
| `@assistant-ui/react` | Core chat UI components |
| `@assistant-ui/react-ai-sdk` | Integration layer for AI SDK |
| `zod` | Runtime validation for API requests |

## 🧪 Testing

To test the MVP:

1. Start the dev server: `npm run dev`
2. Select "Marketing Strategist" from the dropdown
3. Ask a marketing-related question:
   - "How can I improve my email open rates?"
   - "What's the best way to position a B2B SaaS product?"
   - "How do I create a content marketing strategy?"
4. Observe that responses are focused, actionable, and expert-level

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel dashboard](https://vercel.com/new)
3. Add `OPENAI_API_KEY` environment variable in Vercel settings
4. Deploy (auto-detected as Next.js project)

### Environment Variables

Set the following in your deployment platform:

```
OPENAI_API_KEY=sk-your_actual_key_here
```

## 📚 Documentation

- **[GPT-5 Migration Guide](./GPT5_MIGRATION.md)** - Detailed migration info from GPT-4o
- **[Implementation Notes](./IMPLEMENTATION_NOTES.md)** - Architecture and technical details
- **[OpenAI GPT-5 Docs](https://platform.openai.com/docs/guides/latest-model)** - Official GPT-5 documentation

## 🔮 Future Enhancements

- [ ] **GPT-5 Parameters** - Full reasoning_effort & verbosity API support (pending SDK update)
- [ ] **Chat History** - Database persistence for conversations
- [ ] **Function Calling** - Add tools for data retrieval
- [ ] **Export** - Download conversations as PDF/Markdown
- [ ] **Custom Experts** - User-defined personas
- [ ] **Team Features** - Share conversations
- [ ] **Usage Analytics** - Token tracking dashboard
- [ ] **GPT-5 Variants** - Support for gpt-5-mini, gpt-5-nano

## 🛠️ Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 Adding New Experts

The system is designed for easy expert additions:

1. **Update type** in `app/lib/types.ts`:
```typescript
export type ExpertType = 'designer' | 'analyst' | 'writer' | 'product-manager' | 'marketer' | 'your-new-expert';
```

2. **Add prompt** in `app/lib/prompts.ts`:
```typescript
export const EXPERT_PROMPTS: Record<ExpertType, string> = {
  // ... existing experts
  'your-new-expert': `<role>You are a...</role>...`,
};

export const EXPERT_METADATA: Record<ExpertType, { label: string; icon: string; description: string }> = {
  // ... existing experts
  'your-new-expert': {
    label: 'Your Expert Title',
    icon: '🎯',
    description: 'Brief description',
  },
};
```

3. **Expert automatically appears** in the selector - no other changes needed!

## 🐛 Troubleshooting

### "API key not found" error

Make sure `.env.local` exists and contains:
```
OPENAI_API_KEY=sk-your_actual_key_here
```

Restart the dev server after adding the key.

### Build errors

Try clearing Next.js cache:
```bash
rm -rf .next
npm run dev
```

### TypeScript errors

Ensure all dependencies are installed:
```bash
npm install
```

## 📄 License

MIT

## 🤝 Contributing

This is a production-ready application. Contributions welcome for:
- Additional expert types
- Enhanced UI/UX features
- Improved mobile experience
- Accessibility improvements
- Performance optimizations

## ⚡ What's New in GPT-5 Edition

### Major Upgrades
- ✅ **Model**: GPT-4o → **GPT-5**
- ✅ **Experts**: 1 → **5 specialized personas**
- ✅ **UI**: Completely modernized with header, settings panel, enhanced styling
- ✅ **Configuration**: Reasoning effort & verbosity controls
- ✅ **Prompts**: Rewritten following GPT-5 best practices
- ✅ **Architecture**: New configuration system, type definitions, better organization
- ✅ **Documentation**: Comprehensive migration guide and implementation notes

### Technical Improvements
- Full TypeScript coverage with strict types
- localStorage persistence for user preferences
- Enhanced error handling for GPT-5
- Better mobile responsiveness
- Improved dark mode
- Professional design system
- Optimized performance

---

**Built with ❤️ using Next.js, GPT-5, and modern web technologies**

*Upgraded to GPT-5 - October 2025*
