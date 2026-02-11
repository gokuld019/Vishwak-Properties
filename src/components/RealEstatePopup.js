"use client";

import React, { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";

export default function PropertyPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ SHOW POPUP ONLY ONCE (FIRST VISIT)
  useEffect(() => {
    const hasShownPopup = localStorage.getItem("property_popup_shown");

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("property_popup_shown", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // 🔒 BODY SCROLL LOCK + SCROLLBAR PRESERVATION
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={() => setIsOpen(false)}
    >
      {/* MODAL */}
      <div
        className="relative bg-white w-full max-w-5xl rounded-sm shadow-2xl 
                   max-h-[80vh] overflow-hidden animate-slideUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-20 bg-gray-700 hover:bg-gray-600 rounded-sm p-1.5 transition"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* IMAGE SECTION */}
        <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=800&fit=crop&q=90"
            alt="Property"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: scale(0.95) translateY(16px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
