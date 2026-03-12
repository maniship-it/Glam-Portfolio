import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  text: React.ReactNode;
  isBot: boolean;
  type?: 'system' | 'message';
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Aditi has joined the chat.", isBot: true, type: 'system' },
    { id: 2, text: <>Hi there! I'm Aditi from <span className="text-white font-serif tracking-tight">Puja</span> <span className="text-primary italic font-serif tracking-tight">Glam</span> Makeup Studio. How can I help you sparkle today?</>, isBot: true }
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
  }, [messages, isOpen, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    const newMsg: Message = { id: Date.now(), text: userMessage, isBot: false };
    setMessages(prev => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI typing delay based on message length
    setTimeout(() => {
      let responseText = "I'd love to help you with that! For the most accurate details or to book a session, you can reach Puja directly via WhatsApp at +91 82100 71659. Is there anything specific about our bridal or party makeup you'd like to know?";
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much") || lowerInput.includes("charges")) {
        responseText = "Our Bridal Elegance package starts at ₹25,000, and our Event Glamour package starts at ₹10,000. We also offer a Professional Bridal Masterclass at our Academy for ₹15,000! Would you like me to guide you to the booking page?";
      } else if (lowerInput.includes("location") || lowerInput.includes("address") || lowerInput.includes("where")) {
        responseText = "You can find us at MIG - 61, Shaheed Bhagat Singh Colony, Gango Bigha, Gaya, Bihar - 823001. We're also happy to travel for destination weddings across Jharkhand and Delhi NCR!";
      } else if (lowerInput.includes("book") || lowerInput.includes("appointment") || lowerInput.includes("hire")) {
        responseText = "Yay! You can secure your date by clicking the 'Book Session' button at the top of the page, which will connect you instantly to our WhatsApp. We can't wait to glam you up!";
      } else if (lowerInput.includes("timing") || lowerInput.includes("hours") || lowerInput.includes("open")) {
        responseText = "Our studio doors are open Monday to Sunday, from 9:00 AM to 6:00 PM. We do accommodate early morning bridal bookings upon request!";
      } else if (lowerInput.includes("hi") || lowerInput.includes("hello") || lowerInput.includes("hey")) {
        responseText = "Hello gorgeous! How can I assist you today? Looking for bridal makeup, party glam, or maybe interested in our makeup academy?";
      } else if (lowerInput.includes("academy") || lowerInput.includes("course") || lowerInput.includes("learn") || lowerInput.includes("teach")) {
        responseText = "Our Academy offers incredible courses! We have a Professional Bridal Masterclass (₹15,000) and a Self-Grooming Intensive (₹5,000). You can check out the 'Academy' tab in the menu for the full syllabus!";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: responseText, isBot: true }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
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
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/95 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.type === 'system' ? 'items-center' : msg.isBot ? 'items-start' : 'items-end'}`}>
              {msg.type === 'system' ? (
                <div className="text-xs text-muted-foreground my-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {msg.text}
                </div>
              ) : (
                <div className="flex flex-col gap-1 max-w-[85%]">
                  {msg.isBot && <span className="text-[10px] text-muted-foreground ml-1">Aditi</span>}
                  <div 
                    className={`p-3 text-sm shadow-sm ${
                      msg.isBot 
                        ? 'bg-[#1a1a1a] text-gray-200 rounded-2xl rounded-tl-sm border border-white/5' 
                        : 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm'
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
              <span className="text-[10px] text-muted-foreground ml-1">Aditi</span>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-tl-sm p-3 w-16 flex justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
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