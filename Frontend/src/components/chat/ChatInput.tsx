import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const { t } = useLanguage();

  const send = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-end gap-2 p-4 bg-card rounded-2xl shadow-soft border border-border/50">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          disabled={disabled}
          className={cn(
            'min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            'placeholder:text-muted-foreground/60 text-foreground'
          )}
          rows={1}
        />

        <Button
          type="button"
          size="icon"
          disabled={!input.trim() || disabled}
          onClick={send}
          className={cn(
            'h-10 w-10 rounded-xl shrink-0',
            'bg-primary hover:bg-primary/90 text-primary-foreground',
            'transition-all duration-200',
            'disabled:opacity-40'
          )}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{t.send}</span>
        </Button>
      </div>
    </form>
  );
}
