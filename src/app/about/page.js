'use client';

import { motion } from "framer-motion";
import { Building2, Users, Target, Award, Home, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-left overflow-hidden">
        <motion.img
          src="/a5.png"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl ml-50 md:text-7xl font-bold text-black z-10"
        >
         Excellence Begins <span className="text-black"><br />With the Right Plot.</span>
        </motion.h1>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="/i3.webp"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold">
            Who <span className="text-[#3b7b3f]">We Are</span>
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            We are a modern real estate development company focused on delivering
            high-quality homes, premium gated communities, and commercial spaces
            designed for tomorrow.
          </p>

          <p className="text-gray-600 leading-relaxed text-lg">
            With 10+ years of experience, our mission is to create spaces that
            blend innovation, sustainability, and comfort — setting a new
            benchmark in urban living.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Stat number="120+" label="Completed Projects" icon={<Home size={34} />} />
          <Stat number="10,000+" label="Happy Families" icon={<Users size={34} />} />
          <Stat number="12+" label="Years of Excellence" icon={<Award size={34} />} />
        </div>
      </section>

      {/* OUR VISION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold">
            Our <span className="text-[#3b7b3f]">Vision</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            We aim to build future-ready communities that redefine urban living.
            Every project we undertake reflects our commitment to quality,
            sustainability, and customer-first values.
          </p>

          <div className="space-y-4">
            <VisionItem text="Future-driven design & architecture" />
            <VisionItem text="Eco-friendly & sustainable communities" />
            <VisionItem text="Innovative living experiences" />
          </div>
        </motion.div>

        <motion.img
          src="/i2.webp"
          className="rounded-3xl shadow-xl"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      {/* TIMELINE */}
      <section className="bg-[#f0f5f2] py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          Our <span className="text-[#3b7b3f]">Journey</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-10">
          <TimelineItem year="2012" title="Company Founded" desc="Started with a vision to transform real estate." />
          <TimelineItem year="2015" title="First Large Community" desc="Delivered 250+ premium homes." />
          <TimelineItem year="2019" title="Commercial Expansion" desc="Entered the corporate real estate sector." />
          <TimelineItem year="2023" title="Sustainability Focus" desc="Launched eco-friendly smart townships." />
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Meet Our <span className="text-[#3b7b3f]">Team</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <TeamCard
            img=""
            name="Arjun Kumar"
            role="Founder & CEO"
          />
          <TeamCard
            img=""
            name="Priya Sharma"
            role="Design Head"
          />
          <TeamCard
            img=""
            name="Rohit Verma"
            role="Project Director"
          />
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
      className="p-10 bg-white shadow-xl rounded-3xl border border-gray-100"
    >
      <div className="flex justify-center mb-4 text-[#3b7b3f]">{icon}</div>
      <p className="text-4xl font-bold text-gray-900">{number}</p>
      <p className="text-gray-500 mt-2">{label}</p>
    </motion.div>
  );
}

function VisionItem({ text }) {
  return (
    <div className="flex items-start space-x-3">
      <Target className="text-[#3b7b3f] mt-1" size={22} />
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
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
    >
      <p className="text-[#3b7b3f] font-bold text-xl">{year}</p>
      <h3 className="text-2xl font-semibold mt-2">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </motion.div>
  );
}

function TeamCard({ img, name, role }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100"
    >
      <img src={img} className="w-full h-64 object-cover" />
      <div className="p-6 text-center">
        <h4 className="text-xl font-semibold">{name}</h4>
        <p className="text-gray-600 mt-1">{role}</p>
      </div>
    </motion.div>
  );
}
