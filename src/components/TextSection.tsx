import { motion } from 'framer-motion';

const TextSection = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative h-[80vh]">
        {/* SENIOR on top left */}
        <motion.div 
          className="absolute left-0 top-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/30 italic">
            SENIOR
          </span>
          <br />
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/20">
            TEAM
          </span>
        </motion.div>
        
        {/* Description text in middle */}
        <motion.div 
          className="absolute left-[15%] top-[35%] max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We build apps, websites, and digital products with the speed of a small team and the standards of a big one.
          </p>
        </motion.div>
        
        {/* PRODUCT MINDSET on right */}
        <motion.div 
          className="absolute right-0 top-[40%] text-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-muted-foreground/20">
            PRODUCT
          </span>
          <br />
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-muted-foreground/30">
            MINDSET
          </span>
        </motion.div>
        
        {/* ZERO CHAOS on bottom left */}
        <motion.div 
          className="absolute left-0 bottom-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/30 italic">
            ZERO
          </span>
          <br />
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-muted-foreground/40">
            CHAOS
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default TextSection;
