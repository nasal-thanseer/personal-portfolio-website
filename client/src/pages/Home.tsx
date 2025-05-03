import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import WeatherWidget from "../components/WeatherWidget";
import StatsCounter from "../components/StatsCounter";
import PlayCard from "../components/PlayCard";
import SectionDivider from "../components/SectionDivider";
import SectionHeader from "../components/SectionHeader";
import PageTransition from "../components/PageTransition";
import { projects } from "../data/projects";
import { playItems } from "../data/playItems";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProject = projects[0];
  const featuredPlayItems = playItems.slice(0, 6);
  const featuredProjects = projects.slice(0, 6);

  useEffect(() => {
    // Add border effect to body when component mounts
    document.body.classList.add("with-border");
    
    // Clean up function to remove class when component unmounts
    return () => {
      document.body.classList.remove("with-border");
    };
  }, []);

  return (
    <div className="border-x border-border min-h-screen">
      <PageTransition>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left Column with Image */}
          <div className="relative h-[40vh] md:h-[60vh] border-r border-border bg-background">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full h-full overflow-hidden"
            >
              {/* Personal photo placeholder */}
              <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md h-auto aspect-square rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Personal photo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column with Text */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 tracking-tighter">
                BLINDSIGHT<br/>STUDIO
              </h1>
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <span className="text-xs inline-block bg-accent text-white px-2 py-1 mr-2">DIGITAL DESIGNER</span>
                </div>
                <p className="text-lg">Portfolio of Alex Morgan.<br/>
                  Based in Berlin, works internationally.</p>
              </div>
              <div className="space-y-6 text-muted">
                <p>
                  Consulting and working together with startups and established companies.
                  If you can see it, we can build it.
                </p>
                <p className="text-sm">
                  Worked with previous clients such as:<br/>
                  <span className="font-medium text-primary">Spotify, Airbnb, Microsoft, Adobe</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Case Section */}
      <section className="py-16 border-b border-border">
        <div className="px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-1">Read the</h3>
                <h2 className="text-2xl font-bold mb-6">latest case</h2>
              </div>
              
              <h3 className="text-3xl font-bold mb-2">{featuredProject.title}</h3>
              <span className="inline-block bg-accent/10 text-primary px-2 py-1 text-xs mb-6">{featuredProject.categories[0]}</span>
              
              <Link 
                href={`/work/${featuredProject.id}`}
                className="inline-flex items-center text-accent hover:underline group"
              >
                <span>Read case</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="overflow-hidden border border-border"
              >
                <img 
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-auto object-cover hover-scale"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border bg-secondary/10">
        <div className="px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <WeatherWidget />
            </div>
            
            <div className="col-span-2 flex justify-end gap-16">
              <StatsCounter count={8} label="Cases" />
              <StatsCounter count={27} label="Plays" />
            </div>
          </div>
        </div>
      </section>

      {/* Work Showcase Section */}
      <section id="work" className="py-16 md:py-24 border-b border-border">
        <div className="px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <SectionHeader 
                title="Work" 
                subtitle="Carefully crafted projects. One at a time."
              />
              
              <div className="mt-8">
                <Link 
                  href="/work"
                  className="inline-flex items-center text-accent hover:underline group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.slice(0, 6).map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Play Showcase Preview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="px-8 md:px-16">
          <div className="flex flex-col">
            <SectionHeader 
              title="Play" 
              subtitle="Exploring. Ever learning."
            />
            
            <div className="mt-12 grid-masonry">
              {featuredPlayItems.map((item, index) => (
                <PlayCard key={item.id} item={item} index={index} />
              ))}
            </div>
            
            <div className="mt-12">
              <Link 
                href="/play"
                className="inline-flex items-center text-accent hover:underline group"
              >
                <span>See the playground</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <SectionHeader 
                title="About" 
                subtitle="The studio is about creating and activating existing brands online effectively, by using aesthetics and function together as a holistic mindset."
              />
              
              <div className="mt-8">
                <Link 
                  href="/about"
                  className="inline-flex items-center text-accent hover:underline group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">Branding</h3>
                  <p className="text-sm text-muted mb-6">
                    Establish a strong and consistent presence, while captivating the audience with a compelling narrative.
                  </p>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>Visual Identities</li>
                    <li>Logo</li>
                    <li>Concept Development</li>
                    <li>Discovery</li>
                  </ul>
                </div>
                
                <div className="border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">Digital</h3>
                  <p className="text-sm text-muted mb-6">
                    From an idea to a product - UI/UX, prototyping, product design, and information architecture.
                  </p>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>UI/UX</li>
                    <li>APP</li>
                    <li>WEB</li>
                    <li>Prototyping</li>
                  </ul>
                </div>
                
                <div className="border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">Development</h3>
                  <p className="text-sm text-muted mb-6">
                    Bring the product to life and transform prototypes into fully functional digital products.
                  </p>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>Frontend</li>
                    <li>Responsiveness</li>
                    <li>SEO</li>
                    <li>Performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="px-8 md:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Reach out</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Taking in projects, one at a time. Whether it be short term, long term or just a one-time-only thing.
              Let's talk and see how I can help.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-primary px-6 py-3 hover:bg-white/90 transition-colors duration-200 group"
            >
              <span>Contact</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      </PageTransition>
    </div>
  );
}