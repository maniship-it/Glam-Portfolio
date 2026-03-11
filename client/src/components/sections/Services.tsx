import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

const services = [
  {
    title: "Bridal Elegance",
    price: "From ₹25,000",
    description: "Flawless, long-lasting makeup designed specifically for high-definition photography and emotional tears.",
    features: [
      "Extensive pre-wedding consultation",
      "Premium skin prep & priming",
      "Airbrush or traditional application",
      "Custom faux lashes",
      "Touch-up kit included"
    ],
    popular: true
  },
  {
    title: "Event Glamour",
    price: "From ₹10,000",
    description: "Stand out at your next gala, party or corporate event with a look customized to your outfit and personal style.",
    features: [
      "Skin preparation",
      "Full face makeup application",
      "Highlight & contouring",
      "Lip color matching",
      "Standard lashes included"
    ],
    popular: false
  },
  {
    title: "Editorial / Photoshoot",
    price: "Custom Quote",
    description: "Creative, high-impact looks designed for the harsh lighting of studio photography and creative direction.",
    features: [
      "Half-day or full-day rates",
      "Multiple look changes",
      "On-set touch-ups",
      "Creative concept collaboration",
      "Body makeup included"
    ],
    popular: false
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Investment in Beauty</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent pricing for enterprise-tier makeup services. Every session includes premium products and meticulous attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl glass-panel transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                service.popular ? 'border-primary/50 shadow-[0_0_30px_rgba(220,178,106,0.15)]' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                  Most Requested
                </div>
              )}
              
              <h3 className="text-2xl font-serif text-white mb-2">{service.title}</h3>
              <div className="text-3xl text-primary font-light mb-4">{service.price}</div>
              <p className="text-muted-foreground mb-8 min-h-[80px]">
                {service.description}
              </p>

              <ul className="space-y-4 mb-8 flex-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <BookingModal defaultService={service.title}>
                <Button 
                  className={`w-full mt-auto ${service.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                  variant={service.popular ? "default" : "secondary"}
                >
                  Book Now
                </Button>
              </BookingModal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}