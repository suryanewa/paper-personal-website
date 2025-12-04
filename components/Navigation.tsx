import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Tape } from './Tape';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'competitions', label: 'Awards' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      setIsMenuVisible(true);
    } else {
      // Restore body styles
      const savedScrollY = scrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      // Restore scroll position after a brief delay to ensure styles are applied
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollY);
      });
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      // Enter animation
      gsap.fromTo(menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      const items = menuRef.current.querySelectorAll('li');
      gsap.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)", delay: 0.1 }
      );
    } else if (isMenuVisible) {
      // Exit animation
      const items = menuRef.current.querySelectorAll('li');
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          setIsMenuVisible(false);
        }
      });
      
      exitTimeline.to(items,
        { y: -20, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" },
        0
      );
      exitTimeline.to(menuRef.current,
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        0.1
      );
    }
  }, [isMenuOpen, isMenuVisible]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    let ctx: gsap.Context | null = null;
    const loadListeners: (() => void)[] = [];
    
    const refreshProgressBar = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
    
    const initProgressBar = () => {
      if (!pathRef.current || ctx) return; // Only initialize once
      
      requestAnimationFrame(() => {
        if (!pathRef.current) return;
        
        const length = pathRef.current.getTotalLength();
        
        // Set initial state
        gsap.set(pathRef.current, { 
          strokeDasharray: length, 
          strokeDashoffset: length 
        });

        // Animate based on scroll progress through the entire page
        ctx = gsap.context(() => {
          gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1, // Smooth scrubbing with 1 second lag
            }
          });
        }, navRef);
      });
    };
    
    const refreshProgressBarAfterLoad = () => {
      requestAnimationFrame(() => {
        if (pathRef.current && ctx) {
          // Recalculate length after fonts load
          const length = pathRef.current.getTotalLength();
          gsap.set(pathRef.current, { 
            strokeDasharray: length, 
            strokeDashoffset: length 
          });
          ScrollTrigger.refresh();
        }
      });
    };
    
    initProgressBar();
    
    // Refresh after fonts/resources load (but don't reinitialize)
    if (document.readyState === 'complete') {
      refreshProgressBarAfterLoad();
    } else {
      window.addEventListener('load', refreshProgressBarAfterLoad);
      loadListeners.push(() => window.removeEventListener('load', refreshProgressBarAfterLoad));
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
      loadListeners.forEach(cleanup => cleanup());
    };
  }, []);

  const scrollToSection = (id: string, closeMenu: boolean = false) => {
    if (closeMenu) {
      // Close menu first, then scroll after body is restored
      setIsMenuOpen(false);
      // Wait for body styles to be restored before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(id);
          if (element) {
            // Get the saved scroll position and calculate offset
            const savedScrollY = scrollYRef.current;
            const elementTop = element.getBoundingClientRect().top + savedScrollY;
            window.scrollTo({ top: elementTop, behavior: 'smooth' });
          }
        });
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-wrap justify-center gap-16">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="clickable block"
              >
                <Tape rotate={index % 2 === 0 ? 1 : -1}>
                  <span className="font-hand text-xl text-ink-800 whitespace-nowrap">
                    {item.label}
                  </span>
                </Tape>
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end">
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="clickable relative z-50 p-2 -mr-2"
            aria-label="Open Menu"
          >
            <div className="bg-[#fceba4]/90 backdrop-blur-sm p-2 shadow-sm" style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%)'
            }}>
              <Menu size={28} className="text-ink-900" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuVisible && (
        <div 
          ref={menuRef}
          className="fixed inset-0 z-[70] bg-[#fdfbf6] flex flex-col items-center justify-center"
          onClick={(e) => {
            // Close menu when clicking on overlay background (not on menu items)
            if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.menu-background')) {
              setIsMenuOpen(false);
            }
          }}
        >
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 menu-background"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
            }}
          />
          
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 clickable p-4 text-ink-900 z-50"
            aria-label="Close Menu"
          >
            <div className="bg-[#fceba4]/90 p-2 shadow-sm" style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%)'
            }}>
              <X size={32} />
            </div>
          </button>
          
          <ul 
            className="flex flex-col gap-10 items-center relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id, true)}
                  className="clickable block transform hover:scale-110 transition-transform duration-300"
                >
                  <Tape rotate={index % 2 === 0 ? 2 : -2} className="scale-125">
                    <span className="font-hand text-4xl text-ink-800 whitespace-nowrap px-4">
                      {item.label}
                    </span>
                  </Tape>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Squiggly Ink Progress Bar */}
      <div className="w-full mt-2 overflow-hidden">
        <svg 
          className="w-full h-3" 
          viewBox="0 0 1200 12" 
          preserveAspectRatio="none"
        >
          {/* Background squiggle (faint) */}
          <path 
            d="M0,6 Q30,2 60,6 T120,6 T180,6 T240,6 T300,6 T360,6 T420,6 T480,6 T540,6 T600,6 T660,6 T720,6 T780,6 T840,6 T900,6 T960,6 T1020,6 T1080,6 T1140,6 T1200,6"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.1"
          />
          {/* Progress squiggle */}
          <path 
            ref={pathRef}
            d="M0,6 Q30,2 60,6 T120,6 T180,6 T240,6 T300,6 T360,6 T420,6 T480,6 T540,6 T600,6 T660,6 T720,6 T780,6 T840,6 T900,6 T960,6 T1020,6 T1080,6 T1140,6 T1200,6"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </svg>
      </div>
    </nav>
  );
};

