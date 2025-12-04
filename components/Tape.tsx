import React from 'react';

interface TapeProps {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}

export const Tape: React.FC<TapeProps> = ({ children, className = '', rotate = 1 }) => {
  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Tape Background with jagged edges using clip-path */}
      <div 
        className="absolute top-0 bottom-0 bg-[#fceba4]/50 shadow-sm z-0"
        style={{
          left: '-12px',
          right: '-12px',
          clipPath: 'polygon(0% 0%, 100% 0%, 98% 5%, 100% 10%, 98% 15%, 100% 20%, 98% 25%, 100% 30%, 98% 35%, 100% 40%, 98% 45%, 100% 50%, 98% 55%, 100% 60%, 98% 65%, 100% 70%, 98% 75%, 100% 80%, 98% 85%, 100% 90%, 98% 95%, 100% 100%, 0% 100%, 2% 95%, 0% 90%, 2% 85%, 0% 80%, 2% 75%, 0% 70%, 2% 65%, 0% 60%, 2% 55%, 0% 50%, 2% 45%, 0% 40%, 2% 35%, 0% 30%, 2% 25%, 0% 20%, 2% 15%, 0% 10%, 2% 5%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
      {/* Subtle texture overlay */}
      <div 
        className="absolute top-0 bottom-0 left-[-12px] right-[-12px] z-0 opacity-30 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          clipPath: 'polygon(0% 0%, 100% 0%, 98% 5%, 100% 10%, 98% 15%, 100% 20%, 98% 25%, 100% 30%, 98% 35%, 100% 40%, 98% 45%, 100% 50%, 98% 55%, 100% 60%, 98% 65%, 100% 70%, 98% 75%, 100% 80%, 98% 85%, 100% 90%, 98% 95%, 100% 100%, 0% 100%, 2% 95%, 0% 90%, 2% 85%, 0% 80%, 2% 75%, 0% 70%, 2% 65%, 0% 60%, 2% 55%, 0% 50%, 2% 45%, 0% 40%, 2% 35%, 0% 30%, 2% 25%, 0% 20%, 2% 15%, 0% 10%, 2% 5%)',
        }}
      />
      <div className="relative z-10 px-1 py-0.5">
        {children}
      </div>
    </div>
  );
};

