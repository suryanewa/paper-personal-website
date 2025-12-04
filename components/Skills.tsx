import React from 'react';
import { RESUME_DATA } from '../constants';
import { Section } from './Section';
import { IconsSlidersVertical } from './ui/icons-sliders-vertical';
import { Tape } from './Tape';

export const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Skills & Interests" titleAlign="right" icon={<IconsSlidersVertical className="w-8 h-8 md:w-10 md:h-10" />}>
      {/* SVG Filter for Paper Texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="skills-paper-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch" result="NOISE" />
          <feDiffuseLighting lightingColor="white" surfaceScale="4" in="NOISE" result="DIFFUSE">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite operator="in" in="DIFFUSE" in2="SourceGraphic" result="COMPOSITE" />
        </filter>
      </svg>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {RESUME_DATA.skills.map((skillGroup, index) => (
          <div 
            key={skillGroup.category} 
            className="skills-paper-card p-8 md:p-10 bg-white relative"
          >
            {/* Paper Texture Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: '#fff',
                filter: 'url(#skills-paper-texture)',
                opacity: 0.3,
              }}
            />
            {/* Decorative Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <Tape rotate={index % 2 === 0 ? 2 : -2}>
                <span className="inline-block w-20">&nbsp;</span>
              </Tape>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-hand text-3xl md:text-4xl text-ink-900 mb-6">
              {skillGroup.category}
            </h3>
              <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((item) => (
                <span 
                  key={item} 
                    className="clickable px-3 py-1.5 rounded-full text-sm font-mono tracking-wide text-ink-700 bg-ink-900/[0.03] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.6)] hover:bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-default"
                >
                  {item}
                </span>
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lifted Paper Hover Effect Styles */}
      <style>{`
        .skills-paper-card {
          position: relative;
          transition: all 0.3s ease-in-out;
        }
        .skills-paper-card::before,
        .skills-paper-card::after {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: 10px;
          width: 50%;
          height: 20%;
          max-width: 200px;
          max-height: 70px;
          box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12);
          transform: rotate(0deg);
          background: transparent;
          transition: all 0.3s ease-in-out;
        }
        .skills-paper-card::before {
          left: 10px;
          transform: rotate(-1deg);
        }
        .skills-paper-card::after {
          right: 10px;
          transform: rotate(1deg);
          left: auto;
        }
        .skills-paper-card:hover::before,
        .skills-paper-card:hover::after {
          box-shadow: 0 18px 14px rgba(0, 0, 0, 0.3);
          bottom: 14px;
        }
        .skills-paper-card:hover::before {
          transform: rotate(-4deg);
        }
        .skills-paper-card:hover::after {
          transform: rotate(4deg);
        }
      `}</style>
    </Section>
  );
};
