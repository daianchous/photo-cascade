import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GalleryHeader = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Date and time - top left */}
      <motion.div 
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p className="text-sm font-medium tracking-wide text-foreground/80">{currentDate}</p>
        <p className="text-2xl font-light tracking-tight text-foreground">{currentTime}</p>
      </motion.div>

      {/* Title - top center */}
      <motion.div 
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-lg font-light tracking-[0.3em] text-foreground">
          every <span className="text-muted-foreground">:</span> second
        </h1>
      </motion.div>
    </>
  );
};

export default GalleryHeader;
