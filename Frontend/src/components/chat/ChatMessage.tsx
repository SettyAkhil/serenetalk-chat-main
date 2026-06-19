import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: ReactNode;   // ✅ UPDATED
  timestamp: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex w-full animate-fade-in gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0 bg-primary/10 border border-primary/20">
          <AvatarFallback className="bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-soft',
          isUser
            ? 'bg-user-bubble text-user-bubble-foreground rounded-br-md'
            : 'bg-bot-bubble text-bot-bubble-foreground rounded-bl-md'
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        <p
          className={cn(
            'text-xs mt-2 opacity-60',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {format(timestamp, 'h:mm a')}
        </p>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0 bg-secondary/20 border border-secondary/30">
          <AvatarFallback className="bg-secondary/20">
            <User className="h-4 w-4 text-secondary" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
