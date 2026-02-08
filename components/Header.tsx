
import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../App';
import confetti from 'canvas-confetti';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIconClick = () => {
    const newCount = clickCount + 1;
    
    if (newCount === 5) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2000);

      // Grand Finale: Higher Triple fountain effect
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;
      const colors = ['#10b981', '#34d399', '#059669', '#ffffff', '#0ea5e9', '#2dd4bf'];

      (function frame() {
        // Left Cannon - Shoots higher and more focused
        confetti({
          particleCount: 2,
          angle: 75,
          spread: 40,
          origin: { x: 0.1, y: 1 },
          colors: colors,
          zIndex: 9999,
          startVelocity: 115, // Increased velocity
          gravity: 0.7,      // Reduced gravity
          scalar: 0.85,
          ticks: 500         // Increased life
        });
        
        // Center Fountain - The "Main Event" shooting to the very top
        confetti({
          particleCount: 3,
          angle: 90,
          spread: 30,
          origin: { x: 0.5, y: 1 },
          colors: colors,
          zIndex: 9999,
          startVelocity: 130, // Maximum height power
          gravity: 0.7,
          scalar: 1.1,
          ticks: 500
        });

        // Right Cannon - Shoots higher and more focused
        confetti({
          particleCount: 2,
          angle: 105,
          spread: 40,
          origin: { x: 0.9, y: 1 },
          colors: colors,
          zIndex: 9999,
          startVelocity: 115, // Increased velocity
          gravity: 0.7,      // Reduced gravity
          scalar: 0.85,
          ticks: 500
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      setClickCount(0);
    } else {
      setClickCount(newCount);
    }

    // Reset counter if no click within 1.5 seconds
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1500);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          onClick={handleIconClick}
          className="flex items-center gap-3 group cursor-pointer select-none"
        >
          <div className={`w-10 h-10 rounded-xl overflow-hidden border transition-all duration-300 ${
            isExploding 
              ? 'scale-125 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]' 
              : 'border-emerald-500/20 group-hover:scale-110 group-active:scale-90'
          }`}>
            <img 
              src="https://avatars.githubusercontent.com/u/38288940?v=4" 
              alt="Roberto La Spina" 
              className={`w-full h-full object-cover transition-all duration-700 ${isExploding ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
            />
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide">
            {['about', 'projects'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-300 relative group"
                >
                  {(t.nav as any)[item]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                language === 'en' ? 'bg-emerald-500 text-black' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('it')}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                language === 'it' ? 'bg-emerald-500 text-black' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              IT
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
