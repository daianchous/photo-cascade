import { Grid3X3, Share2, HelpCircle } from "lucide-react";

const FooterActions = () => {
  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-4 z-30">
      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
        <Grid3X3 className="w-5 h-5" />
      </button>
      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
        <Share2 className="w-5 h-5" />
      </button>
      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FooterActions;
