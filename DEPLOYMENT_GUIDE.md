# Deployment Guide - GPT-5 Chat Application

This guide will walk you through deploying your Next.js application to Vercel via GitHub.

## Prerequisites

✅ Git repository initialized  
✅ Initial commit completed  
✅ `.gitignore` configured  
✅ Environment variables documented

## Step 1: Create GitHub Repository

1. Go to [GitHub New Repository](https://github.com/new)
2. Repository name: `gpt5-chat-app` (or your preferred name)
3. Description: "GPT-5 powered chat application"
4. **Important**: Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your terminal (you're already in the correct directory):

```bash
# Add the GitHub remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### Authentication Options

If you haven't set up GitHub authentication, you'll need to:

**Option A: Personal Access Token (Recommended)**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing

**Option B: GitHub CLI**
```bash
gh auth login
git push -u origin main
```

**Option C: SSH Key**
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key
3. Use SSH URL: `git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git`

## Step 3: Deploy to Vercel

### 3.1 Import Repository

1. Go to [Vercel](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### 3.2 Configure Project Settings

**Critical Settings**:
- **Framework Preset**: Next.js (auto-detected ✅)
- **Root Directory**: `my-app` ⚠️ **Set this to `my-app`** (your Next.js app is in a subdirectory)
- **Build Command**: `npm run build` (default ✅)
- **Output Directory**: `.next` (default ✅)
- **Install Command**: `npm install` (default ✅)

**Project Name**: Your choice (e.g., `gpt5-chat`)

### 3.3 Add Environment Variables

In the Vercel deployment configuration:

1. Expand "Environment Variables" section
2. Add the following variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (must have GPT-5 access)
   - **Environments**: Select all (Production, Preview, Development)
3. Click "Add"

### 3.4 Deploy

1. Click "Deploy" button
2. Wait for build to complete (2-5 minutes)
3. Your app will be live at: `https://your-app-name.vercel.app`

## Step 4: Verify Deployment

### Test Your Application

1. Visit your Vercel URL (provided after deployment)
2. Test the chat interface
3. Send a test message
4. Verify GPT-5 responses are working
5. Check browser console for any errors

### Monitor Deployment

1. **Vercel Dashboard**: View your project at [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Build Logs**: Click on deployment → Build Logs
3. **Function Logs**: Click on deployment → Function Logs
4. **Real-time Logs**: View live logs from API route

## Step 5: Continuous Deployment

✅ **Automatic Deployments**: Any push to `main` branch triggers automatic deployment  
✅ **Preview Deployments**: Pull requests get preview URLs  
✅ **Production**: Merged changes deploy to production automatically

## Step 6: Optional - Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `chat.yourdomain.com`)
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (5-60 minutes)

## Troubleshooting

### Build Fails

**Issue**: Build error in Vercel logs  
**Solution**: 
- Check Root Directory is set to `my-app`
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### API Calls Fail

**Issue**: 500 errors or "Internal server error"  
**Solution**:
- Verify `OPENAI_API_KEY` environment variable is set
- Check API key has GPT-5 access
- View Function Logs in Vercel dashboard
- Ensure API key is added to all environments (Production, Preview, Development)

### 404 Errors

**Issue**: Pages return 404  
**Solution**:
- Ensure Root Directory is set to `my-app` in Vercel settings
- Check that the Next.js app is in the `my-app/` folder
- Verify build completed successfully

### Runtime Errors

**Issue**: Application crashes or behaves unexpectedly  
**Solution**:
- Check Vercel Function Logs
- Review browser console for client-side errors
- Verify all environment variables are set
- Check API response structure matches expected format

## Security Best Practices

1. ✅ Never commit `.env.local` files
2. ✅ Always use environment variables for secrets
3. ✅ Set up rate limiting if needed
4. ✅ Monitor API usage in OpenAI dashboard
5. ✅ Use Vercel's built-in SSL (automatic)

## Next Steps

- Set up monitoring and analytics
- Configure custom domain
- Set up staging environment
- Add error tracking (e.g., Sentry)
- Set up API usage monitoring

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **OpenAI Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)

