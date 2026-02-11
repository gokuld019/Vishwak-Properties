'use client';

import { motion } from "framer-motion";
import { Users, Target, Award, Home } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] flex items-center overflow-hidden px-4 sm:px-8">
        <motion.img
          src="/about1.webp"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            relative z-10 
            text-3xl sm:text-4xl md:text-6xl lg:text-7xl 
            font-bold text-black 
            max-w-2xl
          "
        >
         
          <br />
        </motion.h1>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="/about-who.webp"
          className="w-full rounded-3xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Who <span className="text-[#3b7b3f]">We Are</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            We are a modern real estate development company focused on delivering
            high-quality homes, premium gated communities, and commercial spaces.
          </p>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            With 10+ years of experience, our mission is to blend innovation,
            sustainability, and comfort.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          <Stat number="120+" label="Completed Projects" icon={<Home size={32} />} />
          <Stat number="10,000+" label="Happy Families" icon={<Users size={32} />} />
          <Stat number="12+" label="Years of Excellence" icon={<Award size={32} />} />
        </div>
      </section>

      {/* OUR VISION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Our <span className="text-[#3b7b3f]">Vision</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            We aim to build future-ready communities that redefine urban living.
          </p>

          <div className="space-y-3">
            <VisionItem text="Future-driven design & architecture" />
            <VisionItem text="Eco-friendly & sustainable communities" />
            <VisionItem text="Innovative living experiences" />
          </div>
        </motion.div>

        <motion.img
          src="/about-mission.webp"
          className="w-full rounded-3xl shadow-xl"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      {/* TIMELINE */}
      <section className="bg-[#f0f5f2] py-16 sm:py-20 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
          Our <span className="text-[#3b7b3f]">Journey</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <TimelineItem year="2012" title="Company Founded" desc="Started with a vision to transform real estate." />
          <TimelineItem year="2015" title="First Large Community" desc="Delivered 250+ premium homes." />
          <TimelineItem year="2019" title="Commercial Expansion" desc="Entered the corporate real estate sector." />
          <TimelineItem year="2023" title="Sustainability Focus" desc="Launched eco-friendly smart townships." />
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Meet Our <span className="text-[#3b7b3f]">Team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <TeamCard name="Arjun Kumar" role="Founder & CEO" />
          <TeamCard name="Priya Sharma" role="Design Head" />
          <TeamCard name="Rohit Verma" role="Project Director" />
        </div>
      </section>

    </div>
  );
}

/* COMPONENTS */

function Stat({ number, label, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 sm:p-10 bg-white shadow-xl rounded-3xl border border-gray-100 text-center"
    >
      <div className="flex justify-center mb-4 text-[#3b7b3f]">{icon}</div>
      <p className="text-3xl sm:text-4xl font-bold text-gray-900">{number}</p>
      <p className="text-gray-500 mt-2">{label}</p>
    </motion.div>
  );
}

function VisionItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <Target className="text-[#3b7b3f] mt-1" size={20} />
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function TimelineItem({ year, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100"
    >
      <p className="text-[#3b7b3f] font-bold text-lg sm:text-xl">{year}</p>
      <h3 className="text-xl sm:text-2xl font-semibold mt-1">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">{desc}</p>
    </motion.div>
  );
}

function TeamCard({ name, role }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100"
    >
      <div className="h-56 sm:h-64 bg-gray-200" />
      <div className="p-6 text-center">
        <h4 className="text-lg sm:text-xl font-semibold">{name}</h4>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">{role}</p>
      </div>
    </motion.div>
  );
}
