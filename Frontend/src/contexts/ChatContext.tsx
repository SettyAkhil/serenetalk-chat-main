import { createContext, useContext } from 'react';
import { useChat } from '@/hooks/useChat';

const ChatContext = createContext<ReturnType<typeof useChat> | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const chat = useChat();
  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}
