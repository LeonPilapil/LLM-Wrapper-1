'use client';

import { EXPERT_METADATA } from '@/app/lib/prompts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

export function ExpertSelector() {
  const marketerExpert = EXPERT_METADATA.marketer;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <label className="text-sm font-medium text-foreground shrink-0">
          Expert:
        </label>
        <div className="flex-1 flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground">
                <span className="text-lg">{marketerExpert.icon}</span>
                <span className="font-medium">{marketerExpert.label}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{marketerExpert.description}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="hidden sm:block text-sm text-muted-foreground max-w-xs truncate">
          {marketerExpert.description}
        </div>
      </div>
    </TooltipProvider>
  );
}

