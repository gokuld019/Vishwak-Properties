'use client';

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
     <section
  className="relative flex flex-col justify-end overflow-hidden bg-[#eef5ee]
  min-h-screen
  px-6 sm:px-10 tab:px-16 lg:px-[7vw]
  pb-12 sm:pb-[8vh]"
>

  <motion.img
  src="/1.jpeg"
  alt="Vishwak Properties"
  className="absolute inset-0 w-full h-full hidden sm:block
  object-cover object-center"
  style={{ filter: "saturate(0.75) brightness(0.95)" }}
  initial={{ scale: 1.08 }}
  animate={{ scale: 1 }}
  transition={{ duration: 2, ease: "easeOut" }}
/>

<motion.img
  src="/upmob.jpeg"
  alt="Vishwak Properties"
  className="absolute inset-0 w-full h-full block sm:hidden
  object-contain object-center"
  style={{
    filter: "saturate(0.85) brightness(0.95)",
    backgroundColor: "#eef5ee"
  }}
  initial={{ scale: 1 }}
  animate={{ scale: 1 }}
  transition={{ duration: 1 }}
/>

</section>

      {/* ── WHO WE ARE ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">

        {/* Image */}
        <motion.div
          className="relative overflow-hidden order-2 md:order-1
            h-[300px] sm:h-[380px] md:h-auto"
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
            px-6 sm:px-10 tab:px-14 lg:px-20
            py-10 tab:py-14 lg:py-20
            order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <span className="block text-[10px] tracking-[.3em] uppercase text-[#3b7b3f] font-semibold mb-5">
            Our Story
          </span>

          <h2
            className="font-semibold text-[#1c2b1d] leading-[1.2] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Who <span className="text-[#3b7b3f]">We Are</span>
          </h2>

          <p className="text-sm tab:text-base leading-[1.85] text-[#4a5e4b] font-light mb-4">
            Vishwak Properties is a dedicated and innovative real estate plot developer in Chennai,
            committed to creating life spaces with passion and precision. Since 2012, the company
            has built a strong reputation for quality, affordability, and forward-thinking development.
          </p>

          <p className="text-sm tab:text-base leading-[1.85] text-[#4a5e4b] font-light mb-8">
            Led by Managing Director Mr. VE. Selvam, Vishwak Properties has delivered unique gated
            community projects that cater to buyers from all walks of life. With a focus on
            value-driven pricing and customer satisfaction, the company has made owning a dream home
            achievable for middle-income families.
          </p>

          <div className="h-[1px] w-full bg-[#f5edbb] mb-8" />

          <h3 className="text-lg font-semibold text-[#1c2b1d] mb-5">
            Our <span className="text-[#3b7b3f]">Vision</span>
          </h3>

          <p className="text-sm tab:text-base text-[#4a5e4b] font-light leading-[1.9] mb-6">
            We aim to build future-ready communities that redefine urban living —
            spaces where architecture meets aspiration and affordability meets excellence.
          </p>

          {[
            'Future-driven design & architecture',
            'Eco-friendly & sustainable communities',
            'Innovative living experiences',
          ].map((text, i) => (
            <div
              key={text}
              className={`flex items-center gap-3.5 py-3.5 border-b border-[#f5edbb] text-[.9rem] tab:text-[.95rem] text-[#4a5e4b] font-light ${
                i === 0 ? 'border-t border-[#f5edbb]' : ''
              }`}
            >
              <span
                className="w-2 h-2 bg-[#3b7b3f] flex-shrink-0"
                style={{ borderRadius: '50% 0', transform: 'rotate(45deg)' }}
              />
              {text}
            </div>
          ))}
        </motion.div>

      </section>

      {/* ── OUR JOURNEY ── */}
      <section className="bg-[#f0f5f2] py-14 sm:py-20 tab:py-24 px-6 sm:px-10 tab:px-14 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
          Our <span className="text-[#3b7b3f]">Journey</span>
        </h2>

        {/* 1 col mobile → 2 col tablet+ */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 tab:gap-6">
          <TimelineItem year="2012" title="Company Founded"       desc="Started with a vision to transform real estate." />
          <TimelineItem year="2015" title="First Large Community" desc="Delivered 250+ premium homes." />
          <TimelineItem year="2019" title="Commercial Expansion"  desc="Entered corporate real estate sector." />
          <TimelineItem year="2023" title="Sustainability Focus"  desc="Launched eco-friendly smart townships." />
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 tab:px-14 lg:px-20 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Meet Our <span className="text-[#3b7b3f]">Team</span>
        </h2>

        {/* 1 col → 2 col sm → 3 col at tab (1000px) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 tab:grid-cols-3 gap-8 tab:gap-6 lg:gap-12">
          <TeamCard name="V.E SELVAM"      role="Managing Partner"  image="Selvam.webp" />
          <TeamCard name="Rama Prabha"     role="Managing Partner"  image="/team/rama.jpg" />
          <TeamCard name="Devi Manikandan" role="Senior Sales Head" image="/team/devi.jpg" />
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
      className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 h-full"
    >
      <p className="text-[#3b7b3f] font-bold text-lg sm:text-xl">{year}</p>
      <h3 className="text-lg sm:text-xl font-semibold mt-1">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">{desc}</p>
    </motion.div>
  );
}

function TeamCard({ name, role, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 transition"
    >
      {/* Shorter height at tab so 3 cards fit nicely in a row */}
      <div className="relative h-56 sm:h-64 tab:h-52 lg:h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="p-4 tab:p-5 lg:p-6 text-center">
        <h4 className="text-base tab:text-lg lg:text-xl font-semibold">{name}</h4>
        <p className="text-gray-600 mt-1 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}