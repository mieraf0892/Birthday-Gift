/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { Music, Heart, Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  note: string;
  audioUrl: string;
  duration: string;
  lyricsFile: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    note: "Because you are perfect in every way 💕",
    audioUrl: "/audio/perfect.mp3",
    duration: "4:41",
    lyricsFile: "/lyrics/perfect.txt",
  },
  {
    id: 2,
    title: "ነይ እንሂድ",
    artist: "Robel Mideksa",
    note: "You have all of me, always and forever",
    audioUrl: "/audio/neyenhid.mp3",
    duration: "4:26",
    lyricsFile: "/lyrics/all-of-me.txt",
  },
  {
    id: 3,
    title: "የኔ ቆንጆ",
    artist: "Bezuayehu Demisse",
    note: "How I felt the moment I found you",
    audioUrl: "/audio/yenekonjo.mp3",
    duration: "5:43",
    lyricsFile: "/lyrics/yenekonjo.txt",
  },
  {
    id: 4,
    title: "With You",
    artist: "Chris Brown",
    note: "Growing old with you is my dream",
    audioUrl: "/audio/withyou.mp3",
    duration: "4:11",
    lyricsFile: "/lyrics/withyou.txt",
  },
  {
    id: 5,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    note: "Some things are meant to be... like us",
    audioUrl: "/audio/justthewayyouare.mp3",
    duration: "3:40",
    lyricsFile: "/lyrics/justthewayyouare.txt",
  },
  {
    id: 6,
    title: "Carry You Home",
    artist: "Alex Warren",
    note: "I have loved you for a thousand years 🌹",
    audioUrl: "/audio/carryyouhome.mp3",
    duration: "2:46",
    lyricsFile: "/lyrics/carryyouhome.txt",
  },
  {
    id: 7,
    title: "ማን እንደኔ",
    artist: "Madingo Afework",
    note: "You light up every single day",
    audioUrl: "/audio/manendene.mp3",
    duration: "4:28",
    lyricsFile: "/lyrics/manendene.txt",
  },
  {
    id: 8,
    title: "ሃበነይ",
    artist: "Abraham Gebremedhin",
    note: "I'd go to the end of the earth for you",
    audioUrl: "/audio/Habeney.mp3",
    duration: "5:56",
    lyricsFile: "/lyrics/habeney.txt",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const PlaylistSection = () => {
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<string>("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs.find(song => song.id === playingSongId);

  const toggleLike = (songId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering play/pause
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Add floating heart animation
    const heartId = Date.now();
    setFloatingHearts(prev => [...prev, { id: heartId, x, y }]);
    
    // Remove heart after animation
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 2000);
    
    // Toggle like state
    setLikedSongs(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(songId)) {
        newLiked.delete(songId);
      } else {
        newLiked.add(songId);
      }
      return newLiked;
    });
  };

  const loadLyrics = async (lyricsFile: string) => {
    setLoadingLyrics(true);
    try {
      const response = await fetch(lyricsFile);
      if (response.ok) {
        const text = await response.text();
        setLyrics(text);
      } else {
        setLyrics("Lyrics not available. Please add the lyrics file.");
      }
    } catch (error) {
      setLyrics("Lyrics not available. Please add the lyrics file.");
    } finally {
      setLoadingLyrics(false);
    }
  };

  const handleShowLyrics = () => {
    if (currentSong) {
      loadLyrics(currentSong.lyricsFile);
      setShowLyrics(true);
    }
  };

  const handlePlayClick = (songId: number) => {
    if (playingSongId === songId) {
      // Pause current song
      audioRef.current?.pause();
      setPlayingSongId(null);
    } else {
      // Play new song
      setPlayingSongId(songId);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (playingSongId && audioRef.current) {
      audioRef.current.play();
    }
  }, [playingSongId]);

  return (
    <section id="playlist" className="py-24 px-6 bg-gradient-romantic relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-accent" />
            <span className="text-sm font-body tracking-wider uppercase text-muted-foreground">
              Our Soundtrack
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Songs That Tell <span className="italic text-gradient-rose">Our Story</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Each one chosen because it makes me think of you
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              variants={item}
              className="group relative bg-card/80 backdrop-blur-sm rounded-xl p-5 shadow-card hover:shadow-glow transition-all duration-500 hover:scale-[1.02] border border-border/50"
            >
              <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handlePlayClick(song.id)}
              >
                {/* Track number / play icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  {playingSongId === song.id ? (
                    <Pause className="w-5 h-5 text-primary fill-primary" />
                  ) : (
                    <>
                      <span className="text-primary font-display font-bold text-lg group-hover:hidden">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Play className="w-5 h-5 text-primary hidden group-hover:block fill-primary" />
                    </>
                  )}
                </div>

                {/* Song info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground truncate">
                    {song.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {song.artist}
                  </p>
                </div>

                {/* Duration */}
                <span className="text-sm text-muted-foreground font-body">
                  {song.duration}
                </span>

                {/* Heart */}
                <button
                  onClick={(e) => toggleLike(song.id, e)}
                  className="shrink-0 transition-transform hover:scale-110 active:scale-95"
                >
                  <Heart 
                    className={`w-5 h-5 transition-all duration-300 ${
                      likedSongs.has(song.id)
                        ? 'text-primary fill-primary scale-110'
                        : 'text-primary/40 group-hover:text-primary group-hover:fill-primary'
                    }`}
                  />
                </button>
              </div>

              {/* Note - appears on hover */}
              <motion.div
                className="overflow-hidden"
                initial={false}
              >
                <p className="mt-3 pt-3 border-t border-border/50 font-body text-sm text-muted-foreground italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20">
                  "{song.note}"
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Hearts Animation */}
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 1, 
              scale: 1,
              x: heart.x,
              y: heart.y,
            }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              y: heart.y - 100,
              x: heart.x + (Math.random() - 0.5) * 50,
            }}
            transition={{ 
              duration: 2,
              ease: "easeOut"
            }}
            className="fixed pointer-events-none z-50"
            style={{ left: 0, top: 0 }}
          >
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </motion.div>
        ))}

        {/* Custom Audio Player */}
        {currentSong && (
          <>
            {/* Lyrics Panel */}
            {showLyrics && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 overflow-y-auto"
                onClick={() => setShowLyrics(false)}
              >
                <div className="max-w-2xl mx-auto px-6 py-24 pb-32">
                  <div className="text-center mb-8">
                    <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                      {currentSong.title}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {currentSong.artist}
                    </p>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
                    {loadingLyrics ? (
                      <p className="font-body text-muted-foreground text-center">
                        Loading lyrics...
                      </p>
                    ) : (
                      <pre className="font-body text-foreground whitespace-pre-wrap leading-relaxed text-center">
                        {lyrics}
                      </pre>
                    )}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Tap anywhere to close
                  </p>
                </div>
              </motion.div>
            )}

            {/* Bottom Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl z-50"
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                  >
                    {audioRef.current?.paused ? (
                      <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                    ) : (
                      <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    )}
                  </button>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-foreground truncate">
                      {currentSong.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground truncate">
                      {currentSong.artist}
                    </p>
                  </div>

                  {/* Lyrics Button */}
                  <button
                    onClick={handleShowLyrics}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-body"
                  >
                    <Music className="w-4 h-4" />
                    <span>Lyrics</span>
                  </button>

                  {/* Progress Bar */}
                  <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
                    <span className="text-xs text-muted-foreground font-body w-10 text-right">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(currentTime / duration) * 100}%, hsl(var(--muted)) ${(currentTime / duration) * 100}%, hsl(var(--muted)) 100%)`
                      }}
                      className="flex-1 h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                    />
                    <span className="text-xs text-muted-foreground font-body w-10">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Volume Control */}
                  <div className="hidden lg:flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`
                      }}
                      className="w-24 h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                    />
                  </div>
                </div>

                {/* Mobile Progress Bar */}
                <div className="md:hidden mt-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-body">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(currentTime / duration) * 100}%, hsl(var(--muted)) ${(currentTime / duration) * 100}%, hsl(var(--muted)) 100%)`
                    }}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  />
                  <span className="text-xs text-muted-foreground font-body">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Mobile Lyrics Button */}
                <div className="sm:hidden mt-3">
                  <button
                    onClick={handleShowLyrics}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-body"
                  >
                    <Music className="w-4 h-4" />
                    <span>View Lyrics</span>
                  </button>
                </div>
              </div>

              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setPlayingSongId(null)}
              />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default PlaylistSection;
