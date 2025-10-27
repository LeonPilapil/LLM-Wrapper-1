# Quick Deploy Checklist ✅

## Pre-Deployment (Already Done)
- ✅ Git repository initialized
- ✅ Initial commit created
- ✅ `.gitignore` configured
- ✅ Dependencies installed

## Next Steps - Follow in Order

### 1. Create GitHub Repository
```
https://github.com/new
→ Create new repo (don't initialize with README)
```

### 2. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel
```
https://vercel.com/new
→ Import your GitHub repo
→ Configure:
   - Root Directory: my-app
   - Environment Variable: OPENAI_API_KEY
→ Deploy
```

### 4. Test Your App
```
Visit: https://your-app.vercel.app
Test chat functionality
```

## Critical Settings

⚠️ **Root Directory MUST be set to `my-app`** in Vercel settings  
⚠️ **Environment Variable `OPENAI_API_KEY` must be added to all environments**

## Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

