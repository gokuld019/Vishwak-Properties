"use client";

import { useEffect, useRef } from "react";
import PhotoSphereViewer from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

export default function VirtualTour360({ image }) {
  const containerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize viewer
    const viewer = new PhotoSphereViewer.Viewer({
      container: containerRef.current,
      panorama: image,
      defaultZoomLvl: 0,
      touchmoveTwoFingers: true,
      mousewheel: true,
      navbar: [
        "zoom",
        "fullscreen",
      ],
    });

    viewerInstance.current = viewer;

    return () => viewer.destroy();
  }, [image]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
    />
  );
}
