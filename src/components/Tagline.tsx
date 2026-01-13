import { motion } from 'framer-motion';

const Tagline = () => {
  return (
    <>
      {/* View all button - top right */}
      <motion.div 
        className="fixed top-8 right-8 z-40 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <button className="px-4 py-2 bg-background text-foreground text-sm rounded-full border border-border hover:bg-muted transition-colors">
          View all
        </button>
      </motion.div>
      
      {/* Bottom tagline */}
      <motion.div 
        className="fixed bottom-12 left-0 right-0 z-40 text-center pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight">
          We build <span className="italic text-muted-foreground">products</span> we are proud of
        </h2>
      </motion.div>
    </>
  );
};

export default Tagline;
