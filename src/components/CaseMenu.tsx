import { motion } from 'framer-motion';
import { cases } from '@/data/casesData';
import { useGalleryState } from '@/hooks/useGalleryState';

const CaseMenu = () => {
  const { hoveredCaseId, setHoveredCaseId } = useGalleryState();
  
  return (
    <nav className="fixed right-12 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-0.5 text-right">
        {cases.map((caseData, index) => {
          const isActive = hoveredCaseId === caseData.id;
          
          return (
            <motion.li
              key={caseData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <button
                onClick={() => setHoveredCaseId(isActive ? null : caseData.id)}
                className={`
                  text-sm italic tracking-wide transition-all duration-300
                  focus:outline-none px-2 py-0.5
                  ${isActive
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground/50 hover:text-foreground/70'
                  }
                `}
              >
                Case {index + 1}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CaseMenu;
