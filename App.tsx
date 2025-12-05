import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Competitions } from './components/Competitions';
import { Projects } from './components/Projects';
import { Publications } from './components/Publications';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { FloatingPrintButton } from './components/FloatingPrintButton';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen text-ink-900 overflow-x-hidden">
      {/* Background is handled by body CSS in index.html for better performance */}
      
      <Navigation />
      <CustomCursor />
      <FloatingPrintButton />

      <main className="relative z-10 space-y-5 md:space-y-8 pb-20">
        <Hero />
        <Experience />
        <Education />
        <Competitions />
        <Projects />
        <Publications />
        <Skills />
      </main>
      
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;