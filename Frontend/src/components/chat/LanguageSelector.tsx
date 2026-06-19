import { Globe } from 'lucide-react';
import { Language } from '@/lib/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatContext } from '@/contexts/ChatContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
];

export function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const { resetChat } = useChatContext(); // ✅ SHARED CHAT
  const { toast } = useToast();

  const currentLanguage = LANGUAGES.find(
    (lang) => lang.code === language
  );

  const handleLanguageChange = (val: string) => {
    const newLang = val as Language;
    if (newLang === language) return;

    // 1️⃣ Change language
    changeLanguage(newLang);

    // 2️⃣ Reset chat (NOW IT WILL WORK)
    resetChat();

    // 3️⃣ Inform user
    toast({
      title: 'Chat reset',
      description: 'Chat reset due to language change',
    });
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto gap-2 bg-card border-border/50">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <SelectValue>{currentLanguage?.label}</SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-card border-border">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
