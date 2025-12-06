import { useRef, useEffect, useState } from "react";
import { Send, Terminal, Sparkles, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/hooks/use-scan";

interface ScanChatProps {
  messages: ChatMessage[];
  isChatting: boolean;
  onSendMessage: (msg: string) => void;
}

export function ScanChat({ messages, isChatting, onSendMessage }: ScanChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = ["Apa penyebab kerusakan ini?", "Berapa estimasi biaya servis?", "Langkah perbaikan pertama?", "Apakah perlu ganti sparepart?"];

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages, isChatting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  const handleSuggestionClick = (text: string) => {
    onSendMessage(text);
  };

  return (
    <>
      <div className="p-4 space-y-4 min-h-[300px] flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-80 mt-4 space-y-5 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative h-12 w-12 bg-slate-900 border border-primary/30 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold font-sans text-foreground">AI TECHNICIAN READY</h4>
              <p className="text-xs font-mono text-muted-foreground">SELECT_QUERY_OR_TYPE_COMMAND</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm">
              {suggestions.map((s, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start h-auto py-2 px-3 border-white/10 bg-white/5 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-left whitespace-normal"
                  onClick={() => handleSuggestionClick(s)}
                  disabled={isChatting}
                >
                  <MessageSquare className="h-3 w-3 mr-2 shrink-0 opacity-50" />
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] px-4 py-3 text-sm font-mono border shadow-sm",
                  msg.role === "user" ? "bg-primary/10 border-primary/30 text-primary-foreground rounded-tl-xl rounded-bl-xl rounded-tr-xl" : "bg-white/5 border-white/10 text-muted-foreground rounded-tr-xl rounded-br-xl rounded-tl-xl"
                )}
              >
                <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wider flex items-center gap-1">
                  {msg.role === "user" ? (
                    "OPERATOR"
                  ) : (
                    <>
                      <Terminal className="h-3 w-3" /> SYSTEM_AI
                    </>
                  )}
                </span>
                <div className="leading-relaxed">{msg.content}</div>
              </div>
            </motion.div>
          ))
        )}

        {isChatting && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-tl-xl flex gap-1 items-center">
              <span className="text-[10px] text-muted-foreground font-mono mr-2 animate-pulse">PROCESSING</span>
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-slate-950/50 backdrop-blur sticky bottom-0 z-20">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Terminal className="h-4 w-4" />
          </div>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ketik pertanyaan teknis..."
            className="flex-1 bg-slate-900/50 border-white/10 pl-10 font-mono text-sm h-11 focus-visible:ring-primary/50 shadow-inner"
            disabled={isChatting}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isChatting || !inputMessage.trim()}
            className="bg-primary hover:bg-primary/90 h-11 w-11 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-shadow hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
