# 🚨 CRITICAL: Manual Setup Required

## You MUST Do This Before Deployment Works

The `vercel.json` file alone is NOT enough. You MUST configure settings in the Vercel dashboard.

## Step 1: Push Code (if not done)

```bash
git push origin main
```

## Step 2: Configure Root Directory in Vercel

**This is the most important step!**

1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Click **Settings** tab (top menu)
4. Click **General** (left sidebar)
5. Scroll down to **Root Directory**
6. Click **Edit** button
7. Type: `my-app`
8. Click **Save**

**Without this step, Vercel doesn't know where your Next.js app is!**

## Step 3: Add Environment Variable

1. Still in **Settings**
2. Click **Environment Variables** (left sidebar)
3. Click **Add New**
4. Key: `OPENAI_API_KEY`
5. Value: Your OpenAI API key
6. Select **all** environments: Production, Preview, Development
7. Click **Save**

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots (⋯)
4. Click **Redeploy**
5. Wait 2-3 minutes

## Why This Is Needed

The `vercel.json` file can't set the Root Directory - it's not a supported property. You MUST set it manually in the Vercel dashboard.

Once Root Directory is set to `my-app`, Vercel will:
- Install dependencies from `my-app/package.json`
- Build from `my-app/`
- Deploy the `.next` folder

## Still Not Working?

Make sure you've completed ALL steps:
- ✅ Root Directory set to `my-app` in Vercel dashboard
- ✅ Environment variable `OPENAI_API_KEY` added
- ✅ Redeployed after making changes

