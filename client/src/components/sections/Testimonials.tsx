import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    event: "Bride",
    text: "Puja completely understood my vision. I wanted a natural but elevated look for my wedding, and she delivered beyond my expectations. My makeup stayed flawless through 12 hours of crying, dancing, and hugging.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    event: "Gala Attendee",
    text: "I've never felt more glamorous. The attention to detail, the quality of products used, and the overall experience was truly luxurious. I received compliments the entire evening.",
    rating: 5
  },
  {
    name: "Priya Patel",
    event: "Bride",
    text: "Finding someone who understands how to work with my skin tone was crucial. Puja is a master at color matching and creating looks that enhance ethnic features rather than mask them. An absolute artist.",
    rating: 5
  }
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
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-24 bg-background relative">
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
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 relative">
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/20" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-lg md:text-2xl text-gray-300 font-serif italic mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div>
                      <div className="font-medium text-white text-lg">{testimonial.name}</div>
                      <div className="text-primary text-sm tracking-wide uppercase mt-1">{testimonial.event}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
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