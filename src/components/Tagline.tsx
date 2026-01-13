import { motion } from 'framer-motion';

const Tagline = () => {
  return (
    <motion.div 
      className="fixed bottom-16 left-0 right-0 z-40 text-center pointer-events-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
        We build <span className="italic text-muted-foreground">products</span> we are proud of
      </h2>
    </motion.div>
  );
};

export default Tagline;
