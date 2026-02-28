import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const wishes = [
  { emoji: "🌟", text: "May your 20s be filled with adventures that take your breath away" },
  { emoji: "💫", text: "You are stepping into the most radiant decade of your life" },
  { emoji: "🌸", text: "Every dream you've whispered to the night sky — may they all bloom" },
  { emoji: "💎", text: "You are rare, luminous, and endlessly loved" },
  { emoji: "🦋", text: "20 years of magic, and the best chapters haven't even been written yet" },
  { emoji: "🥂", text: "Here's to you, Aiko — the most beautiful soul I know" },
  { emoji: "🌙", text: "May love find you in every corner of your journey" },
  { emoji: "✨", text: "Happy 20th Birthday, my love — this one is all for you" },
];

export default function CakeScene() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animRef = useRef(null);
  const [blown, setBlown] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const flamesRef = useRef([]);
  const smokeRef = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2.5, 7);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x553322, 1.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffd700, 3, 15);
    pointLight.position.set(0, 5, 3);
    pointLight.castShadow = true;
    scene.add(pointLight);
    const rimLight = new THREE.DirectionalLight(0x9966ff, 0.8);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // Flame point lights (one per candle)
    const flameLights = [];
    const candlePositions = [-1.2, -0.4, 0.4, 1.2];
    candlePositions.forEach(x => {
      const fl = new THREE.PointLight(0xff8800, 1.5, 3);
      fl.position.set(x, 3.5, 0);
      scene.add(fl);
      flameLights.push(fl);
    });

    // === CAKE ===
    // Bottom tier
    const tier1Geo = new THREE.CylinderGeometry(2.2, 2.4, 1.1, 32);
    const tier1Mat = new THREE.MeshStandardMaterial({
      color: 0x8B1A6B,
      roughness: 0.4,
      metalness: 0.1,
    });
    const tier1 = new THREE.Mesh(tier1Geo, tier1Mat);
    tier1.position.y = 0.55;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    scene.add(tier1);

    // Frosting ring bottom
    const frost1Geo = new THREE.TorusGeometry(2.2, 0.15, 16, 64);
    const frostMat = new THREE.MeshStandardMaterial({ color: 0xfff0f5, roughness: 0.3, metalness: 0.05 });
    const frost1 = new THREE.Mesh(frost1Geo, frostMat);
    frost1.position.y = 1.1;
    frost1.rotation.x = Math.PI / 2;
    scene.add(frost1);

    // Top tier
    const tier2Geo = new THREE.CylinderGeometry(1.5, 1.6, 0.9, 32);
    const tier2Mat = new THREE.MeshStandardMaterial({ color: 0xc0357a, roughness: 0.35, metalness: 0.1 });
    const tier2 = new THREE.Mesh(tier2Geo, tier2Mat);
    tier2.position.y = 1.65;
    tier2.castShadow = true;
    scene.add(tier2);

    // Frosting top tier
    const frost2Geo = new THREE.TorusGeometry(1.5, 0.12, 16, 64);
    const frost2 = new THREE.Mesh(frost2Geo, frostMat);
    frost2.position.y = 2.1;
    frost2.rotation.x = Math.PI / 2;
    scene.add(frost2);

    // Top surface frosting (flat disk)
    const topGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.08, 32);
    const topMat = new THREE.MeshStandardMaterial({ color: 0xffeef5, roughness: 0.2 });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    topMesh.position.y = 2.15;
    scene.add(topMesh);

    // Gold decorative band bottom tier
    const band1Geo = new THREE.CylinderGeometry(2.22, 2.22, 0.1, 64);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
    const band1 = new THREE.Mesh(band1Geo, goldMat);
    band1.position.y = 0.6;
    scene.add(band1);
    const band2 = new THREE.Mesh(band1Geo, goldMat);
    band2.position.y = 0.9;
    scene.add(band2);

    // Gold band top tier
    const band3Geo = new THREE.CylinderGeometry(1.52, 1.52, 0.08, 64);
    const band3 = new THREE.Mesh(band3Geo, goldMat);
    band3.position.y = 1.7;
    scene.add(band3);

    // Sprinkles / pearls
    const pearlMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.1 });
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const pearlGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(Math.cos(angle) * 2.22, 0.75 + Math.random() * 0.2, Math.sin(angle) * 2.22);
      scene.add(pearl);
    }

    // Candles
    const candleMats = [0xff6b9d, 0xffd93d, 0x6bcfff, 0xa8ff78];
    const flames = [];
    const smokes = [];

    candlePositions.forEach((x, idx) => {
      // Candle body
      const candleGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.7, 16);
      const candleMat = new THREE.MeshStandardMaterial({ color: candleMats[idx], roughness: 0.5 });
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.set(x, 2.56, 0.2 * Math.sin(idx));
      scene.add(candle);

      // Wick
      const wickGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8);
      const wickMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const wick = new THREE.Mesh(wickGeo, wickMat);
      wick.position.set(x, 2.97, 0.2 * Math.sin(idx));
      scene.add(wick);

      // Flame
      const flameGeo = new THREE.ConeGeometry(0.07, 0.22, 8);
      const flameMat = new THREE.MeshStandardMaterial({
        color: 0xff9900,
        emissive: 0xff6600,
        emissiveIntensity: 2,
        transparent: true,
        opacity: 0.95,
      });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(x, 3.12, 0.2 * Math.sin(idx));
      scene.add(flame);
      flames.push(flame);

      // Smoke (hidden initially)
      const smokeGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const smokeMat = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0,
      });
      const smoke = new THREE.Mesh(smokeGeo, smokeMat);
      smoke.position.set(x, 3.2, 0.2 * Math.sin(idx));
      scene.add(smoke);
      smokes.push(smoke);
    });

    flamesRef.current = flames;
    smokeRef.current = smokes;

    // Plate
    const plateGeo = new THREE.CylinderGeometry(2.6, 2.7, 0.12, 64);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.05 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = -0.06;
    scene.add(plate);

    // "20" text sprite above cake (gold floating text)
    const canvas20 = document.createElement("canvas");
    canvas20.width = 256; canvas20.height = 128;
    const ctx = canvas20.getContext("2d");
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 256, 128);
    ctx.font = "bold 80px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const grad = ctx.createLinearGradient(0, 0, 256, 128);
    grad.addColorStop(0, "#FFD700");
    grad.addColorStop(0.5, "#FFF5CC");
    grad.addColorStop(1, "#FFD700");
    ctx.fillStyle = grad;
    ctx.fillText("20", 128, 64);
    const tex20 = new THREE.CanvasTexture(canvas20);
    const sprite20 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.6),
      new THREE.MeshBasicMaterial({ map: tex20, transparent: true, side: THREE.DoubleSide })
    );
    sprite20.position.set(0, 3.7, 0);
    scene.add(sprite20);

    // Subtle rotation & animation loop
    let t = 0;
    let blownState = false;
    let smokeProgress = 0;

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      t += 0.016;

      // Rotate cake gently
      tier1.rotation.y = t * 0.15;
      tier2.rotation.y = -t * 0.12;
      plate.rotation.y = t * 0.1;
      sprite20.rotation.y = t * 0.2;
      sprite20.position.y = 3.7 + Math.sin(t * 1.2) * 0.08;

      if (!blownState) {
        // Animate flames
        flames.forEach((flame, i) => {
          flame.scale.x = 1 + Math.sin(t * 8 + i) * 0.15;
          flame.scale.z = 1 + Math.cos(t * 7 + i) * 0.15;
          flame.scale.y = 1 + Math.sin(t * 10 + i * 1.3) * 0.1;
          flame.position.x = candlePositions[i] + Math.sin(t * 6 + i) * 0.015;
        });
        // Flicker flame lights
        flameLights.forEach((fl, i) => {
          fl.intensity = 1.2 + Math.sin(t * 9 + i * 2) * 0.5;
        });
      } else {
        // Smoke animation
        smokeProgress = Math.min(smokeProgress + 0.02, 1);
        smokes.forEach((smoke, i) => {
          smoke.material.opacity = smokeProgress * 0.6 * Math.max(0, 1 - smokeProgress * 1.5 + 0.5);
          smoke.position.y = 3.2 + smokeProgress * 0.8;
          smoke.scale.setScalar(1 + smokeProgress * 2);
        });
        flameLights.forEach(fl => fl.intensity = Math.max(0, fl.intensity - 0.05));
      }

      renderer.render(scene, camera);
    };

    animate();

    // Store blown setter reference in scene userData
    scene.userData.setBlown = (val) => { blownState = val; };

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    setCandlesOut(true);
    if (sceneRef.current) sceneRef.current.userData.setBlown(true);
    // Hide flames via ref
    flamesRef.current.forEach(f => { f.visible = false; });
    setTimeout(() => setShowWishes(true), 1200);
  };

  return (
    <div className="relative w-full flex flex-col items-center" style={{ minHeight: "100vh" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16 pb-4 z-20 relative"
      >
        <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: "#c9a84c" }}>
          Make a wish
        </p>
        <h2
          className="font-bold mb-2"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            background: "linear-gradient(135deg, #FFD700, #FFF5CC, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Georgia', serif",
          }}
        >
          Your Birthday Cake 🎂
        </h2>
        <p className="text-sm" style={{ color: "#c8b89a" }}>
          {!blown ? "Click the flame or tap the button to blow out your candles!" : "You did it! ✨"}
        </p>
      </motion.div>

      {/* 3D Canvas */}
      <div
        ref={mountRef}
        onClick={handleBlow}
        className="relative cursor-pointer"
        style={{ width: "100%", maxWidth: 500, height: 400 }}
      />

      {/* Blow button */}
      <AnimatePresence>
        {!blown && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 }}
            onClick={handleBlow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-30 mt-2 px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium"
            style={{
              background: "linear-gradient(135deg, #b8860b, #ffd700, #b8860b)",
              color: "#1a0a00",
              boxShadow: "0 0 30px rgba(255,215,0,0.4), 0 4px 20px rgba(0,0,0,0.4)",
              letterSpacing: "0.2em",
            }}
          >
            💨 Blow Out the Candles
          </motion.button>
        )}
      </AnimatePresence>

      {/* Wishes section */}
      <AnimatePresence>
        {showWishes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-20 w-full max-w-3xl px-4 mt-10 pb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  background: "linear-gradient(135deg, #FFD700, #FFF5CC, #FFD700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Happy 20th Birthday, Aiko! 🌟
              </h3>
              <p style={{ color: "#c8b89a" }} className="italic text-lg">
                My wishes for you, on this magical day...
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishes.map((wish, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="relative p-5 rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(30,15,50,0.9), rgba(20,10,35,0.95))",
                    border: "1px solid rgba(255,215,0,0.2)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,0,0.1)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: 0.6 + i * 0.15, repeat: Infinity, repeatDelay: 3 }}
                    className="text-3xl mb-3"
                  >
                    {wish.emoji}
                  </motion.div>
                  <p style={{ color: "#e8d5b0", lineHeight: 1.6 }} className="text-sm md:text-base">
                    {wish.text}
                  </p>
                  {/* Gold corner sparkle */}
                  <div className="absolute top-2 right-2 text-xs" style={{ color: "rgba(255,215,0,0.3)" }}>✦</div>
                </motion.div>
              ))}
            </div>

            {/* Final message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="text-center mt-12 p-8 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(120,60,20,0.2), rgba(80,40,120,0.2))",
                border: "1px solid rgba(255,215,0,0.25)",
              }}
            >
              <p
                className="text-xl md:text-2xl italic leading-relaxed"
                style={{ color: "#e8d5b0", fontFamily: "'Georgia', serif" }}
              >
                "Here's to 20 years of being the most wonderful person in my world — and to every beautiful year that follows."
              </p>
              <p className="mt-4 text-lg" style={{ color: "#c9a84c" }}>— Always yours 💛</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}