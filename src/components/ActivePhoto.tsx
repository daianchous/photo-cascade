import { PhotoData } from "@/data/photoData";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { useMemo } from "react";

interface ActivePhotoProps {
  photo: PhotoData | null;
}

const ActivePhoto = ({ photo }: ActivePhotoProps) => {
  // Generate matching gradient
  const gradientStyle = useMemo(() => {
    if (!photo) return {};
    const hue = (photo.id * 37) % 360;
    const saturation = 25 + (photo.id % 40);
    const lightness = 35 + (photo.id % 25);
    const hue2 = (hue + 30) % 360;
    
    return {
      background: `linear-gradient(135deg, 
        hsl(${hue}, ${saturation}%, ${lightness}%) 0%, 
        hsl(${hue2}, ${saturation + 10}%, ${lightness - 10}%) 100%)`
    };
  }, [photo]);

  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
    >
      <div 
        className="pointer-events-auto"
        style={{ animation: 'fade-in-up 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
      >
        {/* Photo container with white border */}
        <div 
          className="bg-photo-border p-[4px]"
          style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 40px 80px rgba(0,0,0,0.12)' }}
        >
          <div 
            className="w-[620px] h-[430px]"
            style={gradientStyle}
          />
        </div>

        {/* Info panel */}
        <div 
          className="mt-5 text-info-text"
          style={{ animation: 'fade-in-up 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.08s forwards', opacity: 0 }}
        >
          <p className="text-sm font-normal tracking-wide flex items-center gap-2">
            {photo.timestamp}
            <span className="inline-block w-5 h-[1.5px] bg-muted-foreground/40" />
          </p>
          <p className="text-sm font-semibold tracking-wide mt-1.5 text-foreground">
            {photo.location}
          </p>
          <p className="text-sm font-normal tracking-wide mt-0.5 text-muted-foreground">
            {photo.source}
          </p>

          {/* Action links */}
          <div className="mt-5 space-y-2">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>read more</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <Bookmark className="w-4 h-4" />
              <span>save this picture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePhoto;
