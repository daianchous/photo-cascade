import { PhotoData } from "@/data/photoData";
import { memo, useMemo } from "react";

interface PhotoRowCardProps {
  photo: PhotoData;
  index: number;
  totalCards: number;
  isHovered: boolean;
  onHover: (photo: PhotoData | null) => void;
}

const PhotoRowCard = memo(({ 
  photo, 
  index, 
  totalCards, 
  isHovered,
  onHover,
}: PhotoRowCardProps) => {
  // Create diagonal arrangement spanning from bottom-left to top-right
  const xOffset = index * 15; // Horizontal spacing 
  const yOffset = index * -7.5; // Upward movement
  const zOffset = index * 0.35; // Depth

  // Generate a gradient for visual interest
  const gradientStyle = useMemo(() => {
    const hue = (photo.id * 47) % 360;
    const saturation = 35 + (photo.id % 30);
    const lightness = 42 + (photo.id % 18);
    const hue2 = (hue + 20) % 360;
    
    return {
      background: `linear-gradient(145deg, 
        hsl(${hue}, ${saturation}%, ${lightness}%) 0%, 
        hsl(${hue2}, ${saturation + 5}%, ${lightness - 6}%) 100%)`
    };
  }, [photo.id]);

  return (
    <div
      className={`
        absolute w-[170px] h-[115px] cursor-pointer
        bg-photo-border p-[2.5px]
        transition-all duration-400 ease-smooth
        ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
      style={{
        transform: `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px)`,
        zIndex: totalCards - index,
      }}
      onMouseEnter={() => onHover(photo)}
    >
      <div 
        className="w-full h-full"
        style={{ 
          ...gradientStyle,
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)'
        }}
      />
    </div>
  );
});

PhotoRowCard.displayName = 'PhotoRowCard';

export default PhotoRowCard;
