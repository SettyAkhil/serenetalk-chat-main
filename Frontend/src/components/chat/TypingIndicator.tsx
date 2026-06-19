export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-bot-bubble rounded-2xl rounded-bl-md px-4 py-3 shadow-soft">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 bg-primary/60 rounded-full animate-typing-dot"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 bg-primary/60 rounded-full animate-typing-dot"
            style={{ animationDelay: '200ms' }}
          />
          <span
            className="w-2 h-2 bg-primary/60 rounded-full animate-typing-dot"
            style={{ animationDelay: '400ms' }}
          />
        </div>
      </div>
    </div>
  );
}
