import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/hero-indian.jpg" 
          alt="Luxury Makeup Studio in Gaya Bihar - Puja Glam" 
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Main Content aligned left */}
        <div className="lg:col-span-8 flex flex-col items-start text-left pt-12 lg:pt-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
          >
            Puja Glam <br/>
            <span className="text-primary italic text-glow">Makeup Studio</span>
          </motion.h2>

          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-light"
          >
            Elevating your natural beauty with enterprise-class artistry. 
            Top-rated professional makeup services in Gaya, Bihar. Specializing in flawless bridal transformations across Jharkhand & Delhi NCR.
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <BookingModal>
              <Button size="lg" className="text-lg px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(220,178,106,0.3)]">
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </BookingModal>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-white/20 hover:bg-white/5 w-full sm:w-auto" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              View Portfolio
            </Button>
          </motion.div>
        </div>

        {/* Badge aligned right, positioned to not interfere with navbar */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/30 bg-primary/10 text-primary backdrop-blur-md shadow-[0_0_20px_rgba(220,178,106,0.15)]"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="text-base font-medium tracking-wide uppercase leading-tight">
              Luxury Bridal<br/>& Evening Glam
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}