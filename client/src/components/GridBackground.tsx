import React from "react";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      {/* Vertical grid lines */}
      <div className="grid grid-cols-4 h-full w-full">
        {[...Array(5)].map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="border-r border-primary/10 h-full"
          />
        ))}
      </div>
      
      {/* Horizontal grid lines */}
      <div className="absolute inset-0 grid grid-rows-6 w-full">
        {[...Array(7)].map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="border-b border-primary/10 w-full"
          />
        ))}
      </div>
    </div>
  );
}