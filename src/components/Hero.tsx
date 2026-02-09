import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Romantic birthday illustration with roses and vinyl records"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm shadow-soft"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-body tracking-wider uppercase text-muted-foreground">
              A Playlist Made With Love
            </span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        >
          Happy Birthday
          <br />
          <span className="text-gradient-rose italic">Glory ሃበነይ</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Every song on this playlist reminds me of you, of us, 
          and of all the beautiful moments we'll share together moving forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href="#playlist"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-medium text-lg shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))'
            }}
          >
            <span>Listen to Our Playlist</span>
            <Heart className="w-5 h-5 fill-current" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator - positioned independently */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5"
          style={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'hsl(var(--primary))' }}
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
