import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-white/10 py-3 shadow-lg" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:shadow-[0_0_15px_rgba(220,178,106,0.5)] transition-all">
            <span>P</span>
            <span className="italic font-light -ml-0.5">G</span>
          </div>
          <div className="font-serif text-xl tracking-tight hidden sm:block">
            <span className="text-white">Puja</span>
            <span className="text-primary italic">Glam</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://www.instagram.com/puja_glam_makeup_studio" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:flex text-gray-300 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <BookingModal>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-[0_0_15px_rgba(220,178,106,0.2)]">
              Book Session
            </Button>
          </BookingModal>
        </div>
      </div>
    </header>
  );
}