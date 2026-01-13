import { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import CaseGallery3D from './CaseGallery3D';
import CaseMenu from './CaseMenu';
import GridBackground from './GridBackground';
import Tagline from './Tagline';
import HeroSection from './HeroSection';
import TextSection from './TextSection';
import { useGalleryState } from '@/hooks/useGalleryState';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const GalleryPage = () => {
  const clearSelection = useGalleryState((state) => state.clearSelection);
  const setScrollProgress = useScrollProgress((state) => state.setScrollProgress);
  const scrollProgress = useScrollProgress((state) => state.scrollProgress);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearSelection]);
  
  // Scroll handler - tracks scroll through first 2 sections (200vh)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      // Progress 0-1 for first section, 1-2 for second section
      const progress = Math.min(2, scrollTop / viewportHeight);
      setScrollProgress(progress);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);

  // Determine which UI elements to show based on scroll
  const showCaseMenu = scrollProgress > 0.7 && scrollProgress < 1.8;
  const showTagline = scrollProgress > 0.7 && scrollProgress < 1.8;

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* BLOCK 1: Hero Section - 100vh */}
      <section className="relative h-screen">
        {/* Fixed 3D canvas for hero and gallery - spans first 2 sections */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{ 
            zIndex: 5,
            opacity: scrollProgress < 2 ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {/* Grid background */}
          <GridBackground />
          
          {/* 3D Gallery Canvas */}
          <div className="pointer-events-auto">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-muted-foreground"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading gallery...
                </motion.div>
              </div>
            }>
              <CaseGallery3D />
            </Suspense>
          </div>
          
          {/* Hero section overlay - only visible in Block 1 */}
          <HeroSection />
          
          {/* Case menu - only visible in Block 2 */}
          {showCaseMenu && (
            <div className="pointer-events-auto">
              <CaseMenu />
            </div>
          )}
          
          {/* Tagline - only visible in Block 2 */}
          {showTagline && <Tagline />}
        </div>
      </section>
      
      {/* BLOCK 2: Gallery Section - 100vh (content handled by fixed 3D canvas) */}
      <section className="relative h-screen">
        {/* Empty - visual content is in the fixed 3D layer */}
      </section>
      
      {/* BLOCK 3: Text Section - scrolls into view normally */}
      <section className="relative z-10">
        <TextSection />
      </section>
    </motion.div>
  );
};

export default GalleryPage;
