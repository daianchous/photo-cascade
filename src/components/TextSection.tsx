import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const TextSection = () => {
  const scrollProgress = useScrollProgress((state) => state.scrollProgress);
  
  // Start fading in when scroll reaches gallery section (progress > 1.5)
  const sectionProgress = Math.max(0, Math.min(1, (scrollProgress - 1.5) / 0.5));
  const opacity = sectionProgress;
  
  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
      style={{ opacity }}
    >
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative">
        {/* SENIOR on top left */}
        <motion.div 
          className="absolute left-0 top-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: opacity > 0.5 ? 1 : 0, x: opacity > 0.5 ? 0 : -50 }}
          transition={{ duration: 0.8 }}
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
          className="absolute left-[15%] top-[30%] max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: opacity > 0.6 ? 1 : 0, y: opacity > 0.6 ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            We build apps, websites, and digital products with the speed of a small team and the standards of a big one.
          </p>
        </motion.div>
        
        {/* PRODUCT MINDSET on right */}
        <motion.div 
          className="absolute right-0 top-[35%] text-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: opacity > 0.5 ? 1 : 0, x: opacity > 0.5 ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.1 }}
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
          animate={{ opacity: opacity > 0.7 ? 1 : 0, x: opacity > 0.7 ? 0 : -50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
