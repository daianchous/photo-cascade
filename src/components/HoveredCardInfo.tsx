import { motion, AnimatePresence } from 'framer-motion';
import { cases } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';
import { ArrowUpRight, Bookmark } from 'lucide-react';

const HoveredCardInfo = () => {
  const { hoveredCaseId } = useGalleryState();
  
  const hoveredCase = hoveredCaseId 
    ? cases.find(c => c.id === hoveredCaseId) 
    : null;

  return (
    <AnimatePresence>
      {hoveredCase && (
        <motion.div 
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center">
            <p className="text-sm font-normal tracking-wide flex items-center justify-center gap-3 text-foreground/70">
              {hoveredCase.timestamp}
              <span className="inline-block w-6 h-[2px] bg-foreground/30" />
            </p>
            <p className="text-sm font-semibold tracking-wider mt-2 uppercase text-foreground">
              {hoveredCase.title.split(' - ')[0]}
            </p>
            <p className="text-sm font-normal tracking-wide mt-1 text-muted-foreground">
              {hoveredCase.title.split(' - ')[1]}
            </p>

            {/* Tags */}
            <div className="flex gap-2 justify-center mt-3">
              {hoveredCase.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-foreground/5 rounded text-foreground/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="flex gap-6 justify-center mt-4 pointer-events-auto">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>read more</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Bookmark className="w-4 h-4" />
                <span>save</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoveredCardInfo;
