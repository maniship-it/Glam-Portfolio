import { lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import GlitterEffect from "@/components/GlitterEffect";
import BackgroundVectors from "@/components/BackgroundVectors";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

// Lazy load components that are not immediately visible
const Gallery = lazy(() => import("@/components/sections/Gallery"));
const InstagramFeed = lazy(() => import("@/components/sections/InstagramFeed"));
const FloatingChatbot = lazy(() => import("@/components/FloatingChatbot"));

// Wrapper for lazy hydrating components based on intersection observer
function LazyHydrate({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Start loading 200px before it comes into view
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
          {children}
        </Suspense>
      ) : (
        <div className="h-[600px] w-full" /> // Placeholder to prevent layout shift
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white custom-cursor">
      <BackgroundVectors />
      <GlitterEffect />
      <Navbar />
      <Hero />
      
      {/* Very thin creative separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(216,195,165,0.8)] relative z-20"></div>

      {/* Offer Banner */}
      <section className="py-6 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 border-y border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center animate-pulse shrink-0 shadow-[0_0_15px_rgba(216,195,165,0.6)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-white mb-1">Limited Time Offer!</h3>
              <p className="text-primary-foreground/90 font-medium">Get <span className="font-bold text-white text-lg">20% OFF</span> on all Bridal Bookings for Winter 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <BookingModal defaultService="Winter Bridal Offer 20% OFF">
              <Button size="lg" className="w-full md:w-auto bg-[#FFD700] text-black hover:bg-[#FFC000] rounded-full font-bold px-8 shadow-[0_0_25px_rgba(255,215,0,0.8)] animate-pulse transition-all hover:scale-105">
                Hurry Now - Claim Offer
              </Button>
            </BookingModal>
          </div>
        </div>
      </section>
      
      <div id="portfolio">
        <LazyHydrate>
          <Gallery />
        </LazyHydrate>
      </div>
      
      <section className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <BeforeAfter 
            beforeImage="/src/assets/images/before-after/before-indian.jpg"
            afterImage="/src/assets/images/before-after/after-indian.jpg"
            title="The Art of Transformation"
            description="Swipe to witness the meticulous detail and flawless finish of our signature glam process."
          />
        </div>
      </section>
      
      <div id="services">
        <Services />
      </div>
      
      <div id="testimonials">
        <Testimonials />
      </div>
      
      <LazyHydrate>
        <InstagramFeed />
      </LazyHydrate>
      
      <Footer />
      
      <Suspense fallback={null}>
        <FloatingChatbot />
      </Suspense>
    </main>
  );
}