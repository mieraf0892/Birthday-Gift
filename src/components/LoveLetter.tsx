import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const letterText = `My Dearest Glory t.L (ሃበነይ) Koki, አይጤ,

On this special day, February 10, 2026, I want you to know how you've changed my me. From the moment we met that night, everything felt right. Your smile, your voice, the way you care... every little thing about you makes my heart full.

I promise to keep loving you through every sunrise, every rainy afternoon, and every quiet moment we share. You're my home, my joy, my everything.

Forever yours,  
[ምዕራፍ(ባቢ)]  
❤️`;

export default function LoveLetter() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleReadAloud = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(letterText);
      utterance.lang = "en-US"; // or "am-ET" if Amharic support exists in browser
      utterance.rate = 0.9; // slightly slower for emotion
      utterance.pitch = 1.1;

      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);

        utterance.onend = () => setIsSpeaking(false);
      }
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  return (
    <section className="py-24 px-6 bg-linear-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-rose-700 font-display"
        >
          A Letter From My Heart
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-rose-100 prose lg:prose-lg mx-auto font-body leading-relaxed"
        >
          <TypeAnimation
            sequence={[letterText]}
            speed={70} // slower = more romantic
            cursor={true}
            repeat={0}
            wrapper="div"
          />
        </motion.div>

        <div className="text-center mt-10">
          <Button
            onClick={handleReadAloud}
            variant="outline"
            className="gap-2 border-rose-400 text-rose-600 hover:bg-rose-50"
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            {isSpeaking ? "Stop Reading" : "Read Aloud to Me"}
          </Button>
        </div>

        <p className="text-center mt-8 text-xl italic font-script text-rose-600">
          With all my love, [ምዕራፍ(ባቢ)]
        </p>
      </div>
    </section>
  );
}