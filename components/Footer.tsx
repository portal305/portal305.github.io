
import React from 'react';
import { useI18n } from '../App';

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-emerald-500 font-black transition-all group-hover:bg-emerald-500 group-hover:text-black">
              RL
            </div>
            <span className="font-black text-white tracking-tighter">Roberto La Spina</span>
          </div>
          
          <div className="flex items-center gap-10">
            {['GitHub'].map(link => (
              <a 
                key={link}
                href={link === 'GitHub' ? "https://github.com/portal305" : "#"} 
                target={link === 'GitHub' ? "_blank" : "_self"}
                rel="noopener noreferrer" 
                className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-emerald-500 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
