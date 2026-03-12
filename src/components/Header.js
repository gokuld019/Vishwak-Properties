"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigationLinks = [
  { name: "ABOUT US", href: "/about", type: "link" },
  { name: "ONGOING PROJECTS", href: "/", type: "ongoing" },
  { name: "COMPLETED PROJECTS", href: "/", type: "completed" },
  { name: "EMI CALCULATOR", href: "/emi-calculator", type: "link" },
  { name: "CAREERS", href: "/careers", type: "link" },
  { name: "CONTACT US", href: "/contactus", type: "link" },
];


const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;
console.log("API BASE:", API_BASE);


export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (pathname.startsWith("/admin")) return null;

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
const [ongoingProjects, setOngoingProjects] = useState([]);
const [completedProjects, setCompletedProjects] = useState([]);
  

  const normalize = (v) => (v ? v.toLowerCase().trim() : "");

  const fetchOngoing = async () => {
  if (ongoingProjects.length > 0) return;

  try {
    const res = await fetch(`${API_BASE}/project-details/ongoing`);
    const json = await res.json();
    setOngoingProjects(json.data || []);
  } catch (err) {
    console.error("Ongoing fetch error:", err);
  }
};

const fetchCompleted = async () => {
  if (completedProjects.length > 0) return;

  try {
    const res = await fetch(`${API_BASE}/project-details/completed`);
    const json = await res.json();
    setCompletedProjects(json.data || []);
  } catch (err) {
    console.error("Completed fetch error:", err);
  }
};

const plots = ongoingProjects.filter((p) =>
  normalize(p.category).includes("plot")
);

const villas = ongoingProjects.filter((p) =>
  normalize(p.category).includes("villa")
);

const completedPlots = completedProjects.filter((p) =>
  normalize(p.category).includes("plot")
);

const completedVillas = completedProjects.filter((p) =>
  normalize(p.category).includes("villa")
);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerHeight = isScrolled ? 118 : 180;
  const navPaddingTop = isScrolled ? "pt-[4px]" : "pt-[60px]";

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`
    );
  }, [headerHeight]);


  const dropdownAnimation = {
    initial: { opacity: 0, y: -8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.96 },
    transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
  };

  return (
  <header
  className={`fixed ${
    !isHomePage && !isScrolled ? "-top-20" : "top-0"
  } left-0 right-0 z-50 transition-all duration-300
    ${
      isScrolled
        ? "bg-white/98 backdrop-blur-2xl border-b border-gray-100"
        : "bg-transparent"
    }
  `}
  style={{ height: `${headerHeight}px` }}
>



      {(isScrolled || !isHomePage) && (
        <div className="bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white py-2.5 px-4">
          <div className="flex justify-between items-center 
                text-[10px] sm:text-[12px] md:text-[13px] 
                font-medium">
  <span className="flex items-center gap-1 sm:gap-2">
    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
    Email: info@vishwakproperties.in
  </span>

  <span className="flex items-center gap-1 sm:gap-2">
    Call us: +91 74011 31313
    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400"></span>
  </span>
</div>
        </div>
      )}

      <nav>
        <div
          className={`w-[92%] lg:max-w-[80%] mx-auto flex items-center justify-between px-3 ${navPaddingTop}`}
        >
         <Link href="/" className="mt-1">
  <Image
    src="/Logo.png"
    alt="Logo"
    width={100}
    height={35}
    className="object-contain w-[90px] lg:w-[100px] transition-transform hover:scale-105"
  />
</Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-semibold uppercase text-black">
            {navigationLinks.map((link) => {
              if (link.type === "link") {
                return (
                  <li key={link.name} className="relative group">
                    <Link href={link.href} className="relative py-2 transition-colors hover:text-[#67a139]">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#67a139] to-[#8bc34a] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                );
              }

              if (link.type === "ongoing") {
                return (
                  <li
                    key={link.name}
                    className="relative cursor-pointer group"
                    onMouseEnter={() => {
                    setOpenMenu("ONGOING");
                    fetchOngoing();
                    }}                    
                    onMouseLeave={() => {
                      setOpenMenu(null);
                      setHoveredItem(null);
                    }}
                  >
                    <div className="flex items-center gap-1.5 py-2 transition-colors hover:text-[#67a139]">
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#67a139] to-[#8bc34a] transition-all duration-300 group-hover:w-full"></span>
                    </div>

                    <AnimatePresence>
                      {openMenu === "ONGOING" && (
                        <motion.div
                          {...dropdownAnimation}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-6 z-[999]"
                        >
                          <div className="bg-white/95 backdrop-blur-3xl shadow-2xl border border-gray-200/50 rounded-3xl overflow-hidden">
<div className="bg-gradient-to-br from-[#67a139]/10 via-white to-[#8bc34a]/5 
                p-8 grid grid-cols-2 gap-10 w-[750px]
                max-h-[65vh] overflow-y-auto">                              
                <ModernDropdownColumn
                                title="PLOTS"
                                subtitle="Premium Locations"
                                items={plots}
                                hoveredItem={hoveredItem}
                                setHoveredItem={setHoveredItem}
                                accentColor="emerald"
                              />
                              <ModernDropdownColumn
                                title="VILLAS"
                                subtitle="Luxury Living"
                                items={villas}
                                hoveredItem={hoveredItem}
                                setHoveredItem={setHoveredItem}
                                accentColor="green"
                              />
                            </div>
                            <div className="bg-gradient-to-r from-[#67a139] to-[#8bc34a] h-1"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              if (link.type === "completed") {
                return (
                  <li
                    key={link.name}
                    className="relative cursor-pointer group"
onMouseEnter={() => {
  setOpenMenu("COMPLETED");
  fetchCompleted();
}}                    onMouseLeave={() => {
                      setOpenMenu(null);
                      setHoveredItem(null);
                    }}
                  >
                    <div className="flex items-center gap-1.5 py-2 transition-colors hover:text-[#67a139]">
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#67a139] to-[#8bc34a] transition-all duration-300 group-hover:w-full"></span>
                    </div>

                    <AnimatePresence>
                      {openMenu === "COMPLETED" && (
                        <motion.div
                          {...dropdownAnimation}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-6 z-[999]"
                        >
                          <div className="bg-white/95 backdrop-blur-3xl shadow-2xl border border-gray-200/50 rounded-3xl overflow-hidden">
<div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 
                p-8 grid grid-cols-2 gap-10 w-[750px]
                max-h-[65vh] overflow-y-auto">                              
                <ModernDropdownColumn
                                title="PLOTS"
                                subtitle="Delivered Projects"
                                items={completedPlots}
                                hoveredItem={hoveredItem}
                                setHoveredItem={setHoveredItem}
                                accentColor="blue"
                              />
                              <ModernDropdownColumn
                                title="VILLAS"
                                subtitle="Completed Homes"
                                items={completedVillas}
                                hoveredItem={hoveredItem}
                                setHoveredItem={setHoveredItem}
                                accentColor="indigo"
                              />
                            </div>
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return null;
            })}
          </ul>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
    {/* ================= MOBILE MENU ================= */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden fixed top-[var(--header-height)] left-0 right-0 z-[999]
                 bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.18)]
                 border-t border-gray-200"
    >
      <div className="max-h-[78vh] overflow-y-auto px-4 py-6 space-y-3">

        {/* NORMAL LINKS */}
        {navigationLinks.map((link) => {
          if (link.type === "link") {
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between
                           bg-gray-50 hover:bg-[#67a139]/10
                           rounded-2xl px-5 py-4
                           font-semibold text-[15px]
                           transition-all"
              >
                {link.name}
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            );
          }

          /* ================= ONGOING ================= */
          if (link.type === "ongoing") {
            return (
              <div key={link.name} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                 onClick={() => {
  const next = mobileDropdown === "ONGOING" ? null : "ONGOING";
  setMobileDropdown(next);
  if (next === "ONGOING") fetchOngoing();
}}
                  className="w-full flex items-center justify-between px-5 py-4
                             font-semibold text-[15px]
                             bg-gradient-to-r from-[#67a139]/10 to-[#8bc34a]/10"
                >
                  {link.name}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileDropdown === "ONGOING" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileDropdown === "ONGOING" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="px-4 pb-4 space-y-2 mt-[8px]"
                    >
                      {[...plots, ...villas].map((p) => (
                        <Link
                          key={p.projectId}
                          href={`/project-details/${p.projectId}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3
                                     bg-gray-50 hover:bg-[#67a139]/10
                                     rounded-xl px-4 py-3 text-sm font-medium"
                        >
                          <MapPin className="w-4 h-4 text-[#67a139]" />
                          {p.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          /* ================= COMPLETED ================= */
          if (link.type === "completed") {
            return (
              <div key={link.name} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
  onClick={() => {
    const next = mobileDropdown === "COMPLETED" ? null : "COMPLETED";
    setMobileDropdown(next);
    if (next === "COMPLETED") fetchCompleted();
  }}
  className="w-full flex items-center justify-between px-5 py-4
             font-semibold text-[15px]
             bg-gradient-to-r from-blue-50 to-indigo-50"
>
  {link.name}
  <ChevronDown
    className={`w-5 h-5 transition-transform ${
      mobileDropdown === "COMPLETED" ? "rotate-180" : ""
    }`}
  />
</button>

                <AnimatePresence>
                  {mobileDropdown === "COMPLETED" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="px-4 pb-4 space-y-2"
                    >
                      {[...completedPlots, ...completedVillas].map((p) => (
                        <Link
                          key={p.projectId}
                          href={`/project-details/${p.projectId}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3
                                     bg-gray-50 hover:bg-blue-50
                                     rounded-xl px-4 py-3 text-sm font-medium"
                        >
                          <MapPin className="w-4 h-4 text-blue-600" />
                          {p.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return null;
        })}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </nav>
    </header>
  );
}

function ModernDropdownColumn({ title, subtitle, items, hoveredItem, setHoveredItem, accentColor }) {
  if (!items || items.length === 0) return null;

  const accentColors = {
    emerald: "from-emerald-500 to-green-500",
    green: "from-green-500 to-lime-500",
    blue: "from-blue-500 to-cyan-500",
    indigo: "from-indigo-500 to-purple-500",
  };

  return (
    <div className="relative">
      <div className="mb-5">
        <div className="flex items-baseline gap-3 mb-1">
          <h3 className="font-bold text-gray-900 text-lg tracking-tight">{title}</h3>
          <span className="text-xs font-medium text-gray-500 bg-white/60 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
            {items.length} {items.length === 1 ? "Project" : "Projects"}
          </span>
        </div>
        <p className="text-xs font-medium text-gray-500 tracking-wide">{subtitle}</p>
        <div className={`h-0.5 w-16 bg-gradient-to-r ${accentColors[accentColor]} rounded-full mt-2`}></div>
      </div>

      <ul className="space-y-1">
        {items.map((p) => (
          <motion.li
            key={p.projectId}
            onMouseEnter={() => setHoveredItem(p.projectId)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/project-details/${p.projectId}`}
              className={`group block p-3.5 rounded-xl transition-all duration-300 ${
                hoveredItem === p.projectId
                  ? "bg-white shadow-lg shadow-gray-200/50 border border-gray-200/50"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium text-sm transition-colors ${
                  hoveredItem === p.projectId ? "text-[#67a139]" : "text-gray-700"
                }`}>
                  {p.name}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-all ${
                    hoveredItem === p.projectId
                      ? "opacity-100 translate-x-0 text-[#67a139]"
                      : "opacity-0 -translate-x-2 text-gray-400"
                  }`}
                />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}