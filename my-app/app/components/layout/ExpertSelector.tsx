'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { Badge } from '@/app/components/ui/badge';

interface ExpertOption {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
  'data-agent-hook'?: string;
}

interface ExpertSelectorProps {
  experts: ExpertOption[];
  selectedExpert?: string;
  onExpertChange?: (expertId: string) => void;
  className?: string;
  'data-agent-hook'?: string;
  showDescription?: boolean;
}

/**
 * Clean expert selector with agent-friendly data attributes
 * Provides clear hierarchy and agent interaction points
 */
export function ExpertSelector({
  experts,
  selectedExpert,
  onExpertChange,
  className = '',
  'data-agent-hook': dataAgentHook,
  showDescription = true
}: ExpertSelectorProps) {
  const activeExpert = experts.find(expert => expert.id === selectedExpert) || experts[0];

  return (
    <TooltipProvider>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={`flex items-center gap-3 px-4 py-3 border-b border-border bg-card/30 backdrop-blur-sm ${className}`}
        data-agent-hook={dataAgentHook}
        data-component="expert-selector"
      >
        <label className="text-sm font-medium text-foreground shrink-0">
          Expert:
        </label>
        
        <div className="flex-1 flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                onClick={() => onExpertChange?.(activeExpert.id)}
                data-agent-hook="expert-display"
              >
                <span className="text-lg">{activeExpert.icon}</span>
                <span className="font-medium">{activeExpert.label}</span>
                <Badge variant="secondary" className="text-xs ml-1">
                  Active
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{activeExpert.description}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {showDescription && (
          <div className="hidden sm:block text-sm text-muted-foreground max-w-xs truncate">
            {activeExpert.description}
          </div>
        )}
      </motion.div>
    </TooltipProvider>
  );
}





