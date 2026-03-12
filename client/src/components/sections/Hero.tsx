import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Replace the src with actual Instagram loop video when deploying */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/hero-indian.jpg"
          className="w-full h-full object-cover object-center opacity-80 scale-105"
        >
          <source src="/src/assets/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Main Content aligned left */}
        <div className="lg:col-span-8 flex flex-col items-start text-left pt-12 lg:pt-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight"
          >
            <span className="text-white tracking-tight">Puja</span>
            <span className="text-primary italic tracking-tight">
              Glam
            </span>{" "}
            <br />
            <span className="text-white text-glow font-light">
              Makeup Studio
            </span>
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-light"
          >
            Elevating your natural beauty with enterprise-class artistry.
            Top-rated professional makeup services in Gaya, Bihar. Specializing
            in flawless bridal transformations across Jharkhand & Delhi NCR.
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <BookingModal>
              <Button
                size="lg"
                className="text-lg px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(216,195,165,0.3)] hover:-translate-y-1 transition-all"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </BookingModal>

            <a
              href="https://wa.me/918210071659?text=Hi%20Puja%20Glam%20Makeup%20Studio!%20I%20would%20like%20to%20know%20more%20about%20your%20makeup%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 w-full sm:w-auto text-lg hover:-translate-y-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quick Book
            </a>
          </motion.div>
        </div>

        {/* Badge aligned right */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end mt-12 lg:mt-0 w-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/30 bg-primary/10 text-primary backdrop-blur-md shadow-[0_0_20px_rgba(216,195,165,0.15)]"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="text-base font-medium tracking-wide uppercase leading-tight text-center md:text-left">
              Luxury Bridal
              <br />& Evening Glam
            </span>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
