import React from 'react';
import { RESUME_DATA } from '../constants';
import { Section } from './Section';
import { IconsCircleCheck } from './ui/icons-circle-check';
import { Tape } from './Tape';
import { MapPin } from 'lucide-react';

// Map school names to logo paths
const schoolLogos: Record<string, string> = {
  'New York University': '/assets/logos/NYU Logo.svg',
  'Payton College Prep': '/assets/logos/Payton Logo.svg',
};

export const Education: React.FC = () => {
  return (
    <Section 
      id="education" 
      title="Education" 
      titleAlign="right"
      className="px-6 md:px-12 py-12 rough-edge my-12 max-w-4xl mx-auto"
      icon={<IconsCircleCheck className="w-8 h-8 md:w-10 md:h-10" />}
    >
      {/* SVG Filter for Paper Texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="edu-paper-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch" result="NOISE" />
          <feDiffuseLighting lightingColor="white" surfaceScale="4" in="NOISE" result="DIFFUSE">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite operator="in" in="DIFFUSE" in2="SourceGraphic" result="COMPOSITE" />
        </filter>
      </svg>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {RESUME_DATA.education.map((edu) => {
          const logoPath = schoolLogos[edu.school];
          
          return (
          <div 
            key={edu.id} 
            className="edu-paper-card p-8 bg-white relative h-full"
          >
            {/* Paper Texture Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: '#fff',
                filter: 'url(#edu-paper-texture)',
                opacity: 0.3,
              }}
            />
            {/* Decorative Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <Tape rotate={2}>
                <span className="inline-block w-20">&nbsp;</span>
              </Tape>
            </div>
            
            <div className="relative z-[1] flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-ink-900/10 border-dashed">
                <div className="flex items-start gap-4">
                  {logoPath && (
                    <div 
                      className="clickable flex-shrink-0 group/logo"
                      data-blob-target=".edu-logo"
                    >
                      <img 
                        src={logoPath} 
                        alt={`${edu.school} logo`}
                        className="edu-logo h-14 w-auto object-contain"
                        style={{
                          filter: 'grayscale(100%) contrast(100000%)',
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-ink-900">{edu.school}</h3>
                    <p className="hidden md:flex items-center gap-1 text-ink-600 italic">
                      <MapPin size={14} className="text-black" />
                      {edu.location}
                    </p>
                    {/* Mobile: Location and Date on same line */}
                    <div className="md:hidden flex items-center gap-6 flex-nowrap mt-2">
                      <p className="flex items-center gap-1 text-ink-600 italic text-sm">
                        <MapPin size={14} className="text-black" />
                        {edu.location}
                      </p>
                      <Tape rotate={-1}>
                        <span className="font-hand text-lg text-ink-700">{edu.year}</span>
                      </Tape>
                    </div>
                  </div>
                </div>
                <Tape rotate={-1} className="hidden md:block mt-2 md:mt-0 self-start">
                  <span className="font-hand text-xl text-ink-700">{edu.year}</span>
                </Tape>
            </div>
            <div className="relative z-[1] mb-4 space-y-1">
              {edu.degree.split(/(?=Minor)/).map((part, idx) => (
                <h4 key={idx} className="font-sans font-semibold text-ink-900 text-lg">
                  {part.trim()}
                </h4>
              ))}
            </div>
            <div className="relative z-[1] space-y-2">
              {edu.details.map((detail, idx) => (
                <p key={idx} className="font-serif text-ink-800 leading-relaxed">
                  {detail}
                </p>
              ))}
            </div>
          </div>
          );
        })}
      </div>
      
      {/* Lifted Paper Hover Effect Styles */}
      <style>{`
        .edu-paper-card {
          position: relative;
          transition: all 0.3s ease-in-out;
        }
        .edu-paper-card::before,
        .edu-paper-card::after {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: 10px;
          width: 50%;
          height: 20%;
          max-width: 180px;
          max-height: 60px;
          box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12);
          transform: rotate(0deg);
          background: transparent;
          transition: all 0.3s ease-in-out;
        }
        .edu-paper-card::before {
          left: 10px;
          transform: rotate(-1deg);
        }
        .edu-paper-card::after {
          right: 10px;
          transform: rotate(1deg);
          left: auto;
        }
        .edu-paper-card:hover::before,
        .edu-paper-card:hover::after {
          box-shadow: 0 18px 14px rgba(0, 0, 0, 0.3);
          bottom: 14px;
        }
        .edu-paper-card:hover::before {
          transform: rotate(-4deg);
        }
        .edu-paper-card:hover::after {
          transform: rotate(4deg);
        }
      `}</style>
    </Section>
  );
};
