import { useEffect } from 'react';

// Minimal client-side Analytics initialization that avoids subpath resolution issues
// in certain build environments (e.g., Vercel with Vite/ESM).
export const AnalyticsClient: React.FC = () => {
  useEffect(() => {
    let cancelled = false;
    // Dynamically import the base package (not the /react subpath) to avoid Rollup resolution errors.
    import('@vercel/analytics')
      .then((mod) => {
        if (cancelled) return;
        // Prefer the React Analytics component if available; otherwise, inject directly.
        if (mod.inject) {
          mod.inject();
        }
        // If a track function exists, trigger an initial pageview to align with the React helper.
        if (mod.track) {
          mod.track('pageview');
        }
      })
      .catch(() => {
        // Swallow errors silently; analytics is non-critical.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

