"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin, MapPin, Phone, Mail, ArrowUpRight, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import ChatAssistant from "@/components/chatassistant";

const ongoingProjects   = [["Aira Avenue", "/project-details/1"]];
const completedProjects = [["Sameera Grand City – East Tambaram", "/project-details/14"]];

const socialLinks = [
  { Icon: Facebook,  href: "https://www.facebook.com/Vishwakproperties/",                        label: "Facebook"  },
  { Icon: Instagram, href: "https://www.instagram.com/vishwakvaluehomes?igsh=a3Q2N3Z6d2ExemN3", label: "Instagram" },
  { Icon: Linkedin,  href: "https://linkedin.com/company/104862350/",                            label: "LinkedIn"  },
  { Icon: Youtube,   href: "https://www.youtube.com/@VishwakValueHomes",                         label: "YouTube"   },
];

const quickLinks = [
  ["Home",     "/#"],
  ["About Us", "/about"],
  ["Emi Calculator", "/emi-calculator"],
  ["ContactUs",  "/contactus"],
];

const hoverGreen = (e) => { e.currentTarget.style.color = "#111"; };
const hoverGray  = (e) => { e.currentTarget.style.color = "#999"; };

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <ChatAssistant />

      <footer
        style={{
          background: "#ffffff",
          fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
        className="w-full text-[#111]"
      >

        {/* Subtle grid texture */}
        <div aria-hidden="true" style={{
          position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(103,161,57,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(103,161,57,0.07) 1px,transparent 1px)",
          backgroundSize:"48px 48px",
        }} />

       

        {/* ── Four-column body ── */}
        <div style={{ position:"relative" }} className="max-w-[1280px] mx-auto px-6 sm:px-10 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">

            {/* 1 – Logo + description + socials */}
            <div className="col-span-2 sm:col-span-1" style={{ display:"flex",flexDirection:"column",gap:"1.1rem" }}>
              <Link href="/">
                <img src="/Logo.png" alt="Vishwak Properties" style={{ height:"5rem",width:"auto",objectFit:"contain" }} />
              </Link>
              <p style={{ fontSize:"0.78rem",lineHeight:"1.65",color:"#999",margin:0 }}>
                Chennai's trusted real-estate developer — delivering quality homes with transparency and care.
              </p>
              <div style={{ display:"flex",gap:"0.4rem",marginTop:"0.25rem" }}>
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <a
                    key={i} href={href} aria-label={label}
                    style={{ width:"2rem",height:"2rem",borderRadius:"0.4rem",display:"flex",alignItems:"center",justifyContent:"center",background:"#f2f2f2",color:"#666",transition:"all 0.2s",textDecoration:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.background="#67a139"; e.currentTarget.style.color="#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="#f2f2f2"; e.currentTarget.style.color="#666"; }}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {/* 2 – Quick Links */}
            <div>
              <p style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#67a139",marginBottom:"1.2rem" }}>
                Quick Links
              </p>
              <div style={{ display:"flex",flexDirection:"column",gap:"0.7rem" }}>
                {quickLinks.map(([name, href], i) => (
                  <Link key={i} href={href}
                    style={{ display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.8rem",color:"#999",textDecoration:"none",transition:"color 0.15s" }}
                    onMouseEnter={hoverGreen} onMouseLeave={hoverGray}
                  >
                    <ChevronRight size={11} style={{ color:"#67a139",opacity:0.5 }} />
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3 – Projects */}
            <div>
              <p style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#67a139",marginBottom:"1.2rem" }}>
                Projects
              </p>
              <p style={{ fontSize:"0.6rem",letterSpacing:"0.13em",textTransform:"uppercase",color:"#bbb",marginBottom:"0.5rem" }}>Ongoing</p>
              <div style={{ display:"flex",flexDirection:"column",gap:"0.55rem",marginBottom:"1rem" }}>
                {ongoingProjects.map(([name, href], i) => (
                  <Link key={i} href={href}
                    style={{ fontSize:"0.8rem",color:"#999",textDecoration:"none",transition:"color 0.15s" }}
                    onMouseEnter={hoverGreen} onMouseLeave={hoverGray}
                  >{name}</Link>
                ))}
              </div>
              <p style={{ fontSize:"0.6rem",letterSpacing:"0.13em",textTransform:"uppercase",color:"#bbb",marginBottom:"0.5rem" }}>Completed</p>
              <div style={{ display:"flex",flexDirection:"column",gap:"0.55rem" }}>
                {completedProjects.map(([name, href], i) => (
                  <Link key={i} href={href}
                    style={{ fontSize:"0.8rem",color:"#999",textDecoration:"none",transition:"color 0.15s" }}
                    onMouseEnter={hoverGreen} onMouseLeave={hoverGray}
                  >{name}</Link>
                ))}
              </div>
            </div>

            {/* 4 – Contact */}
            <div>
              <p style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#67a139",marginBottom:"1.2rem" }}>
                Contact Us
              </p>
              <div style={{ display:"flex",flexDirection:"column",gap:"0.85rem" }}>

                <div style={{ display:"flex",alignItems:"flex-start",gap:"0.6rem" }}>
                  <span style={{ width:"1.5rem",height:"1.5rem",borderRadius:"0.3rem",background:"rgba(103,161,57,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"0.1rem" }}>
                    <MapPin size={11} style={{ color:"#67a139" }} />
                  </span>
                  <span style={{ fontSize:"0.78rem",color:"#999",lineHeight:"1.55" }}>
                    OLD NO-113B/28A, NEW NO-18, Kakkan Street, Tambaram West, Chennai{" "}
                    Chengalpattu, Tamil Nadu – 600045
                  </span>
                </div>

                {[
                  { href:"tel:917401131313",               text:"+91 74011 31313",             Icon:Phone },
                  { href:"tel:919361815551",               text:"+91 93618 15551",             Icon:Phone },
                  { href:"mailto:info@vishwakproperties.in",text:"info@vishwakproperties.in",  Icon:Mail  },
                ].map(({ href, text, Icon:Ic }, i) => (
                  <a key={i} href={href}
                    style={{ display:"flex",alignItems:"center",gap:"0.6rem",fontSize:"0.78rem",color:"#999",textDecoration:"none",transition:"color 0.15s" }}
                    onMouseEnter={hoverGreen} onMouseLeave={hoverGray}
                  >
                    <span style={{ width:"1.5rem",height:"1.5rem",borderRadius:"0.3rem",background:"rgba(103,161,57,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <Ic size={11} style={{ color:"#67a139" }} />
                    </span>
                    {text}
                  </a>
                ))}

              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop:"1px solid #e8e8e8" }}>
          {/* Green accent line */}
          <div style={{ height:"2px",background:"linear-gradient(90deg,#67a139 0%,transparent 55%)" }} />
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-4"
            style={{ display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem" }}
          >
            <p style={{ fontSize:"0.7rem",color:"#aaa",margin:0 }}>
              © {new Date().getFullYear()} Vishwak Properties. All rights reserved.
            </p>
            <div style={{ display:"flex",gap:"1.25rem" }}>
              {["Privacy Policy","Terms of Use"].map((t,i) => (
                <Link key={i} href="/"
                  style={{ fontSize:"0.7rem",color:"#aaa",textDecoration:"none",transition:"color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color="#555"}
                  onMouseLeave={e => e.currentTarget.style.color="#aaa"}
                >{t}</Link>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}