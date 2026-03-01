import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function PhotoGallery({ photos, onPhotoAdded }) {
  const [lightbox, setLightbox] = useState(null);
  const [uploading, setUploading] = useState(false);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i + 1) % photos.length);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    
    // Convert files to base64 or object URLs for local storage
    const newPhotos = [];
    for (const file of files) {
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = (e) => {
          newPhotos.push({
            id: Date.now() + Math.random(),
            url: e.target.result,
            order: photos.length + newPhotos.length + 1
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    
    const updatedPhotos = [...photos, ...newPhotos];
    onPhotoAdded(updatedPhotos);
    setUploading(false);
  };

  return (
    <section className="relative z-20 py-20 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: "#c9a84c" }}>
          Our Memories
        </p>
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            background: "linear-gradient(135deg, #FFD700, #FFF5CC, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Georgia', serif",
          }}
        >
          Beautiful Moments
        </h2>
        <div className="flex items-center gap-4 justify-center mt-4">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #FFD700)" }} />
          <Heart size={16} style={{ color: "#FFD700" }} fill="#FFD700" />
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #FFD700)" }} />
        </div>
      </motion.div>

      {/* Photo grid - Pinterest style masonry */}
      {photos.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              whileHover={{ scale: 1.04, zIndex: 10 }}
              onClick={() => openLightbox(idx)}
              className="relative cursor-pointer overflow-hidden rounded-xl mb-3 md:mb-4 break-inside-avoid"
              style={{
                border: "1px solid rgba(255,215,0,0.2)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={photo.url}
                alt={photo.caption || `Memory ${idx + 1}`}
                className="w-full block transition-transform duration-500 hover:scale-110"
                style={{ display: 'block' }}
              />
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                <Heart fill="white" size={28} className="text-white" />
              </div>
              {/* Gold border glow on hover */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 2px rgba(255,215,0,0.5)" }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16" style={{ color: "#8a7a5a" }}>
          <Heart size={48} className="mx-auto mb-4" style={{ color: "#4a3a2a" }} />
          <p className="text-lg">Add your beautiful photos above ✨</p>
        </div>
      )}

      {/* Upload button removed - photos are hardcoded */}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={photos[lightbox]?.url}
              alt=""
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-xl"
              style={{ boxShadow: "0 0 60px rgba(255,215,0,0.2), 0 0 0 1px rgba(255,215,0,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            <div className="absolute bottom-6 text-center" style={{ color: "#c9a84c", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}