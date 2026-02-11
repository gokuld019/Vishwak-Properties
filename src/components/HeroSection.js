'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Plus,
  Share2,
  ArrowRight,
  MapPin,
  Building,
  Bed,
  ThumbsUp,
  TrendingUp,
  ArrowUp,
  Users,
  Droplets,
  Fish,
  Footprints,
  Trees,
  Sparkles,
  MessageCircle,
  User,
  Mail,
  Phone,
  ChevronDown,
  Diamond,
  Send,
  X,Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('apartments');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [captcha] = useState(Math.floor(10000 + Math.random() * 90000));
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [recentProjects, setRecentProjects] = useState([]);

  // ====== BANNERS (Web & Mobile) ======
  const [webBanners, setWebBanners] = useState([]);
  const [mobileBanners, setMobileBanners] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const [projectsData, setProjectsData] = useState({
    apartments: [],
    villas: [],
    plots: [],
  });
  const [amenities, setAmenities] = useState([]);
  const [articles, setArticles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [commercialBuy, setCommercialBuy] = useState(null);
  const [commercialLease, setCommercialLease] = useState(null);

  const API_BASE = 'http://localhost:5000/api';
  const IMAGE_BASE = 'http://localhost:5000/';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    message: '',
  });

// ==============================
// GLOBAL HEADING SPLIT ANIMATION
// ==============================
useEffect(() => {
  const ctx = gsap.context(() => {

    // Helper: split text into words
    const splitWords = (el) => {
      if (!el || el.dataset.split === "true") return [];
      el.dataset.split = "true";

      const words = el.innerText.trim().split(" ");
      el.innerHTML = words
        .map(
          word => `
            <span style="display:inline-block; overflow:hidden">
              <span style="display:inline-block">${word}&nbsp;</span>
            </span>
          `
        )
        .join("");

      return el.querySelectorAll("span > span");
    };

    // Animate ALL headings
    gsap.utils.toArray("[data-animate='heading']").forEach(el => {
      const words = splitWords(el);

      gsap.from(words, {
        y: 90,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    // Animate ALL paragraph labels / badges
    gsap.utils.toArray("[data-animate='paragraph']").forEach(el => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });

  });

  return () => ctx.revert();
}, []);




  // ========= Fetch all homepage data from backend =========
 useEffect(() => {
  const fetchHomepageData = async () => {
    try {
      const [
        webBannersRes,
        mobileBannersRes,
        apartmentsRes,
        villasRes,
        plotsRes,
        amenitiesRes,
        articlesRes,
        testimonialsRes,
        commercialBuyRes,
        commercialLeaseRes,
        recentProjectsRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/banners?deviceType=web`),
        fetch(`${API_BASE}/banners?deviceType=mobile`),
        fetch(`${API_BASE}/projects?category=apartments`),
        fetch(`${API_BASE}/projects?category=villas`),
        fetch(`${API_BASE}/projects?category=plots`),
        fetch(`${API_BASE}/amenities`),
        fetch(`${API_BASE}/articles`),
        fetch(`${API_BASE}/testimonials`),
        fetch(`${API_BASE}/commercial?type=buy`),
        fetch(`${API_BASE}/commercial?type=lease`),
        fetch(`${API_BASE}/project-details/recent`),
      ]);
        const webBannersData = await webBannersRes.json();
        const mobileBannersData = await mobileBannersRes.json();
        const apartments = await apartmentsRes.json();
        const villas = await villasRes.json();
        const plots = await plotsRes.json();
        const amenitiesData = await amenitiesRes.json();
        const articlesData = await articlesRes.json();
        const testimonialsData = await testimonialsRes.json();
        const commercialBuyData = await commercialBuyRes.json();
        const commercialLeaseData = await commercialLeaseRes.json();

        const recentRaw = await recentProjectsRes.json();
        const recentArray = Array.isArray(recentRaw)
          ? recentRaw
          : Array.isArray(recentRaw?.data)
          ? recentRaw.data
          : [];

        setWebBanners(Array.isArray(webBannersData) ? webBannersData : []);
        setMobileBanners(Array.isArray(mobileBannersData) ? mobileBannersData : []);
        setRecentProjects(recentArray);

        setProjectsData({
          apartments: apartments || [],
          villas: villas || [],
          plots: plots || [],
        });

        setAmenities(amenitiesData || []);
        setArticles(articlesData || []);
        setTestimonials(testimonialsData || []);
        setCommercialBuy((commercialBuyData && commercialBuyData[0]) || null);
        setCommercialLease((commercialLeaseData && commercialLeaseData[0]) || null);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    };

    fetchHomepageData();
  }, []);

  // ====== detect mobile (<= 768px) ======
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


 

  // ====== Hero auto-slide based on correct banner set ======
  useEffect(() => {
    const slides = isMobile && mobileBanners.length ? mobileBanners : webBanners;
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, webBanners.length, mobileBanners.length]);

  // ====== Scroll listener for top bar ======
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: data.message || 'Failed to submit enquiry',
          confirmButtonColor: '#67a139',
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Our team will get back to you shortly.',
        showConfirmButton: false,
        timer: 2000,
      });
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later.',
        confirmButtonColor: '#67a139',
      });
    }
  };

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePrev = () => {
    if (!testimonials.length) return;
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!testimonials.length) return;
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getCardPosition = index => {
    const total = testimonials.length;
    if (!total) return 'hidden';
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    if (diff === 0) return 'center';
    if (diff === -1) return 'left';
    if (diff === 1) return 'right';
    return 'hidden';
  };

  const getImageUrl = path => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${IMAGE_BASE}${path.replace(/^\/+/, '')}`;
  };

  const currentProjects = projectsData[activeTab] || [];
  const activeBanners = isMobile && mobileBanners.length ? mobileBanners : webBanners;
  const safeSlideIndex = activeBanners.length ? currentSlide % activeBanners.length : 0;

  return (
    <>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* Ultra Slim Vertical Button - Mobile Responsive */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#67a139] hover:bg-[#579830] text-white px-3 sm:px-4 md:px-5 py-3 md:py-5 rounded-l-md shadow-xl flex items-center justify-center transition-all duration-300 text-xs sm:text-sm md:text-[14px]"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="font-semibold tracking-wider sm:tracking-widest">ENQUIRE NOW</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl w-[95%] sm:w-[90%] md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto relative mx-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition-colors z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <div className="bg-gradient-to-r from-[#67a139] to-[#4a8f2f] text-white p-5 sm:p-6 md:p-8 rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Get In Touch</h2>
              <p className="text-white/90 text-sm sm:text-base">Fill out the form below and we'll get back to you shortly</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone Number"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      required
                      className="flex-1 outline-none text-gray-900 bg-transparent cursor-pointer text-sm sm:text-base"
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
                <div className="relative">
                  <div className="border-2 border-gray-300 focus-within:border-[#67a139] rounded-lg sm:rounded-xl transition-colors p-3">
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message (Optional)"
                      className="w-full outline-none text-gray-900 placeholder-gray-400 resize-none text-sm sm:text-base"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#67a139] hover:bg-[#4a8f2f] text-white py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  Send Enquiry
                </button>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <p className="text-center text-gray-600 text-xs sm:text-sm mb-3">Or reach us directly at:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm md:text-base">
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

      {/* Hero Section - Mobile Responsive */}
      <div className="relative w-full h-[60vh] sm:h-[80vh] md:h-screen overflow-hidden bg-white">
        <div className="absolute inset-0" id="home">
          {activeBanners.length > 0 ? (
            <Image
              src={getImageUrl(activeBanners[safeSlideIndex].image)}
              alt={activeBanners[safeSlideIndex].title || 'Slide'}
              fill
              className="object-cover transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white z-20 shadow-lg overflow-hidden transition-all duration-500">
          <div className={`transition-all duration-500 ${isScrolled ? 'h-0 opacity-0' : 'h-8 sm:h-[36px] md:h-[44px] opacity-100'}`}>
            <div className="flex items-center h-full overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-4 sm:gap-6 md:gap-10 px-3 sm:px-4">
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span className="text-yellow-400 hidden xs:inline">NEW LAUNCH:</span>
                  <span className="xs:hidden">NEW:</span>
                  <span className="hidden sm:inline"> Premium 3 BHK Apartments @ OMR From ₹65 Lakhs</span>
                  <span className="sm:hidden"> 3 BHK @ OMR ₹65L</span>
                </span>
                <span className="text-gray-400 hidden sm:block">•</span>
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-green-400 hidden xs:inline">OFFER:</span>
                  <span className="xs:hidden">OFF:</span>
                  <span className="hidden sm:inline"> Book Now & Get 5% Discount + Free Registration</span>
                  <span className="sm:hidden"> 5% Discount</span>
                </span>
                <span className="text-gray-400 hidden sm:block">•</span>
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <Diamond className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-blue-400">EXCL:</span>
                  <span className="hidden sm:inline"> Pre-Launch Villas in Chengalpattu</span>
                  <span className="sm:hidden"> Villas</span>
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span className="text-yellow-400 hidden xs:inline">NEW LAUNCH:</span>
                  <span className="xs:hidden">NEW:</span>
                  <span className="hidden sm:inline"> Premium 3 BHK Apartments @ OMR From ₹65 Lakhs</span>
                  <span className="sm:hidden"> 3 BHK @ OMR ₹65L</span>
                </span>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-500 ${isScrolled ? 'h-8 sm:h-[36px] md:h-[44px] opacity-100' : 'h-0 opacity-0'}`}>
            <div className="flex justify-between items-center h-full px-3 sm:px-4 md:px-6 text-[10px] xs:text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#67a139]" />
                <a
                  href="mailto:vishwakproperties@gmail.com"
                  className="hover:text-[#67a139] transition-colors truncate max-w-[120px] xs:max-w-[140px] sm:max-w-none"
                >
                  vishwakproperties@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#67a139]" />
                <a href="tel:+919345566568" className="hover:text-[#67a139] transition-colors">
                  +91 93455 66568
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section - Mobile Responsive */}
      <section className="relative w-full min-h-[500px] sm:h-[750px] md:h-[780px] lg:h-[800px] xl:h-[820px] overflow-hidden bg-[#e8e8d0]">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/about-banner.jpg"
            alt="Interior Design"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="ml-auto w-full sm:max-w-md md:max-w-xl relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-xl bg-white/50 border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.12)] my-8 sm:my-0">
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#67a139]/20 rounded-full opacity-60" />

            {/* Badge */}
            <span data-animate="heading" className="text-[#67a139] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              Vishwak Properties
            </span>

            {/* Heading */}
            <h2 data-animate="heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6">
              Excellence in Every Project
            </h2>

            {/* Paragraph */}
            <p data-animate="paragraph" className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 md:mb-10">
              At Vishwak Properties, excellence begins with thoughtful planning.
              As one of Chennai's trusted developers, we deliver premium layouts,
              transparent communication, and reliable execution.
              <br />
              <br />
              Whether you're seeking premium villas or plotted developments with EMI,
              we ensure clarity, trust, and commitment at every step.
            </p>

            {/* Button */}
            <div>
              <Link href="/about">
                <button className="button" style={{ "--clr": "#53852bff" }}>
                  Explore
                  <span className="button__icon-wrapper">
                    <ArrowRight className="button__icon-svg" size={16} />
                    <ArrowRight className="button__icon-svg button__icon-svg--copy" size={16} />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Updated Projects - Mobile Responsive */}
    <section className="w-full bg-[#f5f5f5] py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-[1280px] mx-auto">

    {/* Heading */}
    <div className="text-center mb-8 sm:mb-10 md:mb-14">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        Recently Updated <br />
        <span className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#67a139]">
          Projects
        </span>
      </h2>
      <p className="text-gray-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base max-w-md mx-auto">
        Discover the newest updates across our top-performing projects.
      </p>
    </div>

    {/* Banner */}
    {Array.isArray(recentProjects) && recentProjects.length > 0 ? (
      <Link
        href={`/project-details/${recentProjects[0].projectId}`}
        className="block relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[520px] rounded-xl overflow-hidden shadow-lg group"
      >
        
        {/* Desktop Image */}
        <Image
          src="/Home.jpeg"
          alt="Aira Avenue"
          fill
          priority
          className="object-cover hidden sm:block group-hover:scale-105 transition duration-500"
        />

        {/* Mobile Image */}
        <Image
          src="/Aira-sub-banner.webp"
          alt="Aira Avenue"
          fill
          priority
          className="object-cover sm:hidden group-hover:scale-105 transition duration-500"
        />

      </Link>
    ) : (
      <div className="text-center text-gray-500 py-10">
        No recent projects available.
      </div>
    )}

  </div>
</section>



     

      {/* Amenities Section - Mobile Responsive */}
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-[#ecf5e9] py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-10 left-4 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#67a139]/20 blur-[60px] sm:blur-[100px] rounded-full opacity-40"></div>
        <div className="absolute bottom-10 right-4 sm:right-10 w-52 sm:w-72 h-52 sm:h-72 bg-[#4a8f2f]/20 blur-[80px] sm:blur-[120px] rounded-full opacity-40"></div>

        <div className="relative max-w-[1400px] mx-auto z-10 overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              <span className="block">WE'RE PROUD TO OFFER</span>
              <span className="bg-gradient-to-r from-[#67a139] to-[#4a8f2f] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                BEST-IN-CLASS AMENITIES
              </span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto mt-3 sm:mt-4">
              Hand-picked premium lifestyle spaces crafted for elegance, wellness, and luxury living.
            </p>
          </div>

          {/* MARQUEE WRAPPER */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-4 sm:gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused]">
              {/* Duplicate list for seamless loop */}
              {[...amenities, ...amenities].map((amenity, i) => (
                <div key={i} className="flex-shrink-0 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]">
                  <div className="group relative flex flex-col items-center text-center hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300">
                    {/* Card */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-white/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] group-hover:scale-105">
                      {/* Glow */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#67a139]/20 to-[#4a8f2f]/20 blur-xl" />

                      <Image
                        src={getImageUrl(amenity.icon)}
                        alt={amenity.label}
                        width={70}
                        height={70}
                        className="object-contain relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Label */}
                    <p className="mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase text-gray-800 group-hover:text-[#4a8f2f] transition px-1">
                      {amenity.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
            <Link href="/amenities"></Link>
          </div>
        </div>
      </div>

      {/* Articles Section - Mobile Responsive */}
      <div className="bg-white py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-[1350px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 border-2 border-gray-300 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-[#67a139]">ARTICLES</span>
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Discover inspiration and trends
              </h2>
            </div>
            <Link href="/articles" className="mt-4 md:mt-0">
              <button className="group bg-[#67a139] hover:bg-yellow-500 text-white font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 text-xs sm:text-sm md:text-base">
                View All Posts
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
            {articles.map((article, index) => (
              <article key={article.id || index} className="group cursor-pointer">
                <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden mb-3 sm:mb-4 h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
                  <img
                    src={getImageUrl(article.image)}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {article.isMap && (
                    <div className="absolute inset-0 bg-cyan-400/90 flex items-center justify-center">
                      <div className="relative w-full h-full p-4 sm:p-5 md:p-6 lg:p-8">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold shadow">
                          Sriperumbudur
                        </div>
                        <div className="absolute top-1/4 right-2 sm:right-3 md:right-4 lg:right-8 bg-white px-2 py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold shadow">
                          Tambaram
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 sm:translate-y-6 md:translate-y-8 bg-white px-2 py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold shadow">
                          Padappai
                        </div>
                        <div className="absolute bottom-1/4 left-2 sm:left-3 md:left-4 lg:left-8 bg-white px-2 py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold shadow">
                          Oragadam
                        </div>
                        <div className="absolute bottom-1/4 right-2 sm:right-3 md:right-4 lg:right-8 bg-white px-2 py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold shadow">
                          Kilambakkam
                        </div>
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                          <line x1="0" y1="33" x2="100" y2="33" stroke="white" strokeWidth="0.5" />
                          <line x1="0" y1="66" x2="100" y2="66" stroke="white" strokeWidth="0.5" />
                          <line x1="33" y1="0" x2="33" y2="100" stroke="white" strokeWidth="0.5" />
                          <line x1="66" y1="0" x2="66" y2="100" stroke="white" strokeWidth="0.5" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 md:mb-3">
                  {article.date ? new Date(article.date).toLocaleDateString('en-IN') : ''}
                </p>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                  {article.title}
                </h3>
              </article>
            ))}
            {articles.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8 sm:py-12">
                No articles available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Mobile Responsive */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-[#67a139] uppercase tracking-wider mb-3 sm:mb-4">
              TESTIMONIALS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Stories That <br />
              Inspire <span className="text-[#67a139]">Confidence</span> !!
            </h2>
          </div>
          <div className="relative h-[250px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[460px] mb-8 sm:mb-10 md:mb-12 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
            <div className="relative w-full h-full flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                const position = getCardPosition(index);
                const distance = isMobile ? 100 : window.innerWidth <= 1024 ? 180 : 260;
                if (position === 'hidden') return null;
                return (
                  <div
                    key={testimonial.id || index}
                    className={`absolute transition-all duration-500 ease-in-out ${
                      position === 'center' ? 'z-30 opacity-100 scale-100' : 'z-20 opacity-40 blur-[1px] sm:blur-[2px] scale-90'
                    }`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform:
                        position === 'center'
                          ? 'translate(-50%, -50%)'
                          : position === 'left'
                          ? `translate(calc(-50% - ${distance}px), -50%)`
                          : `translate(calc(-50% + ${distance}px), -50%)`,
                    }}
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 lg:p-10 w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[460px] min-h-[180px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px] xl:min-h-[300px] flex flex-col justify-between">
                      <div className="flex justify-center gap-1 mb-3 sm:mb-4 md:mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                              i < (testimonial.rating || 0) ? 'fill-yellow-400' : 'fill-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-center text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed flex-grow flex items-center justify-center px-2 sm:px-4">
                        {testimonial.text}
                      </p>
                      <p className="text-gray-900 font-bold text-center text-sm sm:text-base md:text-lg">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                );
              })}
              {testimonials.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  No testimonials yet.
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4">
            <button
              onClick={handlePrev}
              disabled={testimonials.length <= 1}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md disabled:opacity-40 disabled:hover:scale-100"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              disabled={testimonials.length <= 1}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md disabled:opacity-40 disabled:hover:scale-100"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>
          <div className="absolute top-16 sm:top-20 left-4 sm:left-6 text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-blue-100 font-serif opacity-50 pointer-events-none hidden sm:block">
            "
          </div>
          <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6 text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-blue-100 font-serif opacity-50 pointer-events-none hidden sm:block">
            "
          </div>
        </div>
      </div>

      {/* DOUBLE LINE OUTLINED MARQUEE - Mobile Responsive */}
      <div className="relative w-full overflow-hidden bg-white py-4 sm:py-6 md:py-8 lg:py-10">
        {/* LINE 1 – LEFT TO RIGHT (FASTER) */}
        <div className="marquee-track marquee-fast flex whitespace-nowrap mb-3 sm:mb-4 md:mb-6">
          <span className="marquee-text">
            Timeless Homes &nbsp; Timely Delivery &nbsp; Pride Timeless Homes &nbsp;
          </span>
          <span className="marquee-text">
            Timeless Homes &nbsp; Timely Delivery &nbsp; Pride Timeless Homes &nbsp;
          </span>
        </div>

        {/* LINE 2 – RIGHT TO LEFT (SLOWER) */}
        <div className="marquee-track marquee-reverse flex whitespace-nowrap">
          <span className="marquee-text">
            Pride • Trust • Quality Living &nbsp; Vishwak Properties &nbsp;
          </span>
          <span className="marquee-text">
            Pride • Trust • Quality Living &nbsp; Vishwak Properties &nbsp;
          </span>
        </div>

        <style>{`
          .marquee-track {
            will-change: transform;
          }

          /* SPEED CONTROLS */
          .marquee-fast {
            animation: marquee-left 25s linear infinite;
          }

          .marquee-reverse {
            animation: marquee-right 35s linear infinite;
          }

          .marquee-text {
            font-size: clamp(32px, 8vw, 120px);
            font-weight: 500;
            letter-spacing: 1px;
            color: transparent;
            -webkit-text-stroke: 1px #d1d5db;
            text-stroke: 1px #d1d5db;
            line-height: 1;
          }

          @keyframes marquee-left {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @keyframes marquee-right {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0%);
            }
          }
        `}</style>
      </div>

      {/* Contact Section - Mobile Responsive */}
      <section className="relative w-full py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex justify-center">
        <div className="absolute left-0 top-0 h-full w-[100px] sm:w-[150px] md:w-[200px] lg:w-[280px] opacity-10 sm:opacity-20 pointer-events-none">
          <img src="/h1.png" alt="left background" className="h-full w-full object-cover" />
        </div>
        <div className="absolute right-0 top-0 h-full w-[100px] sm:w-[150px] md:w-[200px] lg:w-[280px] opacity-10 sm:opacity-20 pointer-events-none">
          <img src="/h1.png" alt="right background" className="h-full w-full object-cover" />
        </div>
        <div className="relative max-w-4xl lg:max-w-5xl w-full px-4 sm:px-6 md:px-8 lg:px-10 z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
              Get In Touch
            </h2>
            <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              We'd love to hear from you. Fill out the form and our team will reach out shortly.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/70 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Your Name"
                  required
                />
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-2">
                  Your Name *
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Email"
                  required
                />
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-2">
                  Email *
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-gray-900 placeholder-transparent focus:border-gray-900 outline-none"
                  placeholder="Phone Number"
                  required
                />
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-2">
                  Phone Number *
                </label>
              </div>
              <div className="relative">
                <select
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  required
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 bg-white text-gray-900 focus:border-gray-900 outline-none"
                >
                  <option value="">Select Inquiry Type *</option>
                  <option value="apartments">Apartments</option>
                  <option value="villas">Villas</option>
                  <option value="plots">Plots</option>
                  <option value="commercial">Commercial</option>
                  <option value="general">General Inquiry</option>
                </select>
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600">
                  Inquiry Type *
                </label>
              </div>
              <div className="relative md:col-span-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-gray-900 focus:border-gray-900 outline-none"
                  placeholder="Message"
                ></textarea>
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 transition-all peer-focus:-top-2">
                  Message
                </label>
              </div>
              <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 md:col-span-2">
                <button
                  type="submit"
                  className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-[#67a139] text-white text-sm sm:text-base md:text-lg rounded-full shadow-lg hover:scale-105 hover:bg-[#4a8f2f] transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}