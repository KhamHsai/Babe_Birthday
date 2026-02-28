import { motion } from "framer-motion";

export default function SlideshowNav({ current, total, onPrev, onNext, labels }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 pointer-events-none">
      {/* Prev */}
      <motion.button
        className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase"
        style={{
          background: current === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,215,0,0.08)",
          border: "1px solid rgba(255,215,0,0.2)",
          color: current === 0 ? "rgba(255,215,0,0.3)" : "#c9a84c",
          backdropFilter: "blur(10px)",
          cursor: current === 0 ? "not-allowed" : "pointer",
        }}
        onClick={onPrev}
        disabled={current === 0}
        whileHover={current > 0 ? { scale: 1.05 } : {}}
        whileTap={current > 0 ? { scale: 0.95 } : {}}
      >
        ← Prev
      </motion.button>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === current ? 1.4 : 1,
              opacity: i === current ? 1 : 0.35,
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full"
            style={{
              width: i === current ? 10 : 6,
              height: i === current ? 10 : 6,
              background: "#FFD700",
              boxShadow: i === current ? "0 0 10px rgba(255,215,0,0.8)" : "none",
            }}
          />
        ))}
      </div>

      {/* Next */}
      <motion.button
        className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase"
        style={{
          background: current === total - 1 ? "rgba(255,255,255,0.04)" : "rgba(255,215,0,0.12)",
          border: "1px solid rgba(255,215,0,0.3)",
          color: current === total - 1 ? "rgba(255,215,0,0.3)" : "#ffd700",
          backdropFilter: "blur(10px)",
          cursor: current === total - 1 ? "not-allowed" : "pointer",
          boxShadow: current === total - 1 ? "none" : "0 0 20px rgba(255,215,0,0.15)",
        }}
        onClick={onNext}
        disabled={current === total - 1}
        whileHover={current < total - 1 ? { scale: 1.05 } : {}}
        whileTap={current < total - 1 ? { scale: 0.95 } : {}}
      >
        Next →
      </motion.button>
    </div>
  );
}