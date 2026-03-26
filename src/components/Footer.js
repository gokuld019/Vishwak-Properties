"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import ChatAssistant from "@/components/chatassistant";

const ongoingProjects   = [["Aira Avenue-Vandalur", "/project-details/1"]];
const completedProjects = [["Sameera Grand City – East Tambaram", "/project-details/14"]];

const socialLinks = [
{ Icon: Facebook,  href: "https://www.facebook.com/Vishwakproperties/", label: "Facebook" },
{ Icon: Instagram, href: "https://www.instagram.com/vishwakvaluehomes", label: "Instagram" },
{ Icon: Linkedin,  href: "https://linkedin.com/company/104862350/", label: "LinkedIn" },
{ Icon: Youtube,   href: "https://www.youtube.com/@VishwakValueHomes", label: "YouTube" },
];

const quickLinks = [
["Home", "/"],
["About Us", "/about"],
["EMI Calculator", "/emi-calculator"],
["Contact Us", "/contactus"],
];

export default function Footer() {

const pathname = usePathname();
if (pathname.startsWith("/admin")) return null;

return (
<> <ChatAssistant />
  <footer className="w-full bg-white text-[#111] relative overflow-hidden font-sans">

    {/* GRID TEXTURE */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(103,161,57,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(103,161,57,0.07) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />

    {/* BODY */}
    <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12">

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-10
      ">

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
              <a key={i} href={href}
                className="
                w-9 h-9 flex items-center justify-center
                rounded-md bg-gray-100 text-gray-500
                hover:bg-[#67a139] hover:text-white
                transition
                "
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
              <Link key={i} href={href}
                className="footerLink">
                <ChevronRight size={14} className="text-[#67a139]" />
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div>
          <p className="footerTitle">Projects</p>

          <p className="footerSub mt-5">Ongoing</p>
          <div className="flex flex-col gap-2 mt-2">
            {ongoingProjects.map(([name, href], i) => (
              <Link key={i} href={href} className="footerLinkSimple">
                {name}
              </Link>
            ))}
          </div>

          <p className="footerSub mt-5">Completed</p>
          <div className="flex flex-col gap-2 mt-2">
            {completedProjects.map(([name, href], i) => (
              <Link key={i} href={href} className="footerLinkSimple">
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <p className="footerTitle">Contact Us</p>

          <div className="flex flex-col gap-4 mt-5 text-[13px] text-gray-500">

            <div className="flex gap-3">
              <MapPin className="text-[#67a139] mt-1" size={18}/>
              <span>
                Old No-113B/28A, New No-18,
                Kakkan Street, Tambaram West,
                Chennai – 600045
              </span>
            </div>

            <a href="tel:917401131313" className="footerLinkSimple flex gap-3 items-center">
              <Phone size={16}/> +91 74011 31313
            </a>

            <a href="mailto:info@vishwakproperties.in" className="footerLinkSimple flex gap-3 items-center">
              <Mail size={16}/> info@vishwakproperties.in
            </a>

          </div>
        </div>

      </div>
    </div>

    {/* BOTTOM */}
    <div className="border-t border-gray-200">
      <div className="h-[2px] bg-gradient-to-r from-[#67a139] to-transparent" />

      <div className="
        max-w-[1280px] mx-auto
        px-5 sm:px-8 lg:px-12
        py-5
        flex
        flex-col
        sm:flex-row
        justify-between
        items-center
        gap-3
        text-[12px]
        text-gray-400
      ">
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
