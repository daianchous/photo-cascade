import { PhotoData } from "@/data/photoData";
import PhotoCard from "./PhotoCard";

interface PhotoStackProps {
  photos: PhotoData[];
  position: "left" | "right";
  hoveredPhoto: PhotoData | null;
  onPhotoHover: (photo: PhotoData | null) => void;
  isMinimized: boolean;
}

const PhotoStack = ({ 
  photos, 
  position, 
  hoveredPhoto,
  onPhotoHover,
  isMinimized
}: PhotoStackProps) => {
  // Position stacks like reference - bottom-left and top-right
  const positionClasses = position === "left" 
    ? "bottom-[10%] left-[5%]" 
    : "top-[10%] right-[15%]";

  const transformStyle = position === "left"
    ? { transform: 'rotateX(60deg) rotateZ(-28deg)' }
    : { transform: 'rotateX(60deg) rotateZ(28deg)' };

  // Check if hovered photo is from this stack
  const hasActivePhoto = hoveredPhoto && photos.some(p => p.id === hoveredPhoto.id);
  const displayCount = 50;

  return (
    <div 
      className={`
        absolute ${positionClasses}
        transition-all duration-700 ease-smooth
        ${isMinimized ? 'scale-[0.5]' : 'scale-100'}
        ${isMinimized && !hasActivePhoto ? 'opacity-25' : 'opacity-100'}
      `}
      style={{ perspective: '2000px' }}
    >
      <div 
        className="preserve-3d relative"
        style={transformStyle}
      >
        {photos.slice(0, displayCount).map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            totalCards={displayCount}
            isHovered={hoveredPhoto?.id === photo.id}
            onHover={onPhotoHover}
            stackPosition={position}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoStack;
