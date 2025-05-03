import { motion } from "framer-motion";
import React from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.header 
      className={`mb-12 relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="px-1 py-2">
        <h2 className="text-4xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-muted">{subtitle}</p>}
        
        {/* Animated loader line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-accent"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
      </div>
    </motion.header>
  );
}