import { useState, useRef, useCallback, useEffect } from "react";
import { leftStackPhotos, PhotoData } from "@/data/photoData";
import PhotoRow from "./PhotoRow";
import ActivePhoto from "./ActivePhoto";
import CategorySidebar from "./CategorySidebar";
import Header from "./Header";
import FooterActions from "./FooterActions";

const PhotoGallery = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<PhotoData | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update time every second
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

  const handlePhotoHover = useCallback((photo: PhotoData | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (photo) {
      setHoveredPhoto(photo);
    } else {
      timeoutRef.current = setTimeout(() => {
        setHoveredPhoto(null);
      }, 100);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Header currentTime={currentTime} currentDate={currentDate} />
      
      {/* Single diagonal photo row */}
      <PhotoRow
        photos={leftStackPhotos}
        hoveredPhoto={hoveredPhoto}
        onPhotoHover={handlePhotoHover}
      />

      {/* Active/hovered photo display */}
      <ActivePhoto photo={hoveredPhoto} />

      <CategorySidebar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <FooterActions />
    </div>
  );
};

export default PhotoGallery;
