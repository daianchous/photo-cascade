import { PhotoData } from "@/data/photoData";
import PhotoRowCard from "./PhotoRowCard";

interface PhotoRowProps {
  photos: PhotoData[];
  hoveredPhoto: PhotoData | null;
  onPhotoHover: (photo: PhotoData | null) => void;
}

const PhotoRow = ({ 
  photos, 
  hoveredPhoto,
  onPhotoHover,
}: PhotoRowProps) => {
  const displayCount = 130;

  return (
    <div 
      className="absolute bottom-[-5%] left-[-18%] transition-all duration-700 ease-smooth"
      style={{ perspective: '3000px' }}
    >
      <div 
        className="preserve-3d relative"
        style={{ 
          transform: 'rotateX(58deg) rotateZ(-45deg)',
        }}
      >
        {photos.slice(0, displayCount).map((photo, index) => (
          <PhotoRowCard
            key={photo.id}
            photo={photo}
            index={index}
            totalCards={displayCount}
            isHovered={hoveredPhoto?.id === photo.id}
            onHover={onPhotoHover}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoRow;
