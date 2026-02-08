import React, { useState, useEffect, createContext, useContext } from 'react';
import { Language, Translations, Project } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

// Localization Context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
};

// Data Context for Projects
const ProjectsContext = createContext<Project[]>([]);
export const useProjects = () => useContext(ProjectsContext);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const enT = await (await fetch('/i18n/english.json')).json();
        const itT = await (await fetch('/i18n/italian.json')).json();
        setTranslations(language === 'en' ? enT : itT);
        
        const proj = await (await fetch('/projects/projects.json')).json();
        setProjects(proj);
      } catch (err) {
        console.error("Initialization error", err);
      }
    };

    init();
  }, [language]);

  if (!translations) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
          <p className="text-emerald-500 font-bold tracking-widest text-xs uppercase">Initializing Portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations }}>
      <ProjectsContext.Provider value={projects}>
        <div className="min-h-screen transition-colors duration-300 bg-black">
          <Header />
          <main>
            <Hero />
            <About />
            <Projects />
          </main>
          <Footer />
        </div>
      </ProjectsContext.Provider>
    </I18nContext.Provider>
  );
};

export default App;