import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AMOUNT = 20;
const SINE_DOTS = Math.floor(AMOUNT * 0.3);
const WIDTH = 26;
const IDLE_TIMEOUT = 150;

class Dot {
  index: number;
  anglespeed: number;
  x: number;
  y: number;
  scale: number;
  range: number;
  limit: number;
  element: HTMLSpanElement;
  lockX: number = 0;
  lockY: number = 0;
  angleX: number = 0;
  angleY: number = 0;

  constructor(index: number, element: HTMLSpanElement) {
    this.index = index;
    this.anglespeed = 0.05;
    this.x = 0;
    this.y = 0;
    this.scale = 1 - 0.05 * index;
    this.range = WIDTH / 2 - WIDTH / 2 * this.scale + 2;
    this.limit = WIDTH * 0.75 * this.scale;
    this.element = element;
    gsap.set(this.element, { scale: this.scale });
  }

  lock() {
    this.lockX = this.x;
    this.lockY = this.y;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
  }

  draw(idle: boolean) {
    if (!idle || this.index <= SINE_DOTS) {
      gsap.set(this.element, { x: this.x, y: this.y });
    } else {
      this.angleX += this.anglespeed;
      this.angleY += this.anglespeed;
      this.y = this.lockY + Math.sin(this.angleY) * this.range;
      this.x = this.lockX + Math.sin(this.angleX) * this.range;
      gsap.set(this.element, { x: this.x, y: this.y });
    }
  }
}

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idle = useRef(false);
  const isHovering = useRef(false);
  const hoverAnimationFrame = useRef<number | null>(null);
  const hoverTarget = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    // Check if mobile (screen width < 768px) - don't hide cursor on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Force-hide native cursor at runtime - use simple 'none', not url()
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const prevHtmlCursor = htmlEl.style.cursor;
    const prevBodyCursor = bodyEl.style.cursor;
    htmlEl.style.setProperty('cursor', 'none', 'important');
    bodyEl.style.setProperty('cursor', 'none', 'important');

    // Inject a simple but high-priority style
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-cursor-hide', 'true');
    styleEl.textContent = `
      html, body, * {
        cursor: none !important;
      }
      input, textarea, [contenteditable="true"] {
        cursor: none !important;
        caret-color: currentColor;
      }
    `;
    document.body.appendChild(styleEl);

    const container = containerRef.current;
    if (!container) {
      return () => {
        htmlEl.style.cursor = prevHtmlCursor;
        bodyEl.style.cursor = prevBodyCursor;
        if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      };
    }

    // Cursor is hidden via CSS in index.html for better coverage

    // Initialize dots
    const dotElements = container.querySelectorAll('span');
    dotsRef.current = Array.from(dotElements).map((el, i) => new Dot(i, el as HTMLSpanElement));
    
    // Idle timer functions - exactly like original
    const goInactive = () => {
      idle.current = true;
      for (const dot of dotsRef.current) {
        dot.lock();
      }
    };

    const startIdleTimer = () => {
      idleTimeout.current = setTimeout(goInactive, IDLE_TIMEOUT);
      idle.current = false;
    };

    const resetIdleTimer = () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      startIdleTimer();
    };

    // Mouse move - store actual cursor position (translate(-50%, -50%) on spans centers them)
    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
      resetIdleTimer();
    };

    const onTouchMove = (e: TouchEvent) => {
      mousePosition.current.x = e.touches[0].clientX;
      mousePosition.current.y = e.touches[0].clientY;
      resetIdleTimer();
    };

    // Position cursor - exactly like original
    const positionCursor = () => {
      // Skip normal positioning when hovering
      if (isHovering.current) return;

      let x = mousePosition.current.x;
      let y = mousePosition.current.y;

      dotsRef.current.forEach((dot, index, dots) => {
        const nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw(idle.current);

        if (!idle.current || index <= SINE_DOTS) {
          const dx = (nextDot.x - dot.x) * 0.35;
          const dy = (nextDot.y - dot.y) * 0.35;
          x += dx;
          y += dy;
        }
      });
    };

    // Render loop - exactly like original
    const render = () => {
      positionCursor();
      requestAnimationFrame(render);
    };

    // Start
    startIdleTimer();
    requestAnimationFrame(render);

    // ============ HOVER BLOB EFFECTS (separate from original cursor logic) ============
    const onMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (!target) return;

      isHovering.current = true;

      const rect = target.getBoundingClientRect();
      // Actual center of the element (translate(-50%, -50%) on spans will center them here)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Check for blob shape preference
      const blobShape = target.getAttribute('data-blob-shape') || 'pill';
      
      // Smaller padding for rectangle shape
      const paddingX = blobShape === 'rectangle' ? 8 : 20;
      const paddingY = blobShape === 'rectangle' ? 6 : 16;

      hoverTarget.current = {
        x: centerX,
        y: centerY,
        width: rect.width + paddingX,
        height: rect.height + paddingY,
      };

      // Change blending mode for the inverse effect
      gsap.to(container, { mixBlendMode: 'difference', duration: 0.3 });

      // Animate dots to blob positions
      let time = 0;
      const animateBlob = () => {
        if (!isHovering.current || !hoverTarget.current) return;

        time += 0.02;
        const t = hoverTarget.current;
        const halfWidth = t.width / 2;
        const halfHeight = t.height / 2;

        dotsRef.current.forEach((dot, i) => {
          const baseAngle = (i / AMOUNT) * Math.PI * 2;

          let targetX: number, targetY: number, targetScaleX: number, targetScaleY: number;

          if (blobShape === 'rectangle') {
            // ROUNDED RECTANGLE SHAPE
            const cornerRadius = 8;
            
            if (i < 8) {
              // Core dots - fill the center area
              const gridX = (i % 4) / 3 - 0.5; // -0.5 to 0.5
              const gridY = Math.floor(i / 4) / 1 - 0.5;
              const wobbleX = Math.sin(time * 2 + i * 0.8) * 3;
              const wobbleY = Math.cos(time * 2.3 + i * 0.9) * 3;
              const coreScale = 0.9 + Math.sin(time * 1.5 + i) * 0.08;

              targetX = t.x + gridX * (t.width - cornerRadius) * 0.8 + wobbleX;
              targetY = t.y + gridY * (t.height - cornerRadius) * 0.6 + wobbleY;
              targetScaleX = (t.width / WIDTH) * coreScale * 0.5;
              targetScaleY = (t.height / WIDTH) * coreScale * 0.8;
            } else {
              // Edge dots - follow rounded rectangle perimeter
              const edgeIndex = i - 8;
              const totalEdgeDots = AMOUNT - 8;
              const perimeter = 2 * (t.width + t.height - 4 * cornerRadius) + 2 * Math.PI * cornerRadius;
              const distanceAlongPerimeter = ((edgeIndex / totalEdgeDots) * perimeter + time * 15) % perimeter;
              
              // Calculate position along rounded rectangle
              const topEdge = t.width - 2 * cornerRadius;
              const rightEdge = topEdge + t.height - 2 * cornerRadius;
              const bottomEdge = rightEdge + t.width - 2 * cornerRadius;
              const leftEdge = bottomEdge + t.height - 2 * cornerRadius;
              const corner1 = leftEdge + Math.PI * cornerRadius / 2;
              const corner2 = corner1 + Math.PI * cornerRadius / 2;
              const corner3 = corner2 + Math.PI * cornerRadius / 2;
              const corner4 = corner3 + Math.PI * cornerRadius / 2;

              let px = 0, py = 0;
              const wobble = Math.sin(time * 3 + edgeIndex) * 2;
              
              if (distanceAlongPerimeter < topEdge) {
                // Top edge
                px = -halfWidth + cornerRadius + distanceAlongPerimeter;
                py = -halfHeight + wobble;
              } else if (distanceAlongPerimeter < topEdge + Math.PI * cornerRadius / 2) {
                // Top-right corner
                const angle = (distanceAlongPerimeter - topEdge) / cornerRadius;
                px = halfWidth - cornerRadius + Math.sin(angle) * cornerRadius;
                py = -halfHeight + cornerRadius - Math.cos(angle) * cornerRadius + wobble * 0.5;
              } else if (distanceAlongPerimeter < rightEdge + Math.PI * cornerRadius / 2) {
                // Right edge
                px = halfWidth + wobble;
                py = -halfHeight + cornerRadius + (distanceAlongPerimeter - topEdge - Math.PI * cornerRadius / 2);
              } else if (distanceAlongPerimeter < rightEdge + Math.PI * cornerRadius) {
                // Bottom-right corner
                const angle = (distanceAlongPerimeter - rightEdge - Math.PI * cornerRadius / 2) / cornerRadius;
                px = halfWidth - cornerRadius + Math.cos(angle) * cornerRadius + wobble * 0.5;
                py = halfHeight - cornerRadius + Math.sin(angle) * cornerRadius;
              } else if (distanceAlongPerimeter < bottomEdge + Math.PI * cornerRadius) {
                // Bottom edge
                px = halfWidth - cornerRadius - (distanceAlongPerimeter - rightEdge - Math.PI * cornerRadius);
                py = halfHeight + wobble;
              } else if (distanceAlongPerimeter < bottomEdge + 1.5 * Math.PI * cornerRadius) {
                // Bottom-left corner
                const angle = (distanceAlongPerimeter - bottomEdge - Math.PI * cornerRadius) / cornerRadius;
                px = -halfWidth + cornerRadius - Math.sin(angle) * cornerRadius + wobble * 0.5;
                py = halfHeight - cornerRadius + Math.cos(angle) * cornerRadius;
              } else if (distanceAlongPerimeter < leftEdge + 1.5 * Math.PI * cornerRadius) {
                // Left edge
                px = -halfWidth + wobble;
                py = halfHeight - cornerRadius - (distanceAlongPerimeter - bottomEdge - 1.5 * Math.PI * cornerRadius);
              } else {
                // Top-left corner
                const angle = (distanceAlongPerimeter - leftEdge - 1.5 * Math.PI * cornerRadius) / cornerRadius;
                px = -halfWidth + cornerRadius - Math.cos(angle) * cornerRadius + wobble * 0.5;
                py = -halfHeight + cornerRadius - Math.sin(angle) * cornerRadius;
              }

              targetX = t.x + px;
              targetY = t.y + py;
              const edgeScale = 0.35 + Math.sin(time * 2 + edgeIndex * 0.5) * 0.1;
              targetScaleX = edgeScale;
              targetScaleY = edgeScale;
            }
          } else {
            // PILL SHAPE (default)
            if (i < 6) {
              // Core dots - stay near center with gentle wobble
              const wobbleX = Math.sin(time * 2 + i * 0.8) * 5;
              const wobbleY = Math.cos(time * 2.3 + i * 0.9) * 5;
              const coreScale = 0.85 + Math.sin(time * 1.5 + i) * 0.1;

              targetX = t.x + wobbleX;
              targetY = t.y + wobbleY;
              targetScaleX = (t.width / WIDTH) * coreScale;
              targetScaleY = (t.height / WIDTH) * coreScale;
            } else if (i < 14) {
              // Orbiting blobs - create the blobby edge
              const angle = baseAngle + time * 0.3;
              const radiusNoise = Math.sin(time * 2.5 + baseAngle * 2) * 0.3;
              const radius = 0.4 + radiusNoise * 0.2;

              const offsetX = Math.cos(angle) * halfWidth * radius;
              const offsetY = Math.sin(angle) * halfHeight * radius;
              const wobbleX = Math.sin(time * 2.5 + i) * 6;
              const wobbleY = Math.cos(time * 2.2 + i) * 6;
              const blobScale = 0.5 + Math.sin(time * 2 + baseAngle) * 0.2;

              targetX = t.x + offsetX + wobbleX;
              targetY = t.y + offsetY + wobbleY;
              targetScaleX = (t.width / WIDTH) * blobScale * 0.6;
              targetScaleY = (t.height / WIDTH) * blobScale * 0.6;
            } else {
              // Splatter dots - extend outward
              const splatterAngle = baseAngle + Math.sin(time * 0.4 + i) * 0.2;
              const extension = 0.6 + Math.sin(time * 1.8 + i * 2) * 0.3;

              targetX = t.x + Math.cos(splatterAngle) * halfWidth * extension;
              targetY = t.y + Math.sin(splatterAngle) * halfHeight * extension;
              const splatterScale = 0.25 + Math.sin(time * 2.5 + i) * 0.15;
              targetScaleX = (t.width / WIDTH) * splatterScale * 0.4;
              targetScaleY = (t.height / WIDTH) * splatterScale * 0.4;
            }
          }

          // Smooth transition
          gsap.to(dot.element, {
            x: targetX,
            y: targetY,
            scaleX: targetScaleX,
            scaleY: targetScaleY,
            backgroundColor: 'white',
            duration: 0.15,
            ease: 'power1.out',
            overwrite: 'auto',
          });

          dot.x = targetX;
          dot.y = targetY;
        });

        hoverAnimationFrame.current = requestAnimationFrame(animateBlob);
      };

      animateBlob();
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      hoverTarget.current = null;

      // Cancel the blob animation
      if (hoverAnimationFrame.current) {
        cancelAnimationFrame(hoverAnimationFrame.current);
        hoverAnimationFrame.current = null;
      }

      // Revert blend mode
      gsap.to(container, { mixBlendMode: 'difference', duration: 0.3 });

      // Reset scales immediately so render loop can take over
      dotsRef.current.forEach((dot) => {
        gsap.killTweensOf(dot.element);
        
        gsap.to(dot.element, {
          scale: dot.scale,
          scaleX: 1,
          scaleY: 1,
          backgroundColor: '#fff',
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      // The render loop will handle position - it's already running
    };

    // Attach hover listeners
    const clickables = document.querySelectorAll('a, button, .clickable');
    clickables.forEach((el) => {
      if (el.classList.contains('no-cursor-blob')) return;
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Handle elements with data-blob-target attribute (hover on parent triggers blob on child)
    // Store listeners for proper cleanup
    const blobTriggers = document.querySelectorAll('[data-blob-target]');
    const triggerListeners: { el: Element; enter: (e: Event) => void }[] = [];
    
    blobTriggers.forEach((el) => {
      const targetSelector = el.getAttribute('data-blob-target');
      if (!targetSelector) return;
      
      const onTriggerEnter = (e: Event) => {
        const target = el.querySelector(targetSelector) as HTMLElement;
        if (target) {
          // Create a fake event with the target element
          const fakeEvent = { currentTarget: target } as unknown as MouseEvent;
          onMouseEnter(fakeEvent);
        }
      };
      
      triggerListeners.push({ el, enter: onTriggerEnter });
      el.addEventListener('mouseenter', onTriggerEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      // Restore previous cursor styles
      htmlEl.style.cursor = prevHtmlCursor;
      bodyEl.style.cursor = prevBodyCursor;
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      clickables.forEach((el) => {
        if (el.classList.contains('no-cursor-blob')) return;
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      // Remove blob trigger listeners using stored references
      triggerListeners.forEach(({ el, enter }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (hoverAnimationFrame.current) cancelAnimationFrame(hoverAnimationFrame.current);
    };
  }, []);

  return (
    <>
      {/* SVG Filter for the Gooey Effect - exactly like original */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Ink Cursor Container - styled exactly like original .Cursor class */}
      <div 
        ref={containerRef}
        className="fixed top-0 left-0 pointer-events-none z-[1000] hidden md:block"
        style={{
          borderRadius: 0,
          transformOrigin: 'center center',
          mixBlendMode: 'difference',
          filter: 'url("#goo")',
        }}
      >
        {/* Spans styled exactly like original .Cursor span */}
        {[...Array(AMOUNT)].map((_, i) => (
          <span
            key={i}
            className="absolute block"
            style={{
              width: `${WIDTH}px`,
              height: `${WIDTH}px`,
              borderRadius: '20px',
              backgroundColor: '#fff',
              transformOrigin: 'center center',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </>
  );
};
