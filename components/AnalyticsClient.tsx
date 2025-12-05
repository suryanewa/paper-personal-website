import { useEffect } from 'react';

// Load Vercel Analytics via script tag to avoid build-time package resolution issues
export const AnalyticsClient: React.FC = () => {
  useEffect(() => {
    // Only load in production and on vercel.app or custom domains
    if (typeof window === 'undefined') return;
    
    // Check if already loaded
    if (document.querySelector('script[src*="va.vercel-scripts.com"]')) return;

    const script = document.createElement('script');
    script.src = '/_vercel/insights/script.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup not needed - script should persist
    };
  }, []);

  return null;
};

