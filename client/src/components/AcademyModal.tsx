import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AcademyModal({ children, defaultCourse = "" }: { children: React.ReactNode, defaultCourse?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [course, setCourse] = useState(defaultCourse);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNum = "918210071659"; // The studio's WhatsApp number
    
    const text = `Hi Puja Glam Academy!
I am interested in your makeup courses.
Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Prior Experience: ${experience || "None"}
Interested Course: ${course || "Not decided yet"}
Questions: ${message}

Please share the syllabus and upcoming batch details.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNum}?text=${encodedText}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-background text-foreground border-silver/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[100] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#C0C0C0]">Academy Inquiry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
            <Input id="name" required value={name} onChange={e => setName(e.target.value)} className="border-white/10 focus-visible:ring-[#C0C0C0] bg-white/5 text-white" placeholder="Jane Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
              <Input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="border-white/10 focus-visible:ring-[#C0C0C0] bg-white/5 text-white" placeholder="+91 82100 71659" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="border-white/10 focus-visible:ring-[#C0C0C0] bg-white/5 text-white" placeholder="jane@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-gray-300">Experience Level</Label>
              <Input id="experience" value={experience} onChange={e => setExperience(e.target.value)} className="border-white/10 focus-visible:ring-[#C0C0C0] bg-white/5 text-white" placeholder="Beginner, MUA, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course" className="text-gray-300">Course *</Label>
              <Input id="course" value={course} onChange={e => setCourse(e.target.value)} required className="border-white/10 focus-visible:ring-[#C0C0C0] bg-white/5 text-white" placeholder="Bridal, Self-Grooming" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-300">Your Questions</Label>
            <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} className="border-white/10 focus-visible:ring-[#C0C0C0] bg-white/5 text-white min-h-[80px]" placeholder="What would you like to know about the training?" />
          </div>
          <Button type="submit" className="w-full bg-[#C0C0C0] text-black hover:bg-white rounded-full mt-6 shadow-[0_0_15px_rgba(192,192,192,0.2)]">
            Send via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}