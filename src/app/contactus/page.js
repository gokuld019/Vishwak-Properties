"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useState, useRef } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const messageRef = useRef(null);

  // --------------------
  // HANDLE INPUT CHANGE
  // --------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --------------------
  // HANDLE SUBMIT
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Your message was successfully sent!");
        setForm({ name: "", email: "", phone: "", message: "" });

        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        setErrorMsg("Failed to send message. Try again!");

        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went wrong. Please try again!");

        setTimeout(() => {
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] relative overflow-hidden">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-[400px] sm:h-[450px] md:h-[650px] 
                      bg-gradient-to-br from-green-100 via-green-200 to-white 
                      rounded-b-[30px] sm:rounded-b-[35px] md:rounded-b-[60px] shadow-lg"></div>

      <div className="absolute top-0 right-0 w-[150px] sm:w-[180px] md:w-[380px] 
                      h-[150px] sm:h-[180px] md:h-[380px] bg-green-300/30 
                      blur-[80px] sm:blur-[100px] md:blur-[150px] rounded-full"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10 pt-16 sm:pt-24 md:pt-40 pb-12 sm:pb-16 md:pb-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Contact <span className="text-green-600">Us</span>
          </h1>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl mt-3 md:mt-4 max-w-2xl mx-auto px-2">
            We're always here to assist you with your real estate queries.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-stretch">

          {/* LEFT INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              flex flex-col
              bg-white/60 backdrop-blur-2xl
              border border-white/60
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              rounded-2xl sm:rounded-3xl
              p-6 sm:p-8 md:p-10
              h-full
            "
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10">
              Get in Touch
            </h2>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">

              {/* PHONE */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                                bg-gradient-to-br from-green-500 to-green-600
                                rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-0.5">+91 74011 31313</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                                bg-gradient-to-br from-green-500 to-green-600
                                rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-0.5 break-all">info@vishwakproperties.in</p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                                bg-gradient-to-br from-green-500 to-green-600
                                rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-0.5 leading-relaxed">
                    OLD NO-113B/28A, NEW NO-18, Kakkan Street, Tambaram West,
                    Chennai, Chengalpattu, Tamil Nadu – 600045
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT FORM CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            ref={messageRef}
            className="
              flex flex-col
              bg-white
              border border-gray-100
              shadow-[0_30px_80px_rgba(0,0,0,0.1)]
              rounded-2xl sm:rounded-3xl
              p-6 sm:p-8 md:p-10
              h-full
            "
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10">
              Send a Message
            </h2>

            {(successMsg || errorMsg) && (
              <div className="mb-4 sm:mb-6">
                {successMsg && (
                  <p className="text-green-600 text-sm sm:text-base font-medium">{successMsg}</p>
                )}
                {errorMsg && (
                  <p className="text-red-600 text-sm sm:text-base font-medium">{errorMsg}</p>
                )}
              </div>
            )}

            <form className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit}>
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="
                    w-full px-4 sm:px-5 py-3 sm:py-4
                    rounded-xl
                    bg-gray-50
                    border border-gray-200
                    focus:border-green-600
                    focus:ring-3 sm:focus:ring-4 focus:ring-green-200/60
                    outline-none transition-all
                    text-sm sm:text-base
                  "
                  required
                />
              ))}

              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="
                  w-full px-4 sm:px-5 py-3 sm:py-4
                  rounded-xl
                  bg-gray-50
                  border border-gray-200
                  focus:border-green-600
                  focus:ring-3 sm:focus:ring-4 focus:ring-green-200/60
                  outline-none transition-all
                  text-sm sm:text-base
                "
                required
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="
                  mt-2 sm:mt-4
                  w-full py-3 sm:py-4
                  rounded-full
                  text-sm sm:text-base md:text-lg font-semibold text-white
                  bg-gradient-to-r from-green-600 via-green-500 to-green-600
                  shadow-[0_8px_20px_rgba(34,197,94,0.35)] sm:shadow-[0_12px_30px_rgba(34,197,94,0.45)]
                  hover:shadow-[0_12px_30px_rgba(34,197,94,0.5)] sm:hover:shadow-[0_20px_40px_rgba(34,197,94,0.6)]
                  transition-all duration-300
                  flex items-center justify-center gap-2 sm:gap-3
                  disabled:opacity-70
                "
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* MAP */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-12">
            Our Location
          </h2>

          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69591.7357197738!2d80.06892710689729!3d12.926244749241922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e74198e6db%3A0xe4c2954a0110011!2sVishwak%20Properties!5e1!3m2!1sen!2sin!4v1763623301581!5m2!1sen!2sin"
              width="100%"
              height="320"
              className="sm:h-[380px] md:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Vishwak Properties Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 flex flex-col gap-3 sm:gap-4 z-50">

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/917401131313"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 hover:bg-green-500 
                     text-white rounded-full flex items-center justify-center 
                     shadow-lg hover:shadow-green-400/50 transition-all duration-300"
          aria-label="Contact on WhatsApp"
        >
          <BsWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.a>

        {/* Call */}
        <motion.a
          href="tel:+917401131313"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-500 
                     text-white rounded-full flex items-center justify-center 
                     shadow-lg hover:shadow-blue-400/50 transition-all duration-300"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.a>
      </div>
    </div>
  );
}