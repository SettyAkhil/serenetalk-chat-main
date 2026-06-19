import { useRef, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

import { useChatContext } from '@/contexts/ChatContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ConversationStarters } from '@/components/chat/ConversationStarters';
import { CrisisResources } from '@/components/chat/CrisisResources';
import { LanguageSelector } from '@/components/chat/LanguageSelector';
import { AuthButton } from '@/components/auth/AuthButton';
import { ScrollArea } from '@/components/ui/scroll-area';

/* ---------------------------------------------
   GREETING TEXT (LANGUAGE + TIME)
--------------------------------------------- */
const getGreetingText = (language: string) => {
  const hour = new Date().getHours();

  const greetings: Record<string, any> = {
    en: {
      morning: "Good morning. I’m here to listen and support you.",
      afternoon: "Good afternoon. I’m here if you’d like to share what’s on your mind.",
      evening: "Good evening. I’m here to listen and support you.",
      night: "Hello. I’m here with you whenever you’re ready to talk."
    },
    hi: {
      morning: "सुप्रभात। मैं आपकी बात सुनने और सहयोग करने के लिए यहाँ हूँ।",
      afternoon: "नमस्ते। अगर आप चाहें तो अपनी बात साझा कर सकते हैं।",
      evening: "शुभ संध्या। मैं आपकी बात सुनने के लिए यहाँ हूँ।",
      night: "नमस्ते। जब भी आप चाहें, मैं यहाँ हूँ।"
    },
    te: {
      morning: "శుభోదయం. నేను మీ మాట వినడానికి మరియు మద్దతు ఇవ్వడానికి ఇక్కడ ఉన్నాను.",
      afternoon: "నమస్తే. మీరు కోరుకుంటే మీ భావాలను పంచుకోవచ్చు.",
      evening: "శుభ సాయంత్రం. నేను మీ మాట వినడానికి ఇక్కడ ఉన్నాను.",
      night: "నమస్తే. మీరు సిద్ధంగా ఉన్నప్పుడు నేను ఇక్కడే ఉంటాను."
    }
  };

  const lang = greetings[language] ? language : "en";

  if (hour >= 5 && hour < 12) return greetings[lang].morning;
  if (hour >= 12 && hour < 17) return greetings[lang].afternoon;
  if (hour >= 17 && hour < 22) return greetings[lang].evening;
  return greetings[lang].night;
};

/* ---------------------------------------------
   GREETING EMOJI (TIME BASED)
--------------------------------------------- */
const getGreetingEmoji = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "🌤";
  return "🌙";
};

const Index = () => {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
  } = useChatContext();

  const { t, language } = useLanguage();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Error toast
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // New chat handler
  const handleNewChat = () => {
    resetChat();
    toast({
      title: 'New chat started',
      description: 'Previous conversation has been cleared',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border/50 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">
            {t.title}
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border bg-card hover:bg-accent"
            >
              <PlusCircle className="h-4 w-4" />
              New Chat
            </button>

            <LanguageSelector />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto">
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="py-6 space-y-4 min-h-[calc(100vh-200px)]">
            {messages.length === 0 ? (
              <ConversationStarters onSelect={sendMessage} />
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                ))}

                {isLoading &&
                  messages[messages.length - 1]?.role === 'user' && (
                    <TypingIndicator />
                  )}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input & Crisis Resources */}
        <div className="sticky bottom-0 p-4 space-y-3 bg-gradient-to-t from-background via-background to-transparent">

          {/* ✅ GREETING (VISIBLE, TIME + LANGUAGE AWARE) */}
            {messages.length === 0 && (
              <ChatMessage
                role="assistant"
                content={
                  <span className="flex items-start gap-2">
                    <span className="text-lg leading-none">
                      {getGreetingEmoji()}
                    </span>
                    <span>
                      {getGreetingText(language)}
                    </span>
                  </span>
                }
                timestamp={new Date()}
              />
            )}
          <ChatInput onSend={sendMessage} disabled={isLoading} />
          <CrisisResources />
        </div>
      </main>
    </div>
  );
};

export default Index;
