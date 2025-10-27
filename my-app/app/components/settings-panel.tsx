'use client';

import { GPT5_CONFIG } from '@/app/lib/config';
import type { ReasoningEffort, Verbosity } from '@/app/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Check } from 'lucide-react';

interface SettingsPanelProps {
  reasoningEffort: ReasoningEffort;
  verbosity: Verbosity;
  onReasoningEffortChange: (value: ReasoningEffort) => void;
  onVerbosityChange: (value: Verbosity) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({
  reasoningEffort,
  verbosity,
  onReasoningEffortChange,
  onVerbosityChange,
  isOpen,
  onClose,
}: SettingsPanelProps) {
  const handleReset = () => {
    onReasoningEffortChange(GPT5_CONFIG.defaultReasoningEffort);
    onVerbosityChange(GPT5_CONFIG.defaultVerbosity);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>GPT-5 Settings</DialogTitle>
          <DialogDescription>
            Configure AI behavior and response preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reasoning Effort Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reasoning Effort</CardTitle>
              <CardDescription>
                Controls how much computational effort the AI puts into reasoning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {GPT5_CONFIG.reasoningEffortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={reasoningEffort === option.value ? "default" : "outline"}
                  className="w-full justify-start h-auto p-4"
                  onClick={() => onReasoningEffortChange(option.value)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-70">{option.description}</div>
                    </div>
                    {reasoningEffort === option.value && (
                      <Check className="w-5 h-5" />
                    )}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Verbosity Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Verbosity</CardTitle>
              <CardDescription>
                Controls the length and detail level of responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {GPT5_CONFIG.verbosityOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={verbosity === option.value ? "default" : "outline"}
                  className="w-full justify-start h-auto p-4"
                  onClick={() => onVerbosityChange(option.value)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-70">{option.description}</div>
                    </div>
                    {verbosity === option.value && (
                      <Check className="w-5 h-5" />
                    )}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-medium">💡 Tip:</span> Use{' '}
                <strong>medium reasoning</strong> for most conversations. Increase to{' '}
                <strong>high</strong> for complex problems.
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

