'use client';

import { motion } from 'motion/react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Zap } from 'lucide-react';

interface ExampleQuestion {
  question: string;
  category: string;
  onClick: () => void;
  'data-agent-hook'?: string;
}

interface WelcomeScreenProps {
  title: string;
  subtitle: string;
  examples: ExampleQuestion[];
  className?: string;
  'data-agent-hook'?: string;
}

/**
 * Welcome screen with example questions and clean design
 * Mobile-optimized touch interactions for agentic controls
 */
export function WelcomeScreen({
  title,
  subtitle,
  examples,
  className = '',
  'data-agent-hook': dataAgentHook
}: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`flex flex-col items-center justify-center h-full text-center px-4 ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="welcome-screen"
    >
      {/* Hero section */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-6 rounded-full bg-linear-to-br from-blue-500 to-purple-600 p-4 shadow-lg"
        >
          <Zap className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-3xl font-bold mb-3 text-foreground"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-muted-foreground max-w-lg mb-6 text-lg"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Example questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="max-w-2xl w-full"
      >
        <p className="text-sm font-semibold text-foreground mb-4">
          Example questions to get started:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="text-left hover:shadow-md transition-all duration-200 cursor-pointer border-border hover:border-primary/50"
                onClick={example.onClick}
                data-agent-hook={example['data-agent-hook']}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-foreground font-medium mb-1">
                    "{example.question}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {example.category}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
