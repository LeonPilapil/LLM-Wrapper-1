'use client';

import { ThreadPrimitive, ComposerPrimitive, useMessage } from '@assistant-ui/react';
import { type FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/app/components/ui/card';

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root className="flex flex-col h-full bg-background">
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-4 py-8 scroll-smooth">
        <ThreadPrimitive.Empty>
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-600 p-4 shadow-lg">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-foreground">
              Welcome to AI Expert Wrapper
            </h2>
            <p className="text-muted-foreground max-w-lg mb-6 text-lg">
              Powered by <span className="font-semibold text-primary">GPT-5</span>, ready to provide expert-level guidance tailored to your needs.
            </p>
            
            <div className="max-w-2xl w-full mt-8">
              <p className="text-sm font-semibold text-foreground mb-3">
                Example questions to get started:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="text-left hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground font-medium mb-1">
                      "How can I improve my conversion rate?"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Marketing Strategy
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-left hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground font-medium mb-1">
                      "What makes a great user onboarding flow?"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      UX/UI Design
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-left hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground font-medium mb-1">
                      "Help me prioritize features for Q1"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Product Management
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-left hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground font-medium mb-1">
                      "Write compelling copy for my landing page"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Content Writing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ThreadPrimitive.Empty>

        <div className="max-w-3xl mx-auto">
          <ThreadPrimitive.Messages
            components={{
              UserMessage: UserMessage,
              AssistantMessage: AssistantMessage,
            }}
          />
        </div>
      </ThreadPrimitive.Viewport>

      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Composer />
        </div>
      </div>
    </ThreadPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  const message = useMessage();
  const textContent = message?.content
    ?.filter((part: any) => part.type === 'text')
    .map((part: any) => part.text)
    .join('') || '';

  return (
    <div className="mb-6 flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-[85%] rounded-2xl bg-blue-600 px-4 py-3 shadow-sm">
        <div className="text-white text-[15px] leading-relaxed whitespace-pre-wrap wrap-break-word">
          {textContent}
        </div>
      </div>
    </div>
  );
};

const AssistantMessage: FC = () => {
  const message = useMessage();
  const textContent = message?.content
    ?.filter((part: any) => part.type === 'text')
    .map((part: any) => part.text)
    .join('') || '';

  return (
    <div className="mb-6 flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex gap-3 max-w-[85%]">
        <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-sm">
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
            />
          </svg>
        </div>
        <div className="flex-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 px-4 py-3 shadow-sm">
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:text-zinc-100 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-1 [&_strong]:font-semibold [&_em]:italic [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-zinc-200 [&_code]:px-1 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-zinc-900 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_h2:first-child]:mt-2 [&_h3:first-child]:mt-2 [&_p]:text-zinc-700 [&_p]:dark:text-zinc-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {textContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="relative flex items-end gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
      <ComposerPrimitive.Input
        placeholder="Ask me anything about marketing..."
        className="flex-1 resize-none bg-transparent px-4 py-3 text-[15px] placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none max-h-32 min-h-[44px]"
        rows={1}
      />
      <ComposerPrimitive.Send className="m-2 flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-all shadow-sm">
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
          />
        </svg>
        <span className="ml-2 font-medium">Send</span>
      </ComposerPrimitive.Send>
    </ComposerPrimitive.Root>
  );
};

