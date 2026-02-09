import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";

const gifts = [
  { front: "Gift 1", back: "I'll accept your እንቢ for the rest of your birthday 🍲❤️" },
  { front: "Gift 2", back: "Unlimited hugs whenever you need them 🤗" },
  { front: "Gift 3", back: "One special date night – your choice of movie & place 🎥" },
  { front: "Gift 4", back: "I'll listen to all your stories without interrupting 🗣️" },
  // add 4–8 more
];

export default function VirtualGifts() {
  const [flipped, setFlipped] = useState<number[]>([]);

  const toggleFlip = (index: number) => {
    setFlipped(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  return (
    <section className="py-20 px-6 bg-linear-to-t from-rose-100 to-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-700"
        >
          Your Virtual Gifts – Click to Open 🎁
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gifts.map((gift, index) => {
            const isFlipped = flipped.includes(index);
            return (
              <div
                key={index}
                className="perspective-1000 cursor-pointer"
                onClick={() => toggleFlip(index)}
              >
                <motion.div
                  className="relative w-full h-64 preserve-3d transition-transform duration-800"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front (Gift Box) */}
                  <div className="absolute inset-0 backface-hidden bg-rose-500 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white p-6">
                    <Gift className="w-16 h-16 mb-4" />
                    <h3 className="text-2xl font-bold">{gift.front}</h3>
                    <p className="mt-2 opacity-80">Click to reveal</p>
                  </div>

                  {/* Back (Promise) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl shadow-xl border border-rose-300 flex flex-col items-center justify-center p-8 text-center">
                    <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mb-4" />
                    <p className="text-xl font-medium text-rose-800">{gift.back}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}