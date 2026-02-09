/* eslint-disable react-hooks/purity */
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingHearts = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set initial height
    setWindowHeight(window.innerHeight);
    
    // Update on resize
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate hearts inside component to use windowHeight
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 12 + Math.random() * 16,
    opacity: 0.15 + Math.random() * 0.2,
    targetY: windowHeight > 0 ? -windowHeight - 100 : -1000,
  }));

  // Don't render until we have window height
  if (windowHeight === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.x}%`,
            bottom: "-5%",
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, heart.targetY],
            x: [0, Math.sin(heart.id) * 60],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;