import { Link } from "wouter";
import { motion } from "framer-motion";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
    categories: string[];
  };
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className="group p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Link 
        href={`/work/${project.id}`}
        className="block"
      >
        <div className="relative overflow-hidden mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 * index }}
        >
          <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
          <p className="text-muted mb-2">{project.shortDescription}</p>
          <div className="flex space-x-2">
            {project.categories.slice(0, 2).map(category => (
              <span key={category} className="text-xs bg-secondary px-2 py-1">
                {category}
              </span>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
