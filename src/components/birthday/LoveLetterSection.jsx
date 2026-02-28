import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

const reasons = [
  { icon: "✨", text: "Your smile lights up every room you walk into" },
  { icon: "💫", text: "The way you laugh makes everything feel right" },
  { icon: "🌙", text: "You make ordinary moments feel magical" },
  { icon: "🌸", text: "Your kindness and warmth touch everyone around you" },
  { icon: "💎", text: "You are rare — truly one of a kind, babe" },
  { icon: "🦋", text: "Watching you grow into the woman you are is breathtaking" },
];

export default function LoveLetterSection() {
  return (
    <section className="relative z-20 py-20 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: "#c9a84c" }}>
          A letter for you
        </p>
        <h2
          className="font-bold mb-6"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            background: "linear-gradient(135deg, #FFD700, #FFF5CC, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Georgia', serif",
          }}
        >
          Why I Love You
        </h2>
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #FFD700)" }} />
          <Heart size={16} style={{ color: "#FFD700" }} fill="#FFD700" />
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #FFD700)" }} />
        </div>
      </motion.div>

      {/* Love letter card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(30,20,5,0.9) 0%, rgba(20,15,35,0.9) 100%)",
          border: "1px solid rgba(255,215,0,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,215,0,0.1)",
        }}
      >
        {/* Corner ornaments */}
        <div className="absolute top-4 left-4 text-2xl" style={{ color: "rgba(255,215,0,0.3)" }}>✦</div>
        <div className="absolute top-4 right-4 text-2xl" style={{ color: "rgba(255,215,0,0.3)" }}>✦</div>
        <div className="absolute bottom-4 left-4 text-2xl" style={{ color: "rgba(255,215,0,0.3)" }}>✦</div>
        <div className="absolute bottom-4 right-4 text-2xl" style={{ color: "rgba(255,215,0,0.3)" }}>✦</div>

        <p
          className="text-lg md:text-xl leading-relaxed italic text-center"
          style={{ color: "#e8d5b0", fontFamily: "'Georgia', serif" }}
        >
          My dearest Aiko,
        </p>
        <br />
        <p className="leading-relaxed text-center md:text-lg" style={{ color: "#c8b89a" }}>
          On this special day, I want you to know that you are everything to me. 
          Every morning I wake up grateful that you're mine. You are my calm, my joy, 
          my home. Watching you celebrate another year of this beautiful life you live 
          fills my heart with so much pride.
        </p>
        <br />
        <p className="leading-relaxed text-center md:text-lg" style={{ color: "#c8b89a" }}>
          Today and every day, I choose you. Happy Birthday, babe. 🥂
        </p>
        <br />
        <p className="text-right italic" style={{ color: "#c9a84c" }}>— Always yours 💛</p>
      </motion.div>

      {/* Reasons grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{
              background: "rgba(255,215,0,0.04)",
              border: "1px solid rgba(255,215,0,0.12)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{r.icon}</span>
            <p style={{ color: "#d4bea0" }} className="leading-relaxed">
              {r.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}