import React from 'react';
import { Download } from 'lucide-react';

export const FloatingPrintButton: React.FC = () => {
  return (
    <button
      onClick={() => window.open('/assets/Surya_Newa_Product_Manager_Resume.pdf', '_blank')}
      className="clickable fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
      aria-label="Open Resume PDF"
    >
      <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg border border-ink-100 transition-transform duration-300 hover:scale-110">
        {/* Rotating Text Ring */}
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full p-2">
            <path
              id="textPath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] fill-ink-900">
              <textPath href="#textPath" startOffset="0%">
                Download or Print Resume PDF • Download or Print Resume PDF •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Icon */}
        <div className="relative z-10">
          <Download size={24} className="text-ink-900" />
        </div>
      </div>
    </button>
  );
};

