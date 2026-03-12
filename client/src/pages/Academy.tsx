import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitterEffect from "@/components/GlitterEffect";
import BackgroundVectors from "@/components/BackgroundVectors";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AcademyModal } from "@/components/AcademyModal";
import { Star, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function Academy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white custom-cursor">
      <BackgroundVectors />
      <GlitterEffect />
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/academy-hero.jpg" 
            alt="Puja Glam Makeup Academy Training" 
            className="w-full h-full object-cover object-center opacity-40"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-silver/30 bg-[#C0C0C0]/10 text-[#C0C0C0] backdrop-blur-md mb-6 font-medium tracking-wider text-sm shadow-[0_0_15px_rgba(192,192,192,0.2)]">
              <span className="text-white font-serif tracking-tight">Puja</span> <span className="text-primary italic font-serif tracking-tight">Glam</span> ACADEMY
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              Master the Art of <br />
              <span className="text-[#C0C0C0] italic drop-shadow-[0_0_15px_rgba(192,192,192,0.5)]">Flawless Glamour</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl mx-auto italic">
              "Empowering the next generation of artists with techniques that transcend trends. Learn from the best makeup artist in Gaya."
            </p>
            <p className="text-lg text-primary font-medium mb-10">
              — Puja, Lead Artist & Educator
            </p>
            
            <AcademyModal defaultCourse="Academy Training Inquiry">
              <Button size="lg" className="bg-[#C0C0C0] text-black hover:bg-white rounded-full px-8 h-14 text-lg shadow-[0_0_20px_rgba(192,192,192,0.4)] transition-all hover:scale-105">
                Enroll Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </AcademyModal>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Our <span className="text-primary italic">Courses</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive training programs designed for beginners and professionals looking to upgrade their skills.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pro Bridal Course */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Professional Bridal Masterclass</h3>
              <p className="text-xl text-primary mb-6">₹15,000 <span className="text-sm text-muted-foreground">+ GST</span></p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "In-depth skin preparation & theory",
                  "Flawless base & airbrush techniques",
                  "Advanced eye makeup (Cut crease, Smokey, Halo)",
                  "Bridal hair styling & dupatta draping",
                  "Product knowledge & vanity building",
                  "Client consultation & business basics"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[#C0C0C0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <AcademyModal defaultCourse="Pro Bridal Masterclass">
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full">
                  Request Syllabus
                </Button>
              </AcademyModal>
            </motion.div>

            {/* Self Makeup Course */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-b from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#C0C0C0] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="w-14 h-14 bg-[#C0C0C0]/20 rounded-full flex items-center justify-center text-[#C0C0C0] mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Self-Grooming Intensive</h3>
              <p className="text-xl text-[#C0C0C0] mb-6">₹5,000 <span className="text-sm text-muted-foreground">+ GST</span></p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Personalized skin analysis",
                  "Everyday flawless base routine",
                  "Day to night makeup transformation",
                  "Perfect eyeliner & lash application",
                  "Color theory for your skin tone",
                  "Brushes & tools guide"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <AcademyModal defaultCourse="Self Grooming Course">
                <Button className="w-full bg-[#C0C0C0] text-black hover:bg-white rounded-full shadow-[0_0_15px_rgba(192,192,192,0.3)]">
                  Book Your Seat
                </Button>
              </AcademyModal>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Feedback Section */}
      <section className="py-24 bg-black/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Student <span className="text-[#C0C0C0] italic">Success Stories</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Hear from our talented alumni who have transformed their passion into a profession.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya S.",
                role: "Freelance MUA",
                quote: "Learning from Puja ma'am changed my life. Her attention to detail and patience in teaching the cut-crease technique gave me the confidence to start my own bridal bookings!"
              },
              {
                name: "Neha K.",
                role: "Self-Grooming Student",
                quote: "I always struggled with my base getting cakey. The 3-day self-grooming class taught me exactly what products work for my skin type. Completely worth the investment."
              },
              {
                name: "Anjali R.",
                role: "Studio Owner",
                quote: "The advanced bridal masterclass is top-tier. Not only did I learn modern techniques, but the business and client management tips helped me scale my studio in Patna."
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10"
              >
                <div className="flex gap-1 mb-4 text-[#C0C0C0]">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-300 italic mb-6">"{review.quote}"</p>
                <div>
                  <h4 className="font-medium text-white">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}