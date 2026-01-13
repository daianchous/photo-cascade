import { useState, useRef, useCallback, useEffect } from "react";
import { leftStackPhotos, rightStackPhotos, PhotoData } from "@/data/photoData";
import PhotoStack from "./PhotoStack";
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
      // Delay hiding to allow smooth transition
      timeoutRef.current = setTimeout(() => {
        setHoveredPhoto(null);
      }, 150);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Header currentTime={currentTime} currentDate={currentDate} />
      
      {/* Photo stacks */}
      <PhotoStack
        photos={leftStackPhotos}
        position="left"
        hoveredPhoto={hoveredPhoto}
        onPhotoHover={handlePhotoHover}
        isMinimized={hoveredPhoto !== null}
      />
      
      <PhotoStack
        photos={rightStackPhotos}
        position="right"
        hoveredPhoto={hoveredPhoto}
        onPhotoHover={handlePhotoHover}
        isMinimized={hoveredPhoto !== null}
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
