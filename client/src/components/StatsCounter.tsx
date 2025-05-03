import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

type StatsCounterProps = {
  count: number;
  label: string;
};

export default function StatsCounter({ count, label }: StatsCounterProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;
      
      const duration = 1500; // ms
      
      const countUp = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * count);
        
        setDisplayCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(countUp);
        }
      };
      
      animationFrame = requestAnimationFrame(countUp);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, count]);
  
  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-5xl font-bold mb-2">{displayCount}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}
