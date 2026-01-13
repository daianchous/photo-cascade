import { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import CaseGallery3D from './CaseGallery3D';
import CaseMenu from './CaseMenu';
import GridBackground from './GridBackground';
import Tagline from './Tagline';
import { useGalleryState } from '@/hooks/useGalleryState';

const GalleryPage = () => {
  const clearSelection = useGalleryState((state) => state.clearSelection);
  
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

  return (
    <motion.div 
      className="relative w-full h-screen overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Grid background */}
      <GridBackground />
      
      {/* 3D Gallery Canvas */}
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
      
      {/* Case menu on right side */}
      <CaseMenu />
      
      {/* Bottom tagline */}
      <Tagline />
    </motion.div>
  );
};

export default GalleryPage;
