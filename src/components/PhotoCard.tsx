import { PhotoData } from "@/data/photoData";
import { memo, useMemo } from "react";

interface PhotoCardProps {
  photo: PhotoData;
  index: number;
  totalCards: number;
  isHovered: boolean;
  onHover: (photo: PhotoData | null) => void;
  stackPosition: "left" | "right";
}

const PhotoCard = memo(({ 
  photo, 
  index, 
  totalCards, 
  isHovered,
  onHover,
}: PhotoCardProps) => {
  // Calculate offset for stacking effect - cards at end of array appear on top
  const stackIndex = totalCards - index - 1;
  // Spacing to create thick deck effect like reference
  const xOffset = stackIndex * 2;
  const yOffset = stackIndex * -2;
  const zOffset = stackIndex * 0.3;

  // Generate a gradient for more visual interest
  const gradientStyle = useMemo(() => {
    const hue = (photo.id * 47) % 360;
    const saturation = 30 + (photo.id % 35);
    const lightness = 40 + (photo.id % 20);
    const hue2 = (hue + 25) % 360;
    
    return {
      background: `linear-gradient(145deg, 
        hsl(${hue}, ${saturation}%, ${lightness}%) 0%, 
        hsl(${hue2}, ${saturation + 8}%, ${lightness - 8}%) 100%)`
    };
  }, [photo.id]);

  return (
    <div
      className={`
        absolute w-[200px] h-[135px] cursor-pointer
        bg-photo-border p-[3px]
        transition-all duration-400 ease-smooth
        hover:z-[1000]
        ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
      style={{
        transform: `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px)`,
        zIndex: index,
      }}
      onMouseEnter={() => onHover(photo)}
    >
      {/* Photo content with gradient */}
      <div 
        className="w-full h-full"
        style={{ 
          ...gradientStyle,
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.05)'
        }}
      />
    </div>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
