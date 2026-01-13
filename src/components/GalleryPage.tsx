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
  
  // Scroll handler - only tracks first 2 sections (200vh)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      // Progress 0-2 over first 200vh (hero + gallery sections)
      const maxScroll = window.innerHeight * 2;
      const progress = Math.min(2, scrollTop / window.innerHeight);
      setScrollProgress(progress);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);

  // Determine which UI elements to show based on scroll
  const showCaseMenu = scrollProgress > 0.6 && scrollProgress < 1.8;
  const showTagline = scrollProgress > 0.6 && scrollProgress < 1.8;
  
  // 3D section opacity - fade out as we enter text section
  const canvasOpacity = scrollProgress < 1.5 ? 1 : Math.max(0, 1 - (scrollProgress - 1.5) / 0.5);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* SECTION 1 & 2: Fixed 3D canvas for hero + gallery (first 200vh) */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{ 
          zIndex: 10,
          opacity: canvasOpacity,
          visibility: scrollProgress >= 2 ? 'hidden' : 'visible'
        }}
      >
        {/* Grid background */}
        <GridBackground />
        
        {/* 3D Gallery Canvas - needs pointer events for card clicks */}
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
        
        {/* Hero section overlay - visible in section 1 */}
        <HeroSection />
        
        {/* Case menu on right side - only in gallery mode */}
        {showCaseMenu && (
          <div className="pointer-events-auto">
            <CaseMenu />
          </div>
        )}
        
        {/* Bottom tagline - only in gallery mode */}
        {showTagline && <Tagline />}
      </div>
      
      {/* Scrollable content that creates the scroll height */}
      <div className="relative">
        {/* Section 1: Hero - creates scroll space */}
        <div style={{ height: '100vh' }} />
        
        {/* Section 2: Gallery - creates scroll space */}
        <div style={{ height: '100vh' }} />
        
        {/* SECTION 3: Text Section - actually rendered, scrolls over the fixed content */}
        <div className="relative bg-background" style={{ zIndex: 20 }}>
          <TextSection />
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryPage;
