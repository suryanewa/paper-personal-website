import React, { useRef, useState, useEffect } from 'react';
import { RESUME_DATA } from '../constants';
import { Section } from './Section';
import { Tape } from './Tape';
import { IconsClipboardCheck } from './ui/icons-clipboard-check';
import { MapPin } from 'lucide-react';
import gsap from 'gsap';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [dimensions, setDimensions] = useState({ height: 0 });
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  // Create refs for each experience item
  const contentRefs = useRef<(HTMLUListElement | null)[]>([]);
  const chevronRefs = useRef<(SVGSVGElement | null)[]>([]);
  
  // Map company names to logo paths
  const getCompanyLogo = (companyName: string): string | null => {
    const logoMap: Record<string, string> = {
      'BenchPrep': '/assets/logos/BenchPrep.svg',
      'Chipper Cash': '/assets/logos/Chipper Cash.svg',
      'Logic Information Systems': '/assets/logos/Logic Information Systems.svg',
    };
    
    // Try exact match first
    if (logoMap[companyName]) {
      return logoMap[companyName];
    }
    
    // Try case-insensitive match
    const normalized = Object.keys(logoMap).find(
      key => key.toLowerCase() === companyName.toLowerCase()
    );
    
    return normalized ? logoMap[normalized] : null;
  };

  // Update SVG height on mount and when dropdowns change
  // Smoothly animate timeline height during dropdown animations
  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;
    
    const updateHeight = () => {
    if (containerRef.current) {
        const newHeight = containerRef.current.offsetHeight;
        setDimensions({ height: newHeight });
      }
    };
    
    // Initial update
    updateHeight();
    
    // Poll frequently during the animation to create smooth updates
    const startTime = Date.now();
    const animationDuration = 450; // slightly longer than the 400ms dropdown animation
    
    const animationFrame = () => {
      updateHeight();
      if (Date.now() - startTime < animationDuration) {
        requestAnimationFrame(animationFrame);
      }
    };
    
    const frameId = requestAnimationFrame(animationFrame);
    
    return () => cancelAnimationFrame(frameId);
  }, [expandedItems]);

  return (
    <Section id="experience" title="Professional Experience" icon={<IconsClipboardCheck className="w-8 h-8 md:w-10 md:h-10" />}>
      <div ref={containerRef} className="relative ml-4 md:ml-8 space-y-16">
        
        {/* SVG Timeline Line - static line that follows container height */}
        <svg 
            className="absolute -left-[2px] top-4 w-6 overflow-visible hidden md:block pointer-events-none"
            style={{ height: dimensions.height > 0 ? `${dimensions.height}px` : '100%' }}
        >
            <path
                ref={pathRef}
                d={`M 10 0 V ${dimensions.height}`}
                fill="none"
                stroke="#2c2c2c"
                strokeWidth="2"
                className="opacity-30"
            />
        </svg>

        {RESUME_DATA.experience.map((job, index) => {
          const isExpanded = expandedItems.has(index);

          const toggleExpanded = () => {
            const newExpanded = new Set(expandedItems);
            const contentRef = contentRefs.current[index];
            const chevronRef = chevronRefs.current[index];
            
            if (isExpanded) {
              newExpanded.delete(index);
              // Animate out - same animation style as expand
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
              // Animate in
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

          const logoPath = getCompanyLogo(job.company);
          
          return (
            <div 
              key={job.id} 
              className="relative pl-0 md:pl-16 group"
              data-blob-target=".experience-logo"
            >
              
              {/* Desktop Company Logo - centered on timeline */}
              {logoPath ? (
                <img
                  src={logoPath}
                  alt={`${job.company} logo`}
                  className="experience-logo timeline-dot hidden md:block absolute top-1 w-10 h-10 z-10 object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  style={{ left: '8px', transform: 'translateX(-50%)' }}
                  onClick={toggleExpanded}
                />
              ) : (
                <div 
                  className="experience-logo timeline-dot hidden md:block absolute top-3 w-5 h-5 rounded-full border-2 border-ink-900 bg-paper-100 z-10 group-hover:bg-ink-900 transition-colors duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer"
                  style={{ left: '8px', transform: 'translateX(-50%)' }}
                  onClick={toggleExpanded}
                ></div>
              )}
              
              <button
                onClick={toggleExpanded}
                className="w-full text-left cursor-pointer no-cursor-blob"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 md:mb-2 gap-4 md:gap-0">
                  <div className="flex items-start gap-4 md:gap-3 w-full md:w-auto">
                    {/* Mobile Logo */}
                    {logoPath && (
                      <img 
                        src={logoPath} 
                        className="md:hidden w-12 h-12 object-contain experience-logo flex-shrink-0 mt-1" 
                        alt={`${job.company} logo`} 
                      />
                    )}
                    
                    <div className="flex-1 md:flex-none">
                      <div className="flex items-center justify-between md:justify-start gap-3">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 group-hover:text-black transition-colors duration-300 leading-tight">
                          {job.role}
                        </h3>
                        <svg
                          ref={(el) => { chevronRefs.current[index] = el; }}
                          className="w-6 h-6 md:w-5 md:h-5 text-ink-700 transition-transform flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Mobile Company Name */}
                      <div className="md:hidden text-sm font-sans font-bold text-ink-700 tracking-wider uppercase mt-2">
                        {job.company}
                      </div>
                    </div>
                  </div>
                  
                  <div className="self-start md:self-auto pl-[4rem] md:pl-0">
                    <div className="md:hidden flex items-center gap-6 flex-nowrap">
                      <div className="flex items-center gap-1 text-ink-600 font-serif italic text-sm">
                        <MapPin size={14} className="text-black" />
                        {job.location}
                      </div>
                      <Tape rotate={1}>
                        <span className="font-hand text-lg text-ink-700">{job.period}</span>
                      </Tape>
                    </div>
                    <div className="hidden md:block">
                      <Tape rotate={1}>
                        <span className="font-hand text-xl text-ink-700">{job.period}</span>
                      </Tape>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-between items-center mb-6 pb-2 border-b border-dashed border-ink-900/20 pl-[4rem] md:pl-0">
                  <div className="hidden md:block text-sm font-sans font-bold text-ink-700 tracking-wider uppercase">
                    {job.company}
                  </div>
                  <div className="hidden md:flex items-center gap-1 text-ink-600 font-serif italic text-sm md:text-base">
                    <MapPin size={14} className="text-black" />
                    {job.location}
                  </div>
                </div>
              </button>
              
              <ul 
                ref={(el) => { 
                  contentRefs.current[index] = el;
                  // Initialize as collapsed on first render only
                  if (el && !el.dataset.initialized) {
                    el.dataset.initialized = 'true';
                    el.style.display = 'none';
                    el.style.height = '0';
                    el.style.opacity = '0';
                  }
                }}
                className="space-y-4 list-none overflow-hidden pl-[4rem] md:pl-0"
              >
              {job.description.map((desc, i) => (
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