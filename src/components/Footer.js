'use client';

import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Footer Section */}
      <footer className="relative">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Large Background Text */}
        <div className="relative z-10 text-center py-20">
          <h2 className="text-white text-6xl md:text-8xl lg:text-9xl font-bold mb-6 opacity-30">
            Vishwak Properties
          </h2>
          <div className="text-white text-center px-4 mb-12">
            <h3 className="text-3xl md:text-5xl font-bold mb-4">Your dream plot awaits</h3>
            <p className="text-lg md:text-xl max-w-4xl mx-auto">
              Whether you're choosing a premium plot or planning a custom villa, Vishwak Properties is where your dream address takes shape.
            </p>
          </div>
        </div>

        {/* White Footer Card */}
        <div className="relative z-20 container mx-auto px-4 -mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Left Column - Logo and Description */}
              <div>
                <div className="mb-6">
                  <svg viewBox="0 0 200 80" className="w-48 h-auto">
                    {/* Lotus Logo */}
                    <g transform="translate(30, 10)">
                      <path d="M20 15 L25 25 L20 22 L15 25 Z" fill="#D4A574" />
                      <path d="M20 15 L28 22 L25 25 Z" fill="#C4955F" />
                      <path d="M20 15 L12 22 L15 25 Z" fill="#C4955F" />
                      <path d="M10 25 L15 25 L12 32 Z" fill="#D4A574" />
                      <path d="M30 25 L25 25 L28 32 Z" fill="#D4A574" />
                      <ellipse cx="20" cy="27" rx="5" ry="4" fill="#D4A574" />
                      <path d="M15 32 L25 32 Q20 38 15 32 Z" fill="#6B8E23" />
                    </g>
                    {/* Text */}
                    <text x="70" y="30" className="text-2xl font-bold" fill="#1a1a1a">Vishwak</text>
                    <text x="70" y="50" className="text-lg font-bold tracking-wider" fill="#6B8E23">Properties</text>
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Vishwak Properties is a 26-acre, DTCP & RERA approved villa-plot community in Padappai's Oragadam belt—500+ plots, 40+ amenities, ready-to-build infrastructure, ORR connectivity, transparent buying, greener living, and strong investment potential.
                </p>
              </div>

              {/* Middle Column - Navigation Links */}
              <div>
                <nav className="space-y-4">
                  <Link href="/about" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group">
                    <span className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </span>
                    <span className="font-medium">About Us</span>
                  </Link>
                  <Link href="/advantages" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group">
                    <span className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </span>
                    <span className="font-medium">Advantages</span>
                  </Link>
                  <Link href="/channel-partner" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group">
                    <span className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </span>
                    <span className="font-medium">Channel Partner</span>
                  </Link>
                  <Link href="/gallery" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group">
                    <span className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </span>
                    <span className="font-medium">Gallery</span>
                  </Link>
                  <Link href="/blog" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group">
                    <span className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </span>
                    <span className="font-medium">Blog</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group">
                    <span className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </span>
                    <span className="font-medium">Contact Us</span>
                  </Link>
                </nav>
              </div>

              {/* Right Column - Contact Info */}
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl text-black md:text-3xl font-bold mb-2">+91 9500358900</h3>
                  <a href="mailto:sales@velammalgarden.com" className="text-lg md:text-xl font-semibold text-gray-700 hover:text-amber-600 transition-colors">
                    sales@vishwakproperties.com
                  </a>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
                    Facebook
                  </a>
                  <span>·</span>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
                    Instagram
                  </a>
                  <span>·</span>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
                    Youtube
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              © 2025 <span className="font-semibold text-black">Vishwak Properties</span>. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
}