import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const categories = ["All", "Digital", "Branding", "UX/UI", "Mobile", "Development"];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Work() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header 
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-bold mb-4">Work</h1>
            <p className="text-xl text-muted max-w-2xl">
              A collection of selected projects showcasing my approach to branding, digital design, and development.
            </p>
          </motion.header>

          <motion.div 
            className="mb-12 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                  filter === category 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium mb-2">No projects found</h3>
              <p className="text-muted">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
