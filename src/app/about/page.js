'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full bg-[#eef5ee] overflow-hidden">
        <motion.img
          src="/1.jpeg"
          alt="Vishwak Properties"
          className="hidden sm:block w-full h-auto object-cover object-center"
          style={{ filter: "saturate(0.75) brightness(0.95)" }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.img
          src="/upmob.jpeg"
          alt="Vishwak Properties"
          className="block sm:hidden w-full h-auto object-contain object-center"
          style={{
            filter: "saturate(0.85) brightness(0.95)",
            backgroundColor: "#eef5ee",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">

        {/* Image */}
        <motion.div
          className="relative overflow-hidden order-2 md:order-1
             xs:h-[300px] sm:h-[380px] md:h-auto md:min-h-[600px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <img
            src="/2s.png"
            alt="Our Community"
            className="w-full h-full object-cover block"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="bg-white flex flex-col justify-center
            px-5 xs:px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20
            py-8 xs:py-10 sm:py-14 md:py-16 lg:py-20
            order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <span className="block text-[9px] sm:text-[10px] tracking-[.3em] uppercase text-[#3b7b3f] font-semibold mb-4 sm:mb-5">
            Our Story
          </span>

          <h2
            className="font-semibold text-[#1c2b1d] leading-[1.2] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 3rem)" }}
          >
            Who <span className="text-[#3b7b3f]">We Are</span>
          </h2>

          <p className="text-sm sm:text-base leading-[1.75] sm:leading-[1.85] text-[#4a5e4b] font-light mb-4">
            Vishwak Properties is a dedicated and innovative real estate plot developer in Chennai,
            committed to creating life spaces with passion and precision. Since 2012, the company
            has built a strong reputation for quality, affordability, and forward-thinking development.
          </p>

          <p className="text-sm sm:text-base leading-[1.75] sm:leading-[1.85] text-[#4a5e4b] font-light mb-6 sm:mb-8">
            Led by Managing Director Mr. VE. Selvam, Vishwak Properties has delivered unique gated
            community projects that cater to buyers from all walks of life. With a focus on
            value-driven pricing and customer satisfaction, the company has made owning a dream home
            achievable for middle-income families.
          </p>

          <div className="h-[1px] w-full bg-[#f5edbb] mb-6 sm:mb-8" />

          <h3 className="text-base sm:text-lg font-semibold text-[#1c2b1d] mb-4 sm:mb-5">
            Our <span className="text-[#3b7b3f]">Vision</span>
          </h3>

          <p className="text-sm sm:text-base text-[#4a5e4b] font-light leading-[1.8] sm:leading-[1.9] mb-5 sm:mb-6">
            We aim to build future-ready communities that redefine urban living —
            spaces where architecture meets aspiration and affordability meets excellence.
          </p>

          {[
            "Future-driven design & architecture",
            "Eco-friendly & sustainable communities",
            "Innovative living experiences",
          ].map((text, i) => (
            <div
              key={text}
              className={`flex items-center gap-3 sm:gap-3.5 py-3 sm:py-3.5 border-b border-[#f5edbb] text-[.85rem] sm:text-[.9rem] md:text-[.95rem] text-[#4a5e4b] font-light ${
                i === 0 ? "border-t border-[#f5edbb]" : ""
              }`}
            >
              <span
                className="w-2 h-2 bg-[#3b7b3f] flex-shrink-0"
                style={{ borderRadius: "50% 0", transform: "rotate(45deg)" }}
              />
              {text}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section className="bg-[#f0f5f2] py-12 xs:py-14 sm:py-20 md:py-24 px-5 xs:px-6 sm:px-10 md:px-14 lg:px-20">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center mb-8 xs:mb-10 sm:mb-14">
          Our <span className="text-[#3b7b3f]">Journey</span>
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
          <TimelineItem year="2012" title="Company Founded"       desc="Started with a vision to transform real estate." />
          <TimelineItem year="2015" title="First Large Community" desc="Delivered 250+ premium homes." />
          <TimelineItem year="2019" title="Commercial Expansion"  desc="Entered corporate real estate sector." />
          <TimelineItem year="2023" title="Sustainability Focus"  desc="Launched eco-friendly smart townships." />
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="max-w-6xl mx-auto px-5 xs:px-6 sm:px-10 md:px-14 lg:px-20 py-12 xs:py-16 sm:py-20">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12">
          Meet Our <span className="text-[#3b7b3f]">Team</span>
        </h2>

        <div className="">
          <TeamCard name="V.E SELVAM" role="Managing Partner" image="/Selvam.webp" />
        </div>
      </section>
    </div>
  );
}

/* ── COMPONENTS ── */

function TimelineItem({ year, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-4 xs:p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 h-full"
    >
      <p className="text-[#3b7b3f] font-bold text-base xs:text-lg sm:text-xl">{year}</p>
      <h3 className="text-base xs:text-lg sm:text-xl font-semibold mt-1">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">{desc}</p>
    </motion.div>
  );
}

function TeamCard({ name, role, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 transition w-full max-w-[280px] mx-auto"
    >
      <div className="relative h-58 xs:h-56 sm:h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
        />
      </div>
      <div className="p-4 sm:p-5 lg:p-6 text-center">
        <h4 className="text-base sm:text-lg lg:text-xl font-semibold">{name}</h4>
        <p className="text-gray-600 mt-1 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}