import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1.2
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut", 
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading animation */}
      {loading && (
        <motion.div 
          className="fixed inset-0 bg-background z-[1000] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
          exit={{ opacity: 0 }}
        >
          <div className="pre-loader-wrapper">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              <svg width="120" height="120" viewBox="0 0 338 338" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
                <motion.path 
                  d="M253.023 142.008L241.738 137.111L122.772 131.003L111.45 120.257L219.438 95.8024L277.99 107.722L205.271 58.5L32 89.615L77.3921 236.281L143.848 279.5L125.261 223.715L200.366 234.609L252.839 190.64L306 191.703L253.023 142.008ZM151.79 190.186C142.011 190.186 134.075 182.26 134.075 172.484C134.075 162.708 142.011 154.776 151.79 154.776C161.569 154.776 169.504 162.702 169.504 172.484C169.504 182.266 161.569 190.186 151.79 190.186Z" 
                  fill="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              
              <div className="relative h-8">
                <motion.div 
                  className="text-2xl font-medium tracking-tighter overflow-hidden"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                >
                  BLINDSIGHT.STUDIO
                </motion.div>
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Main content */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="relative"
      >
        {children}
      </motion.div>
    </>
  );
}