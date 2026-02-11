"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({ children, position = "center" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // BASE ROTATION (STATIC)
  const baseRotateY =
    position === "left" ? -6 : position === "right" ? 6 : 0;

  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const spring = { stiffness: 120, damping: 20 };

  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX: useSpring(rotateX, spring),
        rotateY: useSpring(rotateY, spring),
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateY: baseRotateY }}
      whileHover={{ rotateY: baseRotateY, y: -6 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
