# Vercel Setup Instructions

## Important: Configure Root Directory in Vercel Dashboard

Since `rootDirectory` is not supported in `vercel.json`, you **MUST** configure it in the Vercel dashboard.

## Step-by-Step Setup

### 1. Push Your Code to GitHub

```bash
git push origin main
```

### 2. Configure Root Directory in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** tab
4. Click **General** in the left sidebar
5. Scroll down to **Root Directory**
6. Click **Edit**
7. Type: `my-app`
8. Click **Save**

### 3. Add Environment Variable

1. Still in **Settings**
2. Click **Environment Variables** in the left sidebar
3. Click **Add New**
4. Key: `OPENAI_API_KEY`
5. Value: Your OpenAI API key
6. Select all environments: Production, Preview, Development
7. Click **Save**

### 4. Redeploy

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Wait for build to complete (2-3 minutes)

### 5. Test Your App

Visit your Vercel URL and test the chat functionality.

## Why This Approach?

The `vercel.json` file configures the build commands, but the **Root Directory** must be set in the Vercel dashboard because:
- It's not a supported property in `vercel.json`
- It's a project-level setting in Vercel
- It persists across all deployments

## Current Configuration

Your `vercel.json` handles:
- ✅ Build command: `cd my-app && npm run build`
- ✅ Output directory: `my-app/.next`
- ✅ Install command: `cd my-app && npm install`
- ✅ Framework: Next.js

Your Vercel dashboard needs:
- ⚠️ Root Directory: `my-app` (set this manually)
- ⚠️ Environment Variable: `OPENAI_API_KEY` (set this manually)

## Troubleshooting

### Still seeing 404?

1. Verify Root Directory is set to `my-app` in Vercel dashboard
2. Check that build completed successfully
3. Ensure `OPENAI_API_KEY` is set in all environments
4. Clear browser cache
5. Check Vercel build logs for errors

### Build still failing?

Check the build logs in Vercel dashboard for specific error messages. Common issues:
- Missing dependencies
- TypeScript errors
- Environment variable not set
- Incorrect build command

## Quick Reference

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: Settings → General → Root Directory
- **Environment Variables**: Settings → Environment Variables
- **Build Logs**: Deployments → Click deployment → Build Logs

