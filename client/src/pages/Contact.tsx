import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";

const contactLinks = [
  {
    type: "Email",
    value: "hello@studio.com",
    href: "mailto:hello@studio.com"
  },
  {
    type: "Phone",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890"
  },
  {
    type: "Instagram",
    value: "@studiocreative",
    href: "https://instagram.com/"
  },
  {
    type: "LinkedIn",
    value: "Alex Morgan",
    href: "https://linkedin.com/"
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <h1 className="text-4xl font-bold mb-6">Reach out</h1>
              <p className="text-lg mb-8">
                Taking in projects, one at a time. Whether it be short term, long term or just a one-time-only thing.
                Let's talk and see how I can help.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {contactLinks.map(link => (
                  <a 
                    key={link.type}
                    href={link.href} 
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block bg-background/30 dark:bg-background/20 p-4 hover:bg-background/40 dark:hover:bg-background/30 transition-colors"
                  >
                    <span className="text-gray-500 dark:text-gray-300 text-sm block mb-1">{link.type}</span>
                    <span className="font-medium text-foreground">{link.value}</span>
                  </a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Work Process</h2>
          <p className="text-lg text-muted mb-12">
            Here's how we'll work together to bring your vision to life:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-muted">Understanding your needs, objectives, and audience to establish a clear direction.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Creation</h3>
              <p className="text-muted">Developing concepts and designs based on insights gathered during discovery.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Delivery</h3>
              <p className="text-muted">Refining and finalizing the solution to ensure it meets all requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
