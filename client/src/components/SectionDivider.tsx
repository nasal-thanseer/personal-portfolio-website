import React from "react";

type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`w-full py-12 md:py-16 lg:py-24 relative ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px bg-secondary/60 relative">
          {/* Center cross with dots on ends */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
            {/* Horizontal line */}
            <div className="w-full h-px bg-secondary absolute">
              {/* Left dot */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"></div>
              {/* Right dot */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"></div>
            </div>
            
            {/* Vertical line */}
            <div className="h-full w-px bg-secondary absolute">
              {/* Top dot */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"></div>
              {/* Bottom dot */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"></div>
            </div>
            
            {/* Center dot */}
            <div className="absolute w-2 h-2 rounded-full bg-accent"></div>
          </div>
        </div>
        
        {/* Additional grid lines for visual interest */}
        <div className="absolute top-1/2 left-1/4 w-3 h-3">
          <div className="w-full h-px bg-secondary/40 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="h-full w-px bg-secondary/40 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        <div className="absolute top-1/2 right-1/4 w-3 h-3">
          <div className="w-full h-px bg-secondary/40 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="h-full w-px bg-secondary/40 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}