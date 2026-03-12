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

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function GlitterEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setSparkles((prev) => 
        prev.map(s => ({
          ...s,
          x: s.x + s.vx,
          y: s.y + s.vy,
          vy: s.vy + 0.3, // faster gravity
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
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName) || target.closest('button') || target.closest('a') || target.closest('form')) {
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

      // Add ripple
      const newRipple = { id: Date.now(), x: clientX, y: clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);

      // Add sparkles
      const newSparkles: Sparkle[] = [];
      const colors = ['#d8c3a5', '#ffd700', '#e6e6fa', '#ffffff', '#ffdf00', '#c0c0c0', '#ff9eb5', '#b76e79'];
      
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: clientX,
          y: clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1, // smaller particles
          vx: (Math.random() - 0.5) * 6, // gentler horizontal spread
          vy: (Math.random() - 1) * 3 - 2, // slower initial upward burst
        });
      }

      setSparkles(prev => [...prev, ...newSparkles]);
      
      // Remove after 2 seconds (they fall off screen quicker now)
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
      }, 2000);
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
      {/* Ripples */}
      {ripples.map(r => (
        <div
          key={`ripple-${r.id}`}
          className="absolute rounded-full border border-white/20 animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Sparkles */}
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
      <style>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 6rem; /* 3rem radius */
            height: 6rem;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}