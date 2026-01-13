import { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import CaseGallery3D from './CaseGallery3D';
import CaseMenu from './CaseMenu';
import GridBackground from './GridBackground';
import Tagline from './Tagline';
import HeroSection from './HeroSection';
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
  
  // Scroll handler - now 0 to 1 range for 2 sections
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight; // 0 to 1 range
      setScrollProgress(progress);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);

  // Determine which UI elements to show based on scroll
  const showCaseMenu = scrollProgress > 0.3;
  const showTagline = scrollProgress > 0.3;

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Fixed 3D canvas that responds to scroll - pointer-events-none to allow scroll through */}
      <div className="fixed inset-0 pointer-events-none">
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
        
        {/* Hero section overlay */}
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
      
      {/* Scrollable content wrapper - 2 sections (invisible but creates scroll height) */}
      <div className="relative" style={{ height: '200vh' }} />
    </motion.div>
  );
};

export default GalleryPage;
