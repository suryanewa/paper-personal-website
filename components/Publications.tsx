import React from 'react';
import { RESUME_DATA } from '../constants';
import { Section } from './Section';
import { Tape } from './Tape';
import { ExternalLink } from 'lucide-react';
import { IconsPaperclip } from './ui/icons-paperclip';

// Substack Icon (same as Hero)
const SubstackIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
  </svg>
);

// SSRN Icon - uses the actual logo file
const SSRNIcon = ({ size = 20 }: { size?: number }) => (
  <img 
    src="/assets/logos/SSRN Logo.svg" 
    alt="SSRN" 
    width={size} 
    height={size}
    style={{ filter: 'brightness(0) invert(1)' }}
  />
);

// Get icon based on publisher
const getPublisherIcon = (publisher: string, size: number = 20) => {
  switch (publisher.toLowerCase()) {
    case 'substack':
      return <SubstackIcon size={size} />;
    case 'ssrn':
      return <SSRNIcon size={size * 1.5} />;
    default:
      return <SubstackIcon size={size} />;
  }
};

export const Publications: React.FC = () => {
  return (
    <Section id="publications" title="Publications" icon={<IconsPaperclip className="w-8 h-8 md:w-10 md:h-10" />}>
      <div className="relative space-y-16">
        {RESUME_DATA.publications.map((item) => {
          return (
            <div 
              key={item.id} 
              className="relative pl-16 md:pl-20 group"
            >
              
              {/* Publisher Icon */}
              <div className="clickable absolute top-1 left-0 w-10 h-10 z-20 flex items-center justify-center bg-black rounded-full">
                <span className="text-white">
                  {getPublisherIcon(item.publisher, 20)}
                </span>
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-3">
                    <h3 className="font-serif text-3xl font-bold text-ink-900">
                      "{item.title}"
                    </h3>
                    {item.link && (
                      <div className="flex items-center gap-6 md:gap-3 flex-wrap">
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="clickable flex items-center gap-2 text-ink-800 transition-colors"
                        >
                          <span className="text-sm font-sans font-bold tracking-wider uppercase">
                            {item.publisher}
                          </span>
                          <ExternalLink size={16} />
                        </a>
                        {/* Mobile: Date next to platform */}
                        <span className="md:hidden">
                          <Tape rotate={-1}>
                            <span className="font-hand text-base text-ink-700">{item.date}</span>
                          </Tape>
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Desktop: Date in separate position */}
                  <div className="hidden md:block">
                    <Tape rotate={1}>
                      <span className="font-hand text-xl text-ink-700">{item.date}</span>
                    </Tape>
                  </div>
                </div>

                <ul className="space-y-4 list-none my-4">
                  {item.description.map((desc, i) => (
                    <li key={i} className="relative pl-6 font-serif text-lg md:text-xl text-black leading-relaxed">
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 bg-black rounded-full"></span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
