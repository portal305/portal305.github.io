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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-zinc-900/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center">

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