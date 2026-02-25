"use client";

import Link from "next/link";
import { ChevronUp, Instagram, Facebook, Youtube, Linkedin, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ChatAssistant from "@/components/chatassistant";

/* ✅ DEFINE API_BASE BEFORE USING IT */
const API_BASE = `${process.env.NEXT_PUBLIC_API_LIVE_URL}`;

/* ✅ UPDATED URL ONLY */
const ongoingProjects = [
  ["Aira Avenue", `${API_BASE}/project-details/1`],
  ["ALA Garden – Vandalur", `${API_BASE}/project-details/12`],
  ["SS Astron – OMR", `${API_BASE}/project-details/5`],
  ["VK Aurora – Kelambakkam", `${API_BASE}/project-details/10`],
];

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/Vishwakproperties/", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/vishwakvaluehomes?igsh=a3Q2N3Z6d2ExemN3", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/@VishwakValueHomes", label: "YouTube" },
  { Icon: Linkedin, href: "linkedin.com/company/104862350/admin/dashboard/", label: "LinkedIn" },
];

const navLinks = [
  ["About Us", "/about"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const IMAGE_BASE = `${process.env.NEXT_PUBLIC_API_URL}/`;

  return (
    <>
      <ChatAssistant />

      <footer className="relative w-full bg-white border-t border-[#e4ede0] overflow-hidden text-[#1a2e1a]">

        <div
          className="pointer-events-none absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,161,57,0.07) 0%, transparent 68%)" }}
        />

        <div
          className="pointer-events-none absolute bottom-8 -left-16 w-[280px] h-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,161,57,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 pt-14 sm:pt-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">

            <div className="order-1 md:order-1 flex justify-center md:justify-start">
              <Link href="/" className="inline-flex items-center gap-3 group w-fit">
                <img
                  src="/Logo.png"
                  alt="Vishwak Properties"
                  className="h-24 md:h-30 w-auto object-contain group-hover:opacity-80 transition-opacity duration-200"
                />
              </Link>
            </div>

            <div className="order-2 md:order-4">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#67a139] mb-5">
                Get In Touch
              </p>

              <p
                className="text-[#1a2e1a] font-bold leading-none mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                +91 74011 31313
              </p>

              <a
                href="mailto:info@vishwakproperties.in"
                className="text-sm text-[#5a7250] hover:text-[#67a139] transition-colors duration-200"
              >
                info@vishwakproperties.in
              </a>

              <div className="flex items-center gap-2 mt-6">
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-[#d4e5c8] bg-[#f7faf5] flex items-center justify-center text-[#5a7250] hover:bg-[#67a139] hover:border-[#67a139] hover:text-white hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(103,161,57,0.3)] transition-all duration-200 cursor-pointer"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="order-3 md:order-2">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#67a139] mb-5">
                Ongoing Projects
              </p>
              <div className="flex flex-col">
                {ongoingProjects.map(([label, url], i) => (
                  <Link
                    key={i}
                    href={url}
                    className="group flex items-center gap-2 text-[#5a7250] text-[0.87rem] py-[0.35rem] border-b border-[#edf3e8] last:border-b-0 hover:text-[#4d8c2a] transition-colors duration-200"
                  >
                    <ArrowUpRight
                      size={13}
                      className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="order-4 md:order-3">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#67a139] mb-5">
                Completed Projects
              </p>
              <Link
                href={`${API_BASE}/project-details/14`}
                className="group flex items-center gap-2 text-[#5a7250] text-[0.87rem] py-[0.35rem] hover:text-[#4d8c2a] transition-colors duration-200"
              >
                <ArrowUpRight
                  size={13}
                  className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                />
                Sameera Grand City – East Tambaram
              </Link>
            </div>

            <div className="order-5 md:order-3 sm:col-span-2 md:col-span-1">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#67a139] mb-5">
                Company
              </p>
              <div className="flex flex-col">
                {navLinks.map(([label, url], i) => (
                  <Link
                    key={i}
                    href={url}
                    className="group flex items-center gap-2 text-[#5a7250] text-[0.87rem] py-[0.35rem] border-b border-[#edf3e8] last:border-b-0 hover:text-[#4d8c2a] transition-colors duration-200"
                  >
                    <ArrowUpRight
                      size={13}
                      className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </footer>
    </>
  );
}