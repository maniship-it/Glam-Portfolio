import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/*
IMPORTANT THINGS YOU MUST CHANGE:

1️⃣ Replace API_URL with your deployed backend server
Example:
https://pujaglam-ai.onrender.com/chat

2️⃣ Do NOT use localhost for production

3️⃣ Your backend must already be running with:
server.js
trainingData.js
.env
*/

const API_URL = "https://glam-portfolio.onrender.com/chat"; // CHANGE THIS

type Message = {
  id: number;
  text: React.ReactNode;
  isBot: boolean;
  type?: "system" | "message";
};

export default function FloatingChatbot() {

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Aditi has joined the chat.",
      isBot: true,
      type: "system"
    },
    {
      id: 2,
      text: (
        <>
          Hi there! I'm Aditi from{" "}
          <span className="text-white font-serif tracking-tight">Puja</span>{" "}
          <span className="text-primary italic font-serif tracking-tight">
            Glam
          </span>{" "}
          Makeup Studio. How can I help you sparkle today?
        </>
      ),
      isBot: true
    }
  ]);

  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  /*
  ========================================
  FUNCTION THAT CALLS YOUR AI SERVER
  ========================================
  */

  const getAIResponse = async (message: string) => {

    try {

      const res = await fetch(`${API_URL.replace(/\/$/,"")}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      return data.reply;

    } catch (error) {

      return "Sorry, I'm having trouble connecting right now. Please try again or WhatsApp us for quick help.";

    }

  };

  /*
  ========================================
  HANDLE USER MESSAGE
  ========================================
  */

  const handleSend = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!inputText.trim()) return;

    const userMessage = inputText.trim();

    const newMsg: Message = {
      id: Date.now(),
      text: userMessage,
      isBot: false
    };

    setMessages(prev => [...prev, newMsg]);

    setInputText("");

    setIsTyping(true);

    /*
    CALL AI BACKEND
    */

    const aiReply = await getAIResponse(userMessage);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: aiReply,
        isBot: true
      }
    ]);

    setIsTyping(false);

  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[100]">

      {/* Chat Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,178,106,0.4)] transition-transform hover:scale-110 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}

      <div
        className={`absolute bottom-0 right-0 w-80 sm:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >

        {/* Header */}

        <div className="bg-primary/10 border-b border-white/10 p-4 flex justify-between items-center backdrop-blur-md">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>

            </div>

            <div>

              <h3 className="font-serif font-medium tracking-tight text-white">
                Virtual MUA Assistant
              </h3>

              <p className="text-xs text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </p>

            </div>

          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Messages */}

        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/95">

          {messages.map(msg => (

            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.type === "system"
                  ? "items-center"
                  : msg.isBot
                  ? "items-start"
                  : "items-end"
              }`}
            >

              {msg.type === "system" ? (

                <div className="text-xs text-muted-foreground my-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {msg.text}
                </div>

              ) : (

                <div className="flex flex-col gap-1 max-w-[85%]">

                  {msg.isBot && (
                    <span className="text-[10px] text-muted-foreground ml-1">
                      Aditi
                    </span>
                  )}

                  <div
                    className={`p-3 text-sm shadow-sm ${
                      msg.isBot
                        ? "bg-[#1a1a1a] text-gray-200 rounded-2xl rounded-tl-sm border border-white/5"
                        : "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              )}

            </div>

          ))}

          {isTyping && (

            <div className="flex flex-col items-start gap-1">

              <span className="text-[10px] text-muted-foreground ml-1">
                Aditi
              </span>

              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-tl-sm p-3 w-16 flex justify-center gap-1">

                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>

              </div>

            </div>

          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}

        <form
          onSubmit={handleSend}
          className="p-3 border-t border-white/10 bg-[#0a0a0a] flex gap-2"
        >

          <Input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask Aditi anything..."
            className="flex-1 bg-white/5 border-white/10 text-white focus-visible:ring-primary rounded-full px-4"
          />

          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 shrink-0 h-10 w-10"
            disabled={!inputText.trim() || isTyping}
          >

            <Send className="w-4 h-4" />

          </Button>

        </form>

      </div>

    </div>
  );
}
