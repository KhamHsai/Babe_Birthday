import { useEffect, useRef } from "react";

export default function FireworksCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "#FFD700", "#FFF0A0", "#FFB6C1", "#E8C7FF", "#C0F0FF",
      "#FF8C9E", "#FFEAA7", "#DDA0DD", "#F0E68C", "#B0E0E6"
    ];

    function createFirework(x, y) {
      const count = 80 + Math.floor(Math.random() * 40);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 2 + Math.random() * 6;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.5 ? color : color2,
          radius: 1.5 + Math.random() * 2.5,
          decay: 0.012 + Math.random() * 0.010,
          gravity: 0.06,
          trail: [],
        });
      }
    }

    function launchRandom() {
      const x = canvas.width * (0.15 + Math.random() * 0.7);
      const y = canvas.height * (0.1 + Math.random() * 0.45);
      createFirework(x, y);
      // burst 2-3 close by
      if (Math.random() > 0.4) {
        setTimeout(() => createFirework(x + (Math.random() - 0.5) * 200, y + (Math.random() - 0.5) * 100), 150);
      }
      if (Math.random() > 0.6) {
        setTimeout(() => createFirework(x + (Math.random() - 0.5) * 300, y + (Math.random() - 0.5) * 150), 350);
      }
    }

    launchRandom();
    const interval = setInterval(launchRandom, 3000);

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.01);

      for (const p of particlesRef.current) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        // draw trail
        for (let t = 0; t < p.trail.length - 1; t++) {
          const ta = (t / p.trail.length) * p.alpha * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,200,${ta})`;
          ctx.lineWidth = p.radius * 0.5;
          ctx.moveTo(p.trail[t].x, p.trail[t].y);
          ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${p.alpha})`).replace("rgb(", "rgba(").replace("#", "");

        // handle hex colors properly
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;

        // glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r},${g},${b},${p.alpha * 0.6})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= p.decay;
        p.radius *= 0.994;
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}