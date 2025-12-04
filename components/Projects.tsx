import React from 'react';
import { RESUME_DATA } from '../constants';
import { Section } from './Section';
import { ExternalLink } from 'lucide-react';
import { IconsLayers } from './ui/icons-layers';
import { Tape } from './Tape';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Selected Projects" titleAlign="right" icon={<IconsLayers className="w-8 h-8 md:w-10 md:h-10" />}>
      {/* SVG Filter for Paper Texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="proj-paper-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch" result="NOISE" />
          <feDiffuseLighting lightingColor="white" surfaceScale="4" in="NOISE" result="DIFFUSE">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite operator="in" in="DIFFUSE" in2="SourceGraphic" result="COMPOSITE" />
        </filter>
      </svg>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
        {RESUME_DATA.projects.map((proj) => {
          const [primaryTitle, ...subtitleParts] = proj.title.split(' - ');
          const subtitle = subtitleParts.join(' - ');
          
          return (
          <a 
            key={proj.id} 
            href={proj.link} 
            className="no-cursor-blob block relative h-full"
            data-blob-target=".project-logo"
            target="_blank"
            rel="noreferrer"
          >
              <div className="proj-paper-card h-full p-8 md:p-10 bg-white relative">
              {/* Paper Texture Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: '#fff',
                  filter: 'url(#proj-paper-texture)',
                  opacity: 0.3,
                }}
              />
              {/* Decorative Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Tape rotate={2}>
                  <span className="inline-block w-20">&nbsp;</span>
                </Tape>
              </div>
              <div className="relative z-10">
                {/* Header: logo + title/subtitle + date */}
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {proj.logo && (
                      <div className="flex items-center flex-shrink-0 self-center">
                        <img
                          src={proj.logo}
                          alt={`${primaryTitle} logo`}
                          className="project-logo clickable h-10 md:h-12 w-auto object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <div data-blob-target=".project-link-icon">
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 flex items-center gap-6 md:gap-2 flex-wrap">
                          <span className="flex items-center gap-2">
                            {primaryTitle}
                            <ExternalLink size={20} className="project-link-icon clickable text-ink-600" />
                          </span>
                          {/* Mobile: Date next to title */}
                          <span className="md:hidden">
                            <Tape rotate={-1}>
                              <span className="font-hand text-lg text-ink-700">
                                {proj.period}
                              </span>
                            </Tape>
                          </span>
                        </h3>
                      </div>
                      {subtitle && (
                        <p className="mt-1 text-base md:text-lg text-ink-600 whitespace-nowrap truncate">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop: Date in separate position */}
                  <div className="hidden md:flex items-center mt-1 md:mt-0 self-start">
                    <Tape rotate={-1}>
                      <span className="font-hand text-xl text-ink-700">
                        {proj.period}
                      </span>
                    </Tape>
                  </div>
                </div>

                {/* Tech chips on their own full-width row */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {proj.tech.map((t) => (
                    <span 
                      key={t} 
                      className="clickable px-3 py-1 rounded-full text-xs font-mono tracking-wide text-ink-700 bg-ink-900/[0.03] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.6)] hover:bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 ease-out"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                
                <ul className="space-y-3 mt-6">
                  {proj.description.map((desc, i) => (
                    <li key={i} className="font-serif text-ink-800 leading-relaxed text-lg md:text-xl flex items-start gap-3">
                      <span className="mt-2.5 w-1.5 h-1.5 bg-ink-700 rounded-full flex-shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" aria-hidden="true" />
                      <span>{desc}</span>
                     </li>
                  ))}
                </ul>
              </div>
            </div>
          </a>
        )})}
      </div>
      
      {/* Lifted Paper Hover Effect Styles */}
      <style>{`
        .proj-paper-card {
          position: relative;
          transition: all 0.3s ease-in-out;
        }
        .proj-paper-card::before,
        .proj-paper-card::after {
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
        .proj-paper-card::before {
          left: 10px;
          transform: rotate(-1deg);
        }
        .proj-paper-card::after {
          right: 10px;
          transform: rotate(1deg);
          left: auto;
        }
        .proj-paper-card:hover::before,
        .proj-paper-card:hover::after {
          box-shadow: 0 18px 14px rgba(0, 0, 0, 0.3);
          bottom: 14px;
        }
        .proj-paper-card:hover::before {
          transform: rotate(-4deg);
        }
        .proj-paper-card:hover::after {
          transform: rotate(4deg);
        }
      `}</style>
    </Section>
  );
};