# Fix Vercel 404 Error

## Problem
You're seeing a 404 error because Vercel doesn't know your Next.js app is in the `my-app/` subdirectory.

## Solution Applied ✅

I've created a `vercel.json` configuration file that tells Vercel where your app is located.

## Next Steps

### 1. Push the Fix to GitHub

```bash
git push origin main
```

This will push the `vercel.json` file to your repository.

### 2. Redeploy on Vercel

**Option A: Automatic Redeploy**
- Vercel will automatically detect the push and redeploy
- Wait 2-3 minutes for the build to complete
- Check your Vercel dashboard for build status

**Option B: Manual Redeploy**
1. Go to your Vercel dashboard
2. Click on your project
3. Click "Redeploy" on the latest deployment
4. Or go to Settings → General → Root Directory → Set to `my-app`

### 3. Verify Environment Variables

Make sure you have set the environment variable:
- Key: `OPENAI_API_KEY`
- Value: Your OpenAI API key
- Environments: All (Production, Preview, Development)

### 4. Test Your App

After redeployment completes:
1. Visit your Vercel URL
2. The 404 error should be gone
3. Test the chat functionality

## Alternative: Configure in Vercel Dashboard

If you prefer to configure without the `vercel.json` file:

1. Go to Vercel Dashboard → Your Project
2. Click "Settings"
3. Click "General"
4. Scroll to "Root Directory"
5. Click "Edit"
6. Set Root Directory to: `my-app`
7. Click "Save"
8. Redeploy your project

## What Changed

**Created**: `vercel.json` with proper configuration:
```json
{
  "buildCommand": "cd my-app && npm run build",
  "outputDirectory": "my-app/.next",
  "installCommand": "cd my-app && npm install",
  "framework": "nextjs"
}
```

**Note**: The `rootDirectory` property was removed as it's not supported in `vercel.json`. Instead, configure it in the Vercel dashboard.

This tells Vercel:
- Where to install dependencies (`my-app/`)
- Where to build the app (`my-app/`)
- Where the output is (`my-app/.next`)
- What framework you're using (Next.js)

## Still Getting 404?

If you still see a 404 after redeploying:

1. Check Vercel build logs for errors
2. Verify the build completed successfully
3. Clear your browser cache
4. Try an incognito/private window
5. Check that `OPENAI_API_KEY` is set in Vercel environment variables

## Need More Help?

Check the detailed troubleshooting in `DEPLOYMENT_GUIDE.md` or Vercel's documentation at vercel.com/docs

