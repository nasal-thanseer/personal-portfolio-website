import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
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

const loaderVariants = {
  initial: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: 0.4,
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
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="relative"
    >
      {/* Top loader line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-50"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={loaderVariants}
      />
      
      {/* Loading overlay */}
      {loading && (
        <motion.div 
          className="fixed inset-0 bg-background z-40 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <div className="relative">
            <div className="text-3xl font-bold">STUDIO</div>
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
      
      {children}
    </motion.div>
  );
}