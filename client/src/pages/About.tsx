import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

const services = [
  {
    id: "branding",
    title: "Branding",
    description: "Establish a strong and consistent presence, while captivating the audience with a compelling narrative. This includes services such as discovery workshops, logo design, creation of cohesive visual identities, and the development of brand guidelines.",
    items: ["Visual Identities", "Logo", "Concept Development", "Discovery"]
  },
  {
    id: "digital",
    title: "Digital",
    description: "From an idea to a product - UI/UX, prototyping, product design, and information architecture (IA), ensures digital touchpoints are both functional and visually aligned with the brand identity.",
    items: ["UI/UX", "APP", "WEB", "Prototyping"]
  },
  {
    id: "development",
    title: "Development",
    description: "Bring the product to life and transform prototypes into fully functional digital products. This includes using platforms like Webflow, working together with specialised developers or creating a handover proces for the next team.",
    items: ["Webflow", "Responsiveness", "SEO", "Performance"]
  }
];

const processes = [
  {
    id: "process",
    title: "Process",
    description: "A successful project is built on a well-defined, focused process. Alignment, both internally and externally, is essential at every step. Design is rarely linear, requiring agility to adapt to its evolving nature."
  },
  {
    id: "work-methods",
    title: "Work Methods",
    description: "Regardless of where a product is positioned in the market, one essential element remains constant—direction. A holistic outcome is nurtured by clear direction, as it unifies diverse mediums and channels."
  },
  {
    id: "co-op",
    title: "Co-op",
    description: "Synergy is a natural part of life, and creative work is no exception. By allowing areas of work to overlap, teams can collaborate without infringing on each other's expertise, helping all efforts coalesce into a unified outcome."
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-bold mb-6">About</h1>
            <p className="text-xl text-muted">
              My studio is about creating and activating existing brands online effectively, 
              by using aesthetics and function together as a holistic mindset.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.p 
                className="text-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The holistic mindset is set in three functions:
              </motion.p>
              
              <div className="space-y-8">
                {services.map((service, index) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted mb-3">{service.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.items.map(item => (
                        <div key={item} className="text-sm font-medium">{item}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {processes.map((process, index) => (
                <motion.div 
                  key={process.id}
                  className="bg-white p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4">{process.title}</h3>
                  <p className="text-muted">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Services</h2>
            <p className="text-muted mb-12">
              I offer a comprehensive range of design services tailored to your specific needs.
              Each service is crafted to deliver value and create meaningful experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  items={service.items}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">My Approach</h2>
            
            <div className="prose prose-lg mx-auto">
              <p>
                I believe that great design is about solving problems, not just making things look pretty. 
                My approach combines strategic thinking with creative execution to deliver solutions that 
                not only look good but also work well and achieve business objectives.
              </p>
              
              <p>
                Every project starts with understanding the core challenge and the audience. 
                From there, I develop a concept that aligns with the brand's values and goals, 
                ensuring that every design decision serves a purpose.
              </p>
              
              <p>
                Collaboration is at the heart of my process. I work closely with clients throughout 
                the project, keeping them involved and informed at every stage. This collaborative 
                approach ensures that the final product meets or exceeds expectations.
              </p>
              
              <p>
                Whether you're a startup looking to establish your brand or an established company 
                seeking to refresh your digital presence, my goal is to create design solutions that 
                help you connect with your audience and achieve your objectives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
