"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function ModernDropdown({ open, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-[999]"
        >
          <div className="
            bg-white/70 backdrop-blur-xl 
            shadow-2xl rounded-2xl border border-white/30 
            p-6 grid grid-cols-2 gap-8 w-[680px]
            transition-all duration-300
          ">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
