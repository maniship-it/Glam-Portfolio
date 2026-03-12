import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

export default function GlitterEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setSparkles((prev) => 
        prev.map(s => ({
          ...s,
          x: s.x + s.vx,
          y: s.y + s.vy,
          vy: s.vy + 0.15, // gravity
        })).filter(s => s.y < window.innerHeight + 100)
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      // Do not trigger on inputs, textareas, buttons, or links to avoid interference
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName) || target.closest('button') || target.closest('a')) {
        return;
      }

      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const newSparkles: Sparkle[] = [];
      const colors = ['#d8c3a5', '#ffd700', '#e6e6fa', '#ffffff', '#ffdf00', '#c0c0c0'];
      
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: clientX,
          y: clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1, // smaller particles
          vx: (Math.random() - 0.5) * 8, // horizontal spread
          vy: (Math.random() - 1) * 8, // initial upward burst
        });
      }

      setSparkles(prev => [...prev, ...newSparkles]);
      
      // Remove after 3 seconds (they usually fall off screen by then)
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
      }, 3000);
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
          className="absolute rounded-full mix-blend-screen opacity-80"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size}px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}