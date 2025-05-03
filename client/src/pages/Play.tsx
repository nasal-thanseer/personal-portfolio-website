import { motion } from "framer-motion";
import PlayCard from "../components/PlayCard";
import { playItems } from "../data/playItems";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Play() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header 
            className="mb-12 max-w-2xl"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-bold mb-4">Play</h1>
            <p className="text-xl text-muted">
              A collection of personal projects, experiments, and creative explorations. 
              This is where I push boundaries and explore new techniques without the constraints of client work.
            </p>
          </motion.header>
          
          <motion.div 
            className="grid-masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {playItems.map((item, index) => (
              <PlayCard 
                key={item.id} 
                item={item} 
                index={index}
                expanded={true}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Creative Process</h2>
          <p className="text-lg text-muted mb-8">
            The playground is where I explore new ideas, experiment with techniques, and push the boundaries of my creativity.
            These personal projects allow me to expand my skills and bring fresh perspectives to client work.
          </p>
          <p className="text-muted">
            I believe that continuous experimentation and learning are essential to growth as a designer.
            These explorations inform my professional work and keep my approach fresh and innovative.
          </p>
        </div>
      </section>
    </div>
  );
}
