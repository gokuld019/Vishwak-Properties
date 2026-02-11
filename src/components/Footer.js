"use client";

import Link from "next/link";
import { ChevronUp, Instagram, Facebook, Youtube, Linkedin
   } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative mb-24">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/footer1.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center px-4 py-20 sm:py-24 md:py-28">
          <h2 className="
            text-white font-bold opacity-30
            text-4xl sm:text-6xl md:text-8xl lg:text-9xl
            mb-6
          ">
            Vishwak Properties
          </h2>

          <div className="text-white max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
              Your dream plot awaits
            </h3>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Whether you're choosing a premium plot or planning a custom villa,
              Vishwak Properties is where your dream address takes shape.
            </p>
          </div>
        </div>

        {/* Footer Card */}
       <div className="relative z-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mb-24">
  <div
    className="
      backdrop-blur-2xl bg-white/70
      border border-white/40
      rounded-[32px]
      shadow-[0_30px_80px_rgba(0,0,0,0.18)]
      p-8 sm:p-10 md:p-14
    "
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 lg:gap-20">

      {/* COLUMN 1 – BRAND */}
      <div>
        <Image
          src="/Logo.png"
          alt="Vishwak Properties Logo"
          width={180}
          height={90}
          className="object-contain mb-6"
        />

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-sm">
          Vishwak Properties delivers premium, RERA-approved villa plots with
          world-class amenities, lush landscapes, and exceptional connectivity —
          built for long-term value and refined living.
        </p>
      </div>

      {/* COLUMN 2 – PROJECT LINKS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

        {/* Ongoing */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Ongoing Projects
          </h4>

          <div className="space-y-3">
            {[
              ["Aira Avenue", "/project-details/aira-avenue"],
              ["ALA Garden – Vandalur", "/project-details/tvs-emerald"],
              ["SS Astron – OMR, Kelambakkam", "/project-details/green-meadows"],
              ["VK Aurora – Kelambakkam", "/project-details/verde-vista"],
            ].map(([label, url], i) => (
              <Link
                key={i}
                href={url}
                className="
                  group flex items-start gap-3
                  text-gray-700 text-sm sm:text-base
                  hover:text-[#67a139] transition
                "
              >
                <span className="
                  mt-2 w-1.5 h-1.5 rounded-full bg-[#67a139]
                  opacity-0 group-hover:opacity-100 transition
                " />
                <span className="leading-snug">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Completed Projects
          </h4>

          <Link
            href="/project-details/vista-residency"
            className="
              group flex items-start gap-3
              text-gray-700 text-sm sm:text-base
              hover:text-[#67a139] transition
            "
          >
            <span className="
              mt-2 w-1.5 h-1.5 rounded-full bg-[#67a139]
              opacity-0 group-hover:opacity-100 transition
            " />
            <span className="leading-snug">
              Sameera Grand City – Villas @ East Tambaram
            </span>
          </Link>
        </div>

      </div>

      {/* COLUMN 3 – CONTACT */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Contact
        </h3>

        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          +91 74011 31313
        </p>

        <a
          href="mailto:info@vishwakproperties.in"
          className="text-gray-700 text-sm sm:text-base hover:text-[#67a139] transition"
        >
          info@vishwakproperties.in
        </a>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-4 mt-8">
          {[
            { href: "https://www.facebook.com/Vishwakproperties/", Icon: Facebook },
            { href: "https://www.instagram.com/vishwakvaluehomes/?igsh=a3Q2N3Z6d2ExemN3#", Icon: Instagram },
            { href: "https://www.youtube.com/@VishwakValueHomes", Icon: Youtube },
            { href: "https://www.linkedin.com/company/104862350/admin/dashboard/", Icon: Linkedin },
          ].map(({ href, Icon }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-11 h-11 flex items-center justify-center
                rounded-full bg-white
                border border-gray-200
                shadow-md
                hover:border-[#67a139]
                hover:shadow-[#67a139]/40
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <Icon className="w-5 h-5 text-gray-700" />
            </a>
          ))}
        </div>
      </div>

    </div>

    {/* COPYRIGHT */}
    <div className="mt-14 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
      © 2025{" "}
      <span className="font-semibold text-gray-900">
        Vishwak Properties
      </span>
      . All Rights Reserved.
    </div>
  </div>
</div>

      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="
          fixed bottom-6 right-6 sm:bottom-8 sm:right-8
          w-12 h-12 sm:w-14 sm:h-14
          rounded-full bg-amber-500 hover:bg-amber-600
          text-white flex items-center justify-center
          shadow-lg hover:scale-110 transition
          z-50
        "
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>
  );
}
