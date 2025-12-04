import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleAlign?: 'left' | 'center' | 'right';
  noSeparator?: boolean;
  icon?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  children, 
  className = "", 
  titleAlign = 'left',
  noSeparator = false,
  icon
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const lineSvgRef = useRef<SVGSVGElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Track all event listeners for cleanup
    const loadListeners: (() => void)[] = [];
    
    // Set SVG width to match title width exactly
    const updateLineWidth = () => {
      if (titleRef.current && lineSvgRef.current) {
        const titleWidth = titleRef.current.offsetWidth;
        lineSvgRef.current.style.width = `${titleWidth}px`;
      }
    };
    
    // Initial update with delay to ensure fonts are loaded
    const initialUpdate = () => {
      requestAnimationFrame(() => {
        updateLineWidth();
        // Refresh ScrollTrigger after layout is complete
        ScrollTrigger.refresh();
      });
    };
    
    // Run immediately
    initialUpdate();
    
    // Also run after fonts and resources are loaded
    if (document.readyState === 'complete') {
      initialUpdate();
    } else {
      window.addEventListener('load', initialUpdate);
      loadListeners.push(() => window.removeEventListener('load', initialUpdate));
    }
    
    window.addEventListener('resize', updateLineWidth);

    const ctx = gsap.context(() => {
      // Title Animation: Characters settling in
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0, skewX: -10 },
        {
          y: 0,
          opacity: 1,
          skewX: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // SVG Squiggly Line Drawing Animation (scroll progress effect)
      if (lineRef.current) {
        const refreshSquigglyLine = () => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        };
        
        // Track if we've already registered the load listener
        let loadListenerRegistered = false;
        
        const initSquigglyLine = () => {
          if (!lineRef.current) return;
          
          requestAnimationFrame(() => {
            if (!lineRef.current) return;
            
            const length = lineRef.current.getTotalLength();
            gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
            
            gsap.to(lineRef.current, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              }
            });
            
            // Refresh after resources load (only register once)
            if (document.readyState === 'complete') {
              refreshSquigglyLine();
            } else if (!loadListenerRegistered) {
              loadListenerRegistered = true;
              window.addEventListener('load', refreshSquigglyLine);
              loadListeners.push(() => window.removeEventListener('load', refreshSquigglyLine));
            }
          });
        };
        
        initSquigglyLine();
      }

      // Icon Animation: Animate in on scroll, hover animation
      if (iconRef.current) {
        const calculateIconLengths = () => {
          const svgElements = iconRef.current?.querySelectorAll('path, rect, line, circle');
          if (!svgElements) return;
          
          const elementLengths: Map<SVGElement, number> = new Map();
          
          // Calculate and store lengths for all elements
          svgElements.forEach((element) => {
            let length = 1000;
            if ('getTotalLength' in element && typeof (element as SVGPathElement).getTotalLength === 'function') {
              length = (element as SVGPathElement).getTotalLength();
            } else if (element instanceof SVGRectElement) {
              // Approximate length for rect: perimeter
              const width = element.width?.baseVal?.value || 0;
              const height = element.height?.baseVal?.value || 0;
              length = (width + height) * 2;
            } else if (element instanceof SVGLineElement) {
              // Calculate line length using distance formula
              const x1 = element.x1?.baseVal?.value || 0;
              const y1 = element.y1?.baseVal?.value || 0;
              const x2 = element.x2?.baseVal?.value || 0;
              const y2 = element.y2?.baseVal?.value || 0;
              length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            } else if (element instanceof SVGCircleElement) {
              // Approximate circle circumference
              const r = element.r?.baseVal?.value || 0;
              length = 2 * Math.PI * r;
            }
            
            elementLengths.set(element, length);
            
            // Initialize as hidden
            gsap.set(element, { 
              strokeDasharray: length, 
              strokeDashoffset: length 
            });
          });
          
          return elementLengths;
        };
        
        // Calculate lengths after a brief delay to ensure SVG is fully rendered
        const elementLengths = new Map<SVGElement, number>();
        const initIconLengths = () => {
          requestAnimationFrame(() => {
            const lengths = calculateIconLengths();
            if (lengths) {
              lengths.forEach((value, key) => elementLengths.set(key, value));
            }
          });
        };
        
        initIconLengths();
        
        // Also recalculate after fonts/resources load
        if (document.readyState === 'complete') {
          initIconLengths();
        } else {
          window.addEventListener('load', initIconLengths);
          loadListeners.push(() => window.removeEventListener('load', initIconLengths));
        }
        
        const svgElements = iconRef.current.querySelectorAll('path, rect, line, circle');
        let hasAnimatedIn = false;
        const iconType = iconRef.current.querySelector('svg')?.dataset.iconType;
        const animateAsGroup = iconType === 'sliders';
        
        // Scroll-triggered animation: animate in once when section comes into view.
        // Use a more forgiving start so it also triggers for sections near the bottom
        // like Publications and Skills on shorter viewports.
        const scrollTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 95%", // when section top is near bottom of viewport
          onEnter: () => {
            if (!hasAnimatedIn) {
              hasAnimatedIn = true;
              // Recalculate lengths before animating to ensure accuracy
              const lengths = calculateIconLengths();
              if (lengths) {
                lengths.forEach((value, key) => elementLengths.set(key, value));
                // Re-initialize with correct lengths
                svgElements.forEach((element) => {
                  const length = elementLengths.get(element) || 1000;
                  gsap.set(element, { 
                    strokeDasharray: length, 
                    strokeDashoffset: length 
                  });
                });
              }
              
              if (animateAsGroup) {
                const groupDuration = iconType === 'paperclip' || iconType === 'sliders' ? 0.8 : 0.45;
                gsap.to(Array.from(svgElements), {
                  strokeDashoffset: 0,
                  duration: groupDuration,
                  ease: "power1.out",
                  stagger: 0.01,
                });
              } else {
                const strokeDuration = iconType === 'paperclip' || iconType === 'sliders' ? 1.1 : 0.8;
                const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
                svgElements.forEach((element, index) => {
                  tl.to(element, {
                    strokeDashoffset: 0,
                    duration: strokeDuration,
                  }, index * 0.03);
                });
              }
            }
          }
        });
        
        // Refresh ScrollTrigger after resources load
        const refreshScrollTrigger = () => {
          requestAnimationFrame(() => {
            scrollTrigger?.refresh();
          });
        };
        
        if (document.readyState === 'complete') {
          refreshScrollTrigger();
        } else {
          window.addEventListener('load', refreshScrollTrigger);
          loadListeners.push(() => window.removeEventListener('load', refreshScrollTrigger));
        }
        
        // Default hover animations for each icon type
        const svg = iconRef.current.querySelector('svg');
        const currentIconRef = iconRef.current;
        
        const playDefaultAnimation = () => {
          if (!svg) return;
          
          // Icon-specific animations based on icon type
          switch (iconType) {
            case 'clipboard-check':
            case 'circle-check':
            case 'badge-check': {
              // Checkmark animation - draw the check path
              const checkPath = svg.querySelector('path:last-child');
              if (checkPath) {
                const length = elementLengths.get(checkPath) || 20;
                gsap.fromTo(checkPath, 
                  { strokeDashoffset: length },
                  { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }
                );
              }
              break;
            }
            case 'layers': {
              // Layers float up and down
              const paths = svg.querySelectorAll('path');
              paths.forEach((path, i) => {
                gsap.to(path, {
                  y: i === 0 ? -2 : i === 1 ? 0 : 2,
                  duration: 0.2,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.to(path, {
                      y: 0,
                      duration: 0.3,
                      ease: "elastic.out(1, 0.5)",
                    });
                  }
                });
              });
              break;
            }
            case 'paperclip': {
              // Paperclip rotates slightly
              gsap.to(svg, {
                rotation: 15,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(svg, {
                    rotation: 0,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)",
                  });
                }
              });
              break;
            }
            case 'sliders': {
              // Sliders - animate the horizontal handle lines
              const handles = svg.querySelectorAll('line:nth-child(n+7)');
              handles.forEach((handle, i) => {
                const direction = i % 2 === 0 ? 1 : -1;
                gsap.to(handle, {
                  x: direction * 2,
                  duration: 0.15,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.to(handle, {
                      x: 0,
                      duration: 0.3,
                      ease: "elastic.out(1, 0.5)",
                    });
                  }
                });
              });
              break;
            }
            default: {
              // Default: just the scale animation already applied above
              break;
            }
          }
        };
        
        currentIconRef.addEventListener('mouseenter', playDefaultAnimation);
        
        // Cleanup
        return () => {
          currentIconRef.removeEventListener('mouseenter', playDefaultAnimation);
        };
      }

      // Content Staggered Fade In
      gsap.fromTo(contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateLineWidth);
      loadListeners.forEach(cleanup => cleanup());
    };
  }, []);

  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[titleAlign];

  const justifyClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }[titleAlign];

  const scrollAnimationType = 'path';
  const hoverAnimationType = 'default';
  const enhancedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        animation: scrollAnimationType,
        animateOnView: scrollAnimationType,
        animateOnHover: hoverAnimationType,
        'data-animation': scrollAnimationType,
        'data-animate-on-hover': hoverAnimationType,
      })
    : icon;

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`relative py-12 px-6 md:px-12 max-w-6xl mx-auto ${className}`}
    >
      <div className={`mb-8 flex flex-col text-center items-center md:${alignClass} relative z-10`}>
        <div className={`flex items-center justify-center md:${justifyClass} gap-4`}>
          {icon && (
            <div
              ref={iconRef}
              className="clickable flex-shrink-0 text-ink-900 section-icon"
              data-animate-hover={hoverAnimationType}
              data-animation={scrollAnimationType}
            >
              {enhancedIcon}
            </div>
          )}
          <div className="flex flex-col items-center">
            <h2 
              ref={titleRef}
              className="font-serif text-4xl md:text-7xl text-ink-900 font-bold tracking-tight text-ink-bleed whitespace-nowrap md:whitespace-normal"
              style={{ mixBlendMode: 'multiply' }}
            >
              {title}
            </h2>
            
            {/* Animated Squiggly Ink Line Underline */}
            {!noSeparator && (
              <svg 
                ref={lineSvgRef}
                className="block -mt-1 md:-mt-2 h-3 md:h-4 overflow-visible" 
                viewBox="0 0 400 20" 
                preserveAspectRatio="none"
              >
                <path 
                  ref={lineRef}
                  d="M2,10 
                     C20,4 30,16 50,10 
                     C70,4 80,16 100,10 
                     C120,4 130,16 150,10 
                     C170,4 180,16 200,10 
                     C220,4 230,16 250,10 
                     C270,4 280,16 300,10 
                     C320,4 330,16 350,10 
                     C370,4 380,16 398,10" 
                  fill="none" 
                  stroke="#1a1a1a"
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </section>
  );
};