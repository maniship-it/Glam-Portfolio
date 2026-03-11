import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BookingModal({ children, defaultService = "" }: { children: React.ReactNode, defaultService?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating Netlify Form Submission
    const formData = new FormData(e.currentTarget);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-background text-foreground border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[100] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary">Book Your Session</DialogTitle>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-serif text-white">Request Sent!</h3>
            <p className="text-muted-foreground">Thank you for reaching out. We will get back to you shortly to confirm your booking.</p>
          </div>
        ) : (
          <form 
            ref={formRef}
            name="booking" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            className="space-y-4 mt-4"
          >
            <input type="hidden" name="form-name" value="booking" />
            <div hidden>
              <input name="bot-field" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
              <Input id="name" name="name" required className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="Jane Doe" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="+91 82100 71659" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input id="email" name="email" type="email" className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="jane@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-300">Event Date *</Label>
                <Input id="date" name="date" type="date" required className="border-white/10 focus-visible:ring-primary bg-white/5 text-white min-h-[40px] appearance-none" style={{colorScheme: 'dark'}} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service" className="text-gray-300">Service *</Label>
                <Input id="service" name="service" defaultValue={defaultService} required className="border-white/10 focus-visible:ring-primary bg-white/5 text-white" placeholder="Bridal, Event Glamour, etc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">Reference Image (Optional)</Label>
              <Input id="image" name="image" type="file" accept="image/*" className="border-white/10 focus-visible:ring-primary bg-white/5 text-white text-sm file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-1 file:mr-4 file:hover:bg-primary/90 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">Additional Details</Label>
              <Textarea id="message" name="message" className="border-white/10 focus-visible:ring-primary bg-white/5 text-white min-h-[80px]" placeholder="Tell us more about your event, timing, venue..." />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-6 shadow-[0_0_15px_rgba(216,195,165,0.2)]">
              {isSubmitting ? 'Sending...' : 'Submit Request'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}