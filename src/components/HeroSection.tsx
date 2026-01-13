import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const HeroSection = () => {
  const scrollProgress = useScrollProgress((state) => state.scrollProgress);
  
  // Fade out hero content as we scroll into gallery section
  const heroOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const heroTranslateY = scrollProgress * -80;
  
  // Don't render if fully faded
  if (heroOpacity < 0.01) return null;
  
  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        opacity: heroOpacity,
        transform: `translateY(${heroTranslateY}px)`,
      }}
    >
      {/* Main headline */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-[40%] max-w-2xl pointer-events-auto">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-foreground">Build products</span>
          <br />
          <span className="text-foreground">that </span>
          <span className="text-primary italic">make an impact</span>
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We help founders turn their ideas into high-performing products
          — with a product-minded team <span className="text-foreground font-medium">that knows what to do.</span>
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
            Connect with us
          </button>
          <button className="px-6 py-3 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors border border-border">
            Explore services
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
