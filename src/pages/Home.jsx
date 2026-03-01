import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FireworksCanvas from "../components/birthday/FireworksCanvas";
import FloatingParticles from "../components/birthday/FloatingParticles";
import HeroSection from "../components/birthday/HeroSection";
import PhotoGallery from "../components/birthday/PhotoGallery";
import LoveLetterSection from "../components/birthday/LoveLetterSection";
import CakeScene from "../components/birthday/CakeScene";
import CursorTrail from "../components/birthday/CursorTrail";
import EntryAnimation from "../components/birthday/EntryAnimation";
import SlideshowNav from "../components/birthday/SlideshowNav";

const SECTIONS = ["Welcome", "Love Letter", "Gallery", "Birthday Cake"];

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
  }),
};

// Add your photo URLs here - photos are in public/photos/ folder
const INITIAL_PHOTOS = [
  { id: 1, url: "/Babe_Birthday/photos/photo1.jpg", caption: "Beautiful moment" },
  { id: 2, url: "/Babe_Birthday/photos/photo2.jpg", caption: "Our memories" },
  { id: 3, url: "/Babe_Birthday/photos/photo3.jpg", caption: "Together" },
  { id: 4, url: "/Babe_Birthday/photos/photo4.jpg", caption: "Together" },
  { id: 5, url: "/Babe_Birthday/photos/photo5.jpg", caption: "Together" },
  { id: 6, url: "/Babe_Birthday/photos/photo6.jpg", caption: "Together" },
  { id: 7, url: "/Babe_Birthday/photos/photo7.jpg", caption: "Together" },
  { id: 8, url: "/Babe_Birthday/photos/photo8.jpg", caption: "Together" },
  { id: 9, url: "/Babe_Birthday/photos/photo9.jpg", caption: "Together" },
  { id: 10, url: "/Babe_Birthday/photos/photo10.jpg", caption: "Together" },
  { id: 11, url: "/Babe_Birthday/photos/photo11.jpg", caption: "Together" },
  { id: 12, url: "/Babe_Birthday/photos/photo12.jpg", caption: "Together" },
  { id: 13, url: "/Babe_Birthday/photos/photo13.jpg", caption: "Together" },
  { id: 14, url: "/Babe_Birthday/photos/photo14.jpg", caption: "Together" },
  { id: 15, url: "/Babe_Birthday/photos/photo15.jpg", caption: "Together" },
  { id: 16, url: "/Babe_Birthday/photos/photo16.jpg", caption: "Together" },
  { id: 17, url: "/Babe_Birthday/photos/photo17.jpg", caption: "Together" },
  { id: 18, url: "/Babe_Birthday/photos/photo18.png", caption: "Together" },
  { id: 19, url: "/Babe_Birthday/photos/photo19.jpg", caption: "Together" },
  { id: 20, url: "/Babe_Birthday/photos/photo20.jpg", caption: "Together" },
  { id: 21, url: "/Babe_Birthday/photos/photo21.jpg", caption: "Together" },
  { id: 22, url: "/Babe_Birthday/photos/photo22.png", caption: "Together" },
  { id: 23, url: "/Babe_Birthday/photos/photo23.png", caption: "Together" },
  { id: 24, url: "/Babe_Birthday/photos/photo24.jpg", caption: "Together" },
  
  // Add more photos here - just put them in public/photos/ folder
];

export default function Home() {
  const [photos, setPhotos] = useState(() => {
    // Clear old localStorage and use INITIAL_PHOTOS
    localStorage.removeItem('birthday-photos');
    return INITIAL_PHOTOS;
  });
  const [entryDone, setEntryDone] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // Save photos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('birthday-photos', JSON.stringify(photos));
  }, [photos]);

  const goNext = () => {
    if (currentSlide < SECTIONS.length - 1) {
      setDirection(1);
      setCurrentSlide((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((s) => s - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide]);

  const handlePhotoAdded = (newPhotos) => {
    setPhotos(newPhotos);
  };

  const slides = [
    <HeroSection key="hero" onNext={goNext} />,
    <LoveLetterSection key="love" />,
    <PhotoGallery key="gallery" photos={photos} onPhotoAdded={handlePhotoAdded} />,
    <CakeScene key="cake" />,
  ];

  return (
    <>
      {/* Grand entry animation */}
      {!entryDone && <EntryAnimation onComplete={() => setEntryDone(true)} />}

      <div
        className="fixed inset-0 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 20% 20%, #1a0a2e 0%, #0d0a1a 40%, #0a0805 70%, #000000 100%)",
        }}
      >
        {/* Deep background layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% -10%, rgba(120,80,20,0.25) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 80%, rgba(80,40,120,0.2) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 10% 60%, rgba(100,60,20,0.15) 0%, transparent 50%)
            `,
            zIndex: 1,
          }}
        />

        {/* Gold shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            zIndex: 2,
          }}
        />

        <FloatingParticles />
        <FireworksCanvas />
        <CursorTrail />

        {/* Slide content */}
        <div className="absolute inset-0" style={{ zIndex: 20 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-y-auto"
              style={{ paddingBottom: "80px" }}
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section label removed */}

        {/* Navigation */}
        {entryDone && (
          <SlideshowNav
            current={currentSlide}
            total={SECTIONS.length}
            onPrev={goPrev}
            onNext={goNext}
            labels={SECTIONS}
          />
        )}
      </div>
    </>
  );
}