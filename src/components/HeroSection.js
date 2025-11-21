'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, Plus, Share2, ArrowRight, MapPin, Building, Bed , ThumbsUp, TrendingUp, ArrowUp , Users, Droplets, Fish, Footprints, Trees, Sparkles, MessageCircle, User, Mail, Phone, ChevronDown , Diamond, Send, X  } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('apartments');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [captcha] = useState(Math.floor(10000 + Math.random() * 90000));
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/Rash.jpg',
      title: '40+',
      subtitle: 'Years of Building',
      highlight: 'Pride'
    },
    {
      id: 2,
      image: '/Rash2.jpg',
      title: '50+',
      subtitle: 'Projects Completed',
      highlight: 'Excellence'
    },
    {
      id: 3,
      image: '/Rash3.jpg',
      title: '10000+',
      subtitle: 'Happy Families',
      highlight: 'Trust'
    }
  ];

  const megaMenuData = {
    plots: [
      { name: 'Aira Avenue @Vandalur', href: '/projects/aira-avenue-vandalur', tag: 'Premium' },
      { name: 'Shree Vignesh Kumar Nagar – Plots @ SP Koil', href: '/projects/ongoing/plots/sunrise-enclave', tag: 'New Launch' },
      { name: 'Mahaa Ganapathy Avenue – Plots @ Kandigai', href: '/projects/ongoing/plots/paradise-gardens' },
      { name: 'SS Astron – OMR, Kelambakkam', href: '/projects/ongoing/plots/royal-meadows', tag: 'Selling Fast' },
      { name: 'Mownishwar Nagar – OMR, Thaiyur', href: '/projects/ongoing/plots/crystal-heights' },
      { name: 'Vijay Ganapathy Nagar – Mannivakkam', href: '/projects/ongoing/plots/golden-plains' },
      { name: 'Sri Mangal Avenue – Chengalpattu', href: '/projects/ongoing/plots/silver-oak' },
      { name: 'Varsa Garden – Padur, OMR', href: '/projects/ongoing/plots/elite-avenue', tag: 'Limited Units' },

      { name: 'VK Aurora – Kelambakkam', href: '/projects/ongoing/plots/elite-avenue', tag: 'Limited Units' },
      { name: 'ALA Garden – Vandalur', href: '/projects/ongoing/plots/elite-avenue', tag: 'Limited Units' },
      { name: 'Kumaran Nagar – Urapakkam', href: '/projects/ongoing/plots/elite-avenue', tag: 'Limited Units' },
      { name: 'Sri Kuberan Nagar – Ponmar', href: '/projects/ongoing/plots/elite-avenue', tag: 'Limited Units' },

    ],
    villas: [
      { name: 'Mahaa Ganapathy Avenue – Villas @ Kandigai', href: '/projects/ongoing/villas/luxury-gardens', tag: 'Premium' },
      { name: 'Vijay Ganapathy Nagar – 1 BHK & 2 BHK Villas @ Mannivakkam', href: '/projects/ongoing/villas/dream-retreat', tag: 'New Launch' },
      { name: 'Sri Mangal Avenue – 1 BHK & 2 BHK Villas @ Chengalpattu', href: '/projects/ongoing/villas/serenity' },
      { name: 'Kumaran Nagar – 2 BHK VILLAS at Urapakkam', href: '/projects/ongoing/villas/grand-vista', tag: 'Selling Fast' },
    ]
  };

  const stats = [
    { number: "15", label: "Years of\nExperience", plus: true },
    { number: "32", label: "Prestigious\nIndustry Awards", plus: true },
    { number: "75", label: "Quarterly\ncustomer meet" },
    { number: "01", label: "In every 4 th\ncustomer is a\nreferred customer" },
    { number: "4K", label: "Happy\nCustomers" },
    { number: "25L", label: "sqft\nGreen home\nDelivered" }
  ];

  const projects = {
    apartments: [
      {
        id: 1,
        name: 'AIRA Avenue',
        location: 'Bang On OMR,(Adj. to Marina Mall, Navalur)',
        image: '/project1.jpg',
        totalUnits: '271 UNITS',
        bedrooms: '3 & 4 BHK'
      },
      {
        id: 2,
        name: 'Shree Vignesh Kumar Nagar',
        location: 'Navalur, Chennai',
        image: '/project2.png',
        totalUnits: '143 UNITS',
        bedrooms: '2 & 3 BHK'
      },
      {
        id: 3,
        name: 'Maha Ganapathy Avenue',
        location: 'Navalur, Chennai',
        image: '/project2.png',
        totalUnits: '143 UNITS',
        bedrooms: '2 & 3 BHK'
      }
    ],
    villas: [
      {
        id: 4,
        name: 'AIRA Avenue',
        location: 'Kelambakkam, Chennai',
        image: '/villa-1.jpg',
        totalUnits: '50 UNITS',
        bedrooms: '3 & 4 BHK'
      },
      {
        id: 5,
        name: 'Shree Vignesh Kumar Nagar',
        location: 'Kelambakkam, Chennai',
        image: '/villa-1.jpg',
        totalUnits: '50 UNITS',
        bedrooms: '3 & 4 BHK'
      },
      {
        id: 6,
        name: 'Maha Ganapathy Avenue',
        location: 'Kelambakkam, Chennai',
        image: '/villa-1.jpg',
        totalUnits: '50 UNITS',
        bedrooms: '3 & 4 BHK'
      }
    ],
    plots: [
      {
        id: 7,
        name: 'AIRA Avenue',
        location: 'Chengalpattu, Chennai',
        image: '/plot-1.jpg',
        totalUnits: '100 PLOTS',
        bedrooms: '600-1200 Sq.ft'
      },
      {
        id: 8,
        name: 'Shree Vignesh Kumar Nagar',
        location: 'Chengalpattu, Chennai',
        image: '/plot-1.jpg',
        totalUnits: '100 PLOTS',
        bedrooms: '600-1200 Sq.ft'
      },
      {
        id: 9,
        name: 'Maha Ganapathy Avenue',
        location: 'Chengalpattu, Chennai',
        image: '/plot-1.jpg',
        totalUnits: '100 PLOTS',
        bedrooms: '600-1200 Sq.ft'
      },
    ]
  };

  const currentProjects = projects[activeTab];

  const amenities = [
    {
      icon: Users,
      label: 'MEDITATION AREA',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Droplets,
      label: 'LILY POND',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Fish,
      label: 'KOI POND',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Footprints,
      label: 'ACUPUNCTURE WALK',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trees,
      label: 'LANDSCAPE GARDEN',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      icon: Sparkles,
      label: 'DECORATIVE ARCH',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll be in touch soon.');
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiry: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const articles = [
    {
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      date: 'October 14, 2025',
      title: 'Video Guide: Reading the Layout Map in 5 Minutes'
    },
    {
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
      date: 'October 15, 2025',
      title: 'Work in Oragadam? Best Residential Plot Pockets Nearby',
      isMap: true
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      date: 'October 10, 2025',
      title: 'Smart Home Essentials Under a Budget'
    }
  ];

  const testimonials = [
    {
      text: "Good service. Trustable company. Customer handling very friendly, more than all service the best",
      author: "Janak Sherathon",
      rating: 3
    },
    {
      text: "Customer handling was good. Hassle-free process. Thank u team",
      author: "Ram Kumar B",
      rating: 5
    },
    {
      text: "Good very good service. There were speaking friendly than team",
      author: "Dhandapani D",
      rating: 5
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getCardPosition = (index) => {
    const total = testimonials.length;
    let diff = index - currentIndex;
    
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    
    if (diff === 0) return 'center';
    if (diff === -1) return 'left';
    if (diff === 1) return 'right';
    return 'hidden';
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
   
      {/* Ultra Slim Vertical Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            bg-[#e0a300]
            hover:bg-[#c98f00]
            text-black
            px-5 py-5
            rounded-l-md
            shadow-xl
            flex items-center justify-center
            transition-all duration-300
          "
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-[12px] font-semibold tracking-widest">
            ENQUIRE NOW
          </span>
        </button>
      </div>

      {/* Enquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#67a139] to-[#4a8f2f] text-white p-8 rounded-t-3xl">
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <p className="text-white/90">Fill out the form below and we'll get back to you shortly</p>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone Number"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                    <select
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      required
                      className="flex-1 outline-none text-gray-900 bg-transparent cursor-pointer"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="apartments">Apartments</option>
                      <option value="villas">Villas</option>
                      <option value="plots">Plots</option>
                      <option value="commercial">Commercial</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <div className="border-2 border-gray-300 focus-within:border-[#67a139] rounded-xl transition-colors p-3">
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Your Message (Optional)"
                      className="w-full outline-none text-gray-900 placeholder-gray-400 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#67a139] hover:bg-[#4a8f2f] text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  Send Enquiry
                </button>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-gray-600 text-sm mb-3">Or reach us directly at:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a href="tel:+919345566568" className="text-[#67a139] hover:underline font-medium">
                      +91 93455 66568
                    </a>
                    <span className="hidden sm:inline text-gray-400">|</span>
                    <a href="mailto:vishwakproperties@gmail.com" className="text-[#67a139] hover:underline font-medium">
                      vishwakproperties@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={slides[currentSlide].image}
            alt="Slide"
            fill
            className="object-cover transition-all duration-700"
          />
        </div>

        {/* Top Header Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white z-20 shadow-lg overflow-hidden transition-all duration-500">
          {/* Running Text - Shows when not scrolled */}
          <div className={`transition-all duration-500 ${isScrolled ? 'h-0 opacity-0' : 'h-12 opacity-100'}`}>
            <div className="flex items-center h-full overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-8 px-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">NEW LAUNCH:</span>
                  Premium 3 BHK Apartments at OMR Starting from ₹65 Lakhs
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">LIMITED OFFER:</span>
                  Book Now & Get 5% Discount + Free Registration
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <Diamond className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400">EXCLUSIVE:</span>
                  Pre-Launch Villas in Chengalpattu - Register Interest Today
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <ThumbsUp className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400">CUSTOMER CHOICE:</span>
                  Rated 4.8/5 by 1000+ Happy Homeowners
                </span>
                <span className="text-gray-400">•</span>
                {/* Duplicate for seamless loop */}
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">NEW LAUNCH:</span>
                  Premium 3 BHK Apartments at OMR Starting from ₹65 Lakhs
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">LIMITED OFFER:</span>
                  Book Now & Get 5% Discount + Free Registration
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <Diamond className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400">EXCLUSIVE:</span>
                  Pre-Launch Villas in Chengalpattu - Register Interest Today
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <ThumbsUp className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400">CUSTOMER CHOICE:</span>
                  Rated 4.8/5 by 1000+ Happy Homeowners
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info - Shows when scrolled */}
          <div className={`transition-all duration-500 ${isScrolled ? 'h-10 opacity-100' : 'h-0 opacity-0'}`}>
            <div className="flex justify-between items-center h-full px-6 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#67a139]" />
                <a href="mailto:vishwakproperties@gmail.com" className="hover:text-[#67a139] transition-colors">
                  vishwakproperties@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#67a139]" />
                <a href="tel:+919345566568" className="hover:text-[#67a139] transition-colors">
                  +91 93455 66568
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* About Us Section */}
      <section className="relative w-full bg-white py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Images */}
            <div className="relative">
              <div className="relative w-[280px] h-[380px] mb-6">
                <Image
                  src="/project1.jpg"
                  alt="Interior Design"
                  fill
                  className="object-cover shadow-lg"
                />
              </div>
              
              <div className="relative w-[450px] h-[320px] ml-auto -mt-32">
                <Image
                  src="/project2.png"
                  alt="Modern Living Room"
                  fill
                  className="object-cover shadow-xl"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="relative">
              <div className="inline-block mb-6">
                <span className="text-green-600 text-xs font-bold tracking-wider uppercase">
                  Dimensions unlimited
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-light text-gray-700 leading-tight mb-6">
                We are the most trusted real estate company in Chennai.
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Our commitment to trust, affordability, and transparency is rewarded with highest-in-the-market customer referrals, and the lion's share of sales volumes.                Our commitment to trust, affordability, and transparency is rewarded with highest-in-the-market customer referrals, and the lion's share of sales volumes.
                Our commitment to trust, affordability, and transparency is rewarded with highest-in-the-market customer referrals, and the lion's share of sales volumes.

              </p>

              <Link href="/about">
                <button className="bg-[#67a139] text-white px-8 py-3 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-yellow-600 transition-colors shadow-lg flex items-center gap-2">
                  EXPLORE
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full bg-gradient-to-br from-[#f8fff8] to-[#e9f7e9] pt-16 pb-20 px-4">
        <div className="max-w-[1280px] mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full shadow-md p-1">
              <button
                onClick={() => setActiveTab("apartments")}
                className={`px-10 py-3 text-sm font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${
                  activeTab === "apartments"
                    ? "bg-[#67a139] text-white shadow-md scale-[1.05]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Apartments
              </button>

              <button
                onClick={() => setActiveTab("villas")}
                className={`px-10 py-3 text-sm font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${
                  activeTab === "villas"
                    ? "bg-[#2d2d2d] text-white shadow-md scale-[1.05]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Villas
              </button>

              <button
                onClick={() => setActiveTab("plots")}
                className={`px-10 py-3 text-sm font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${
                  activeTab === "plots"
                    ? "bg-[#2d2d2d] text-white shadow-md scale-[1.05]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Plots
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="font-extrabold mb-4 text-gray-900 leading-tight"
              style={{ fontSize: "40px", lineHeight: "1.2" }}
            >
              <span className="text-[#67a139]">Pride in Every Project,</span>
              <br />
              <span>Perfected for You</span>
            </h2>

            <p
              className="text-gray-600 mt-4"
              style={{ fontSize: "17px", lineHeight: "1.6" }}
            >
              Delivering every project with utmost care and attention to detail.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-[330px] group">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />

                  <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[20px] font-bold text-gray-900">
                      {project.name}
                    </h3>
                    <Link href={`/projects/${project.id}`}>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition">
                        <ArrowRight className="w-6 h-6 text-gray-700" />
                      </button>
                    </Link>
                  </div>

                  <div className="flex items-start gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-[#67a139] mt-1" />
                    <p className="text-gray-600 text-sm">{project.location}</p>
                  </div>

                  <div className="border-t border-gray-200 mb-6" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building className="w-10 h-10 text-[#67a139]" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Total Units
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {project.totalUnits}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Bed className="w-10 h-10 text-[#67a139]" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Bedrooms
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {project.bedrooms}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Spaces Section */}
      <div className="bg-gray-50 py-10 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 xl:mb-16">
            <p className="text-sm md:text-base text-gray-500 font-semibold tracking-wider uppercase mb-3">
              COMMERCIAL SPACES
            </p>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Choose from a wide variety of<br />commercial properties
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 xl:gap-10">
            {/* Buy Commercial Property Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-[400px] xl:h-[450px]">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt="Commercial buildings"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-transparent"></div>
              </div>

              <div className="absolute inset-0 p-6 xl:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold tracking-wider uppercase mb-4">
                    BUY FOR COMMERCIAL USE
                  </p>
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    Buy a Commercial<br />property
                  </h3>
                  <p className="text-gray-700 text-sm xl:text-base mb-4 max-w-md">
                    Explore from Office Spaces, Co-working spaces, Retail Shops, Land, Factories and more
                  </p>
                </div>

                <div>
                  <Link href="/commercial/buy">
                    <button className="bg-[#67a139] hover:bg-blue-600 text-white font-semibold px-6 py-3 xl:px-8 xl:py-3.5 rounded-md transition-colors text-sm xl:text-base">
                      Explore Buying Commercial
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Lease Commercial Property Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-[400px] xl:h-[450px]">
                <img
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80"
                  alt="Shopping mall interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-amber-50/60 to-transparent"></div>
              </div>

              <div className="absolute inset-0 p-6 xl:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold tracking-wider uppercase mb-4">
                    LEASE FOR COMMERCIAL USE
                  </p>
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    Lease a Commercial<br />property
                  </h3>
                  <p className="text-gray-700 text-sm xl:text-base mb-4 max-w-md">
                    Explore from Office Spaces, Co-working spaces, Retail Shops, Land, Factories and more
                  </p>
                </div>

                <div>
                  <Link href="/commercial/lease">
                    <button className="bg-[#67a139] hover:bg-blue-600 text-white font-semibold px-6 py-3 xl:px-8 xl:py-3.5 rounded-md transition-colors text-sm xl:text-base">
                      Explore Leasing Commercial
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="relative bg-white py-24 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              WE'RE PROUD TO OFFER
              <br />
              <span className="bg-gradient-to-r from-[#67a139] to-[#4a8f2f] bg-clip-text text-transparent">
                BEST-IN-CLASS 40+ AMENITIES
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-3">
              Experience premium lifestyle amenities designed for comfort, elegance, and luxury.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 xl:gap-14">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className="
                      w-28 h-28 xl:w-32 xl:h-32 
                      rounded-full bg-white
                      border border-gray-200 
                      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                      flex items-center justify-center
                      mb-5
                      transition-all duration-300
                      group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                      group-hover:scale-105
                    "
                  >
                    <Icon className="w-10 h-10 text-[#67a139]" strokeWidth={2} />
                  </div>

                  <p className="text-xs md:text-sm font-bold text-gray-800 tracking-wide uppercase transition group-hover:text-[#67a139]">
                    {amenity.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-20">
            <Link href="/amenities">
              <button
                className="
                  px-10 py-4 
                  rounded-full font-semibold 
                  text-white text-lg
                  bg-[#67a139]
                  shadow-lg hover:shadow-xl
                  hover:scale-105 transition-all duration-300
                "
              >
                Explore All Amenities
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-white py-16 md:py-20 px-6 md:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-12 xl:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 border-2 border-gray-300 rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium text-gray-700">ARTICLES & </span>
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-5xl md:text-6xl xl:text-[40px] font-bold text-gray-900 leading-tight">
                Discover inspiration and trends
              </h2>
            </div>

            <Link href="/articles">
              <button className="group bg-[#67a139] hover:bg-yellow-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                View All Posts
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 xl:gap-10">
            {articles.map((article, index) => (
              <article key={index} className="group cursor-pointer">
                <div className="relative rounded-3xl overflow-hidden mb-6 h-64 xl:h-72">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {article.isMap && (
                    <div className="absolute inset-0 bg-cyan-400/90 flex items-center justify-center">
                      <div className="relative w-full h-full p-8">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Sriperumbudur
                        </div>
                        <div className="absolute top-1/4 right-8 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Tambaram
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Padappai
                        </div>
                        <div className="absolute bottom-1/4 left-8 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Oragadam
                        </div>
                        <div className="absolute bottom-1/4 right-8 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Kilambakkam
                        </div>
                        
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                          <line x1="0" y1="33" x2="100" y2="33" stroke="white" strokeWidth="0.5"/>
                          <line x1="0" y1="66" x2="100" y2="66" stroke="white" strokeWidth="0.5"/>
                          <line x1="33" y1="0" x2="33" y2="100" stroke="white" strokeWidth="0.5"/>
                          <line x1="66" y1="0" x2="66" y2="100" stroke="white" strokeWidth="0.5"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-3">{article.date}</p>

                <h3 className="text-xl xl:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                  {article.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
              Stories That<br />
              Inspire <span className="text-[#67a139]">Confidence</span> !!
            </h2>
          </div>

          <div className="relative h-96 mb-12 max-w-4xl mx-auto">
            <div className="relative w-full h-full flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                const position = getCardPosition(index);
                
                return (
            <div
  key={index}
  className={`absolute transition-all duration-500 ease-in-out ${
    position === "center"
      ? "z-30 opacity-100 scale-100"
      : position === "left"
      ? "z-20 opacity-40 blur-[2px] scale-90"
      : position === "right"
      ? "z-20 opacity-40 blur-[2px] scale-90"
      : "opacity-0 scale-75 pointer-events-none"
  }`}
  style={{
    top: "50%",
    left: "50%",
    transform:
      position === "center"
        ? "translate(-50%, -50%)"
        : position === "left"
        ? "translate(calc(-50% - 260px), -50%)"
        : position === "right"
        ? "translate(calc(-50% + 260px), -50%)"
        : "translate(-50%, -50%)",
  }}
>
  <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-80 md:w-[420px] xl:w-[480px] min-h-[280px] flex flex-col justify-between">
    <div className="flex justify-center gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < testimonial.rating ? "fill-yellow-400" : "fill-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>

    <p className="text-gray-700 text-center text-base md:text-lg mb-6 leading-relaxed flex-grow flex items-center justify-center px-4">
      {testimonial.text}
    </p>

    <p className="text-gray-900 font-bold text-center text-lg">
      {testimonial.author}
    </p>
  </div>
</div>

                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="absolute top-32 left-12 text-9xl text-blue-100 font-serif opacity-50 pointer-events-none hidden lg:block">
            "
          </div>
          <div className="absolute bottom-32 right-12 text-9xl text-blue-100 font-serif opacity-50 pointer-events-none hidden lg:block">
            "
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-[300px] opacity-20 pointer-events-none">
          <img
            src="/h1.png"
            alt="left background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute right-0 top-0 h-full w-[300px] opacity-20 pointer-events-none">
          <img
            src="/h1.png"
            alt="right background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative max-w-5xl w-full px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Get In Touch
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              We'd love to hear from you. Fill out the form and our team will reach out shortly.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/20 p-10 md:p-14 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input
                  type="text"
                  className="peer w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Your Name"
                />
                <label className="absolute left-4 -top-3 bg-white px-2 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:bg-white transition-all">
                  Your Name *
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  className="peer w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Email"
                />
                <label className="absolute left-4 -top-3 bg-white px-2 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:bg-white transition-all">
                  Email *
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  className="peer w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Phone Number"
                />
                <label className="absolute left-4 -top-3 bg-white px-2 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:bg-white transition-all">
                  Phone Number *
                </label>
              </div>

              <div className="relative">
                <select
                  className="peer w-full border border-gray-300 rounded-xl px-4 py-4 bg-white text-gray-900 focus:border-gray-900 outline-none"
                >
                  <option>Select Inquiry Type *</option>
                  <option>General Inquiry</option>
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Partnership</option>
                </select>
                <label className="absolute left-4 -top-3 bg-white px-2 text-sm text-gray-600">
                  Inquiry Type
                </label>
              </div>

              <div className="relative md:col-span-2">
                <textarea
                  rows={4}
                  className="peer w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Message"
                ></textarea>
                <label className="absolute left-4 -top-3 bg-white px-2 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:bg-white transition-all">
                  Message *
                </label>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button className="px-10 py-4 bg-gray-900 text-white text-lg rounded-full shadow-lg hover:bg-black transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}