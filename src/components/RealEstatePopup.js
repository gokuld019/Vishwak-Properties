"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PropertyPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // SHOW POPUP ONLY ON FIRST VISIT
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

  // BODY SCROLL LOCK
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40 backdrop-blur-md
        transition-opacity duration-300
      "
      onClick={() => setIsOpen(false)}
    >
      {/* MODAL */}
      <div
        className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl bg-white
                   transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-0 z-20  text-black rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* DESKTOP */}
        <div className="hidden md:block  ">
          <img
            src="/popup.jpeg"
            alt="Property Desktop"
            className=" w-full "
          />
        </div>

        {/* MOBILE */}
        <div className="block md:hidden ">
          <img
            src="/popmob.jpeg"
            alt="Property Mobile"
            className=""
          />
        </div>
      </div>
    </div>
  );
}