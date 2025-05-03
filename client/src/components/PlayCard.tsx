import { motion } from "framer-motion";
import BoxEnclosure from "./BoxEnclosure";

type PlayCardProps = {
  item: {
    id: string;
    title: string;
    image: string;
  };
  index: number;
  expanded?: boolean;
};

export default function PlayCard({ item, index, expanded = false }: PlayCardProps) {
  return (
    <BoxEnclosure
      delay={0.1 * index}
      withLoader={true}
      className="mb-6 p-3"
    >
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 * index }}
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-auto hover-scale"
          />
        </motion.div>
        
        {/* Image corner elements */}
        <div className="absolute top-0 left-0 w-[12px] h-[12px] border-l border-t border-white/20"></div>
        <div className="absolute top-0 right-0 w-[12px] h-[12px] border-r border-t border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] border-l border-b border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-[12px] h-[12px] border-r border-b border-white/20"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 * index }}
      >
        <p className="mt-2 text-sm text-muted">{item.title}</p>
        {expanded && (
          <div className="mt-1">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="text-sm text-accent hover:underline"
            >
              View project
            </a>
          </div>
        )}
      </motion.div>
    </BoxEnclosure>
  );
}
