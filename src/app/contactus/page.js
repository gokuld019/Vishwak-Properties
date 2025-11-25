"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
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

      {/* BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-[500px] md:h-[650px] 
                      bg-gradient-to-br from-green-100 via-green-200 to-white 
                      rounded-b-[40px] md:rounded-b-[60px] shadow-lg"></div>

      <div className="absolute top-0 right-0 w-[200px] md:w-[380px] 
                      h-[200px] md:h-[380px] bg-green-300/30 
                      blur-[120px] md:blur-[150px] rounded-full"></div>

      {/* PAGE WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 md:pt-28 pb-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14 md:mb-20"
        >
          <h1 className="text-4xl mt-10 sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Contact <span className="text-green-600">Us</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-4 max-w-2xl mx-auto">
            We're always here to assist you with your real estate queries.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* LEFT SIDE CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl 
                       rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 md:mb-10">
              Get in Touch
            </h2>

            <div className="space-y-8 sm:space-y-10">

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">+91 98765 43210</p>
                  <p className="text-gray-600 text-sm sm:text-base">+91 90000 00000</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">support@realestate.com</p>
                  <p className="text-gray-600 text-sm sm:text-base">sales@realestate.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
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
            className="p-8 sm:p-10 md:p-12 bg-white rounded-2xl md:rounded-3xl 
                       shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 md:mb-10">
              Send a Message
            </h2>

            <form className="space-y-6 sm:space-y-8">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full py-3.5 sm:py-4 px-4 border border-gray-300 rounded-2xl 
                             shadow-sm focus:border-green-600 focus:ring-4 
                             focus:ring-green-200/60 outline-none transition-all text-sm sm:text-base"
                  placeholder={`Enter your ${field}`}
                />
              ))}

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full py-3.5 sm:py-4 px-4 border border-gray-300 rounded-2xl 
                           shadow-sm focus:border-green-600 focus:ring-4 
                           focus:ring-green-200/60 outline-none transition-all text-sm sm:text-base"
                placeholder="Enter your message"
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 text-white rounded-2xl text-lg font-semibold 
                           bg-gradient-to-r from-green-600 to-green-500 
                           shadow-lg hover:shadow-green-400/40 flex items-center 
                           justify-center gap-3"
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* MAP SECTION */}
        <div className="mt-20 md:mt-28">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-12">
            Our Location
          </h2>

          <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69591.7357197738!2d80.06892710689729!3d12.926244749241922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e74198e6db%3A0xe4c2954a0110011!2sVishwak%20Properties!5e1!3m2!1sen!2sin!4v1763623301581!5m2!1sen!2sin"
              width="100%"
              height="380"
              className="md:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>

      {/* FLOATING CONTACT BUTTONS */}
      <div className="fixed bottom-25 right-6 flex flex-col gap-4 z-50">

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600 hover:bg-green-500 
                     text-white rounded-full flex items-center justify-center 
                     shadow-lg hover:shadow-green-400/50 transition-all duration-300"
        >
          <BsWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.a>

        {/* Call */}
        <motion.a
          href="tel:+919876543210"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-500 
                     text-white rounded-full flex items-center justify-center 
                     shadow-lg hover:shadow-blue-400/50 transition-all duration-300"
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.a>

      </div>
    </div>
  );
}
