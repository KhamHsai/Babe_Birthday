import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection({ onNext }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-20">
      {/* Crown / decorative top */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="text-6xl mb-2 filter drop-shadow-lg">👑</div>
        <div className="flex gap-2 justify-center text-2xl">
          {"✨💫✨".split("").map((c, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.4, 1, 0.4], y: [0, -8, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* To babe label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-gold-400 text-lg tracking-[0.4em] uppercase mb-4 font-light"
        style={{ color: "#c9a84c", letterSpacing: "0.4em" }}
      >
        For my dearest
      </motion.p>

      {/* Main name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-white font-bold leading-none mb-4"
        style={{
          fontSize: "clamp(3.5rem, 12vw, 9rem)",
          background: "linear-gradient(135deg, #FFD700 0%, #FFF5CC 40%, #FFD700 70%, #B8860B 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          fontFamily: "'Georgia', serif",
          letterSpacing: "-0.02em",
        }}
      >
        Aiko
      </motion.h1>

      {/* Happy Birthday */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mb-8"
      >
        <h2
          className="text-2xl md:text-4xl font-light tracking-widest"
          style={{ color: "#f0d080", letterSpacing: "0.25em" }}
        >
          HAPPY BIRTHDAY
        </h2>
        <div
          className="mt-2 text-base md:text-lg tracking-[0.3em] font-light"
          style={{ color: "#c9a84c" }}
        >
          MARCH 2
        </div>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="h-px w-24 md:w-40" style={{ background: "linear-gradient(to right, transparent, #FFD700)" }} />
        <span style={{ color: "#FFD700", fontSize: "1.2rem" }}>♡</span>
        <div className="h-px w-24 md:w-40" style={{ background: "linear-gradient(to left, transparent, #FFD700)" }} />
      </motion.div>

      {/* Love message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="max-w-xl text-lg md:text-xl leading-relaxed font-light italic"
        style={{ color: "#e8d5b0" }}
      >
        "Every day with you is a celebration, babe — but today, the whole world celebrates you."
      </motion.p>

      {/* Next cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#c9a84c" }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs tracking-widest uppercase"
        >
          Press Next to begin ✦
        </motion.span>
      </motion.div>
    </div>
  );
}