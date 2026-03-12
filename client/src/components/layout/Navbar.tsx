import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isAcademy = location === "/academy";

  const getNavHref = (hash: string) => {
    return isAcademy ? `/${hash}` : hash;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["portfolio", "services", "testimonials"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on typical header height
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-background/90 backdrop-blur-xl border-white/10 py-3 shadow-lg" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/">
            <a onClick={closeMobileMenu} className="flex items-center gap-2 group z-50">
              <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:shadow-[0_0_15px_rgba(216,195,165,0.5)] transition-all">
                <span>P</span>
                <span className="italic font-light -ml-0.5">G</span>
              </div>
              <div className="font-serif text-xl tracking-tight hidden sm:block">
                <h1 className="sr-only">Puja Glam Makeup Studio</h1>
                <span className="text-white">Puja</span>
                <span className="text-primary italic">Glam</span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a 
              href={getNavHref("#portfolio")} 
              className={`transition-all duration-300 ${!isAcademy && activeSection === 'portfolio' ? 'text-primary drop-shadow-[0_0_10px_rgba(216,195,165,0.8)] scale-105' : 'text-gray-300 hover:text-primary'}`}
            >
              Portfolio
            </a>
            <a 
              href={getNavHref("#services")} 
              className={`transition-all duration-300 ${!isAcademy && activeSection === 'services' ? 'text-primary drop-shadow-[0_0_10px_rgba(216,195,165,0.8)] scale-105' : 'text-gray-300 hover:text-primary'}`}
            >
              Services
            </a>
            <a 
              href={getNavHref("#testimonials")} 
              className={`transition-all duration-300 ${!isAcademy && activeSection === 'testimonials' ? 'text-primary drop-shadow-[0_0_10px_rgba(216,195,165,0.8)] scale-105' : 'text-gray-300 hover:text-primary'}`}
            >
              Testimonials
            </a>
            <Link href="/academy">
              <a className={`transition-all duration-300 font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border ${isAcademy ? 'text-black bg-[#C0C0C0] shadow-[0_0_15px_rgba(192,192,192,0.8)] border-[#C0C0C0]' : 'text-[#C0C0C0] border-[#C0C0C0]/50 hover:bg-[#C0C0C0] hover:text-black hover:shadow-[0_0_15px_rgba(192,192,192,0.8)]'}`}>
                Academy
              </a>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://youtube.com/@Pujaglammakeover" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-300 hover:text-primary transition-colors focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md outline-none"
              aria-label="Subscribe to Puja Glam on YouTube"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 8.001c0-2.316 1.83-4.148 4.148-4.148h11.204c2.316 0 4.148 1.832 4.148 4.148v7.998c0 2.316-1.832 4.148-4.148 4.148H6.398c-2.316 0-4.148-1.832-4.148-4.148V8.001z"/><path d="M9.75 15.525v-7.05l5.55 3.525-5.55 3.525z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/puja_glam_makeup_studio" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-300 hover:text-primary transition-colors focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md outline-none"
              aria-label="Follow Puja Glam on Instagram for daily makeup looks"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <BookingModal>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-[0_0_15px_rgba(216,195,165,0.2)] hover:-translate-y-0.5 transition-transform">
                Book Session
              </Button>
            </BookingModal>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-white hover:text-primary transition-colors focus-visible:ring-primary focus-visible:ring-offset-2 outline-none rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col items-center gap-8 text-xl font-serif">
            <a href={getNavHref("#portfolio")} onClick={closeMobileMenu} className="text-gray-300 hover:text-primary transition-colors">Portfolio</a>
            <a href={getNavHref("#services")} onClick={closeMobileMenu} className="text-gray-300 hover:text-primary transition-colors">Services</a>
            <a href={getNavHref("#testimonials")} onClick={closeMobileMenu} className="text-gray-300 hover:text-primary transition-colors">Testimonials</a>
            <Link href="/academy"><a onClick={closeMobileMenu} className={`font-bold transition-colors ${isAcademy ? 'text-[#C0C0C0] drop-shadow-[0_0_10px_rgba(192,192,192,0.8)]' : 'text-[#C0C0C0]/80 hover:text-[#C0C0C0]'}`}>Academy</a></Link>
            <div className="flex gap-6 mt-4">
              <a href="https://youtube.com/@Pujaglammakeover" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 8.001c0-2.316 1.83-4.148 4.148-4.148h11.204c2.316 0 4.148 1.832 4.148 4.148v7.998c0 2.316-1.832 4.148-4.148 4.148H6.398c-2.316 0-4.148-1.832-4.148-4.148V8.001z"/><path d="M9.75 15.525v-7.05l5.55 3.525-5.55 3.525z"/></svg>
              </a>
              <a href="https://www.instagram.com/puja_glam_makeup_studio" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/918210071659" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Persistent Mobile Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-white/10 z-40">
        <BookingModal>
          <Button className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-[0_0_20px_rgba(216,195,165,0.3)]">
            Book Appointment
          </Button>
        </BookingModal>
      </div>
    </>
  );
}