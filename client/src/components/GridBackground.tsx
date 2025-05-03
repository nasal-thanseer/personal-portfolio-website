import React from "react";

export default function GridBackground() {
  return (
    <div className="grid-container">
      {/* Grid background that matches Blindsight Studio */}
      <div className="fixed inset-0 blindsight-grid pointer-events-none z-0"></div>
      
      {/* Border line around the entire page */}
      <div className="fixed top-0 left-0 right-0 bottom-0 border border-border pointer-events-none z-0"></div>
      
      {/* Vertical grid lines */}
      <div className="fixed inset-0 grid grid-cols-4 md:grid-cols-12 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="hidden md:block">
            <div className="h-full w-px bg-border/5"></div>
          </div>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="block md:hidden">
            <div className="h-full w-px bg-border/5"></div>
          </div>
        ))}
      </div>
      
      {/* Horizontal grid lines - for desktop */}
      <div className="fixed inset-0 grid grid-rows-8 pointer-events-none z-0 hidden md:grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-border/5"></div>
        ))}
      </div>
      
      {/* Horizontal grid lines - for mobile */}
      <div className="fixed inset-0 grid grid-rows-6 pointer-events-none z-0 md:hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-border/5"></div>
        ))}
      </div>
    </div>
  );
}