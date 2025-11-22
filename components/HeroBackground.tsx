import React from 'react';

interface HeroBackgroundProps {
  children: React.ReactNode;
}

export function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Base USF Green gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#006747] via-[#008056] to-[#006747]"
        style={{
          backgroundImage: 'linear-gradient(135deg, #006747 0%, #008056 50%, #005a3c 100%)',
        }}
      />
      
      {/* Gold accent overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #CFC493 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, #CFC493 0%, transparent 50%)`,
        }}
      />

      {/* Abstract campus silhouettes - palm trees and buildings */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-64 opacity-20"
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Building silhouettes */}
        <rect x="50" y="180" width="80" height="140" fill="#004d33" opacity="0.6" />
        <rect x="150" y="200" width="60" height="120" fill="#004d33" opacity="0.5" />
        <rect x="230" y="160" width="100" height="160" fill="#004d33" opacity="0.7" />
        
        {/* Palm trees */}
        <g transform="translate(400, 200)">
          <rect x="18" y="0" width="4" height="120" fill="#004d33" opacity="0.6" />
          <ellipse cx="20" cy="-10" rx="25" ry="15" fill="#004d33" opacity="0.5" />
          <ellipse cx="20" cy="-5" rx="22" ry="12" fill="#004d33" opacity="0.6" />
        </g>
        
        <g transform="translate(600, 220)">
          <rect x="18" y="0" width="4" height="100" fill="#004d33" opacity="0.5" />
          <ellipse cx="20" cy="-10" rx="23" ry="14" fill="#004d33" opacity="0.4" />
          <ellipse cx="20" cy="-5" rx="20" ry="11" fill="#004d33" opacity="0.5" />
        </g>

        <g transform="translate(900, 190)">
          <rect x="18" y="0" width="4" height="130" fill="#004d33" opacity="0.6" />
          <ellipse cx="20" cy="-10" rx="26" ry="16" fill="#004d33" opacity="0.5" />
          <ellipse cx="20" cy="-5" rx="23" ry="13" fill="#004d33" opacity="0.6" />
        </g>

        {/* More buildings */}
        <rect x="1100" y="170" width="90" height="150" fill="#004d33" opacity="0.6" />
        <rect x="1210" y="190" width="70" height="130" fill="#004d33" opacity="0.5" />
        <rect x="1300" y="210" width="60" height="110" fill="#004d33" opacity="0.4" />
      </svg>

      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23CFC493' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Soft blur vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 103, 71, 0.3) 100%)',
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
