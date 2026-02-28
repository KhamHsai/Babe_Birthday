import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EntryAnimation({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [phase, setPhase] = useState("particles"); // particles -> text -> done
  const [show, setShow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Create burst particles forming "20"
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        r: 1.5 + Math.random() * 3,
        decay: 0.008 + Math.random() * 0.008,
        color: Math.random() > 0.5 ? "#FFD700" : "#DDA0FF",
        gravity: 0.04,
      });
    }

    let t = 0;
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      t++;

      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.97;
        p.alpha -= p.decay;
        p.r *= 0.995;

        if (p.alpha <= 0) continue;
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r},${g},${b},${p.alpha * 0.7})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };
    animate();

    const t1 = setTimeout(() => setPhase("text"), 600);
    const t2 = setTimeout(() => {
      setPhase("fade");
    }, 2800);
    const t3 = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 3600);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="entry"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "fade" ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 9999, background: "#000" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        <AnimatePresence>
          {phase === "text" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center select-none"
            >
              {/* Big 20 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: "clamp(6rem, 25vw, 14rem)",
                  fontFamily: "'Georgia', serif",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #FFD700 0%, #FFF5CC 40%, #FFD700 70%, #B8860B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  textShadow: "none",
                  filter: "drop-shadow(0 0 40px rgba(255,215,0,0.6))",
                }}
              >
                20
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: "#e8d5b0",
                  letterSpacing: "0.5em",
                  fontSize: "clamp(0.9rem, 3vw, 1.4rem)",
                  textTransform: "uppercase",
                  marginTop: "0.5rem",
                }}
              >
                Happy Birthday, Aiko 🎂
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-3 mt-4 text-3xl"
              >
                {["✨", "🎉", "💛", "🎉", "✨"].map((e, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}