import { motion } from "framer-motion";
import React from "react";

type BoxEnclosureProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  withLoader?: boolean;
  withCorners?: boolean;
};

export default function BoxEnclosure({ 
  children, 
  delay = 0,
  className = "",
  withLoader = false,
  withCorners = true
}: BoxEnclosureProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* The content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Enclosure border lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top and left lines */}
        {withCorners && (
          <>
            <div className="absolute top-0 left-0 w-[30px] h-[30px] border-l border-t border-border opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-[30px] h-[30px] border-r border-b border-border opacity-40"></div>
          </>
        )}
        
        {/* Optional loader line animation */}
        {withLoader && (
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.div>
  );
}