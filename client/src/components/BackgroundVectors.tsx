import { useEffect, useState } from "react";

export default function BackgroundVectors() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-[0.03]">
      {/* Lipstick */}
      <svg className="absolute top-[10%] left-[5%] w-24 h-24 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V11" />
        <path d="M9 11V7L12 3L15 7V11H9Z" />
        <line x1="7" y1="15" x2="17" y2="15" />
      </svg>

      {/* Makeup Brush */}
      <svg className="absolute top-[30%] right-[10%] w-32 h-32 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C7.58172 2 4 5.58172 4 10V14H20V10C20 5.58172 16.4183 2 12 2Z" />
        <line x1="12" y1="14" x2="12" y2="22" />
        <line x1="8" y1="14" x2="8" y2="20" />
        <line x1="16" y1="14" x2="16" y2="20" />
      </svg>

      {/* Compact Powder */}
      <svg className="absolute bottom-[20%] left-[15%] w-28 h-28 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <path d="M12 2A10 10 0 0 1 22 12" />
      </svg>

      {/* Mascara */}
      <svg className="absolute bottom-[40%] right-[5%] w-20 h-20 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="10" width="6" height="12" rx="1" />
        <path d="M12 10V2" />
        <line x1="10" y1="4" x2="14" y2="4" />
        <line x1="10" y1="6" x2="14" y2="6" />
        <line x1="10" y1="8" x2="14" y2="8" />
      </svg>
      
      {/* Sparkles */}
      <svg className="absolute top-[60%] left-[40%] w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    </div>
  );
}