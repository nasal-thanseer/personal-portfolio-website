import React from "react";

export default function GridBackground() {
  return (
    <>
      {/* Left Grid Line */}
      <div className="fixed left-6 top-0 bottom-0 w-px bg-border opacity-25 z-0 pointer-events-none"></div>
      
      {/* Right Grid Line */}
      <div className="fixed right-6 top-0 bottom-0 w-px bg-border opacity-25 z-0 pointer-events-none"></div>
      
      {/* Top Grid Line */}
      <div className="fixed top-6 left-0 right-0 h-px bg-border opacity-25 z-0 pointer-events-none"></div>
      
      {/* Bottom Grid Line */}
      <div className="fixed bottom-6 left-0 right-0 h-px bg-border opacity-25 z-0 pointer-events-none"></div>
      
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 blindsight-grid pointer-events-none z-0"></div>
    </>
  );
}