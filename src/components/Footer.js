"use client";

import Link from "next/link";
import { ChevronUp, Instagram, Facebook, Youtube, Linkedin, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ChatAssistant from "@/components/chatassistant";

const ongoingProjects = [
  ["Aira Avenue", "http://localhost:3000/project-details/1"],
  ["ALA Garden – Vandalur", "http://localhost:3000/project-details/12"],
  ["SS Astron – OMR", "http://localhost:3000/project-details/5"],
  ["VK Aurora – Kelambakkam", "http://localhost:3000/project-details/10"],
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
    <ChatAssistant />
      {/* Google Fonts via link tag — no CSS needed */}
      <footer className="relative w-full bg-white border-t border-[#e4ede0] overflow-hidden text-[#1a2e1a]">

        {/* Decorative radial glow — top right */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,161,57,0.07) 0%, transparent 68%)" }}
        />
        {/* Decorative radial glow — bottom left */}
        <div
          className="pointer-events-none absolute bottom-8 -left-16 w-[280px] h-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,161,57,0.05) 0%, transparent 70%)" }}
        />

        {/* ─── INNER CONTAINER ─── */}
        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 pt-14 sm:pt-16">

          {/* ── TOP ROW: Brand + Description ── */}
          <div className="flex flex-wrap justify-between items-start gap-8 mb-12">

            {/* Left — Logo + Tagline + RERA */}
            <div className="flex-1 min-w-[260px]">
              <Image
                src="/Logo.png"
                alt="Vishwak Properties"
                width={150}
                height={75}
                className="object-contain mb-6"
              />

              {/* Tagline — only clamp() needs inline; everything else is Tailwind */}
              <h2
                className="font-semibold leading-[1.1] tracking-tight text-[#1a2e1a]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                Plots built for<br />
                <span className="text-[#67a139]">generations.</span>
              </h2>

              {/* RERA badge */}
              <div className="inline-flex items-center gap-1.5 mt-5 px-3 py-[0.3rem] rounded-full border border-[#67a139]/40 bg-[#67a139]/[0.06] text-[#67a139] text-[0.68rem] font-medium tracking-[0.14em] uppercase">
                <span className="w-[5px] h-[5px] rounded-full bg-[#67a139] animate-pulse" />
                RERA Approved
              </div>
            </div>

            {/* Right — Description */}
            <p className="w-full sm:max-w-[340px] text-sm leading-[1.85] text-[#7a9070] self-end">
              Delivering premium villa plots with world-class amenities, lush landscapes,
              and exceptional connectivity — crafted for long-term value and refined living.
            </p>
          </div>

          {/* ── GRADIENT DIVIDER ── */}
          <div
            className="w-full h-px mb-12"
            style={{ background: "linear-gradient(90deg, transparent, #c8ddb8, transparent)" }}
          />

          {/* ── 4-COLUMN NAV GRID ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

            {/* Ongoing Projects */}
            <div>
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

            {/* Completed Projects */}
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#67a139] mb-5">
                Completed Projects
              </p>
              <Link
                href="http://localhost:3000/project-details/14"
                className="group flex items-center gap-2 text-[#5a7250] text-[0.87rem] py-[0.35rem] hover:text-[#4d8c2a] transition-colors duration-200"
              >
                <ArrowUpRight
                  size={13}
                  className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                />
                Sameera Grand City – East Tambaram
              </Link>
            </div>

            {/* Company Links */}
            <div>
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

            {/* Get In Touch */}
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#67a139] mb-5">
                Get In Touch
              </p>

              {/* Phone */}
              <p
                className="text-[#1a2e1a] font-bold leading-none mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.01em" }}
              >
                +91 74011 31313
              </p>

              {/* Email */}
              <a
                href="mailto:info@vishwakproperties.in"
                className="text-sm text-[#5a7250] hover:text-[#67a139] transition-colors duration-200"
              >
                info@vishwakproperties.in
              </a>

              {/* Social Icons */}
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

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-[#e4ede0] bg-[#f7faf5]">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#9aad90] tracking-wide">
              © 2025{" "}
              <strong className="text-[#4d8c2a] font-semibold">Vishwak Properties</strong>.
              {" "}All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-[#9aad90] hover:text-[#67a139] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-7 right-7 w-12 h-12 rounded-full bg-[#67a139] text-white flex items-center justify-center border-none cursor-pointer z-50 shadow-[0_4px_20px_rgba(103,161,57,0.35)] hover:bg-[#4d8c2a] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(103,161,57,0.45)] transition-all duration-200"
      >
        <ChevronUp size={20} />
      </button>
    </>
  );
}