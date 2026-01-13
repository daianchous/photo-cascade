interface HeaderProps {
  currentTime: string;
  currentDate: string;
}

const Header = ({ currentTime, currentDate }: HeaderProps) => {
  return (
    <>
      {/* Date and time - top left */}
      <div className="fixed top-8 left-8 z-30">
        <p className="text-sm font-medium tracking-wide">{currentDate}</p>
        <p className="text-2xl font-light tracking-tight">{currentTime}</p>
      </div>

      {/* Title - top center */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-30">
        <h1 className="text-lg font-light tracking-[0.3em]">
          every <span className="text-muted-foreground">:</span> second
        </h1>
      </div>
    </>
  );
};

export default Header;
