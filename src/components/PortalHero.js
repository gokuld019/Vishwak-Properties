"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Scene configuration with your uploaded images
const scenes = [
  {
    id: 1,
    title: "",
    subtitle: "",
    sky: "sky.jpg", // Replace with your Image 1
    clouds: "cloud.webp", // Replace with your Image 2
    arch: "arch.png", // Replace with your Image 3
    floor: "basement.png", // Replace with your Image 5
  },
  {
    id: 2,
    title: "Sacred Blessings",
    subtitle: "Boomi Pooja - Honoring the Earth",
    sky: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    clouds: "https://cdn.pixabay.com/photo/2017/01/31/23/42/cloud-2028005_1280.png",
    arch: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
    trees: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-trees-png-image_6689393.png",
    floor: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1920&q=90",
    particles: true,
  },
  {
    id: 3,
    title: "Building Dreams",
    subtitle: "Construction Excellence in Motion",
    sky: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    clouds: "https://cdn.pixabay.com/photo/2017/01/31/23/42/cloud-2028005_1280.png",
    arch: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
    trees: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-trees-png-image_6689393.png",
    floor: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1920&q=90",
    construction: true,
  },
  {
    id: 4,
    title: "Masterpiece Complete",
    subtitle: "Your Dream Stands Tall",
    sky: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    clouds: "https://cdn.pixabay.com/photo/2017/01/31/23/42/cloud-2028005_1280.png",
    arch: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
    trees: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-trees-png-image_6689393.png",
    floor: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1920&q=90",
  },
  {
    id: 5,
    title: "Welcome Home",
    subtitle: "Where Your Story Begins",
    sky: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    clouds: "https://cdn.pixabay.com/photo/2017/01/31/23/42/cloud-2028005_1280.png",
    arch: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
    trees: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-trees-png-image_6689393.png",
    floor: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1920&q=90",
    family: true,
  }
];

export default function CinematicPortalHero() {
  const containerRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("forward");
  
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Smooth mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Zoom animation value
  const zoomProgress = useMotionValue(0);
  const smoothZoom = useSpring(zoomProgress, { stiffness: 80, damping: 20 });

  const scene = scenes[currentScene];

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Mouse movement parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Zoom animation on transition
  useEffect(() => {
    if (isTransitioning) {
      zoomProgress.set(1);
      const timeout = setTimeout(() => {
        zoomProgress.set(0);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      zoomProgress.set(0);
    }
  }, [isTransitioning, currentScene]);

  // Scene transition logic
  const transitionToScene = (dir) => {
    if (isTransitioning) return;

    const newIndex = dir === "next"
      ? Math.min(currentScene + 1, scenes.length - 1)
      : Math.max(currentScene - 1, 0);

    if (newIndex === currentScene) return;

    setDirection(dir);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentScene(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 1200);
  };

  // Scroll handler
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;
      lastScrollTime.current = now;

      if (e.deltaY > 30) transitionToScene("next");
      if (e.deltaY < -30) transitionToScene("prev");
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [currentScene, isTransitioning]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 60) {
      if (delta > 0) transitionToScene("next");
      else transitionToScene("prev");
    }
  };

  // Layer transform calculator with zoom
  const getLayerStyle = (depthFactor, zoomScale) => {
    const parallaxX = useTransform(smoothMouseX, [-1, 1], [-30 * depthFactor, 30 * depthFactor]);
    const parallaxY = useTransform(smoothMouseY, [-1, 1], [-30 * depthFactor, 30 * depthFactor]);
    const scale = useTransform(smoothZoom, [0, 1], [1, 1 + zoomScale]);

    return { x: parallaxX, y: parallaxY, scale };
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ perspective: "2000px" }}
    >
      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.7) 100%)`
        }}
      />

      {/* Layer 1: Sky Background (Slowest) */}
      <motion.div
        key={`sky-${currentScene}`}
        className="absolute inset-0"
        style={getLayerStyle(0.15, 0.2)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div
          className="absolute inset-[-10%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${scene.sky})`,
            filter: "brightness(0.9) contrast(1.1)"
          }}
        />
      </motion.div>

      {/* Layer 2: Floating Clouds */}
      <motion.div
        key={`clouds-${currentScene}`}
        className="absolute inset-0"
        style={getLayerStyle(0.35, 0.4)}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img
            src={scene.clouds}
            alt="clouds"
            className="absolute top-[10%] left-[5%] w-[40%] opacity-60"
          />
          <img
            src={scene.clouds}
            alt="clouds"
            className="absolute top-[30%] right-[10%] w-[35%] opacity-50"
          />
          <img
            src={scene.clouds}
            alt="clouds"
            className="absolute bottom-[20%] left-[20%] w-[30%] opacity-40"
          />
        </motion.div>
      </motion.div>

      {/* Layer 3: Architectural Gate/Arch (Medium) */}
      <motion.div
        key={`arch-${currentScene}`}
        className="absolute inset-0 flex items-center justify-center"
        style={getLayerStyle(0.6, 0.8)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          scale: isTransitioning ? 1.5 : 1 
        }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <img
          src={scene.arch}
          alt="Portal Gate"
          className="w-[70vw] md:w-[60vw] max-w-[1200px] object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Layer 4: Side Trees (Fast) */}
      <motion.div
        key={`trees-${currentScene}`}
        className="absolute inset-0"
        style={getLayerStyle(0.8, 1.2)}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
      >
        <img
          src={scene.trees}
          alt="trees"
          className="absolute left-0 bottom-0 h-[40vh] object-contain"
        />
        <img
          src={scene.trees}
          alt="trees"
          className="absolute right-0 bottom-0 h-[40vh] object-contain scale-x-[-1]"
        />
      </motion.div>

      {/* Layer 5: Floor/Ground (Fastest - Strong Depth) */}
      <motion.div
        key={`floor-${currentScene}`}
        className="absolute bottom-0 left-0 right-0 h-[50vh]"
        style={getLayerStyle(1.2, 1.8)}
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          y: 0,
          scale: isTransitioning ? 2 : 1
        }}
        transition={{ duration: 1.6, delay: 0.5 }}
      >
        <div
          className="w-full h-full bg-cover bg-top"
          style={{
            backgroundImage: `url(${scene.floor})`,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%)"
          }}
        />
      </motion.div>

      {/* Floating Particles for Boomi Pooja */}
      {scene.particles && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: `radial-gradient(circle, ${i % 2 ? "#FFD700" : "#FFA500"} 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${10 + Math.random() * 20}px ${i % 2 ? "#FFD700" : "#FFA500"}`
              }}
              animate={{
                y: [0, -150 - Math.random() * 100, 0],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5 + Math.random(), 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Centered Title Content */}
      <motion.div
        key={`content-${currentScene}`}
        className="absolute inset-0 flex flex-col items-center justify-center z-40 text-white px-6"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          y: 0,
          scale: 1
        }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.div
          className="backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 
                     px-12 py-10 rounded-3xl border border-white/20 shadow-2xl"
          whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-3 tracking-tight 
                         bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent
                         drop-shadow-lg">
            {scene.title}
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light tracking-wide">
            {scene.subtitle}
          </p>
        </motion.div>

        {/* Scene counter */}
        <motion.div
          className="mt-8 text-white/50 text-xs tracking-[0.3em] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          CHAPTER {String(currentScene + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
        </motion.div>
      </motion.div>

      {/* Animated Progress Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isTransitioning && i !== currentScene) {
                setDirection(i > currentScene ? "next" : "prev");
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentScene(i);
                  setTimeout(() => setIsTransitioning(false), 300);
                }, 1200);
              }
            }}
            className="relative w-2.5 h-2.5 group cursor-pointer"
          >
            {/* Expanding ring for active */}
            {i === currentScene && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-white/80"
                animate={{
                  scale: [1, 3],
                  opacity: [0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}

            {/* Dot */}
            <span
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                i === currentScene
                  ? "bg-white scale-125 shadow-lg shadow-white/50"
                  : "bg-white/40 group-hover:bg-white/70 group-hover:scale-110"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll Hint (first scene only) */}
      {currentScene === 0 && !isTransitioning && (
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          <span className="text-white/60 text-sm tracking-[0.25em] font-light">
            SCROLL TO BEGIN
          </span>
          <motion.svg
            className="w-6 h-6 text-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      )}

      {/* Final CTA */}
      {currentScene === scenes.length - 1 && !isTransitioning && (
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className="px-12 py-5 bg-white text-black font-bold text-lg rounded-full
                       shadow-2xl border-2 border-white/20
                       hover:shadow-white/30 transition-all duration-300"
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 20px 60px rgba(255,255,255,0.4)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 z-45 bg-black pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2 }}
        />
      )}
    </div>
  );
}