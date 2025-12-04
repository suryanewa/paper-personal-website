import React, { useRef, useState } from 'react';
import { RESUME_DATA } from '../constants';
import { Section } from './Section';
import { Tape } from './Tape';
import { Trophy, ExternalLink, MapPin } from 'lucide-react';
import { IconsBadgeCheck } from './ui/icons-badge-check';
import gsap from 'gsap';

export const Competitions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  // Create refs for each competition item
  const contentRefs = useRef<(HTMLUListElement | null)[]>([]);
  const chevronRefs = useRef<(SVGSVGElement | null)[]>([]);

  return (
    <Section id="competitions" title="Competitions & Awards" icon={<IconsBadgeCheck className="w-8 h-8 md:w-10 md:h-10" />}>
      <div ref={containerRef} className="relative space-y-16">
        {RESUME_DATA.competitions.map((item, index) => {
          const isExpanded = expandedItems.has(index);

          const toggleExpanded = () => {
            const newExpanded = new Set(expandedItems);
            const contentRef = contentRefs.current[index];
            const chevronRef = chevronRefs.current[index];
            
            if (isExpanded) {
              newExpanded.delete(index);
              if (contentRef) {
                const currentHeight = contentRef.scrollHeight;
                gsap.fromTo(contentRef,
                  { height: currentHeight, opacity: 1 },
                  {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => {
                      if (contentRef) {
                        contentRef.style.display = 'none';
                      }
                    }
                  }
                );
              }
              if (chevronRef) {
                gsap.set(chevronRef, { rotation: 0 });
              }
            } else {
              newExpanded.add(index);
              if (contentRef) {
                contentRef.style.display = 'block';
                const height = contentRef.scrollHeight;
                gsap.fromTo(contentRef,
                  { height: 0, opacity: 0 },
                  {
                    height: height,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out"
                  }
                );
              }
              if (chevronRef) {
                gsap.set(chevronRef, { rotation: 180 });
              }
            }
            setExpandedItems(newExpanded);
          };
          
          return (
            <div 
              key={item.id} 
              className="relative pl-0 md:pl-20 group"
            >
              
              {/* Desktop Trophy Icon */}
              <button
                className="hidden md:flex clickable competition-icon absolute top-1 left-0 w-10 h-10 z-20 items-center justify-center bg-black rounded-full transition-transform duration-300 group-hover:scale-110 cursor-pointer focus:outline-none"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded();
                }}
                aria-label={isExpanded ? 'Collapse competition details' : 'Expand competition details'}
              >
                <Trophy size={20} className="text-white" />
              </button>
              
              <button
                onClick={toggleExpanded}
                className="w-full text-left cursor-pointer no-cursor-blob"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 md:mb-2 gap-4 md:gap-0">
                  <div className="flex items-start gap-4 md:gap-3 w-full md:w-auto">
                    {/* Mobile Trophy Icon */}
                    <div className="md:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center bg-black rounded-full mt-1">
                      <Trophy size={20} className="text-white" />
                    </div>

                    <div className="flex-1 md:flex-none">
                      <div 
                        className="clickable flex items-center justify-between md:justify-start gap-3"
                        data-blob-target=".competition-chevron"
                      >
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 group-hover:text-black transition-colors duration-300 leading-tight">
                          {item.award}
                        </h3>
                        <svg
                          ref={(el) => { chevronRefs.current[index] = el; }}
                          className="competition-chevron w-6 h-6 md:w-5 md:h-5 text-ink-700 transition-transform flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Mobile Event Name */}
                      <div className="md:hidden text-sm font-sans font-bold text-ink-700 tracking-wider uppercase mt-2">
                        {item.event}
                      </div>
                    </div>
                  </div>

                  <div className="self-start md:self-auto pl-[3.5rem] md:pl-0 hidden md:block">
                    <Tape rotate={1}>
                      <span className="font-hand text-lg md:text-xl text-ink-700">{item.date}</span>
                    </Tape>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center mb-6 pb-2 border-b border-dashed border-ink-900/20 pl-[3.5rem] md:pl-0">
                  <div className="hidden md:flex items-center gap-3">
                    <span className="text-sm font-sans font-bold text-ink-700 tracking-wider uppercase">
                      {item.event}
                    </span>
                    <div className="flex items-center gap-1 text-ink-600 font-serif italic text-sm md:text-base">
                      <MapPin size={14} className="text-black" />
                      {item.location}
                    </div>
                  </div>
                  
                  {/* Mobile Details Row: Date + Location + Link */}
                  <div className="md:hidden flex flex-wrap items-center gap-x-4 gap-y-3 w-full">
                    <Tape rotate={-1}>
                      <span className="font-hand text-lg text-ink-700">{item.date}</span>
                    </Tape>

                    <div className="flex items-center gap-1 text-ink-600 font-serif italic text-sm">
                      <MapPin size={14} className="text-black" />
                      {item.location}
                    </div>

                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="clickable flex items-center gap-1 text-ink-800 transition-colors text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="border-b border-dotted border-ink-500">{item.link.replace('https://', '')}</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  {item.link && (
                    <div className="hidden md:flex items-center gap-1">
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="clickable flex items-center gap-1 text-ink-800 transition-colors text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="border-b border-dotted border-ink-500">{item.link.replace('https://', '')}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </button>
              
              <ul 
                ref={(el) => { 
                  contentRefs.current[index] = el;
                  if (el && !el.dataset.initialized) {
                    el.dataset.initialized = 'true';
                    el.style.display = 'none';
                    el.style.height = '0';
                    el.style.opacity = '0';
                  }
                }}
                className="space-y-4 list-none overflow-hidden pl-[3.5rem] md:pl-0"
              >
                    {item.description.map((desc, i) => (
                  <li key={i} className="relative pl-6 font-serif text-lg md:text-xl text-black leading-relaxed">
                    <span className="absolute left-0 top-3 w-1.5 h-1.5 bg-black rounded-full"></span>
                        {desc}
                        </li>
                    ))}
                </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
};