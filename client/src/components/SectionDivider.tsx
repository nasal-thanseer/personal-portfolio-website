import React from "react";

type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`w-full py-8 relative ${className}`}>
      <div className="px-6">
        <div className="w-full h-px bg-border opacity-10"></div>
      </div>
    </div>
  );
}