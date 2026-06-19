import { useState } from 'react';
import { Phone, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const HELPLINES = [
  { name: 'iCall', number: '9152987821', country: 'India' },
  { name: 'Vandrevala Foundation', number: '1860-2662-345', country: 'India' },
  { name: 'NIMHANS', number: '080-46110007', country: 'India' },
  { name: 'Snehi', number: '044-24640050', country: 'India' },
];

export function CrisisResources() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="bg-card border border-border/50 rounded-xl shadow-soft overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-crisis" />
          <span className="text-sm font-medium text-foreground">
            {t.crisisTitle}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-4 pb-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground my-3">
            {t.crisisDescription}
          </p>

          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground mb-2">
              {t.crisisHelplines}
            </p>
            {HELPLINES.map((helpline, index) => (
              <a
                key={index}
                href={`tel:${helpline.number.replace(/-/g, '')}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {helpline.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {helpline.number}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
