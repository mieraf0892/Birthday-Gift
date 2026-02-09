import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const MessageSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm font-body tracking-wider uppercase text-muted-foreground">
            From My Heart
          </span>
          <Sparkles className="w-5 h-5 text-accent" />
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
          A Little <span className="italic text-gradient-rose">Love Note</span>
        </h2>

        {/* Love letter card */}
        <motion.div
          className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-card border border-border/50 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Decorative corner hearts */}
          <Heart className="absolute top-4 left-4 w-4 h-4 text-primary/20 fill-primary/20" />
          <Heart className="absolute top-4 right-4 w-4 h-4 text-primary/20 fill-primary/20" />
          <Heart className="absolute bottom-4 left-4 w-4 h-4 text-primary/20 fill-primary/20" />
          <Heart className="absolute bottom-4 right-4 w-4 h-4 text-primary/20 fill-primary/20" />

          <div className="space-y-6 font-body text-foreground/80 leading-relaxed text-lg">
            <p>
              Happy Birthday to the most amazing person in my life. 🎂
            </p>
            <p>
              Every day with you feels like a beautiful song — full of warmth, 
              laughter, and love. You make even the ordinary moments extraordinary.
            </p>
            <p>
              This playlist is my way of saying all the things that words alone 
              can't express. Each song is a chapter of our story, a memory we'll 
              make together, a feeling you've given me.
            </p>
            <p className="font-display text-xl italic text-primary">
              You are my favorite melody, today and always. 💕
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="font-display text-2xl italic text-foreground">
              With all my love,
            </p>
            <p className="font-display text-lg text-muted-foreground mt-1">
              Forever yours ♥
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MessageSection;
