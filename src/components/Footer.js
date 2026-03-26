"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import ChatAssistant from "@/components/chatassistant";

const ongoingProjects = [["Aira Avenue-Vandalur", "/project-details/1"]];
const completedProjects = [
  ["Akshaya Avenue", "Oragadam", "/project-details/23"],
  ["ALA Garden", "Vandalur", "/project-details/12"],
  ["Anna Nagar", "Vandalur", "/project-details/16"],
  ["Gowtham Kiran Avenue ", "Maraimalai Nagar", "/project-details/19"],
  ["Kumaran Nagar", "Vandalur", "/project-details/15"],
  ["Mahaa Ganapathy Avenue", "Kandigai", "/project-details/4"],
  ["Maruthi Avenue", "Guduvanchery", "/project-details/21"],
  ["Mownishwar Nagar", "OMR", "/project-details/6"],
  ["Sakthi Sai Nagar", "Urapakkam", "/project-details/20"],
  ["Sameera Grand City", "East Tambaram", "/project-details/14"],
  ["Shree Vignesh Kumar Nagar", "Singaperumal Koil", "/project-details/2"],
  ["Sri Kuberan Nagar", "Ponmar", "/project-details/13"],
  ["SS Astron", "Kelambakkam", "/project-details/5"],
  ["Supreme City", "Guduvanchery", "/project-details/22"],
  ["Thirumal Nagar", "East Tambaram", "/project-details/17"],
  ["Varsa Garden", "OMR", "/project-details/9"],
  ["Vasantham Nagar", "Tambaram", "/project-details/18"],
  ["VK Aurora", "Kelambakkam", "/project-details/12"],
  ["Kumaran Nagar", "Urapakkam", "/project-details/12"],
  ["Sri Mangal Avenue", "Chengalpattu", "/project-details/8"],
  ["Vijay Ganapathy Nagar", "Mannivakkam", "/project-details/7"],
];

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/Vishwakproperties/", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/vishwakvaluehomes", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com/company/104862350/", label: "LinkedIn" },
  { Icon: Youtube, href: "https://www.youtube.com/@VishwakValueHomes", label: "YouTube" },
];

const quickLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["EMI Calculator", "/emi-calculator"],
  ["Contact Us", "/contactus"],
];

// Split completed projects into 5 columns
function splitIntoColumns(arr, cols) {
  const rows = Math.ceil(arr.length / cols);
  return Array.from({ length: cols }, (_, i) => arr.slice(i * rows, (i + 1) * rows));
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const columns = splitIntoColumns(completedProjects, 5);

  return (
    <>
      <ChatAssistant />
      <footer className="w-full bg-white text-[#111] relative overflow-hidden font-sans">
        {/* GRID TEXTURE */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(103,161,57,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(103,161,57,0.07) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* BODY */}
        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* LOGO */}
            <div className="flex flex-col gap-4">
              <Link href="/">
                <img
                  src="/Logo.png"
                  className="h-14 sm:h-16 object-contain"
                  alt="logo"
                />
              </Link>
              <p className="text-[13px] leading-relaxed text-gray-500 max-w-[280px]">
                Chennai's trusted real-estate developer — delivering quality homes
                with transparency and care.
              </p>
              <div className="flex gap-2 mt-1">
                {socialLinks.map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 text-gray-500 hover:bg-[#67a139] hover:text-white transition"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <p className="footerTitle">Quick Links</p>
              <div className="flex flex-col gap-3 mt-5">
                {quickLinks.map(([name, href], i) => (
                  <Link key={i} href={href} className="footerLink">
                    <ChevronRight size={14} className="text-[#67a139]" />
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="lg:col-span-2">
              <p className="footerTitle">Contact Us</p>
              <div className="flex flex-col gap-4 mt-5 text-[13px] text-gray-500">
                <div className="flex gap-3">
                  <MapPin className="text-[#67a139] mt-1 flex-shrink-0" size={18} />
                  <span>
                    Old No-113B/28A, New No-18,
                    Kakkan Street, Tambaram West,
                    Chennai – 600045
                  </span>
                </div>
                <a href="tel:917401131313" className="footerLinkSimple flex gap-3 items-center">
                  <Phone size={16} /> +91 74011 31313
                </a>
                <a href="mailto:info@vishwakproperties.in" className="footerLinkSimple flex gap-3 items-center">
                  <Mail size={16} /> info@vishwakproperties.in
                </a>
              </div>
            </div>
          </div>

          {/* PROJECTS SECTION — full width below */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            {/* Ongoing */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white bg-[#67a139] px-3 py-1 rounded-full">
                Ongoing
              </span>
              {ongoingProjects.map(([name, href], i) => (
                <Link
                  key={i}
                  href={href}
                  className="text-[13px] font-medium text-gray-700 hover:text-[#67a139] transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={13} className="text-[#67a139]" />
                  {name}
                </Link>
              ))}
            </div>

            {/* Completed — 5 columns */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#67a139] border border-[#67a139] px-3 py-1 rounded-full">
                  Completed
                </span>
                <span className="text-[11px] text-gray-400">{completedProjects.length} Projects</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-0">
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col">
                    {/* Column divider line */}
                    <div className="h-[2px] w-8 bg-[#67a139] mb-3 rounded-full" />
                    <div className="flex flex-col gap-0">
                      {col.map(([name, location, href], rowIdx) => (
                        <Link
                          key={rowIdx}
                          href={href}
                          className="group flex flex-col py-2 border-b border-dashed border-gray-100 last:border-0 hover:border-[#67a13930] transition-all duration-200"
                        >
                          <span className="text-[12px] font-semibold text-gray-700 group-hover:text-[#67a139] transition-colors leading-tight">
                            {name}
                          </span>
                          <span className="text-[10.5px] text-gray-400 group-hover:text-[#67a13999] transition-colors mt-0.5 leading-tight">
                            {location}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200">
          <div className="h-[2px] bg-gradient-to-r from-[#67a139] to-transparent" />
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-gray-400">
            <p>© {new Date().getFullYear()} Vishwak Properties. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-gray-600">Privacy Policy</Link>
              <Link href="/" className="hover:text-gray-600">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}