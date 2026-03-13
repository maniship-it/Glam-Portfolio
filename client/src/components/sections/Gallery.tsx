import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Bridal", "Party", "Editorial", "Natural"];

// Replace src with actual instagram images
const images = [
  { id: 1, src: "/images/gallery/bridal_indian_1.webp", category: "Bridal", height: "h-[400px]", look: "Traditional Bride", service: "Bridal Elegance" },
  { id: 2, src: "/images/gallery/party_indian_1.webp", category: "Party", height: "h-[300px]", look: "Evening Glam", service: "Event Glamour" },
  { id: 3, src: "/images/gallery/bridal_indian_2.webp", category: "Bridal", height: "h-[500px]", look: "Modern Reception", service: "Bridal Elegance" },
  { id: 4, src: "/images/gallery/party_indian_2.webp", category: "Party", height: "h-[350px]", look: "Soft Glam", service: "Event Glamour" },
  { id: 5, src: "/images/gallery/bridal_indian_3.webp", category: "Bridal", height: "h-[450px]", look: "Bridal Look", service: "Bridal Elegance" },
  { id: 6, src: "/images/gallery/party_indian_3.webp", category: "Natural", height: "h-[380px]", look: "No-Makeup Makeup", service: "Editorial" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = filter === "All" 
    ? images 
    : images.filter(img => img.category === filter);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev! + 1) % filteredImages.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
      } else if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredImages.length]);

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Curated Portfolio</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              A glimpse into our signature looks. From ethereal bridal styles to bold evening glamour.
            </p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium ${
                  filter === cat 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(216,195,165,0.3)]" 
                    : "bg-white/5 text-foreground hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer w-full inline-block ${img.height} break-inside-avoid bg-muted/20`}
                onClick={() => setSelectedImageIndex(index)}
                tabIndex={0}
                role="button"
                aria-label={`View ${img.look}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedImageIndex(index);
                  }
                }}
              >
                {/* Skeleton loader underneath image */}
                <div className="absolute inset-0 bg-muted/50 animate-pulse -z-10" />
                
                <img 
                  src={img.src} 
                  alt={`${img.category} makeup look by Puja Glam Makeup Studio`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-1 block">
                      {img.service}
                    </span>
                    <h3 className="text-white text-xl font-serif">{img.look}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
          <DialogContent className="max-w-7xl w-[95vw] h-[90vh] bg-black/95 border-none shadow-none p-0 flex flex-col justify-center items-center overflow-hidden z-[110]">
             <VisuallyHidden>
              <DialogTitle>Portfolio Image Viewer</DialogTitle>
            </VisuallyHidden>
            
            {selectedImageIndex !== null && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={filteredImages[selectedImageIndex].src} 
                  alt={filteredImages[selectedImageIndex].look} 
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Metadata */}
                <div className="absolute bottom-6 left-6 right-6 md:left-12 text-center md:text-left drop-shadow-lg">
                  <h3 className="text-2xl font-serif text-white">{filteredImages[selectedImageIndex].look}</h3>
                  <p className="text-primary">{filteredImages[selectedImageIndex].service}</p>
                </div>

                {/* Navigation Buttons */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((prev) => (prev! + 1) % filteredImages.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}