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
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-auto hover-scale"
        />
      </div>
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
  );
}
