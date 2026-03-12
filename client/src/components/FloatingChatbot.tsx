import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: number, text: React.ReactNode, isBot: boolean}>>([
    { id: 1, text: <>Hi there! Welcome to <span className="text-white">Puja</span> <span className="text-primary italic">Glam</span> Makeup Studio. How can I help you today?</>, isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), text: inputText, isBot: false };
    setMessages(prev => [...prev, newMsg]);
    setInputText("");

    // Simulate AI response based on keywords
    setTimeout(() => {
      let responseText = "I'd be happy to help! For the fastest response, please book a session or contact Puja directly via WhatsApp at +91 82100 71659.";
      const lowerInput = newMsg.text.toLowerCase();
      
      if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much")) {
        responseText = "Our Bridal Elegance package starts at ₹25,000, and Event Glamour starts at ₹10,000. You can check the Services section for more details!";
      } else if (lowerInput.includes("location") || lowerInput.includes("address") || lowerInput.includes("where")) {
        responseText = "We are located at MIG - 61, Shaheed Bhagat Singh Colony, Gango Bigha, Gaya, Bihar - 823001. We also serve clients across Jharkhand and Delhi NCR!";
      } else if (lowerInput.includes("book") || lowerInput.includes("appointment")) {
        responseText = "You can book an appointment by clicking the 'Book Session' button at the top of the page, which will connect you directly to our WhatsApp.";
      } else if (lowerInput.includes("timing") || lowerInput.includes("hours") || lowerInput.includes("open")) {
        responseText = "We are open Monday to Sunday, from 9:00 AM to 6:00 PM.";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: responseText, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[100]">
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,178,106,0.4)] transition-transform hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`absolute bottom-0 right-0 w-80 sm:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-primary/10 border-b border-white/10 p-4 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-sm">
              <span className="tracking-tight">P</span><span className="italic font-light -ml-0.5">G</span>
            </div>
            <div>
              <h3 className="font-serif font-medium tracking-tight text-white">
                Puja <span className="text-primary italic">Glam</span> Assistant
              </h3>
              <p className="text-xs text-primary">AI Support</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.isBot 
                    ? 'bg-white/10 text-gray-200 rounded-tl-sm' 
                    : 'bg-primary text-primary-foreground rounded-tr-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#0a0a0a] flex gap-2">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Aditi anything..." 
            className="flex-1 bg-white/5 border-white/10 text-white focus-visible:ring-primary rounded-full px-4"
          />
          <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90 shrink-0 h-10 w-10" disabled={!inputText.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}