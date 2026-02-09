import FloatingHearts from "@/components/FloatingHearts";
import Hero from "@/components/Hero";
import PlaylistSection from "@/components/PlaylistSection";
import MessageSection from "@/components/MessageSection";
import ThingsILoveYou from "@/components/ThingsILoveYou";
import LoveLetter from "@/components/LoveLetter";
import VirtualGifts from "@/components/VirtualGifts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <Hero />
      <PlaylistSection />
      <ThingsILoveYou />
      <LoveLetter />
      <VirtualGifts />
      <MessageSection />
      <Footer />
    </div>
  );
};

export default Index;
