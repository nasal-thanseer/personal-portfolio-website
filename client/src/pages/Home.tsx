import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../components/ProjectCard";
import WeatherWidget from "../components/WeatherWidget";
import StatsCounter from "../components/StatsCounter";
import PlayCard from "../components/PlayCard";
import SectionDivider from "../components/SectionDivider";
import SectionHeader from "../components/SectionHeader";
import { projects } from "../data/projects";
import { playItems } from "../data/playItems";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  const featuredProject = projects[0];
  const featuredPlayItems = playItems.slice(0, 4);
  const featuredProjects = projects.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                DESIGN<br/>STUDIO
              </h1>
              <div className="mb-6">
                <span className="bg-accent text-white px-2 py-1 text-sm">DIGITAL DESIGNER</span>
                <p className="mt-4 text-lg">Portfolio of Alex Morgan.<br/>
                  Based in Berlin, works internationally.</p>
              </div>
              <p className="text-muted mb-6">
                Consulting and working together with startups and established companies.
                If you can see it, we can build it.
              </p>
              <p className="text-sm text-muted">
                Worked with previous clients such as:
                <span className="font-medium text-primary"> Spotify, Airbnb, Microsoft, Adobe</span>
              </p>
            </motion.div>
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-96 bg-secondary overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Design workspace with laptop and accessories" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <SectionDivider />

      {/* Latest Case Section */}
      <section className="py-12">
        <div className="px-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <div className="line-accent">
                <h3 className="text-sm font-medium mb-1">Read the</h3>
                <h2 className="text-2xl font-bold mb-4">latest case</h2>
              </div>
              
              <h3 className="text-3xl font-bold mb-2">{featuredProject.title}</h3>
              <span className="inline-block bg-secondary text-primary px-2 py-1 text-xs mb-6">{featuredProject.categories[0]}</span>
              
              <Link 
                href={`/work/${featuredProject.id}`}
                className="inline-flex items-center text-accent hover:underline"
              >
                <span>Read case</span>
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-auto object-cover hover-scale"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <SectionDivider />

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white relative">
        <div className="grid-dot-pattern absolute inset-0"></div>
        <div className="px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <WeatherWidget />
            <div className="flex space-x-12">
              <StatsCounter count={12} label="Cases" />
              <StatsCounter count={36} label="Projects" />
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider />

      {/* Work Showcase Section */}
      <section id="work" className="py-16 md:py-24">
        <div className="px-6">
          <SectionHeader 
            title="Work" 
            subtitle="Carefully crafted projects. One at a time."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/work"
              className="inline-flex items-center text-accent border border-accent px-6 py-3 hover:bg-accent hover:text-white transition-colors duration-200"
            >
              <span>View all work</span>
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <SectionDivider />

      {/* Play Showcase Preview */}
      <section className="py-16 md:py-24">
        <div className="px-6">
          <motion.header 
            className="mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-2">Play</h2>
            <p className="text-muted">Exploring. Ever learning.</p>
          </motion.header>
          
          <div className="grid-masonry">
            {featuredPlayItems.map((item, index) => (
              <PlayCard key={item.id} item={item} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/play"
              className="inline-flex items-center text-accent border border-accent px-6 py-3 hover:bg-accent hover:text-white transition-colors duration-200"
            >
              <span>See the playground</span>
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <SectionDivider />

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-white relative">
        <div className="grid-dot-pattern absolute inset-0"></div>
        <div className="px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Reach out</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Taking in projects, one at a time. Whether it be short term, long term or just a one-time-only thing.
              Let's talk and see how I can help.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center bg-accent text-white px-6 py-3 hover:bg-opacity-80 transition-colors duration-200"
            >
              <span>Contact</span>
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
