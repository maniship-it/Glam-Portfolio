import { MapPin, Phone, Mail, Clock, Map } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
              <div className="font-serif text-2xl tracking-tight hidden sm:block">
                <span className="text-white">Puja</span>
                <span className="text-primary italic">Glam</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Premium makeup artistry specializing in luxury bridal, editorial, and event glamour. Serving clients across Bihar, Jharkhand, and Delhi NCR with unparalleled service. Certified from a reputed academy in Delhi.
            </p>
            <div className="flex gap-4">
              <a href="https://youtube.com/@Pujaglammakeover" aria-label="YouTube" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 8.001c0-2.316 1.83-4.148 4.148-4.148h11.204c2.316 0 4.148 1.832 4.148 4.148v7.998c0 2.316-1.832 4.148-4.148 4.148H6.398c-2.316 0-4.148-1.832-4.148-4.148V8.001z"/><path d="M9.75 15.525v-7.05l5.55 3.525-5.55 3.525z"/></svg>
              </a>
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
          <p>&copy; {new Date().getFullYear()} <span className="text-white">Puja</span> <span className="text-primary italic">Glam</span> Makeup Studio. Best Makeup Artist in Gaya, Bihar.</p>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#0a0a0a] text-gray-300 border-white/10 max-h-[80vh] overflow-y-auto z-[100]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-primary mb-4">Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>Welcome to <span className="text-white">Puja</span> <span className="text-primary italic">Glam</span> Makeup Studio. We are committed to protecting your privacy and ensuring the security of your personal information.</p>
                  <h3 className="text-white font-medium text-lg mt-4">1. Information We Collect</h3>
                  <p>We may collect personal information such as your name, contact details (phone number, email address), event date, and location when you book our services, use our website, or interact with our chatbot. Any images shared for reference or taken during sessions (with your consent) will be handled with strict confidentiality.</p>
                  <h3 className="text-white font-medium text-lg mt-4">2. Use of Information</h3>
                  <p>Your information is used to confirm bookings, provide our services, respond to queries, and occasionally send promotional updates related to our makeup academy or studio offers.</p>
                  <h3 className="text-white font-medium text-lg mt-4">3. Data Sharing</h3>
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share information only with trusted service providers necessary for our operations (e.g., booking management, WhatsApp integration).</p>
                  <h3 className="text-white font-medium text-lg mt-4">4. Photography & Portfolio</h3>
                  <p>As a makeup artistry business, we may ask for your consent to use your photos for our portfolio, social media, and marketing materials. You hold the right to decline this request.</p>
                  <p className="mt-6 text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#0a0a0a] text-gray-300 border-white/10 max-h-[80vh] overflow-y-auto z-[100]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-primary mb-4">Terms of Service</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>By booking a session or academy course with <span className="text-white">Puja</span> <span className="text-primary italic">Glam</span> Makeup Studio, you agree to the following terms and conditions.</p>
                  <h3 className="text-white font-medium text-lg mt-4">1. Bookings & Payments</h3>
                  <p>To secure your date, a non-refundable advance payment is required. The remaining balance must be cleared on or before the day of the event. All course fees for the Makeup Academy must be paid as per the agreed schedule.</p>
                  <h3 className="text-white font-medium text-lg mt-4">2. Cancellations & Rescheduling</h3>
                  <p>Advance deposits are non-refundable in the event of cancellation by the client. In case of rescheduling due to unforeseen circumstances, we will do our best to accommodate the new date subject to availability, but this is not guaranteed.</p>
                  <h3 className="text-white font-medium text-lg mt-4">3. Travel & Accommodation</h3>
                  <p>For bookings outside Gaya, Bihar (including Jharkhand and Delhi NCR), additional travel, lodging, and logistics charges will apply and must be borne by the client unless stated otherwise in a custom quote.</p>
                  <h3 className="text-white font-medium text-lg mt-4">4. Allergies & Skin Conditions</h3>
                  <p>It is the client's responsibility to inform us of any skin conditions, allergies, or sensitivities prior to the application of makeup. <span className="text-white">Puja</span> <span className="text-primary italic">Glam</span> Makeup Studio will not be held liable for any allergic reactions or skin complications.</p>
                  <p className="mt-6 text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}