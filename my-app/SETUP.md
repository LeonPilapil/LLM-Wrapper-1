# Quick Setup Guide

Follow these steps to get your AI Expert Wrapper running:

## Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)
5. **Important**: Save it somewhere safe - you won't be able to see it again!

## Step 2: Configure Environment Variables

1. Open the `.env.local` file in the `my-app` directory
2. Replace `your_openai_api_key_here` with your actual API key:

```
OPENAI_API_KEY=sk-proj-abc123...your-actual-key
```

3. Save the file

## Step 3: Start the Application

Open your terminal in the `my-app` directory and run:

```bash
npm run dev
```

Wait for the message:
```
✓ Ready in Xms
○ Local: http://localhost:3000
```

## Step 4: Test It Out!

1. Open your browser to [http://localhost:3000](http://localhost:3000)
2. You should see the chat interface with "Marketing Strategist" selected
3. Try asking a marketing question:
   - "How can I improve my conversion rates?"
   - "What's the best way to launch a new product?"
   - "How do I build a strong brand identity?"

## Troubleshooting

### "API key not found" Error

- Make sure `.env.local` exists in the `my-app` folder (not the parent folder)
- Check that there are no extra spaces or quotes around the API key
- Restart the dev server after adding the key

### Port Already in Use

If port 3000 is already taken, Next.js will automatically use port 3001. Check the terminal output for the correct port.

### TypeScript Errors

Run:
```bash
npm install
```

Then restart the dev server.

## What's Next?

Once everything is working:

1. ✅ Experiment with different questions
2. ✅ Notice how responses are more focused than generic ChatGPT
3. ✅ Check the code in `app/lib/prompts.ts` to see the expert prompt
4. ✅ Try modifying the prompt to change the expert's personality
5. ✅ Read the main README.md for information on adding more experts

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the code structure in the README
- Ensure your OpenAI account has credits available

## Cost Note

This app uses GPT-4o which costs approximately:
- $2.50 per 1M input tokens
- $10.00 per 1M output tokens

A typical conversation (10 exchanges) costs less than $0.10.

Monitor your usage at: https://platform.openai.com/usage

