import { useState, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const BACKEND_URL = 'http://127.0.0.1:8000/chat';

export function useChat() {
  const { language } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Session ID MUST be stateful
  const [sessionId, setSessionId] = useState<string>(crypto.randomUUID());

  // 🔒 Prevent double sends
  const sendingRef = useRef(false);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();

      if (!trimmed || isLoading || sendingRef.current) return;

      sendingRef.current = true;
      setError(null);

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            session_id: sessionId,
            language: language,
          }),
        });

        if (!response.ok) {
          throw new Error('Backend error');
        }

        const data = await response.json();

        if (!data.reply || data.reply.trim() === '') return;

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        console.error('Chat error:', err);
        setError('Unable to connect to the server.');
      } finally {
        setIsLoading(false);
        sendingRef.current = false;
      }
    },
    [isLoading, language, sessionId]
  );

  // 🔁 FULL RESET (THIS FIXES EVERYTHING)
  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
    sendingRef.current = false;
    setSessionId(crypto.randomUUID()); // 🔥 NEW SESSION
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat, // ✅ NOW EXISTS
  };
}
