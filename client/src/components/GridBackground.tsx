import React from "react";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="container mx-auto h-full relative">
        {/* Major vertical grid lines */}
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(13)].map((_, i) => (
            <div 
              key={`v-${i}`} 
              className={`border-r ${i % 4 === 0 ? 'border-primary/15' : 'border-primary/5'} h-full`}
            />
          ))}
        </div>
        
        {/* Major horizontal grid lines */}
        <div className="absolute inset-0 grid grid-rows-12 w-full">
          {[...Array(13)].map((_, i) => (
            <div 
              key={`h-${i}`} 
              className={`border-b ${i % 4 === 0 ? 'border-primary/15' : 'border-primary/5'} w-full`}
            />
          ))}
        </div>
        
        {/* Grid overlay pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-[repeat(24,1fr)] h-full w-full">
            {[...Array(25)].map((_, i) => (
              <div key={`mini-v-${i}`} className="border-r border-primary/10 h-full" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-[repeat(24,1fr)] w-full">
            {[...Array(25)].map((_, i) => (
              <div key={`mini-h-${i}`} className="border-b border-primary/10 w-full" />
            ))}
          </div>
        </div>
        
        {/* Corner dots at grid intersections */}
        <div className="absolute inset-0 grid grid-cols-4 h-full w-full opacity-20">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={`dots-col-${i}`}>
              {[...Array(7)].map((_, j) => (
                <div
                  key={`dot-${i}-${j}`}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    left: `${(i / 4) * 100}%`,
                    top: `${(j / 6) * 100}%`,
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}