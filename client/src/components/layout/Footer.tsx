import { MapPin, Phone, Mail, Clock, Map } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:shadow-[0_0_15px_rgba(220,178,106,0.5)] transition-all">
                <span>P</span>
                <span className="italic font-light -ml-0.5">G</span>
              </div>
              <div className="font-serif text-2xl tracking-tight">
                <span className="text-white">Puja</span>
                <span className="text-primary italic">Glam</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Premium makeup artistry specializing in luxury bridal, editorial, and event glamour. Serving clients across Bihar, Jharkhand, and Delhi NCR with unparalleled service.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/puja_glam_makeup_studio" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/918210071659" aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Service Areas</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Map className="w-5 h-5 text-primary shrink-0" />
                <span>Available for bookings in:<br/>Bihar, Jharkhand, Delhi NCR</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>Mon - Sun: 9:00 AM to 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Contact</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>MIG - 61, Shaheed Bhagat Singh Colony, Gango Bigha, Gaya, Bihar - 823001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+918210071659" className="hover:text-primary transition-colors">+91 82100 71659</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:hello@pujaglam.com" className="hover:text-primary transition-colors">hello@pujaglam.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Puja Glam Makeup Studio. Best Makeup Artist in Gaya, Bihar.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}