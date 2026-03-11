import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Footer from "@/components/layout/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      
      <div id="portfolio">
        <Gallery />
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
      
      <InstagramFeed />
      <Footer />
      <FloatingChatbot />
    </main>
  );
}