import { useState, useRef, useEffect } from "react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  description?: string;
}

export default function BeforeAfter({ beforeImage, afterImage, title = "The Transformation", description = "Witness the power of professional glam. Slide to reveal the before and after." }: BeforeAfterProps) {
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
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", () => setIsDragging(false));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4 text-glow">{title}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto px-4">
          {description}
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl mx-auto aspect-[4/5] md:aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-muted"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and after makeup comparison slider"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSliderPosition(p => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setSliderPosition(p => Math.min(100, p + 5));
        }}
      >
        {/* Skeleton */}
        <div className="absolute inset-0 bg-muted/50 animate-pulse -z-10" />

        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt="Glamorous makeup look after transformation" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 text-primary shadow-lg pointer-events-none">
          Glam
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Natural bare face before makeup" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: '100vw', maxWidth: containerRef.current?.offsetWidth || '100%' }}
            draggable="false"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 text-white shadow-lg pointer-events-none">
            Natural
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(216,195,165,0.5)] transition-transform group-hover:bg-white"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className={`w-10 h-10 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-xl transition-transform ${isDragging ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
            <div className="flex gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m15 18-6-6 6-6"/></svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}