"use client";

import { useState, useEffect, useRef } from "react";
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
  X,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("apartments");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [captcha] = useState(Math.floor(10000 + Math.random() * 90000));
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [recentProjects, setRecentProjects] = useState([]);
const [phoneError, setPhoneError] = useState("");
const [loading, setLoading] = useState(false);
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
  const [projectOptions, setProjectOptions] = useState([]);
  const [commercialBuy, setCommercialBuy] = useState(null);
  const [commercialLease, setCommercialLease] = useState(null);
const [expandedId, setExpandedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const amenityScrollRef = useRef(null);
const amenityAnimRef = useRef(null);
const amenityIsDragging = useRef(false);
const amenityStartX = useRef(0);
const amenityScrollLeft = useRef(0);

useEffect(() => {
  if (!isMobile) return;
  const el = amenityScrollRef.current;
  if (!el) return;

  let paused = false;

  // Auto scroll
  const autoScroll = () => {
    if (!paused && el) {
      el.scrollLeft += 0.8;
      // Reset to start for infinite loop
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }
    amenityAnimRef.current = requestAnimationFrame(autoScroll);
  };

  amenityAnimRef.current = requestAnimationFrame(autoScroll);

  // Touch handlers
  const onTouchStart = (e) => {
    paused = true;
    amenityIsDragging.current = true;
    amenityStartX.current = e.touches[0].pageX - el.offsetLeft;
    amenityScrollLeft.current = el.scrollLeft;
  };

  const onTouchMove = (e) => {
    if (!amenityIsDragging.current) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (amenityStartX.current - x) * 1.2;
    el.scrollLeft = amenityScrollLeft.current + walk;
  };

  const onTouchEnd = () => {
    amenityIsDragging.current = false;
    // Resume after 2s
    setTimeout(() => { paused = false; }, 2000);
  };

  el.addEventListener("touchstart", onTouchStart, { passive: true });
  el.addEventListener("touchmove", onTouchMove, { passive: true });
  el.addEventListener("touchend", onTouchEnd);

  return () => {
    cancelAnimationFrame(amenityAnimRef.current);
    el.removeEventListener("touchstart", onTouchStart);
    el.removeEventListener("touchmove", onTouchMove);
    el.removeEventListener("touchend", onTouchEnd);
  };
}, [isMobile, amenities]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle active card
  useEffect(() => {
    if (!recentProjects.length) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % recentProjects.length);
    }, 4000);
    return () => clearInterval(t);
  }, [recentProjects.length]);

  const hasProjects = Array.isArray(recentProjects) && recentProjects.length > 0;

  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;
  const IMAGE_BASE = `${process.env.NEXT_PUBLIC_API_URL}/`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    projectId: "", // ✅ NEW
    message: "",
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
            (word) => `
            <span style="display:inline-block; overflow:hidden">
              <span style="display:inline-block">${word}&nbsp;</span>
            </span>
          `,
          )
          .join("");

        return el.querySelectorAll("span > span");
      };

      // Animate ALL headings
      gsap.utils.toArray("[data-animate='heading']").forEach((el) => {
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
      gsap.utils.toArray("[data-animate='paragraph']").forEach((el) => {
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!formData.inquiry) {
      setProjectOptions([]);
      return;
    }

    fetch(
      `${API_BASE}/project-details/by-category?category=${formData.inquiry}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Projects:", data);
        setProjectOptions(data || []);
      })
      .catch((err) => console.error(err));
  }, [formData.inquiry]);

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
        setMobileBanners(
          Array.isArray(mobileBannersData) ? mobileBannersData : [],
        );
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
        setCommercialLease(
          (commercialLeaseData && commercialLeaseData[0]) || null,
        );
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchHomepageData();
  }, []);

  // ====== detect mobile (<= 768px) ======
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ====== Hero auto-slide based on correct banner set ======
  useEffect(() => {
    const slides =
      isMobile && mobileBanners.length ? mobileBanners : webBanners;
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, webBanners.length, mobileBanners.length]);

  // ====== Scroll listener for top bar ======
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return; // ⭐ prevent double click

  const { name, email, phone, inquiry, projectId, message } = formData;

  if (!name || !phone || !inquiry) {
    Swal.fire({
      icon: "warning",
      title: "Missing Details",
      text: "Please fill required fields",
      confirmButtonColor: "#67a139",
    });
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Enter valid 10 digit mobile number",
      confirmButtonColor: "#67a139",
    });
    return;
  }

  try {
    setLoading(true); // ⭐ disable button

    const res = await fetch(`${API_BASE}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        inquiry,
        projectId,
        message,
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Enquiry Sent",
        text: "Our team will contact you shortly",
        confirmButtonColor: "#67a139",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiry: "",
        projectId: "",
        message: "",
      });

      setIsModalOpen(false);
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err.message,
    });
  } finally {
    setLoading(false); // ⭐ enable again
  }
};

  const handleChange = (e) => {
  const { name, value } = e.target;

  // ⭐ PHONE VALIDATION LIVE
  if (name === "phone") {
    const onlyNums = value.replace(/\D/g, "");

    if (onlyNums.length < 10) {
      setPhoneError("Phone must be 10 digits");
    } else if (!/^[6-9]/.test(onlyNums)) {
      setPhoneError("Phone must start with 6,7,8 or 9");
    } else {
      setPhoneError("");
    }

    setFormData((prev) => ({
      ...prev,
      phone: onlyNums,
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handlePrev = () => {
    if (!testimonials.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (!testimonials.length) return;
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const getCardPosition = (index) => {
    const total = testimonials.length;
    if (!total) return "hidden";
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    if (diff === 0) return "center";
    if (diff === -1) return "left";
    if (diff === 1) return "right";
    return "hidden";
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${IMAGE_BASE}${path.replace(/^\/+/, "")}`;
  };

  const currentProjects = projectsData[activeTab] || [];
  const activeBanners =
    isMobile && mobileBanners.length ? mobileBanners : webBanners;
  const safeSlideIndex = activeBanners.length
    ? currentSlide % activeBanners.length
    : 0;


const scrollRef = useRef(null)

const scrollLeft = () => {
  scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
}

const scrollRight = () => {
  scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
}

  return (
    <>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 13s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* Ultra Slim Vertical Button - Mobile Responsive */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pr-1 sm:pr-0">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#67a139] hover:bg-[#579830] text-white
               px-2 sm:px-4 md:px-5 py-2 md:py-5
               rounded-l-md shadow-xl
               flex items-center justify-center
               transition-all duration-300
               text-xs sm:text-sm md:text-[14px]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="font-semibold tracking-wider sm:tracking-widest">
            ENQUIRE NOW
          </span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-999999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl w-[95%] sm:w-[90%] md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto relative mx-2">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition-colors z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#67a139] to-[#4a8f2f] text-white p-5 sm:p-6 md:p-8 rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Get In Touch
              </h2>
              <p className="text-white/90 text-sm sm:text-base">
                Fill out the form below and we'll get back to you shortly
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">   
                {/* NAME */}
                <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] pb-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="flex-1 outline-none text-gray-900"
                  />
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] pb-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="flex-1 outline-none text-gray-900"
                  />
                </div>

               <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] pb-2">

  <Phone className="w-5 h-5 text-gray-400" />

 <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  maxLength={10}
  placeholder="Phone Number"
  required
  className="
    w-full
    bg-transparent
    outline-none
    border-none
    focus:ring-0
    text-[16px]
    font-normal
    text-gray-700
    placeholder:text-gray-400
  "
/>

                </div>

                {/* INQUIRY TYPE */}
                <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] pb-2">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                    className="flex-1 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="villas">Villas</option>
                    <option value="plots">Plots</option>
                  </select>
                </div>

                {/* ✅ PROJECT DROPDOWN (NEW) */}
                {isClient && projectOptions.length > 0 && (
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] pb-2">
                    <ChevronDown className="w-5 h-5 text-gray-400" />

                    <select
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      required
                      className="flex-1 outline-none bg-transparent cursor-pointer"
                    >
                      <option value="">Select Project</option>

                      {projectOptions.map((project) => (
                        <option
                          key={project.projectId}
                          value={project.projectId}
                        >
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* MESSAGE */}
                <div className="border-2 border-gray-300 focus-within:border-[#67a139] rounded-lg p-3">
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message (Optional)"
                    className="w-full outline-none resize-none"
                  />
                </div>

                {/* SUBMIT */}
               <button
  type="submit"
  disabled={loading || phoneError}
  className={`w-full py-4 rounded-full font-semibold transition ${
    loading || phoneError
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#67a139] hover:bg-[#4a8f2f] text-white"
  }`}
>
  {loading ? "Sending..." : "Send Enquiry"}
</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section - Mobile Responsive */}
<div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[90vh] lg:h-screen">      
      
      
     <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[90vh] lg:h-screen">

  {activeBanners.length > 0 ? (
    <Image
      priority
      src={getImageUrl(activeBanners[safeSlideIndex].image)}
      alt="Banner"
      fill
      className="object-cover transition-all duration-700"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 animate-pulse" />
  )}

</div>



        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white z-20 shadow-lg overflow-hidden transition-all duration-500">
          <div
            className={`transition-all duration-500 ${isScrolled ? "h-0 opacity-0" : "h-8 sm:h-[36px] md:h-[44px] opacity-100"}`}
          >
            <div className="flex items-center h-full overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-4 sm:gap-6 md:gap-10 px-3 sm:px-4">
                {/* EXCLUSIVE */}
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <Diamond className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-blue-400 hidden xs:inline">
                    EXCLUSIVE:
                  </span>
                  <span className="xs:hidden">EXCL:</span>
                  <span className="hidden sm:inline">
                    {" "}
                    Villa Plots Vandalur | ₹36 Lakhs | CMDA Approved
                  </span>
                  <span className="sm:hidden"> Villa Plots ₹36L</span>
                </span>

                <span className="text-gray-400 hidden sm:block">•</span>

                {/* NEW */}
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span className="text-yellow-400 hidden xs:inline">NEW:</span>
                  <span className="xs:hidden">NEW:</span>
                  <span className="hidden sm:inline">
                    {" "}
                    Gated Community | 291 Plots | Ready to Construct
                  </span>
                  <span className="sm:hidden"> 291 Plots</span>
                </span>

                <span className="text-gray-400 hidden sm:block">•</span>

                {/* OFFER */}
                {/* <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-green-400 hidden xs:inline">
                    OFFER:
                  </span>
                  <span className="xs:hidden">OFF:</span>
                  <span className="hidden sm:inline">
                    {" "}
                    Book Now & Get Free Registration | Limited Period
                  </span>
                  <span className="sm:hidden"> Free Registration</span>
                </span> */}

                {/* Duplicate for seamless marquee */}
                <span className="inline-flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium">
                  <Diamond className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-blue-400 hidden xs:inline">
                    EXCLUSIVE:
                  </span>
                  <span className="xs:hidden">EXCL:</span>
                  <span className="hidden sm:inline">
                    {" "}
                    Villa Plots Vandalur | ₹36 Lakhs | CMDA Approved
                  </span>
                  <span className="sm:hidden"> Villa Plots ₹36L</span>
                </span>
              </div>
            </div>
          </div>
          <div
            className={`transition-all duration-500 ${isScrolled ? "h-8 sm:h-[36px] md:h-[44px] opacity-100" : "h-0 opacity-0"}`}
          >
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
                <a
                  href="tel:+919345566568"
                  className="hover:text-[#67a139] transition-colors"
                >
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
            <span
              data-animate="heading"
              className="text-[#67a139] text-xs sm:text-sm font-semibold tracking-widest uppercase block"
            >
              Vishwak Properties
            </span>

            {/* Heading */}
            <h2
              data-animate="heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6"
            >
              Excellence in Every Project
            </h2>

            {/* Paragraph */}
            <p
              data-animate="paragraph"
              className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 md:mb-10"
            >
              At Vishwak Properties, excellence begins with thoughtful planning.
              As one of Chennai's trusted developers, we deliver premium
              layouts, transparent communication, and reliable execution.
              <br />
              <br />
              Whether you're seeking premium villas or plotted developments with
              EMI, we ensure clarity, trust, and commitment at every step.
            </p>

            {/* Button */}
            <div>
              <Link href="/about">
                <button className="button" style={{ "--clr": "#53852bff" }}>
                  Explore
                  <span className="button__icon-wrapper">
                    <ArrowRight className="button__icon-svg" size={16} />
                    <ArrowRight
                      className="button__icon-svg button__icon-svg--copy"
                      size={16}
                    />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* Recently Updated - Responsive Banner */}
<section className="w-full">
  {Array.isArray(recentProjects) && recentProjects.length > 0 ? (
    <Link
      href={`/project-details/${recentProjects[0].projectId}`}
      className="block w-full"
    >
      {/* Desktop Banner */}
      <div
        className="hidden md:block w-full 
                   aspect-[1920/807] 
                   bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: "url('/updatebanner.png')" }}
      />

      {/* Mobile Banner */}
      <div
        className="block md:hidden w-full 
                   aspect-[9/16] 
                   bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: "url('/mobile.png')" }}
      />
    </Link>
  ) : (
    <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 text-gray-500">
      No recent projects available.
    </div>
  )}
</section>

     {/* Amenities Section - Mobile Responsive */}
<div className="relative bg-gradient-to-br from-white via-gray-50 to-[#ecf5e9] py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20">
  {/* Background Glow Effects */}
  <div className="absolute top-10 left-4 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#67a139]/20 blur-[60px] sm:blur-[100px] rounded-full opacity-40"></div>
  <div className="absolute bottom-10 right-4 sm:right-10 w-52 sm:w-72 h-52 sm:h-72 bg-[#4a8f2f]/20 blur-[80px] sm:blur-[120px] rounded-full opacity-40"></div>

  <div className="relative max-w-[1400px] mx-auto z-1 overflow-hidden">
    {/* Header */}
    <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-8 px-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
        <span className="block">WE'RE PROUD TO OFFER</span>
        <span className="bg-gradient-to-r from-[#67a139] to-[#4a8f2f] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          BEST-IN-CLASS AMENITIES
        </span>
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto mt-3 sm:mt-4">
        Hand-picked premium lifestyle spaces crafted for elegance,
        wellness, and luxury living.
      </p>
    </div>

    {/* MARQUEE WRAPPER */}
    {isMobile ? (
      // ── MOBILE: auto-scroll + touch swipe ──
      <div
        ref={amenityScrollRef}
        className="relative w-full pt-10 overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style>{`.amenity-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div
          className="amenity-scroll flex gap-4"
          style={{ width: "max-content", paddingBottom: "8px" }}
        >
          {[...amenities, ...amenities].map((amenity, i) => (
            <div key={i} className="flex-shrink-0 w-[100px]">
              <div className="cursor-pointer group relative flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-white/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] group-hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#67a139]/20 to-[#4a8f2f]/20 blur-xl" />
                  <Image
                    src={getImageUrl(amenity.icon)}
                    alt={amenity.label}
                    width={70}
                    height={70}
                    className="object-contain relative z-10 w-10 h-10"
                  />
                </div>
                <p className="mt-2 text-[10px] font-semibold tracking-wide uppercase text-gray-800 px-1">
                  {amenity.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      // ── DESKTOP: original CSS marquee, untouched ──
      <div className="relative w-full overflow-hidden pt-10">
        <div className="flex gap-4 sm:gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused]">
          {[...amenities, ...amenities].map((amenity, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]"
            >
              <div className="cursor-pointer group relative flex flex-col items-center text-center hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-white/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] group-hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#67a139]/20 to-[#4a8f2f]/20 blur-xl" />
                  <Image
                    src={getImageUrl(amenity.icon)}
                    alt={amenity.label}
                    width={70}
                    height={70}
                    className="object-contain relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase text-gray-800 group-hover:text-[#4a8f2f] transition px-1">
                  {amenity.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

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
                <span className="text-xs sm:text-sm font-medium text-[#67a139]">
                  ARTICLES
                </span>
               
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Discover inspiration and trends
              </h2>
            </div>
            
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
            {articles.map((article, index) => (
              <article
                key={article.id || index}
                className="group cursor-pointer"
              >
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
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
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
                        <svg
                          className="absolute inset-0 w-full h-full opacity-20"
                          viewBox="0 0 100 100"
                        >
                          <line
                            x1="0"
                            y1="33"
                            x2="100"
                            y2="33"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="0"
                            y1="66"
                            x2="100"
                            y2="66"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="33"
                            y1="0"
                            x2="33"
                            y2="100"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="66"
                            y1="0"
                            x2="66"
                            y2="100"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 md:mb-3">
                  {article.date
                    ? new Date(article.date).toLocaleDateString("en-IN")
                    : ""}
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

     {/* Testimonials Section */}
<div className="relative bg-gradient-to-b from-blue-50 to-white py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-5">
      <p className="text-xs sm:text-sm font-semibold text-[#67a139] uppercase tracking-wider mb-3 sm:mb-4">
        TESTIMONIALS
      </p>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
        Stories That <br />
        Inspire <span className="text-[#67a139]">Confidence</span> !!
      </h2>
    </div>

    {/* Carousel */}
    <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] xl:h-[480px] mb-10 max-w-4xl mx-auto">
      <div className="relative w-full h-full flex items-center justify-center">

        {testimonials.map((testimonial, index) => {
          const position = getCardPosition(index);

          const distance =
            isMobile ? 100 : window.innerWidth <= 1024 ? 180 : 260;

          if (position === "hidden") return null;

          const id = testimonial.id || index;

          return (
            <div
              key={id}
              className={`absolute transition-all duration-500 ease-in-out ${
                position === "center"
                  ? "z-30 opacity-100 scale-100"
                  : "z-10 opacity-40 blur-[2px] scale-90"
              }`}
              style={{
                top: "50%",
                left: "50%",
                transform:
                  position === "center"
                    ? "translate(-50%, -50%)"
                    : position === "left"
                    ? `translate(calc(-50% - ${distance}px), -50%)`
                    : `translate(calc(-50% + ${distance}px), -50%)`,
              }}
            >
              {/* CARD */}
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px] xl:w-[480px] min-h-[240px] flex flex-col justify-between">

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < (testimonial.rating || 0)
                          ? "fill-yellow-400"
                          : "fill-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Text with Fade + Clamp */}
                <div className="relative text-center px-2">
                  <p
                    className={`text-gray-700 text-sm md:text-base leading-relaxed transition-all duration-300 ${
                      expandedId === id ? "" : "line-clamp-8"
                    }`}
                  >
                    {testimonial.text}
                  </p>

                  {/* Gradient Fade */}
                  {expandedId !== id && (
                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
                  )}
                </div>

                {/* Read More */}
                {testimonial.text?.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === id ? null : id)
                    }
                    className="text-[#67a139] text-xs font-semibold mt-2 hover:underline"
                  >
                    {expandedId === id ? "Read Less" : "Read More"}
                  </button>
                )}

                {/* Author */}
                <p className="text-gray-900 font-bold text-center mt-3 text-base">
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

    {/* Arrows */}
    <div className="flex justify-center gap-4">
      <button
        onClick={handlePrev}
        className="w-10 h-10 rounded-full bg-white border shadow hover:scale-110 transition"
      >
        <ChevronLeft className="mx-auto" />
      </button>

      <button
        onClick={handleNext}
        className="w-10 h-10 rounded-full bg-white border shadow hover:scale-110 transition"
      >
        <ChevronRight className="mx-auto" />
      </button>
    </div>

  </div>
</div>

      {/* DOUBLE LINE OUTLINED MARQUEE - Mobile Responsive */}
      <div className="relative w-full overflow-hidden bg-white py-4 sm:py-6 md:py-8 lg:py-10">
        {/* LINE 1 – LEFT TO RIGHT (FASTER) */}
        <div className="marquee-track marquee-fast flex whitespace-nowrap mb-3 sm:mb-4 md:mb-6">
          <span className="marquee-text">
            Timeless Homes &nbsp; Timely Delivery &nbsp; Pride Timeless Homes
            &nbsp;
          </span>
          <span className="marquee-text">
            Timeless Homes &nbsp; Timely Delivery &nbsp; Pride Timeless Homes
            &nbsp;
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
          <img
            src="/h1.png"
            alt="left background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute right-0 top-0 h-full w-[100px] sm:w-[150px] md:w-[200px] lg:w-[280px] opacity-10 sm:opacity-20 pointer-events-none">
          <img
            src="/h1.png"
            alt="right background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl lg:max-w-5xl w-full px-4 sm:px-6 md:px-8 lg:px-10 z-1">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
              Get In Touch
            </h2>
            <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              We'd love to hear from you. Fill out the form and our team will
              reach out shortly.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/70 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
            >
              {/* Name */}
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
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 transition-all peer-focus:-top-2">
                  Your Name *
                </label>
              </div>

              {/* Email */}
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
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 transition-all peer-focus:-top-2">
                  Email *
                </label>
              </div>

              {/* Phone */}
             <div className="relative">
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    maxLength={10}
    className={`peer w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-gray-900 placeholder-transparent outline-none
    ${phoneError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-900"}`}
    placeholder="Phone Number"
    required
  />

  <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 transition-all peer-focus:-top-2">
    Phone Number *
  </label>

  {phoneError && (
    <p className="text-red-500 text-xs mt-1">
      {phoneError}
    </p>
  )}
</div>

              {/* Inquiry Type */}
              <div className="relative">
                <select
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  required
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 bg-white text-gray-900 focus:border-gray-900 outline-none"
                >
                  <option value="">Select Inquiry Type *</option>
                  <option value="villas">Villas</option>
                  <option value="plots">Plots</option>
                </select>
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600">
                  Inquiry Type *
                </label>
              </div>

              {/* ✅ Dynamic Project Dropdown */}
              {isClient && projectOptions.length > 0 && (
                <div className="relative md:col-span-2">
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    required
                    className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 bg-white text-gray-900 focus:border-gray-900 outline-none"
                  >
                    <option value="">Select Project *</option>

                    {projectOptions.map((project) => (
                      <option key={project.projectId} value={project.projectId}>
                        {project.name}
                      </option>
                    ))}
                  </select>

                  <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600">
                    Project *
                  </label>
                </div>
              )}

              {/* Message */}
              <div className="relative md:col-span-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="peer w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-gray-900 focus:border-gray-900 outline-none"
                />
                <label className="absolute left-3 sm:left-4 -top-2 bg-white px-1 text-xs sm:text-sm text-gray-600">
                  Message
                </label>
              </div>

              {/* Submit */}
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
