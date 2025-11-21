"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#f6f9fc] relative overflow-hidden">

      {/* BACKGROUND GRADIENT LAYERS */}
      <div className="absolute top-0 left-0 w-full h-[650px] bg-gradient-to-br from-green-100 via-green-200 to-white rounded-b-[60px] shadow-lg"></div>
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-green-300/30 blur-[150px] rounded-full"></div>

      {/* PAGE WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl mt-15 font-extrabold text-gray-900 tracking-tight">
            Contact <span className="text-green-600">Us</span>
          </h1>
          <p className="text-gray-600 text-xl mt-4">
            We're always here to assist you with your real estate queries.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT SIDE GLASS PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Get in Touch</h2>

            <div className="space-y-10">

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                  <p className="text-gray-600">+91 90000 00000</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">support@realestate.com</p>
                  <p className="text-gray-600">sales@realestate.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 mt-1">
                    No. 123, Green Street, Near City Center, Chennai – 600001
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Send a Message
            </h2>

            <form className="space-y-8">
              {["name", "email", "phone"].map((field) => (
                <div key={field} className="group relative">
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full py-4 px-4 border border-gray-300 rounded-2xl shadow-sm focus:border-green-600 focus:ring-4 focus:ring-green-200/60 outline-none transition-all"
                    placeholder={`Enter your ${field}`}
                  />
                </div>
              ))}

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your message"
                className="w-full py-4 px-4 border border-gray-300 rounded-2xl shadow-sm focus:border-green-600 focus:ring-4 focus:ring-green-200/60 outline-none transition-all"
              ></textarea>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 text-white rounded-2xl text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 shadow-lg hover:shadow-green-400/40 flex items-center justify-center gap-3"
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* MAP SECTION */}
        <div className="mt-28">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Location
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69591.7357197738!2d80.06892710689729!3d12.926244749241922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e74198e6db%3A0xe4c2954a0110011!2sVishwak%20Properties!5e1!3m2!1sen!2sin!4v1763623301581!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
