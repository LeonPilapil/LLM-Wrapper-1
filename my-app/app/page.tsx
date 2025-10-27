'use client';

import { ChatInterface } from '@/app/components/ChatInterface';

export default function Home() {
  return (
    <ChatInterface 
      data-agent-hook="main-chat-interface"
    />
  );
}
