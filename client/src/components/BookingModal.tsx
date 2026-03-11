import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BookingModal({ children, defaultService = "" }: { children: React.ReactNode, defaultService?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNum = "918210071659"; // Updated WhatsApp number
    
    const text = `Hi Puja Glam Makeup Studio!
I would like to book a session.
Name: ${name}
Phone: ${phone}
Event Date: ${date}
Service: ${service || "Not decided yet"}
Message: ${message}

Please let me know your availability.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNum}?text=${encodedText}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#080808] text-white border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[100]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary">Book Your Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input id="name" required value={name} onChange={e => setName(e.target.value)} className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
            <Input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="+91 82100 71659" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-300">Event Date</Label>
            <Input id="date" type="date" required value={date} onChange={e => setDate(e.target.value)} className="border-white/10 focus-visible:ring-primary bg-white/5 text-white min-h-[40px] appearance-none" style={{colorScheme: 'dark'}} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service" className="text-gray-300">Service Interested In</Label>
            <Input id="service" value={service} onChange={e => setService(e.target.value)} className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="Bridal, Event Glamour, etc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-300">Additional Details</Label>
            <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} className="border-white/10 focus-visible:ring-primary bg-white/5 text-white min-h-[100px]" placeholder="Tell us more about your event..." />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-6 shadow-[0_0_15px_rgba(220,178,106,0.2)]">
            Send via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}