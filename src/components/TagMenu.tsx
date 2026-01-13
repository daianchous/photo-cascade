import { motion, AnimatePresence } from 'framer-motion';
import { tagList, tagCounts } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';

const TagMenu = () => {
  const { activeTag, lockedTag, setActiveTag, toggleLockedTag } = useGalleryState();
  
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-1 text-right">
        {tagList.map((tag) => {
          const isActive = activeTag === tag;
          const isLocked = lockedTag === tag;
          const count = tagCounts[tag] || 0;
          
          return (
            <motion.li
              key={tag}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: tagList.indexOf(tag) * 0.03 }}
            >
              <button
                onClick={() => toggleLockedTag(tag)}
                onMouseEnter={() => !lockedTag && setActiveTag(tag)}
                onMouseLeave={() => !lockedTag && setActiveTag(lockedTag || 'all')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') toggleLockedTag(tag);
                  if (e.key === 'Escape') {
                    useGalleryState.getState().clearSelection();
                  }
                }}
                className={`
                  text-sm tracking-wide transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-foreground/20 rounded px-2 py-0.5
                  ${isActive || isLocked
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground/60 hover:text-foreground/80'
                  }
                `}
                aria-pressed={isLocked}
              >
                <span>{tag}</span>
                <sup className="ml-1 text-[10px] opacity-50">{count}</sup>
                
                {/* Lock indicator */}
                <AnimatePresence>
                  {isLocked && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="ml-1 inline-block w-1.5 h-1.5 bg-foreground rounded-full"
                    />
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          );
        })}
      </ul>
      
      {/* Keyboard hint */}
      <motion.p 
        className="text-[10px] text-muted-foreground/40 mt-6 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Press ESC to reset
      </motion.p>
    </nav>
  );
};

export default TagMenu;
