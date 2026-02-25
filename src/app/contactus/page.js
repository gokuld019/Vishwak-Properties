"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Sparkles } from "lucide-react";
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went wrong. Please try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[400px] sm:h-[450px] md:h-[650px]
                      bg-gradient-to-br from-green-100 via-green-200 to-white
                      rounded-b-[30px] sm:rounded-b-[35px] md:rounded-b-[60px] shadow-lg" />

      <div className="absolute top-0 right-0 w-[150px] sm:w-[180px] md:w-[380px]
                      h-[150px] sm:h-[180px] md:h-[380px]
                      bg-green-300/30 blur-[80px] sm:blur-[100px] md:blur-[150px]
                      rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 md:pt-40 pb-12 sm:pb-16 md:pb-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm
                       border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">
              Contact Us
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Contact <span className="text-green-600">Us</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            We're always here to assist you with your real estate queries.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">

          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col bg-white/60 backdrop-blur-2xl
                       border border-white/60
                       shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                       rounded-3xl
                       p-8 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h2>

            <div className="space-y-8">

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600
                                rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 74011 31313</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600
                                rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 break-all">
                    info@vishwakproperties.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600
                                rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    OLD NO-113B/28A, NEW NO-18, Kakkan Street<br /> Tambaram West,
                    Chennai<br /> Chengalpattu, Tamil Nadu – 600045
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            ref={messageRef}
            className="flex flex-col bg-white border border-gray-100
                       shadow-[0_30px_80px_rgba(0,0,0,0.1)]
                       rounded-3xl
                       p-8 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Send a Message
            </h2>

            {(successMsg || errorMsg) && (
              <div className="mb-4">
                {successMsg && <p className="text-green-600">{successMsg}</p>}
                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
              </div>
            )}

            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50
                             border border-gray-200 focus:border-green-600
                             focus:ring-4 focus:ring-green-200/60 outline-none"
                  required
                />
              ))}

              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full px-4 py-3 rounded-xl bg-gray-50
                           border border-gray-200 focus:border-green-600
                           focus:ring-4 focus:ring-green-200/60 outline-none"
                required
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full py-4 rounded-full font-semibold text-white
                           bg-gradient-to-r from-green-600 via-green-500 to-green-600
                           shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* ===== LOCATION MAP SECTION ===== */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 md:mt-28"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our <span className="text-green-600">Location</span>
            </h2>
            <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
              Visit our office and explore opportunities in person.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden
                          shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                          border border-white/60
                          backdrop-blur-xl bg-white/70">

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/30 blur-3xl rounded-full" />

            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Vishwak%20Properties%20Tambaram%20West%20Chennai&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}