import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getExpertPrompt, type ExpertType } from '@/app/lib/prompts';

// GPT-5 parameter types
type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';
type Verbosity = 'low' | 'medium' | 'high';

// Initialize OpenAI client with API key from environment
const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY! 
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    // Extract messages and GPT-5 settings from request body
    const {
      messages,
      previous_response_id,
      reasoningEffort = 'low',
      verbosity = 'medium'
    } = body;

    // Validation
    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages:', messages);
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Validate GPT-5 parameters
    const validReasoningEfforts: ReasoningEffort[] = ['minimal', 'low', 'medium', 'high'];
    const validVerbosities: Verbosity[] = ['low', 'medium', 'high'];
    
    if (!validReasoningEfforts.includes(reasoningEffort)) {
      return NextResponse.json(
        { error: `Invalid reasoning_effort. Must be one of: ${validReasoningEfforts.join(', ')}` },
        { status: 400 }
      );
    }
    
    if (!validVerbosities.includes(verbosity)) {
      return NextResponse.json(
        { error: `Invalid verbosity. Must be one of: ${validVerbosities.join(', ')}` },
        { status: 400 }
      );
    }

    // Get the expert prompt based on the selected expert type
    const systemPrompt = getExpertPrompt('marketer');
    console.log('Using marketer expert');
    console.log('GPT-5 settings - Reasoning:', reasoningEffort, 'Verbosity:', verbosity);
    console.log('System prompt:', systemPrompt.substring(0, 100) + '...');

    // Call OpenAI Chat Completions API
    console.log('Calling OpenAI Chat Completions API');
    
    // Format messages for Chat Completions API
    const chatMessages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'system' as const, content: 'IMPORTANT: You MUST format your entire response in Markdown format for proper rendering.' },
      ...messages.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ];
    
    // Use gpt-4o-mini or gpt-4-turbo (gpt-5 doesn't exist)
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      temperature: verbosity === 'high' ? 0.9 : verbosity === 'medium' ? 0.7 : 0.5,
      max_tokens: 4000,
    });

    console.log('OpenAI Response received');
    
    // Return the response text
    const responseText = response.choices[0]?.message?.content || 'No response generated';
    return NextResponse.json({ 
      text: responseText,
      role: 'assistant',
      responseId: response.id
    });
    
  } catch (error) {
    console.error('API Route Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Enhanced error handling for GPT-5 specific errors
    let errorMessage = 'Internal server error';
    let errorDetails = error instanceof Error ? error.message : 'Unknown error';
    
    if (error instanceof Error) {
      // Check for OpenAI specific errors
      if (error.message.includes('model')) {
        errorMessage = 'Model access error';
        errorDetails = 'Unable to access the AI model. Please check your API key.';
      } else if (error.message.includes('API key')) {
        errorMessage = 'API key error';
        errorDetails = 'Please ensure OPENAI_API_KEY is set in your environment variables';
      } else {
        errorDetails = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

