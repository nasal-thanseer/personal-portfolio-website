import React from "react";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="h-full w-full">
        {/* Main grid container that will handle the grid lines using CSS */}
        <div className="h-full w-full blindsight-grid"></div>
      </div>
    </div>
  );
}