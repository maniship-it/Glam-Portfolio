import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function GlitterEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const newSparkles: Sparkle[] = [];
      const colors = ['#d8c3a5', '#ffd700', '#e6e6fa', '#ffffff', '#ffdf00', '#c0c0c0']; // Gold, silver, beige
      
      for (let i = 0; i < 15; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: clientX + (Math.random() - 0.5) * 80,
          y: clientY + (Math.random() - 0.5) * 80,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 2,
        });
      }

      setSparkles(prev => [...prev, ...newSparkles]);

      // Remove after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
      }, 1000);
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {sparkles.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full animate-sparkle mix-blend-screen"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}