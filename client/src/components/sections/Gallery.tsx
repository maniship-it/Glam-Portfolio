import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Bridal", "Party", "Editorial"];

const images = [
  { id: 1, src: "/src/assets/images/gallery/bridal_1.jpg", category: "Bridal", height: "h-[400px]" },
  { id: 2, src: "/src/assets/images/gallery/party_1.jpg", category: "Party", height: "h-[300px]" },
  { id: 3, src: "/src/assets/images/gallery/bridal_2.jpg", category: "Bridal", height: "h-[500px]" },
  { id: 4, src: "/src/assets/images/gallery/party_2.jpg", category: "Party", height: "h-[350px]" },
  { id: 5, src: "/src/assets/images/gallery/bridal_3.jpg", category: "Bridal", height: "h-[450px]" },
  { id: 6, src: "/src/assets/images/gallery/party_3.jpg", category: "Party", height: "h-[380px]" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = filter === "All" 
    ? images 
    : images.filter(img => img.category === filter);

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
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(220,178,106,0.3)]" 
                    : "bg-white/5 text-foreground hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer w-full inline-block ${img.height} break-inside-avoid`}
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={`${img.category} makeup look`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-1 block">
                      {img.category}
                    </span>
                    <h3 className="text-white text-xl font-serif">Signature Look</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-transparent border-none shadow-none p-0">
             <VisuallyHidden>
              <DialogTitle>Portfolio Image</DialogTitle>
            </VisuallyHidden>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Selected portfolio piece" 
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}