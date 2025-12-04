import React from 'react';

interface InkSplatterProps {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export const InkSplatter: React.FC<InkSplatterProps> = ({ className = "", color = "#0a0a23", style }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute pointer-events-none opacity-10 mix-blend-multiply ${className}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M94.6,98.2c-1.4-8.8-13.3-15.6-19.6-11.2c-5.4,3.8-2.5,15.1,1.1,20c4.1,5.6,14.6,7.6,18.9,2.6
        C97.5,106.8,96.4,103.5,94.6,98.2z M125.1,75.8c-6.6-4.9-15.6,2.1-15.1,10.2c0.4,6.4,8.8,9.8,14.2,6.4
        C129.5,89.1,130.4,80.3,125.1,75.8z M58.4,124.8c-4.9-2.5-10.9,0.7-11.6,6.2c-0.6,4.6,3.5,8.8,8.1,8.4
        C59.9,139,63.1,127.3,58.4,124.8z M145.5,125.5c-3.1-6.1-12.8-5.6-14.9,0.9c-2,6.1,4.3,12.3,10.2,10.7
        C145.4,135.9,147.9,130.2,145.5,125.5z M100,0C44.8,0,0,44.8,0,100s44.8,100,100,100s100-44.8,100-100S155.2,0,100,0z
        M100,180c-44.2,0-80-35.8-80-80s35.8-80,80-80s80,35.8,80,80S144.2,180,100,180z"
      />
      {/* Random smaller droplets */}
      <circle cx="140" cy="50" r="3" fill={color} />
      <circle cx="40" cy="150" r="2" fill={color} />
      <circle cx="160" cy="140" r="4" fill={color} />
      <circle cx="30" cy="80" r="2.5" fill={color} />
    </svg>
  );
};
