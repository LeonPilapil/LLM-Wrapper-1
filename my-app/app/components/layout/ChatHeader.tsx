'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Settings, Zap } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    'data-agent-hook'?: string;
  }>;
  actions?: Array<{
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
    'data-agent-hook'?: string;
  }>;
  className?: string;
  'data-agent-hook'?: string;
  onSettingsClick?: () => void;
}

/**
 * Clean, minimal header with expert selector and agent hooks
 * Exposes callback props for agent interaction
 */
export function ChatHeader({
  title,
  subtitle,
  icon,
  badges = [],
  actions = [],
  className = '',
  'data-agent-hook': dataAgentHook,
  onSettingsClick
}: ChatHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`border-b border-border bg-card/50 backdrop-blur-sm ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="chat-header"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Title and badges */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {icon && (
            <div className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              {icon}
            </div>
          )}
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-foreground truncate">
              {title}
            </h1>
            {subtitle && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  GPT-5
                </Badge>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline truncate">{subtitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Center - Status badges */}
        {badges.length > 0 && (
          <div className="hidden md:flex items-center gap-2 mx-4">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant || 'outline'}
                className="text-xs"
                data-agent-hook={badge['data-agent-hook']}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={action.onClick}
              className="gap-2"
              data-agent-hook={action['data-agent-hook']}
            >
              {action.icon}
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          ))}
          
          {onSettingsClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSettingsClick}
              className="gap-2"
              data-agent-hook="settings-button"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
