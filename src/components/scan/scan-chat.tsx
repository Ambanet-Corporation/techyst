import { useRef, useEffect, useState } from "react";
import { Send, Terminal } from "lucide-react";
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

  return (
    <>
      <div className="p-4 space-y-4 min-h-[200px]">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] px-4 py-3 text-sm font-mono border",
                msg.role === "user" ? "bg-primary/10 border-primary/30 text-primary-foreground rounded-tl-xl rounded-bl-xl rounded-tr-xl" : "bg-white/5 border-white/10 text-muted-foreground rounded-tr-xl rounded-br-xl rounded-tl-xl"
              )}
            >
              <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wider">{msg.role === "user" ? "OPERATOR" : "SYSTEM_AI"}</span>
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isChatting && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-tl-xl flex gap-1 items-center">
              <span className="text-[10px] text-muted-foreground font-mono mr-2">TYPING</span>
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-slate-950/50 backdrop-blur">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Terminal className="h-4 w-4" />
          </div>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter command or query..."
            className="flex-1 bg-slate-900/50 border-white/10 pl-10 font-mono text-sm h-11 focus-visible:ring-primary/50"
            disabled={isChatting}
          />
          <Button type="submit" size="icon" disabled={isChatting || !inputMessage.trim()} className="bg-primary hover:bg-primary/90 h-11 w-11 rounded-md">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
