import { useState, useRef, useEffect } from "react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfter({ beforeImage, afterImage }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => setIsDragging(false));
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", () => setIsDragging(false));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4 text-glow">The Transformation</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Witness the power of professional glam. Slide to reveal the before and after.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl border border-white/10"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          {/* After Image (Background) */}
          <img 
            src={afterImage} 
            alt="After Makeup" 
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">
            Glam
          </div>

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={beforeImage} 
              alt="Before Makeup" 
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: '100vw', maxWidth: containerRef.current?.offsetWidth || '100%' }}
              draggable="false"
            />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">
              Natural
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(220,178,106,0.5)]"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-lg">
              <div className="flex gap-1">
                <div className="w-0.5 h-3 bg-primary rounded-full"></div>
                <div className="w-0.5 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}