import React from "react";

export default function GridBackground() {
  return (
    <div className="grid-container">
      {/* Border line around the entire page */}
      <div className="fixed top-0 left-0 right-0 bottom-0 border border-border pointer-events-none z-0"></div>
    </div>
  );
}