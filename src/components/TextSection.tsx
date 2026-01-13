import { motion } from 'framer-motion';

const TextSection = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-24 px-8">
      <div className="w-full max-w-7xl mx-auto relative" style={{ minHeight: '70vh' }}>
        {/* SENIOR TEAM - top left */}
        <motion.div 
          className="absolute left-0 top-0"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/40 italic leading-none">
            SENIOR
          </span>
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/25 leading-none">
            TEAM
          </span>
        </motion.div>
        
        {/* Description text - positioned below TEAM */}
        <motion.div 
          className="absolute left-0 sm:left-[10%] md:left-[12%] top-[28%] sm:top-[32%] max-w-xs sm:max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We build apps, websites, and digital products with the speed of a small team and the standards of a big one.
          </p>
        </motion.div>
        
        {/* PRODUCT MINDSET - right side, middle-ish */}
        <motion.div 
          className="absolute right-0 top-[38%] sm:top-[42%] text-right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-muted-foreground/25 leading-none">
            PRODUCT
          </span>
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-muted-foreground/40 leading-none">
            MINDSET
          </span>
        </motion.div>
        
        {/* ZERO CHAOS - bottom left */}
        <motion.div 
          className="absolute left-0 bottom-0"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/40 italic leading-none">
            ZERO
          </span>
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/50 leading-none">
            CHAOS
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default TextSection;
