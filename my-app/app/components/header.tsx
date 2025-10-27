'use client';

import { EXPERT_METADATA } from '@/app/lib/prompts';
import type { ReasoningEffort, Verbosity } from '@/app/lib/types';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Settings } from 'lucide-react';

interface HeaderProps {
  reasoningEffort: ReasoningEffort;
  verbosity: Verbosity;
  onSettingsClick: () => void;
}

export function Header({ reasoningEffort, verbosity, onSettingsClick }: HeaderProps) {
  const marketer = EXPERT_METADATA.marketer;

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                AI Marketing Expert
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  GPT-5
                </Badge>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{marketer.icon} {marketer.label}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status badges - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            <Badge variant="outline" className="text-xs">
              Reasoning: <span className="font-medium capitalize ml-1">{reasoningEffort}</span>
            </Badge>
            <Badge variant="outline" className="text-xs">
              Verbosity: <span className="font-medium capitalize ml-1">{verbosity}</span>
            </Badge>
          </div>

          {/* Settings button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onSettingsClick}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

