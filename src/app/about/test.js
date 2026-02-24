'use client';

import { motion } from "framer-motion";
import { Users, Award, Home, ArrowRight, ChevronDown } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Poppins Font Import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-end overflow-hidden bg-[#eef5ee] h-screen px-[7vw] pb-[8vh]">

        {/* Background image */}
        <motion.img
          src="/about1.webp"
          alt="Vishwak Properties"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          style={{ filter: 'saturate(0.75) brightness(0.95)' }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Green vignette overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(160deg, rgba(238,245,238,.35) 0%, rgba(212,232,212,.18) 40%, rgba(28,43,29,.55) 100%)',
          }}
        />

        {/* Overline */}
        <motion.div
          className="relative z-[2] flex items-center gap-3 text-[11px] tracking-[.28em] uppercase text-[#3b7b3f] font-semibold mb-[18px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="block w-9 h-[1.5px] bg-[#3b7b3f]" />
          About Vishwak Properties
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="relative z-[2] font-semibold text-white leading-[1.15]"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 7rem)',
            textShadow: '0 2px 24px rgba(28,43,29,.25)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Building{' '}
          <span className="italic font-light text-[#f5edbb]">Dreams,</span>
          <br />Crafting Legacy
        </motion.h1>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-9 right-[7vw] z-[2] flex flex-col items-center gap-1.5 text-[10px] tracking-[.22em] uppercase text-white/60 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <ChevronDown size={16} />
          Scroll
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          WHO WE ARE
      ════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">

        {/* Image */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/about-who.webp"
            alt="Our Community"
            className="w-full h-full object-cover block"
          />
          {/* Est. badge */}
          <div className="absolute bottom-7 right-7 z-[2] bg-[#f5edbb] text-[#1c2b1d] text-[10px] tracking-[.2em] uppercase px-[18px] py-2.5 border-l-4 border-[#3b7b3f] font-semibold">
            Est. 2012
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="bg-[#fdf8e8] border-l border-[#f5edbb] flex flex-col justify-center"
          style={{ padding: 'clamp(3rem, 8vw, 7rem) clamp(2rem, 6vw, 6rem)' }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Overline tag */}
          <span className="block text-[10px] tracking-[.3em] uppercase text-[#3b7b3f] font-semibold mb-5">
            Our Story
          </span>

          {/* Heading — matches "Why Choose Aira Avenue?" style */}
          <h2
            className="font-semibold text-[#1c2b1d] leading-[1.2] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Who{' '}
            <span className="text-[#3b7b3f] font-semibold">We Are</span>
          </h2>

          <p className="text-base leading-[1.85] text-[#4a5e4b] font-light mb-4">
            We are a modern real estate development company focused on delivering
            high-quality homes, premium gated communities, and commercial spaces.
          </p>
          <p className="text-base leading-[1.85] text-[#4a5e4b] font-light mb-4">
            With 10+ years of experience, our mission is to blend innovation,
            sustainability, and comfort — creating spaces people are proud to call home.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2.5 mt-8 px-6 py-3.5 bg-[#3b7b3f] text-white text-[12px] tracking-[.18em] uppercase rounded-sm transition-colors duration-200 hover:bg-[#2d5f31] w-fit font-medium"
          >
            Explore Projects <ArrowRight size={14} />
          </a>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          STATS
      ════════════════════════════════════════ */}
      <section className="bg-[#eef5ee] border-t border-b border-[#d4e8d4] py-20 px-[6vw]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-3">
          {[
            { n: '120+',    l: 'Completed Projects',  icon: <Home size={28} /> },
            { n: '10,000+', l: 'Happy Families',      icon: <Users size={28} /> },
            { n: '12+',     l: 'Years of Excellence', icon: <Award size={28} /> },
          ].map(({ n, l, icon }, i) => (
            <motion.div
              key={l}
              className="text-center px-8 py-14 border-r border-[#d4e8d4] last:border-r-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.65 }}
            >
              <div className="flex justify-center text-[#3b7b3f] mb-4">{icon}</div>
              <div
                className="font-bold text-[#1c2b1d] leading-none"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
              >
                {n}
              </div>
              <div className="text-[11px] tracking-[.18em] uppercase text-[#4a5e4b] mt-3 font-medium">
                {l}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          VISION
      ════════════════════════════════════════ */}
      <section
        className="bg-[#fdf8e8] grid grid-cols-1 md:grid-cols-2 items-center gap-[7vw]"
        style={{ padding: 'clamp(5rem, 10vh, 9rem) 7vw' }}
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <span className="block text-[10px] tracking-[.3em] uppercase text-[#3b7b3f] font-semibold mb-5">
            Our Direction
          </span>
          <h2
            className="font-semibold text-[#1c2b1d] leading-[1.2] mb-5"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Our{' '}
            <span className="text-[#3b7b3f]">Vision</span>
          </h2>
          <p className="text-[#4a5e4b] font-light leading-[1.9] mb-7">
            We aim to build future-ready communities that redefine urban living —
            spaces where architecture meets aspiration.
          </p>
          {[
            'Future-driven design & architecture',
            'Eco-friendly & sustainable communities',
            'Innovative living experiences',
          ].map((text, i) => (
            <div
              key={text}
              className={`flex items-center gap-3.5 py-3.5 border-b border-[#f5edbb] text-[.95rem] text-[#4a5e4b] font-light ${
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

        {/* Image with offset yellow accent */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <img
            src="/about-mission.webp"
            alt="Our Vision"
            className="w-full block rounded-[4px] relative z-[1]"
            style={{ boxShadow: '0 20px 60px rgba(59,123,63,.12)' }}
          />
          {/* Yellow decorative box behind */}
          <div className="absolute bottom-[-16px] right-[-16px] w-[70%] h-[70%] bg-[#f5edbb] rounded-[4px] z-0" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          TIMELINE
      ════════════════════════════════════════ */}
      <section
        className="bg-[#eef5ee]"
        style={{ padding: 'clamp(5rem, 10vh, 9rem) 6vw' }}
      >
        {/* Head */}
        <div className="text-center mb-[4.5rem]">
          <span className="block text-[10px] tracking-[.3em] uppercase text-[#3b7b3f] font-semibold mb-4">
            Milestones
          </span>
          <h2
            className="font-semibold text-[#1c2b1d]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Our{' '}
            <span className="text-[#3b7b3f]">Journey</span>
          </h2>
        </div>

        {/* Track */}
        <div className="max-w-[780px] mx-auto relative">
          {/* Vertical line */}
          <div
            className="absolute top-2 bottom-2 w-px bg-[#d4e8d4]"
            style={{ left: '76px' }}
          />

          {[
            { year: '2012', title: 'Company Founded',       desc: 'Started with a vision to transform real estate.' },
            { year: '2015', title: 'First Large Community', desc: 'Delivered 250+ premium homes.' },
            { year: '2019', title: 'Commercial Expansion',  desc: 'Entered the corporate real estate sector.' },
            { year: '2023', title: 'Sustainability Focus',  desc: 'Launched eco-friendly smart townships.' },
          ].map(({ year, title, desc }, i) => (
            <motion.div
              key={year}
              className="flex gap-10 pb-12 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              {/* Year */}
              <div className="min-w-[76px] text-right text-[1.1rem] text-[#3b7b3f] pt-0.5 font-semibold">
                {year}
              </div>
              {/* Dot */}
              <div className="flex-shrink-0 pt-[9px]">
                <div
                  className="w-[11px] h-[11px] rounded-full bg-[#3b7b3f]"
                  style={{ boxShadow: '0 0 0 4px #d4e8d4' }}
                />
              </div>
              {/* Body */}
              <div>
                <h3 className="text-[1.1rem] font-semibold text-[#1c2b1d] mb-1.5">
                  {title}
                </h3>
                <p className="text-[.9rem] text-[#4a5e4b] font-light leading-[1.75]">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          TEAM
      ════════════════════════════════════════ */}
      <section
        className="bg-[#fdf8e8]"
        style={{ padding: 'clamp(5rem, 10vh, 9rem) 6vw' }}
      >
        {/* Head */}
        <div className="text-center mb-14">
          <span className="block text-[10px] tracking-[.3em] uppercase text-[#3b7b3f] font-semibold mb-4">
            The People Behind It
          </span>
          <h2
            className="font-semibold text-[#1c2b1d]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Meet Our{' '}
            <span className="text-[#3b7b3f]">Team</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-[1000px] mx-auto">
          {[
            { name: 'Arjun Kumar',  role: 'Founder & CEO' },
            { name: 'Priya Sharma', role: 'Design Head' },
            { name: 'Rohit Verma',  role: 'Project Director' },
          ].map(({ name, role }, i) => (
            <motion.div
              key={name}
              className="bg-[#eef5ee] rounded-[6px] overflow-hidden border border-[#d4e8d4] cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{
                y: -6,
                boxShadow: '0 24px 48px rgba(59,123,63,.12)',
              }}
            >
              {/* Placeholder — swap with <img> when photos are ready */}
              <div
                className="h-[260px]"
                style={{
                  background: 'linear-gradient(135deg, #d4e8d4 0%, #f5edbb 100%)',
                }}
              />
              {/* Info */}
              <div className="px-6 pt-5 pb-7 border-t-2 border-[#3b7b3f]">
                <h4 className="text-[1.05rem] font-semibold text-[#1c2b1d] mb-1.5">
                  {name}
                </h4>
                <span className="text-[10px] tracking-[.2em] uppercase text-[#3b7b3f] font-medium">
                  {role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}