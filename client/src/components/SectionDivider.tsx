import React from "react";

type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`w-full py-12 md:py-16 lg:py-24 relative ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px bg-secondary relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
            <div className="w-full h-px bg-secondary absolute"></div>
            <div className="h-full w-px bg-secondary absolute"></div>
          </div>
        </div>
      </div>
    </div>
  );
}