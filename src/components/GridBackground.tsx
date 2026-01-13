const GridBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Vertical grid lines */}
      <div className="absolute inset-0 flex justify-between px-[5%]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="w-px h-full bg-[hsl(var(--grid-line))]"
          />
        ))}
      </div>
      
      {/* Horizontal center line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-[hsl(var(--grid-line))]" />
    </div>
  );
};

export default GridBackground;
