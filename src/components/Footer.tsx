import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 text-center bg-card/50">
      <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-sm">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-primary fill-primary animate-pulse-soft" />
        <span>just for Glory T.L.</span>
      </div>
    </footer>
  );
};

export default Footer;
