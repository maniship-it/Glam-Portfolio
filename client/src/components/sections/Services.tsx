import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

const services = [
  {
    title: "Bridal – Trial & Day",
    price: "From ₹25,000",
    duration: "180 mins",
    description: "Flawless, long-lasting traditional or modern bridal makeup designed specifically for high-definition photography.",
    features: [
      "Extensive pre-wedding trial",
      "Premium skin prep & priming",
      "HD/Airbrush application",
      "Custom faux lashes & draping",
      "Luxury touch-up kit"
    ],
    popular: true
  },
  {
    title: "Party Glamour",
    price: "From ₹10,000",
    duration: "90 mins",
    description: "Stand out at your next gala or event with a look customized to your outfit and personal style.",
    features: [
      "Signature skin preparation",
      "Full face makeup application",
      "Advanced highlight & contour",
      "Lip color matching",
      "Standard lashes included"
    ],
    popular: false
  },
  {
    title: "Editorial / Photoshoot",
    price: "Custom Quote",
    duration: "Half/Full Day",
    description: "Creative, high-impact looks designed for the harsh lighting of studio photography and creative direction.",
    features: [
      "Creative concept collaboration",
      "Multiple look changes",
      "On-set continuous touch-ups",
      "Body makeup included",
      "Lighting optimization"
    ],
    popular: false
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
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
                service.popular ? 'border-primary/50 shadow-[0_0_30px_rgba(216,195,165,0.15)]' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold tracking-wide shadow-lg">
                  Most Requested
                </div>
              )}
              
              <h3 className="text-2xl font-serif text-white mb-2">{service.title}</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl text-primary font-light">{service.price}</div>
                <div className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                  <Clock className="w-3 h-3 mr-1" />
                  {service.duration}
                </div>
              </div>
              <p className="text-muted-foreground mb-8 min-h-[80px] text-sm leading-relaxed">
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
                  className={`w-full mt-auto h-12 transition-all hover:scale-[1.02] ${service.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}
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