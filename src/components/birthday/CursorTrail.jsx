import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Add sparkle point
      for (let i = 0; i < 2; i++) {
        pointsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          alpha: 0.8 + Math.random() * 0.2,
          r: 1 + Math.random() * 2.5,
          decay: 0.025 + Math.random() * 0.02,
          gold: Math.random() > 0.4,
          vy: -0.5 - Math.random() * 0.8,
          vx: (Math.random() - 0.5) * 0.6,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter(p => p.alpha > 0.01);

      for (const p of pointsRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.r *= 0.97;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const color = p.gold
          ? `rgba(255, 215, 80, ${p.alpha})`
          : `rgba(220, 180, 255, ${p.alpha})`;
        ctx.fillStyle = color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    />
  );
}