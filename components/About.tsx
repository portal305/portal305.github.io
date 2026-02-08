import React from 'react';
import { useI18n } from '../App';

const About: React.FC = () => {
  const { t } = useI18n();
  const { bio } = t.about;

  return (
    <section id="about" className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white tracking-tighter uppercase text-center">
            <span className="text-emerald-500 mr-2">//</span> {t.about.title}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-16 max-w-3xl text-center font-medium">
            {t.about.content}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {/* Personal Details Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">Identity</h3>
              <p className="text-white text-lg font-bold mb-3">{bio.personal}</p>
              <p className="text-zinc-400 text-lg">{bio.location}</p>
            </div>

            {/* Languages Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">{bio.languagesTitle}</h3>
              <div className="flex flex-wrap gap-3">
                {bio.languages.map((lang) => (
                  <span key={lang} className="text-zinc-400 hover:text-white transition-colors cursor-default text-sm font-bold flex items-center">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full mr-2 group-hover:bg-emerald-500 transition-colors"></span>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests & Consoles Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">{bio.interestsTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {bio.interests.map((console) => (
                  <div key={console} className="bg-black/40 border border-white/5 px-4 py-2 rounded-xl text-xs font-black text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/20 transition-all">
                    {console}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;