import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Globe } from "lucide-react";
import { projects } from "../data/projects";

export default function WorkDetail() {
  const [, params] = useRoute<{ id: string }>("/work/:id");
  const id = params?.id;

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/work">
          <a className="text-accent hover:underline">Back to all projects</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/work">
            <a className="inline-flex items-center text-primary hover:text-accent transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to all projects</span>
            </a>
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-muted mb-8">{project.description}</p>

            <div className="mb-12">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-auto rounded"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Project Overview</h2>
              <p>
                {project.fullDescription || `${project.description} This project showcases the application of strategic design thinking to solve complex problems and create an intuitive, engaging user experience.`}
              </p>
              
              <h2>The Challenge</h2>
              <p>
                The challenge was to create a design system that was both visually appealing and functionally robust. 
                We needed to balance aesthetic considerations with technical requirements while maintaining a consistent brand voice.
              </p>
              
              <h2>The Solution</h2>
              <p>
                By implementing a modular design approach, we were able to create a scalable system that could grow with the client's needs.
                The design language we developed emphasized clarity, accessibility, and visual harmony while supporting the client's business objectives.
              </p>
              
              <h2>The Outcome</h2>
              <p>
                The final product exceeded client expectations, resulting in improved user engagement metrics and positive feedback from stakeholders.
                The design system we created continues to serve as the foundation for the client's digital presence, enabling them to maintain consistency
                across all touchpoints.
              </p>
            </div>
          </div>
          
          <div>
            <div className="bg-secondary p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Timeline</h4>
                    <p className="text-muted">3 months</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Client</h4>
                    <p className="text-muted">{project.client}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Industry</h4>
                    <p className="text-muted">{project.industry}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6">
              <h3 className="text-xl font-bold mb-4">Services Provided</h3>
              <ul className="space-y-2">
                {project.categories.map(category => (
                  <li key={category} className="flex items-center">
                    <svg className="h-4 w-4 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map(relatedProject => (
                <Link key={relatedProject.id} href={`/work/${relatedProject.id}`}>
                  <a className="block group">
                    <div className="relative overflow-hidden mb-4">
                      <img 
                        src={relatedProject.image} 
                        alt={relatedProject.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{relatedProject.title}</h3>
                    <p className="text-muted">{relatedProject.shortDescription}</p>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
