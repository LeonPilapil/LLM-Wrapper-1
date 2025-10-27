# Quick Reference Card

## 🚀 Essential Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main chat interface |
| `app/api/chat/route.ts` | API endpoint (handles AI requests) |
| `app/lib/prompts.ts` | Expert prompts (add new experts here) |
| `app/components/expert-selector.tsx` | Dropdown selector |
| `app/components/assistant-ui/thread.tsx` | Chat UI component |
| `.env.local` | API keys (never commit!) |

## 🔧 Common Modifications

### Add a New Expert

**1. Update prompts** (`app/lib/prompts.ts`):
```typescript
export type ExpertType = 'marketer' | 'developer';

export const EXPERT_PROMPTS = {
  marketer: "...",
  developer: "You are a senior software engineer..."
};
```

**2. Update API validation** (`app/api/chat/route.ts`):
```typescript
expertType: z.enum(['marketer', 'developer'])
```

**3. Update selector** (`app/components/expert-selector.tsx`):
```tsx
<option value="developer">Software Engineer</option>
```

### Change AI Model

Edit `app/api/chat/route.ts`:
```typescript
model: openai('gpt-4o-mini')  // Cheaper option
// or
model: openai('gpt-4-turbo')  // Different model
```

### Modify Message Styling

Edit `app/components/assistant-ui/thread.tsx`:
```tsx
// User messages
<div className="...bg-blue-600...">  // Change color here

// AI messages
<div className="...bg-zinc-100...">  // Change color here
```

### Change Welcome Message

Edit `app/components/assistant-ui/thread.tsx`:
```tsx
<ThreadPrimitive.Empty>
  <h2>Your Custom Title</h2>
  <p>Your custom welcome message</p>
</ThreadPrimitive.Empty>
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "API key not found" | Check `.env.local` exists and has valid key, then restart server |
| Port 3000 in use | Check terminal for auto-assigned port (3001, 3002, etc.) |
| TypeScript errors | Run `npm install` then restart dev server |
| Build fails | Delete `.next` folder: `rm -rf .next` then `npm run dev` |
| Dark mode not working | Verify system preferences or browser dark mode is enabled |

## 🔑 Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional (future)
# DATABASE_URL=...
# NEXT_PUBLIC_APP_URL=...
```

## 📊 Monitoring & Costs

- **Usage Dashboard**: https://platform.openai.com/usage
- **API Keys**: https://platform.openai.com/api-keys
- **Cost per conversation**: ~$0.05-0.10 (10 exchanges)

## 🚢 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] `OPENAI_API_KEY` added to Vercel environment variables
- [ ] Deployment successful
- [ ] Test production URL
- [ ] Monitor usage/costs

## 📚 Important URLs

- **Dev Server**: http://localhost:3000
- **OpenAI Platform**: https://platform.openai.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Assistant-UI Docs**: https://github.com/assistant-ui/assistant-ui
- **AI SDK Docs**: https://sdk.vercel.ai

## 💡 Pro Tips

1. **Test locally first** - Always test changes with `npm run dev` before deploying
2. **Monitor API costs** - Check OpenAI usage dashboard regularly
3. **Use .env.local** - Never hardcode API keys in source code
4. **Version control** - Commit often, .env.local is already gitignored
5. **Read error messages** - Next.js provides detailed error info in browser

## 🎨 Customization Ideas

- Add loading skeleton while waiting for response
- Add copy button for AI messages
- Add regenerate response button
- Add export conversation feature
- Add voice input/output
- Add markdown rendering for code blocks
- Add image upload support

## ⚡ Performance Tips

- Use `gpt-4o-mini` for faster, cheaper responses
- Set `maxDuration` appropriately (default: 30s)
- Consider streaming text character-by-character for better UX
- Add caching for repeated queries (future enhancement)

---

Keep this file handy for quick reference during development!

