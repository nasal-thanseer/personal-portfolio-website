import { motion } from "framer-motion";

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
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <div className="overflow-hidden">
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
    </motion.div>
  );
}
