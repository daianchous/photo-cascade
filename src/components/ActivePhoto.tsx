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
    const hue = (photo.id * 47) % 360;
    const saturation = 35 + (photo.id % 30);
    const lightness = 42 + (photo.id % 18);
    const hue2 = (hue + 20) % 360;
    
    return {
      background: `linear-gradient(145deg, 
        hsl(${hue}, ${saturation}%, ${lightness}%) 0%, 
        hsl(${hue2}, ${saturation + 5}%, ${lightness - 6}%) 100%)`
    };
  }, [photo]);

  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
    >
      <div 
        className="pointer-events-auto"
        style={{ 
          animation: 'fade-in-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        {/* Photo container with white border like reference */}
        <div 
          className="bg-photo-border p-[4px]"
          style={{ 
            boxShadow: '0 15px 50px rgba(0,0,0,0.18), 0 50px 100px rgba(0,0,0,0.12)'
          }}
        >
          <div 
            className="w-[600px] h-[420px]"
            style={gradientStyle}
          />
        </div>

        {/* Info panel exactly like reference */}
        <div 
          className="mt-6 text-foreground"
          style={{ 
            animation: 'fade-in-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.06s forwards', 
            opacity: 0 
          }}
        >
          <p className="text-sm font-normal tracking-wide flex items-center gap-3">
            {photo.timestamp}
            <span className="inline-block w-6 h-[2px] bg-foreground/30" />
          </p>
          <p className="text-sm font-semibold tracking-wider mt-2 uppercase">
            {photo.location}
          </p>
          <p className="text-sm font-normal tracking-wide mt-1 text-muted-foreground">
            {photo.source}
          </p>

          {/* Action links */}
          <div className="mt-6 space-y-2.5">
            <button className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>read more</span>
            </button>
            <button className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
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
