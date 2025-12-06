import { useRef, useEffect, useState } from "react";
import { Send } from "lucide-react";
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
      <div className="p-4 space-y-4 min-h-[150px]">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted/80 backdrop-blur text-foreground rounded-bl-none border")}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isChatting && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3 rounded-bl-none flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-background/50 backdrop-blur border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Tanya detail kerusakan..." className="flex-1 bg-background/50" disabled={isChatting} />
          <Button type="submit" size="icon" disabled={isChatting || !inputMessage.trim()} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
