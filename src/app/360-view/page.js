"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Panorama360() {
  const viewerRef = useRef(null);

  useEffect(() => {
    let viewer;
    let PANOLENS;

    async function loadPanorama() {
      // Dynamically import ONLY on client
      const module = await import("panolens");
      PANOLENS = module;

      const panorama = new PANOLENS.ImagePanorama("/blogsimage.png");

      viewer = new PANOLENS.Viewer({
        container: viewerRef.current,
        autoRotate: false,
        cameraFov: 60,
      });

      viewer.add(panorama);
    }

    // Run only on client
    if (typeof window !== "undefined") {
      loadPanorama();
    }

    return () => {
      if (viewer) viewer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div ref={viewerRef} className="w-full h-full" />
    </div>
  );
}
