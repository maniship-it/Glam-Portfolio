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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      
      <div id="portfolio">
        <Gallery />
      </div>
      
      <BeforeAfter 
        beforeImage="/src/assets/images/before-after/before-indian.jpg"
        afterImage="/src/assets/images/before-after/after-indian.jpg"
      />
      
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