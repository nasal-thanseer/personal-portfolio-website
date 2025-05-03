import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
  items: string[];
  index: number;
};

export default function ServiceCard({ title, description, items, index }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-background border border-border p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <h3 className="text-2xl font-semibold mb-4 text-foreground">{title}</h3>
      <p className="text-muted dark:text-gray-300 mb-6">{description}</p>
      
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="flex items-center text-foreground">
            <svg 
              className="h-4 w-4 mr-2 text-accent" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
