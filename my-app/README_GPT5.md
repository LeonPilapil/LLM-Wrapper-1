# AI Expert Wrapper - GPT-5 Edition

An intelligent chat application that provides expert-level guidance powered by **OpenAI's GPT-5**. Get specialized advice from AI experts in UX/UI Design, Business Analysis, Content Writing, Product Management, and Marketing Strategy.

![GPT-5 Powered](https://img.shields.io/badge/GPT--5-Powered-blue?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge)

## 🎯 What Makes This Special

Unlike generic ChatGPT, this wrapper:
- **🎨 5 Expert Personas** - Each with specialized knowledge and GPT-5 optimized prompts
- **🧠 Configurable Intelligence** - Control reasoning depth and response verbosity
- **⚡ GPT-5 Powered** - Leverages OpenAI's most advanced model
- **💾 Persistent Preferences** - Your settings are remembered
- **🎨 Beautiful UI** - Modern, responsive design with dark mode
- **📱 Mobile Optimized** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with GPT-5 access ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone and install dependencies**:
```bash
cd my-app
npm install
```

2. **Configure environment variables**:

Create a `.env.local` file:
```env
OPENAI_API_KEY=sk-your_openai_api_key_here
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Expert Types

### 🎨 UX/UI Designer
Expert in user experience, visual design, and accessibility. Perfect for:
- User interface design decisions
- Accessibility recommendations (WCAG compliance)
- Design systems and component libraries
- User research and usability testing
- Responsive and mobile-first design

### 📊 Business Analyst
Specialist in requirements, process optimization, and strategy. Ideal for:
- Business requirements analysis
- Process mapping and optimization
- Stakeholder management
- Data analysis and KPIs
- User story writing

### ✍️ Content Writer
Professional copywriter and content strategist. Great for:
- Web and marketing copywriting
- SEO optimization
- Brand voice development
- Blog posts and articles
- Email and social media content

### 🚀 Product Manager
Product strategy and roadmap expert. Perfect for:
- Product strategy and vision
- Feature prioritization (RICE, MoSCoW, Kano)
- User research and discovery
- Agile/Scrum practices
- Go-to-market strategy

### 📈 Marketing Strategist
Digital marketing and growth specialist. Ideal for:
- Marketing strategy and campaigns
- Customer acquisition and retention
- Brand positioning
- Conversion rate optimization
- Analytics and attribution

## 🧠 GPT-5 Features

### Reasoning Effort Control

Choose how deeply GPT-5 thinks before responding:

| Level | Speed | Use For |
|-------|-------|---------|
| **Minimal** | ⚡ Fastest | Quick questions, simple tasks |
| **Low** | 🚀 Fast | Straightforward problems |
| **Medium** | ⚖️ Balanced | Most conversations (default) |
| **High** | 🧠 Thorough | Complex, multi-step problems |

### Verbosity Control

Adjust response length and detail:

| Level | Length | Use For |
|-------|--------|---------|
| **Low** | Brief | Quick answers, summaries |
| **Medium** | Standard | Balanced explanations (default) |
| **High** | Detailed | In-depth guides, examples |

### How to Adjust Settings

1. Click the ⚙️ **Settings** button in the header
2. Select your preferred **Reasoning Effort**
3. Choose your **Verbosity** level
4. Click **Done** - settings are automatically saved!

## 📁 Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # GPT-5 API endpoint
│   ├── lib/
│   │   ├── prompts.ts            # 5 expert prompts (GPT-5 optimized)
│   │   ├── config.ts             # GPT-5 configuration
│   │   └── types.ts              # TypeScript definitions
│   ├── components/
│   │   ├── assistant-ui/
│   │   │   └── thread.tsx        # Chat UI component
│   │   ├── expert-selector.tsx   # Expert dropdown
│   │   ├── header.tsx            # App header with branding
│   │   └── settings-panel.tsx    # GPT-5 settings UI
│   ├── page.tsx                  # Main app page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Tailwind + custom styles
├── .env.local                    # API keys (gitignored)
├── GPT5_MIGRATION.md             # Migration guide
└── package.json
```

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Vercel AI SDK** | GPT-5 integration and streaming |
| **@ai-sdk/openai** | OpenAI provider |
| **Assistant UI** | Chat components |

## 🎯 Features

✅ **GPT-5 Powered Intelligence** - OpenAI's most advanced model  
✅ **5 Expert Personas** - Specialized knowledge domains  
✅ **Configurable AI Behavior** - Control reasoning and verbosity  
✅ **Real-time Streaming** - See responses as they're generated  
✅ **Persistent Settings** - Preferences saved automatically  
✅ **Beautiful UI** - Modern, professional design  
✅ **Dark Mode** - Easy on the eyes  
✅ **Mobile Responsive** - Works on all devices  
✅ **Fast & Efficient** - Optimized performance  
✅ **Type Safe** - Full TypeScript coverage  

## 📖 Usage Tips

### Getting the Best Responses

1. **Be Specific**: Clear, detailed questions get better answers
2. **Use Right Expert**: Choose the expert matching your domain
3. **Adjust Settings**: Use higher reasoning for complex problems
4. **Iterate**: Ask follow-up questions to dive deeper

### Example Queries

**For UX/UI Designer:**
> "What are the key principles for designing an accessible navigation menu? Include WCAG guidelines."

**For Business Analyst:**
> "Help me create user stories for an e-commerce checkout feature with acceptance criteria."

**For Content Writer:**
> "Write compelling copy for a SaaS landing page targeting small business owners. Focus on pain points."

**For Product Manager:**
> "How should I prioritize these 5 features using the RICE framework? Here are the details..."

**For Marketing Strategist:**
> "Create a customer acquisition strategy for a B2B SaaS product with a $10k ACV."

## 🔧 Configuration

### Default Settings

Located in `app/lib/config.ts`:

```typescript
export const GPT5_CONFIG = {
  model: 'gpt-5',
  defaultReasoningEffort: 'medium',
  defaultVerbosity: 'medium',
  defaultExpert: 'marketer',
  maxOutputTokens: 16000,
};
```

### Custom Expert Prompts

Edit `app/lib/prompts.ts` to customize expert behavior. Each prompt follows GPT-5 best practices:

```typescript
export const EXPERT_PROMPTS: Record<ExpertType, string> = {
  designer: `<role>...</role><expertise>...</expertise>...`,
  // ... other experts
};
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add `OPENAI_API_KEY` environment variable
4. Deploy!

Vercel automatically detects Next.js and optimizes the deployment.

### Environment Variables

Set in your deployment platform:

```env
OPENAI_API_KEY=sk-your_openai_api_key_here
```

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Experts

1. Update `ExpertType` in `app/lib/types.ts`
2. Add prompt to `EXPERT_PROMPTS` in `app/lib/prompts.ts`
3. Add metadata to `EXPERT_METADATA` (label, icon, description)
4. Expert automatically appears in selector!

## 📊 Performance

### GPT-5 Performance Characteristics

- **Minimal/Low Reasoning**: Very fast, suitable for simple queries
- **Medium Reasoning**: Balanced speed and quality (recommended)
- **High Reasoning**: Slower but excellent for complex problems
- **Streaming**: Real-time response display
- **Token Efficiency**: GPT-5 can be more concise with proper verbosity settings

### Optimization Tips

1. Use **medium reasoning** by default
2. Increase to **high** only for complex tasks
3. Use **low verbosity** for quick answers
4. Enable **prompt caching** (automatic with Vercel AI SDK)

## 🐛 Troubleshooting

### Common Issues

**"GPT-5 model access error"**
- Ensure your OpenAI API key has GPT-5 access
- Check your account tier at platform.openai.com

**Responses too slow**
- Lower reasoning effort to "Low" or "Minimal"
- Consider using a faster expert workflow

**Responses too brief**
- Increase verbosity to "High"
- Be more specific in your questions

**Settings not saving**
- Check browser localStorage is enabled
- Try clearing cache and reloading

### Debug Mode

Enable detailed logging:
```typescript
// In app/api/chat/route.ts
console.log('GPT-5 settings:', { reasoningEffort, verbosity });
```

## 🔮 Future Enhancements

Potential features leveraging GPT-5:

- [ ] **Function Calling**: Add tools for data retrieval
- [ ] **Responses API**: Multi-turn reasoning with context
- [ ] **Chat History**: Save and resume conversations
- [ ] **Export Conversations**: Download as PDF/Markdown
- [ ] **Custom Experts**: User-defined expert personas
- [ ] **Team Features**: Share conversations with team
- [ ] **Usage Analytics**: Track token usage and costs
- [ ] **GPT-5 Variants**: Support for gpt-5-mini, gpt-5-nano

## 📄 License

MIT

## 🙏 Acknowledgments

- **OpenAI** - For GPT-5 and the incredible API
- **Vercel** - For the AI SDK and Next.js
- **Assistant UI** - For the beautiful chat components
- **Tailwind CSS** - For the styling system

## 📚 Documentation

- [GPT-5 Migration Guide](./GPT5_MIGRATION.md) - Detailed migration info
- [OpenAI GPT-5 Docs](https://platform.openai.com/docs/guides/latest-model)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Next.js 16](https://nextjs.org/docs)

## 🤝 Contributing

This is a production-ready application. Contributions welcome! Areas for improvement:

- Additional expert types
- Enhanced UI features
- Better mobile experience
- Accessibility improvements
- Performance optimizations

---

**Built with ❤️ using Next.js, GPT-5, and modern web technologies**

*Last updated: October 2025*

