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
                NASAL<br/>THANSEER M NOUFAL
              </h1>
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <span className="text-xs inline-block bg-accent text-white px-2 py-1 mr-2">FULLSTACK DEVELOPER</span>
                </div>
                <p className="text-lg">Portfolio of Nasal Thanseer M Noufal.<br/>
                  Based in Ajman, UAE, works internationally.</p>
              </div>
              <div className="space-y-6 text-muted">
                <p>
                  Motivated Computer Science Engineering student with hands-on experience in full-stack web development, 
                  AR/VR application design, and team leadership.
                </p>
                <p className="text-sm">
                  Skills include:<br/>
                  <span className="font-medium text-primary">Python, JavaScript, Unity3D, FlutterFlow, Firebase, Git, CMake</span>
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
                subtitle="Computer Science Engineering student passionate about merging technical excellence with creative problem-solving in web development, AR/VR applications, and team-based projects."
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
                  <h3 className="text-lg font-medium mb-4">Web Development</h3>
                  <p className="text-sm text-muted mb-6">
                    Creating responsive and dynamic web solutions with modern frameworks and clean code practices.
                  </p>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>HTML5 / CSS / JavaScript</li>
                    <li>WordPress</li>
                    <li>Firebase</li>
                    <li>UI/UX Design</li>
                  </ul>
                </div>
                
                <div className="border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">AR/VR Applications</h3>
                  <p className="text-sm text-muted mb-6">
                    Building immersive mixed reality solutions for education, consumer guidance, and interactive experiences.
                  </p>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>Unity3D</li>
                    <li>Vuforia SDK</li>
                    <li>C#</li>
                    <li>MR/VR Development</li>
                  </ul>
                </div>
                
                <div className="border border-border p-6">
                  <h3 className="text-lg font-medium mb-4">App Development</h3>
                  <p className="text-sm text-muted mb-6">
                    Leading UI/UX design and mobile application development with a focus on quality and user experience.
                  </p>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>FlutterFlow</li>
                    <li>Firebase</li>
                    <li>UI/UX Design</li>
                    <li>Team Leadership</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="px-8 md:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Reach out</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Looking for a talented fullstack developer with AR/VR skills? I'm currently available for collaborations, 
              internships and project-based work. Let's connect and discuss how I can contribute to your team.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center bg-background text-accent px-6 py-3 hover:bg-background/90 transition-colors duration-200 group"
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