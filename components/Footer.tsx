import React from 'react';
import { Download, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-8 pb-20 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-8">
          {/* Left column - Metadata (Bottom on mobile) */}
          <div className="flex flex-col gap-2 text-ink-400 font-mono text-[10px] md:text-xs uppercase tracking-widest text-center md:text-left order-2 md:order-1">
            <div>Last Updated December 2025</div>
            <div>Designed & Built with React · Tailwind · GSAP</div>
          </div>
          
          {/* Right column - Buttons (Top on mobile) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 order-1 md:order-2 w-full md:w-auto">
            <a 
              href="/assets/Surya_Newa_Product_Manager_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="clickable w-full sm:w-auto justify-center inline-flex items-center gap-2 px-8 py-3 bg-ink-900 text-paper-50 font-sans tracking-widest uppercase text-sm hover:bg-ink-800 transition-colors shadow-lg hover:shadow-xl duration-200"
              data-blob-shape="rectangle"
            >
              <Download size={16} />
              <span>Resume</span>
            </a>
            <a
              href="https://cal.com/suryanewa/quick-chat"
              target="_blank"
              rel="noreferrer"
              className="clickable w-full sm:w-auto justify-center inline-flex items-center gap-2 px-8 py-3 bg-ink-900 text-paper-50 font-sans tracking-widest uppercase text-sm hover:bg-ink-800 transition-colors shadow-lg hover:shadow-xl duration-200"
              data-blob-shape="rectangle"
            >
              <Calendar size={16} />
              <span>Meet</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
