"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import PANOLENS from "panolens";

export default function Panorama360() {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const panoramaImage = "/blogsimage.png"; // <-- Add your 360 image here

    // Create Panorama
    const panorama = new PANOLENS.ImagePanorama(panoramaImage);

    // Create Viewer
    const viewer = new PANOLENS.Viewer({
      container: viewerRef.current,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      controlBar: true,
      output: "console",
      cameraFov: 60,
      enableReticle: true,
      dwellTime: 1500, // Hover time for VR selection
    });

    viewer.add(panorama);

    // Add Hotspot Example
    const hotspot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    hotspot.position.set(1000, -200, 200);
    hotspot.addHoverText("Living Room");
    hotspot.addEventListener("click", () => {
      alert("Opening Living Room Details...");
    });
    panorama.add(hotspot);

    return () => viewer.dispose();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 360 Viewer */}
      <div ref={viewerRef} className="w-full h-full" />

      {/* Modern UI Overlay */}
      <div className="absolute top-5 left-5 z-50 flex gap-3">
        <button className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition">
          Back
        </button>

        <button className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition">
          VR Mode
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent text-white text-lg">
        Explore the 360° Real Estate View
      </div>
    </div>
  );
}
