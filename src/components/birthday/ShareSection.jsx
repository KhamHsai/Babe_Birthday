import { motion } from "framer-motion";
import { Share2, Copy, Check, Heart } from "lucide-react";
import { useState } from "react";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Happy Birthday Aiko! 🎂",
        text: "A special birthday website made just for you 💛",
        url: shareUrl,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <section className="relative z-20 py-20 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <div className="text-5xl mb-6">🎂</div>
        <h2
          className="font-bold mb-4"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            background: "linear-gradient(135deg, #FFD700, #FFF5CC, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Georgia', serif",
          }}
        >
          Share With Aiko
        </h2>
        <p className="mb-8" style={{ color: "#c8b89a" }}>
          Send her this special page — let her know how loved she is 💛
        </p>

        {/* Share URL box */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl mb-6 text-left"
          style={{
            background: "rgba(255,215,0,0.06)",
            border: "1px solid rgba(255,215,0,0.2)",
          }}
        >
          <span className="flex-1 text-sm truncate" style={{ color: "#c9a84c" }}>
            {shareUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 p-2 rounded-lg transition-all"
            style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700" }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase transition-all"
            style={{
              background: "linear-gradient(135deg, #8B6914, #C9A84C, #8B6914)",
              color: "#fff8e1",
              boxShadow: "0 4px 24px rgba(201,168,76,0.5), 0 0 0 1px rgba(255,215,0,0.3)",
            }}
          >
            <Share2 size={18} />
            Share This Page
          </motion.button>
        </div>

        {/* Footer love note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-16" style={{ background: "rgba(255,215,0,0.3)" }} />
            <Heart size={14} fill="#FFD700" style={{ color: "#FFD700" }} />
            <div className="h-px w-16" style={{ background: "rgba(255,215,0,0.3)" }} />
          </div>
          <p className="text-sm italic" style={{ color: "#6b5a3a" }}>
            Made with love, just for Aiko ✨
          </p>
          <p className="text-xs tracking-widest" style={{ color: "#4a3a2a" }}>
            MARCH 2 · FOREVER YOURS
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}