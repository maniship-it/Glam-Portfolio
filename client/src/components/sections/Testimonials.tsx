import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Aarti Sharma",
    event: "Bride",
    text: "Puja completely understood my vision for a traditional yet modern look. My makeup stayed flawless through 12 hours of crying, dancing, and the heat. I felt like royalty.",
    rating: 5,
    location: "Gaya"
  },
  {
    name: "Neha Singh",
    event: "Engagement",
    text: "The HD makeup application was so lightweight I barely felt it, yet the coverage was insane. The photos came out looking like an editorial magazine shoot. Highly recommended!",
    rating: 5,
    location: "Patna"
  },
  {
    name: "Priya Patel",
    event: "Bride",
    text: "Finding someone who understands how to work with my skin tone was crucial. Puja is a master at color matching and enhancing natural features rather than masking them.",
    rating: 5,
    location: "Delhi NCR"
  }
];

const logos = [
  { name: "Vogue", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Vogue_logo.svg/2560px-Vogue_logo.svg.png" },
  { name: "Harper's Bazaar", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Harpers_Bazaar_logo.svg/2560px-Harpers_Bazaar_logo.svg.png" },
  { name: "Elle", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Elle_magazine_logo.svg/2560px-Elle_magazine_logo.svg.png" },
  { name: "Cosmopolitan", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Cosmopolitan_logo.svg/2560px-Cosmopolitan_logo.svg.png" },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Words of <span className="text-primary italic">Praise</span></h2>
          <p className="text-muted-foreground text-lg">Hear from those who have experienced the transformation.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 relative h-full flex flex-col">
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/20" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-lg md:text-2xl text-gray-300 font-serif italic mb-8 leading-relaxed flex-1">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex justify-between items-end border-t border-white/10 pt-6">
                      <div>
                        <div className="font-medium text-white text-lg">{testimonial.name}</div>
                        <div className="text-primary text-sm tracking-wide uppercase mt-1">{testimonial.event}</div>
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}