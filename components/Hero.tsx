import React, { useState, useEffect } from 'react';
import { useI18n } from '../App';

const Hero: React.FC = () => {
  const { t } = useI18n();
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const roles = t.hero.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-black">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-zinc-900/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <div className="mb-12">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] rotate-6 scale-105 opacity-20 group-hover:rotate-12 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
            
            <div className="relative z-10 p-1 bg-white/5 rounded-[2.5rem] backdrop-blur-xl border border-white/10">
              <img 
                src="https://avatars.githubusercontent.com/u/38288940?v=4" 
                alt="Roberto La Spina" 
                className="w-36 h-36 lg:w-48 lg:h-48 rounded-[2.2rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        <p className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs mb-6 opacity-80">
          {t.hero.greeting}
        </p>
        
        <h1 className="text-6xl lg:text-9xl font-black text-white leading-tight mb-8 tracking-tighter">
          Roberto <br className="md:hidden" /> 
          <span 
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
            style={{ WebkitBackgroundClip: 'text' }}
          >
            La Spina
          </span>
        </h1>

        <div className="max-w-2xl min-h-[120px]">
          <h2 className={`text-2xl lg:text-4xl font-bold text-white mb-4 tracking-tight transition-all duration-500 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {roles[roleIndex]}
          </h2>
          <p className="text-zinc-400 text-lg lg:text-xl font-medium leading-relaxed max-w-xl mx-auto">
            {t.hero.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;