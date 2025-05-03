import React from "react";

type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`w-full py-12 md:py-16 lg:py-20 relative ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px bg-secondary/20 relative">
          {/* Simple dot at the center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}