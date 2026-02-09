import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

const reasons = [
  "Your smile ❤️",
  "Your kindness and your big heart",
  "Your laugh that echoes in my head all day",
  "Your patience when I mess up (which is often 😅)",
  "Your beautiful eyes",
  "How you support my dreams like no one else",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ThingsILoveYou() {
  return (
    <section className="py-20 px-6 bg-linear-to-b from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-700"
        >
          Things I Love About You
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group h-full border-rose-200 hover:border-rose-400 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 group-hover:fill-rose-500 transition-all" />
                    Reason #{index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-foreground transition-opacity duration-500">
                    {reason}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}