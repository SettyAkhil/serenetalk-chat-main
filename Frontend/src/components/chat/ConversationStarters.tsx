import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

interface ConversationStartersProps {
  onSelect: (starter: string) => void;
}

export function ConversationStarters({ onSelect }: ConversationStartersProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 animate-slide-up">
      <div className="text-center mb-8 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {t.welcomeTitle}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t.welcomeSubtitle}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {t.conversationStarters.map((starter, index) => (
          <button
            key={index}
            onClick={() => onSelect(starter)}
            className="px-4 py-2.5 bg-card hover:bg-accent/50 border border-border/50 
                       rounded-xl text-sm text-foreground transition-all duration-200 
                       hover:shadow-soft hover:-translate-y-0.5"
          >
            {starter}
          </button>
        ))}
      </div>
    </div>
  );
}
