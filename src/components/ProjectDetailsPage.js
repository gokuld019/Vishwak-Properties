"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Script from "next/script";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  Home,
  Maximize2,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  X,
  Camera,
  PlayCircle,
  Map,
  Move,
  RotateCw,
  Navigation,
  Globe2,
  LocateFixed,
  TrendingUp,
  Download,
  User,
  ChevronDown,
  Send,
  CheckCircle,
} from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProjectDetailsPage({ projectId }) {
  // ------------------------
  // STATE
  // ------------------------
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [showCinematic360, setShowCinematic360] = useState(false);
  const [current360Image, setCurrent360Image] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [downloadAfterEnquiry, setDownloadAfterEnquiry] = useState(false);
  const [projectStatus, setProjectStatus] = useState(null); // 'ongoing' or 'completed'
  const [projectOptions, setProjectOptions] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [sitePlanSubTab, setSitePlanSubTab] = useState("sitePlan"); // "sitePlan" | "plotArea"
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [totalStickyHeight, setTotalStickyHeight] = useState(0);
  const [amenities, setAmenities] = useState([]); 
  // API Data States
  const [projectData, setProjectData] = useState(null);
  const [floorPlans, setFloorPlans] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [constructionUpdates, setConstructionUpdates] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [connectivity, setConnectivity] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [priceError, setPriceError] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState([]);
  const [amenityTextList, setAmenityTextList] = useState([]);
  const [amenityImages, setAmenityImages] = useState([]);
  const [smartInvestment, setSmartInvestment] = useState(null);
  const [masterPlan, setMasterPlan] = useState(null);
  const [locationMap, setLocationMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [whyPoints, setWhyPoints] = useState([]);
  const [textAmenities, setTextAmenities] = useState([]);
  const [imageAmenities, setImageAmenities] = useState([]);
  const [showPaymentEnquiry, setShowPaymentEnquiry] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
  const [stats, setStats] = useState([]); // for card list rendering
  const [statsRaw, setStatsRaw] = useState(null);
  const [heroImage, setHeroImage] = useState("");
  const [leadVerified, setLeadVerified] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;
  const Imagebase = `${process.env.NEXT_PUBLIC_API_URL}`;

  const [paymentEnquiry, setPaymentEnquiry] = useState({
    fullName: "",
    email: "",
    phone: "",
    stage: "",
    amount: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    projectId: "",
    message: "",
  });

  const [brochureUrl, setBrochureUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [showLeadPopup, setShowLeadPopup] = useState(false);

const [leadForm, setLeadForm] = useState({
  name: "",
  phone: "",
  location: "",
});

  // ------------------------
  // MEDIA STATE
  // ------------------------
  const [media, setMedia] = useState({
    cinematic360: null,
    routeMap: null,
  });

  const [current, setCurrent] = useState(0);

  // ------------------------
  // REFS
  // ------------------------
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereRef = useRef(null);
  const animationFrameRef = useRef(null);
  const tabsRef = useRef(null);
  // ✅ FIX: Ref to pause scroll-tracking while programmatic smooth-scroll runs
  const isScrollingToSection = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // ------------------------
  // CONSTANTS
  // ------------------------
  const projectImages = ["/project1.jpg", "/project2.png", "/Rash.jpg", "/Rash2.jpg"];
  const images = ["/vp1.jpg", "/vp2.png", "/vp3.jpg", "/vp1.jpg", "/vp2.png"];

  const iconMap = {
    MapPin: <MapPin className="w-10 h-10" />,
    Building2: <Building2 className="w-10 h-10" />,
    Home: <Home className="w-10 h-10" />,
    Calendar: <Calendar className="w-10 h-10" />,
    CheckCircle2: <CheckCircle2 className="w-10 h-10" />,
    TrendingUp: <TrendingUp className="w-10 h-10" />,
  };

  const allTabs = [
    { id: "overview", label: "OVERVIEW" },
    { id: "why", label: "WHY" },
    { id: "location", label: "LOCATION HIGHLIGHTS" },
    { id: "siteplan", label: "SITE PLAN & PLOT AREA STATEMENT" },
    { id: "amenities", label: "AMENITIES" },
    { id: "price", label: "PRICE LIST" },
    { id: "gallery", label: "GALLERY" },
  ];

  // Project address (can be replaced with dynamic data from projectData)
  const projectAddress = {
    full: projectData?.address || "AIRA AVENUE\nV3RF+RJ7, Bharati Nagar,\nVandalur, Tamil Nadu 600048,\nIndia",
    rating: projectData?.rating || "4.6 ★ (9)"
  };

  // ✅ FIX: Moved getFilteredTabs to the top (after constants) so it's defined before any useEffect
  const isPlotProject = Boolean(
    projectData?.type &&
    (projectData.type.toLowerCase().includes("plots") ||
      projectData.type.toLowerCase().includes("plot") ||
      projectData.type.toLowerCase().includes("land"))
  );

  const getFilteredTabs = useCallback(() => {
    let tabs = [...allTabs];

    // Remove floor plans for plot projects
    if (isPlotProject) {
      tabs = tabs.filter(tab => tab.id !== "floor");
    } else {
      // Remove site plan for non-plot projects
      tabs = tabs.filter(tab => tab.id !== "siteplan");
    }

    // Remove construction & price for completed projects
    if (projectStatus === "completed") {
      tabs = tabs.filter(
        tab => !["construction", "price"].includes(tab.id)
      );
    }

    return tabs;
  }, [isPlotProject, projectStatus]);

  // ⭐ IMPROVED getDirectionUrl function – now accepts an address fallback
  const getDirectionUrl = (embedUrl, addressFallback = null) => {
    if (!embedUrl && !addressFallback) return null;

    try {
      let urlString = embedUrl || '';

      // If it's an iframe HTML, extract the src attribute
      const srcMatch = embedUrl?.match(/src="([^"]+)"/);
      if (srcMatch) {
        urlString = srcMatch[1];
      }

      let lat, lng;

      // Pattern 1: !3d{lat}!2d{lng} (Google pb format)
      const pbMatch = urlString.match(/!3d([-0-9.]+)!2d([-0-9.]+)/);
      if (pbMatch) {
        lat = pbMatch[1];
        lng = pbMatch[2];
      }

      // Pattern 2: q={lat},{lng} or q={lat}%2C{lng}
      if (!lat) {
        const qMatch = urlString.match(/[?&]q=([-0-9.]+)%2C([-0-9.]+)/) ||
                       urlString.match(/[?&]q=([-0-9.]+),([-0-9.]+)/);
        if (qMatch) {
          lat = qMatch[1];
          lng = qMatch[2];
        }
      }

      // Pattern 3: @{lat},{lng} (modern Google Maps URL)
      if (!lat) {
        const atMatch = urlString.match(/@([-0-9.]+),([-0-9.]+)/);
        if (atMatch) {
          lat = atMatch[1];
          lng = atMatch[2];
        }
      }

      if (lat && lng) {
        // Return a proper Google Maps directions URL using coordinates
        return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      }

      // If no coordinates but we have an address fallback, use that
      if (addressFallback) {
        const encodedAddress = encodeURIComponent(addressFallback);
        return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
      }

      // Last resort: if it's a Google Maps URL, open it directly
      if (urlString.includes('google.com/maps')) {
        return urlString;
      }

      return null;
    } catch (err) {
      console.error("Direction URL error:", err);
      // Fallback to address if available
      if (addressFallback) {
        const encodedAddress = encodeURIComponent(addressFallback);
        return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
      }
      return null;
    }
  };

  const normalizeIframe = (html) => {
    if (!html) return "";
    return html
      .replace(/width="[^"]*"/g, 'width="100%"')
      .replace(/height="[^"]*"/g, 'height="100%"')
      .replace(/style="[^"]*"/g, 'style="border:0;"');
  };

  const handlePaymentEnquiryChange = (e) => {
    setPaymentEnquiry({
      ...paymentEnquiry,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentEnquirySubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/payment-enquiry`, {
        projectId,
        fullName: paymentEnquiry.fullName,
        email: paymentEnquiry.email,
        phone: paymentEnquiry.phone,
        stage: paymentEnquiry.stage,
        amount: paymentEnquiry.amount,
      });

      alert("Enquiry Submitted Successfully!");
      console.log("Enquiry saved:", res.data);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit enquiry");
    }
  };

  const sanitizeRouteMap = (html) => {
    if (!html) return "";

    return html
      .replace(/allowfullscreen="[^"]*"/gi, "allowfullscreen")
      .replace(/loading="[^"]*"/gi, 'loading="lazy"')
      .replace(/width="[^"]*"/gi, 'width="100%"')
      .replace(/height="[^"]*"/gi, 'height="100%"')
      .replace(/style="[^"]*"/gi, 'style="border:0;"');
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      if (url.includes("youtube.com/watch")) {
        const u = new URL(url);
        const v = u.searchParams.get("v");
        return v ? `https://www.youtube.com/embed/${v}` : url;
      }
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

  // Helper to fix localhost URLs from backend
  const fixImageUrl = (url) => {
    if (!url) return url;
    if (url.includes('localhost:5000')) {
      return url.replace('localhost:5000', '76.13.243.90:5000');
    }
    return url;
  };

  // ⭐⭐⭐ ADD THIS BELOW ⭐⭐⭐
const extractMapSrc = (iframeHtml) => {
  if (!iframeHtml) return null;

  const match = iframeHtml.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

  // ------------------------
  // EFFECTS - DATA FETCHING
  // ------------------------

  // Brochure fetch
  useEffect(() => {
    if (!projectId) return;

    const loadBrochure = async () => {
      try {
        const res = await fetch(`${API_BASE}/brochure/${projectId}`);
        const data = await res.json();

        console.log("BROCHURE API:", data);

        if (data.fileUrl) {
          setBrochureUrl(`${Imagebase}${data.fileUrl}`);
        }

        if (data.thumbnailUrl) {
          setThumbnailUrl(`${Imagebase}${data.thumbnailUrl}`);
        }
      } catch (err) {
        console.error("Brochure fetch error:", err);
      }
    };

    loadBrochure();
  }, [projectId]);

  // Handle form changes
 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "phone") {
    const clean = value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      phone: clean,
    }));

    setPhoneError(clean.length !== 10);
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  useEffect(() => {
  const lead = localStorage.getItem("lead_verified");

  if (lead === "true") {
    setLeadVerified(true);
  }
}, []);

  // Measure main site header (outside this component)
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      } else {
        setHeaderHeight(0);
      }
    };
    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    const header = document.querySelector('header');
    if (header) {
      resizeObserver.observe(header);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (header) resizeObserver.unobserve(header);
      resizeObserver.disconnect();
    };
  }, []);




    useEffect(() => {
    if (!projectId) return;

    const fetchAmenities = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/project-amenities/${projectId}`
        );

        setAmenities(res.data.amenities || []);
      } catch (err) {
        console.error("Error fetching amenities:", err);
      }
    };

    fetchAmenities();
  }, [projectId]);

  
  // Measure sticky tabs section height
  useEffect(() => {
    if (!tabsRef.current) return;
    const updateTabsHeight = () => {
      if (tabsRef.current) {
        setTabsHeight(tabsRef.current.offsetHeight);
      }
    };
    updateTabsHeight();

    const resizeObserver = new ResizeObserver(updateTabsHeight);
    resizeObserver.observe(tabsRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Update total sticky height
  useEffect(() => {
    setTotalStickyHeight(headerHeight + tabsHeight);
  }, [headerHeight, tabsHeight]);

  useEffect(() => {
    if (!formData.inquiry) {
      setProjectOptions([]);
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/project-details/by-category?category=${formData.inquiry}`
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setProjectOptions(data);
        } else {
          setProjectOptions([]);
        }
      } catch (err) {
        console.error("Project fetch error:", err);
        setProjectOptions([]);
      }
    };

    fetchProjects();
  }, [formData.inquiry]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Price list fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchPriceList = async () => {
      try {
        setLoadingPrice(true);

        const res = await fetch(`${API_BASE}/pricelist/${projectId}`);
        const data = await res.json();

        if (data.priceList) {
          setPriceList(data.priceList);
        } else {
          setPriceList([]);
        }
      } catch (err) {
        console.error("Price list fetch error:", err);
        setPriceError("Failed to load price list");
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPriceList();
  }, [projectId]);


  const fixGoogleMapUrl = (url) => {
  if (!url) return null;

  try {
    // If already correct simple embed → return
    if (url.includes("output=embed")) return url;

    // If pb embed → extract lat lng from URL
    const latLngMatch = url.match(/!3d([0-9.]+)!2d([0-9.]+)/);

    if (latLngMatch) {
      const lat = latLngMatch[1];
      const lng = latLngMatch[2];

      return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
    }

    return url;
  } catch (e) {
    return url;
  }
};

  // Media fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchMedia = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/project-media/${projectId}`
        );

        console.log("MEDIA FROM BACKEND:", res.data);

       if (res.data?.data) {

  const fixedMap = fixGoogleMapUrl(res.data.data.routeMap);

  setMedia({
    cinematic360: res.data.data.cinematic360,
    routeMap: fixedMap,
  });


        }
      } catch (error) {
        console.error("Error loading project media:", error);
      }
    };

    fetchMedia();
  }, [projectId]);

  // Stats fetch
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/project-stats/${projectId}`);
        const data = await res.json();

        if (data.stats) {
          setStatsRaw(data.stats);

          setStats([
            { label: "NO. OF UNITS", value: data.stats.totalUnits, sub: "Units" },
            { label: "SQ.FT", value: data.stats.sqftRange, sub: "Sq.Ft" },
            { label: "ACRES", value: data.stats.saleableArea, sub: "Area" },
          ]);
        }
      } catch (err) {
        console.log("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [projectId]);

  // Gallery fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE}/gallery/${projectId}`);
        const data = await res.json();

        console.log("GALLERY FROM BACKEND:", data);

        if (Array.isArray(data.gallery)) {
          setGalleryImages(data.gallery);
        } else {
          setGalleryImages([]);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
    };

    fetchGallery();
  }, [projectId]);

  // Smart investment fetch
  useEffect(() => {
    async function fetchSmartInvestment() {
      try {
        const res = await fetch(
          `${API_BASE}/smart-investment/${projectId}`
        );

        const data = await res.json();

        console.log("Smart Investment API:", data);

        if (data && Object.keys(data).length > 0) {
          setSmartInvestment(data);
        }
      } catch (error) {
        console.error("Error fetching Smart Investment:", error);
      }
    }

    if (projectId) fetchSmartInvestment();
  }, [projectId]);

  // Payment plan fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchPaymentPlan = async () => {
      try {
        const res = await fetch(`${API_BASE}/payment-plan/${projectId}`);
        const data = await res.json();

        if (Array.isArray(data.paymentPlan)) {
          setPaymentPlan(data.paymentPlan);
        } else {
          console.error("Invalid payment plan data:", data);
        }
      } catch (error) {
        console.error("Payment plan fetch error:", error);
      }
    };

    fetchPaymentPlan();
  }, [projectId]);

  // Floor plans fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchFloorPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/floorplans/${projectId}`);
        const data = await res.json();
        setFloorPlans(data || []);
        console.log("Floor Plans:", data);
      } catch (err) {
        console.error("Error fetching floor plans:", err);
      }
    };

    fetchFloorPlans();
  }, [projectId]);

  // Construction updates fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchConstructionUpdates = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/construction-updates/${projectId}`
        );
        const data = await res.json();

        console.log("Construction Updates:", data);

        if (Array.isArray(data.updates)) {
          setConstructionUpdates(data.updates);
        } else {
          setConstructionUpdates([]);
        }
      } catch (error) {
        console.error("Error fetching construction updates:", error);
      }
    };

    fetchConstructionUpdates();
  }, [projectId]);

  // Main project details, why points, location fetch
  useEffect(() => {
    console.log("ProjectDetailsPage projectId prop =", projectId);
    if (!projectId) {
      console.warn("No projectId in URL. Skipping API calls.");
      setLoading(false);
      return;
    }

    const numericId = Number(projectId);
    if (!numericId) {
      console.warn("Invalid projectId:", projectId);
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        setLoading(true);

        console.log("Fetching data for project:", numericId);

        // ---- PROJECT DETAILS ----
        const detailsRes = await fetch(`${API_BASE}/project-details/${numericId}`);

        if (detailsRes.ok) {
          const detailsData = await detailsRes.json();
          console.log("Project details API response:", detailsData);

          // Set project data and status
          setProjectData(detailsData || {});
          setProjectStatus(detailsData.status || 'ongoing'); // Get status from backend

          // Also update statsRaw if needed
          if (detailsData.stats) {
            setStatsRaw(detailsData.stats);
          }
        } else {
          console.error("Details API returned:", detailsRes.status);
          setProjectData(null);
          setProjectStatus('ongoing'); // Default
        }

        // Now fetch other data in parallel
        const [whyRes, locationRes] = await Promise.all([
          fetch(`${API_BASE}/why/${numericId}`),
          fetch(`${API_BASE}/location/${numericId}`),
        ]);

        // ---- WHY POINTS ----
        if (whyRes.ok) {
          const whyData = await whyRes.json();
          console.log("WHY POINTS raw response:", whyData);

          const points = Array.isArray(whyData)
            ? whyData
            : Array.isArray(whyData.data)
              ? whyData.data
              : [];

          console.log("WHY POINTS parsed:", points);
          setWhyPoints(points);
        } else {
          console.error("WHY API returned:", whyRes.status);
          setWhyPoints([]);
        }

        // ---- LOCATION HIGHLIGHTS ----
        if (locationRes.ok) {
          const locData = await locationRes.json();
          console.log("LOCATION DATA:", locData);

          const list = Array.isArray(locData) ? locData : locData.data || [];
          setConnectivity(list.filter((item) => item.type === "connectivity"));
          setFacilities(list.filter((item) => item.type === "facility"));
        } else {
          setConnectivity([]);
          setFacilities([]);
        }
      } catch (error) {
        console.error("Error fetching project page data:", error);
        setProjectData(null);
        setProjectStatus('ongoing');
        setWhyPoints([]);
        setConnectivity([]);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [projectId]);

  // Amenities fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchAmenities = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/project-amenities/${projectId}`
        );
        const data = await res.json();

        const list = data.amenities || [];

        const texts = list.filter((item) => item.type === "text");
        const imagesArr = list.filter((item) => item.type === "image");

        setAmenityTextList(texts);
        setAmenityImages(imagesArr);

        console.log("✔ Fetched Text Amenities:", texts);
        console.log("✔ Fetched Image Amenities:", imagesArr);
      } catch (err) {
        console.error("Error fetching amenities:", err);
      }
    };

    fetchAmenities();
  }, [projectId]);

  // Specifications fetch
  useEffect(() => {
    if (!projectId) return;

    const fetchSpecifications = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/specifications/${projectId}`
        );
        const data = await res.json();

        console.log("SPEC API RESPONSE:", data);

        if (Array.isArray(data.specifications)) {
          setSpecifications(data.specifications);
        } else {
          setSpecifications([]);
        }
      } catch (err) {
        console.error("Error fetching specifications:", err);
      }
    };

    fetchSpecifications();
  }, [projectId]);

  // Three.js 360 Viewer
  useEffect(() => {
    if (!showCinematic360 || !current360Image || !canvasRef.current) return;
    console.log("360 WILL LOAD:", current360Image);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

const geometry = new THREE.SphereGeometry(500, 60, 40);
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(
  current360Image,
  () => console.log("Texture loaded"),
  undefined,
  (err) => console.error("Texture error:", err)
);

// ✅ Flip texture horizontally ONLY
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = -1;

const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide, // ← REQUIRED when not scaling geometry
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphereRef.current = sphere;

    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let onPointerDownLat = 0;
    let phi = 0;
    let theta = 0;

    const onPointerDown = (event) => {
      isUserInteracting = true;

      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;

      onPointerDownMouseX = clientX;
      onPointerDownMouseY = clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event) => {
      if (!isUserInteracting) return;

      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);

      if (!clientX || !clientY) return;

      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;

      lat = Math.max(-85, Math.min(85, lat));
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const onWheel = (event) => {
      event.preventDefault();
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = Math.max(30, Math.min(90, fov));
      camera.updateProjectionMatrix();
    };

    let lastTouchDistance = null;
    const onTouchMove = (event) => {
      if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (lastTouchDistance !== null) {
          const delta = lastTouchDistance - distance;
          const fov = camera.fov + delta * 0.1;
          camera.fov = Math.max(30, Math.min(90, fov));
          camera.updateProjectionMatrix();
        }
        lastTouchDistance = distance;
      } else {
        lastTouchDistance = null;
        onPointerMove(event);
      }
    };

    const container = canvasRef.current;
    container.addEventListener("mousedown", onPointerDown);
    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseup", onPointerUp);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect =
        canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onPointerDown);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("wheel", onWheel);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
    };
  }, [showCinematic360, current360Image]);

  // ✅ FIX: Replace IntersectionObserver with reliable scroll-position-based tracking
  useEffect(() => {
    const filteredTabs = getFilteredTabs();

    const handleScroll = () => {
      // Skip while a tab-click smooth-scroll is in progress
      if (isScrollingToSection.current) return;

      const scrollY = window.scrollY;
      // Add a small buffer (10px) below the sticky header so the transition
      // fires precisely as the section top clears the nav bar
      const offset = totalStickyHeight + 10;

      let currentId = filteredTabs[0]?.id;

      for (const tab of filteredTabs) {
        const el = document.getElementById(`section-${tab.id}`);
        if (!el) continue;
        const sectionTop = el.getBoundingClientRect().top + scrollY;
        if (scrollY + offset >= sectionTop) {
          currentId = tab.id;
        }
      }

      if (currentId) setActiveTab(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once immediately to set the correct initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalStickyHeight, projectStatus, isPlotProject, getFilteredTabs]);

  // ✅ FIX: Auto-scroll the active tab button into view inside the horizontal tab bar (mobile)
  useEffect(() => {
    if (!tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  // ------------------------
  // EVENT HANDLERS
  // ------------------------
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  };

  const openFloorPlan = (plan) => {
    setSelectedFloorPlan(plan);
  };

  const closeFloorPlan = () => {
    setSelectedFloorPlan(null);
  };

  const openCinematic360 = () => {
  if (!media.cinematic360) {
    alert("Cinematic 360° not available");
    return;
  }

  let finalUrl = media.cinematic360;

  // If backend sends only path like /uploads/xxx.jpg
  if (!finalUrl.startsWith("http")) {
    finalUrl = `${Imagebase}${finalUrl}`;
  }

  console.log("360 FINAL URL:", finalUrl);

  setCurrent360Image(finalUrl);
  setShowCinematic360(true);
};

  const closeCinematic360 = () => {
    setShowCinematic360(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };

  const openRouteMap = () => {
    if (!media.routeMap) {
      alert("Route Map not available");
      return;
    }
    setShowRouteMap(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (phoneError || loadingSubmit) return;

  setLoadingSubmit(true);

  try {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: data.message || "Failed to submit enquiry",
      });
      setLoadingSubmit(false);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Our team will get back to you shortly.",
      showConfirmButton: false,
      timer: 2000,
    });

    setShowEnquiry(false);

    if (downloadAfterEnquiry && brochureUrl) {
      window.open(brochureUrl, "_blank");
    }

    setDownloadAfterEnquiry(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiry: "",
      message: "",
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Please try again later.",
    });
  }

  setLoadingSubmit(false);
};

const openOtpWidget = () => {
  const rawPhone = leadForm.phone.replace(/\D/g, '');

  if (!rawPhone || rawPhone.length !== 10) {
    Swal.fire({
      icon: 'warning',
      title: 'Enter a valid 10-digit mobile number',
    });
    return;
  }

  const formattedPhone = `+91${rawPhone}`;
  const nameValue = leadForm.name.trim() || 'Brochure User';
  const locationValue = leadForm.location || window.location.pathname;

  const configuration = {
    widgetId: '36636b6a5932383031343935',
    tokenAuth: '499574TSbqywhw69b149f1P1',
    identifier: formattedPhone,

    success: async (data) => {
      console.log('OTP VERIFIED:', data);

      try {
        await axios.post(`${API_BASE}/contacts/widget-lead`, {
  name: nameValue,
  email: "otp@lead.com",
  phone: rawPhone,   // ⭐ send 10 digit only
  inquiry: "brochure",
  projectId: Number(projectId),
  message: "Brochure Download Lead",
  location: locationValue
});

        localStorage.setItem('lead_verified', 'true');
        setLeadVerified(true);

        Swal.fire({
          icon: 'success',
          title: 'Brochure Downloading...',
          timer: 1500,
          showConfirmButton: false,
        });

        if (brochureUrl) {
          window.open(brochureUrl, '_blank');
        }

        setLeadForm({ name: '', phone: '', location: '' });

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Lead Save Failed',
        });
      }
    },

    failure: () => {
      Swal.fire({
        icon: 'error',
        title: 'OTP Verification Failed',
      });
    },
  };

  // ⭐⭐ IMPORTANT FLOW ⭐⭐

  setShowLeadPopup(false);   // CLOSE popup first

  setTimeout(() => {
    window.initSendOTP(configuration);   // THEN open OTP
  }, 300);
};

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch(`${API_BASE}/floorplans/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: Number(projectId),
          floorPlanId: selectedFloorPlan?.id || null,
          fullName: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          interestedIn:
            selectedFloorPlan?.type || formData.get("unitType") || null,
        }),
      });

      if (!res.ok) {
        toast.error("Something went wrong!");
        return;
      }

      toast.success("Enquiry submitted successfully!", {
        description: "Our team will contact you shortly.",
      });

      setShowEnquiry(false);

      if (downloadAfterEnquiry && brochureUrl) {
        window.open(brochureUrl, "_blank");
      }

      setDownloadAfterEnquiry(false);
    } catch (err) {
      console.error("Enquiry submit error:", err);
      toast.error("Network error. Please try again!");
    }
  };

  // ✅ FIX: scrollToSection sets a lock so the scroll listener does not
  // immediately override the tab that was just clicked.
  const scrollToSection = (tabId) => {
    setActiveTab(tabId);

    // Pause the scroll-listener while smooth-scroll animates
    isScrollingToSection.current = true;

    const el = document.getElementById(`section-${tabId}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - totalStickyHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Release the lock after the smooth-scroll animation finishes (~900 ms)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToSection.current = false;
    }, 900);
  };

  // HERO IMAGE SAFE FALLBACK
  const desktopHero =
    projectData?.heroImageDesktop
      ? `${Imagebase}${projectData.heroImageDesktop}`
      : "";

  const mobileHero =
    projectData?.heroImageMobile
      ? `${Imagebase}${projectData.heroImageMobile}`
      : desktopHero;

  // ------------------------
  // RENDER
  // ------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500" />
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  /* ======================================================
     ✅ COMPLETED PROJECT VIEW
  ====================================================== */
  if (projectStatus === "completed") {
    return (
      <div className="min-h-screen">
        {/* ================= HERO / BANNER ================= */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh]">
          <div className="absolute inset-0">
            <img
              src={
                projectData?.heroImageDesktop
                  ? `${Imagebase}${projectData.heroImageDesktop}`
                  : ""
              }
              className="hidden md:block w-full h-full object-cover"
              alt="Project Banner Desktop"
            />
            <img
              src={
                projectData?.heroImageMobile
                  ? `${Imagebase}${projectData.heroImageMobile}`
                  : projectData?.heroImageDesktop
                    ? `${Imagebase}${projectData.heroImageDesktop}`
                    : ""
              }
              className="block md:hidden w-full h-full"
              alt="Project Banner Mobile"
            />
            <div className="absolute inset-0" />
          </div>
        </section>

        {/* ================= COMPLETED CONTENT ================= */}
        <section className="relative w-full bg-gradient-to-b from-gray-200 to-white py-16 sm:py-24 overflow-hidden">
          <div className="absolute right-0 top-0 h-full opacity-20 pointer-events-none select-none">
            <img
              src="/sketchbg.png"
              alt="Decorative Shape"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
              <span className="text-yellow-500">Successfully Delivered.</span>
              <br />
              <span className="text-black">Quality Homes. Happy Residents.</span>
            </h2>

            <p className="mt-6 sm:mt-10 text-lg sm:text-xl font-bold text-gray-900">
              A SUCCESSFULLY COMPLETED PROJECT BY Vishwak Properties
            </p>

            <p className="mt-4 inline-block bg-yellow-500 text-black font-bold px-4 py-3 text-sm sm:text-lg">
              WHERE DREAMS BECOME REALITY AND FAMILIES CREATE MEMORIES.
            </p>

            <div className="mt-8 text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl">
              This project has been successfully completed and all units are now
              occupied. Residents are enjoying premium amenities, excellent
              connectivity, and a vibrant community.
              <br /><br />
              Interested in similar quality homes? Explore our ongoing projects
              to find your perfect home.
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ------------------------
  // MAIN RENDER (ONGOING PROJECTS)
  // ------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Updated Header - Non-Sticky */}
      <header className="absolute top-0 left-0 right-0"></header>

      {/* Hero Section */}
      <section className="h-full w-[100%]">
        <div className="">
          <img
            src={desktopHero}
            className="hidden md:block w-full h-full object-cover"
            alt="Project Banner Desktop"
          />
          <img
            src={mobileHero}
            className="block md:hidden w-full h-full object-cover"
            alt="Project Banner Mobile"
          />
        </div>
      </section>

      {/* ✅ FIXED: Sticky Navigation Tabs — horizontally scrollable on mobile,
          active tab auto-centers itself via scrollIntoView */}
      <section
        ref={tabsRef}
        className="sticky z-30 bg-white border-b border-gray-200 shadow-sm w-full"
        style={{ top: headerHeight, willChange: 'transform' }}
      >
        <div className="w-full max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max sm:min-w-0 sm:justify-around">
            {getFilteredTabs().map((tab) => (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`cursor-pointer flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#67a139] border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-white hover:bg-[#67a139]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        
      </section>

      {/* Tab Content - All Sections with dynamic scroll-margin */}
      <section className="py-10 sm:py-14 md:py-16  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 ">

          {/* OVERVIEW SECTION */}
          <section
            id="section-overview"
            style={{ scrollMarginTop: totalStickyHeight }}
          >
            <div className="space-y-20">
              {/* Main Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 md:gap-16 items-start">
                {/* LEFT SIDE */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full blur-2xl opacity-40"></div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight mb-4">
                    {projectData?.topTitle || "Premium 2 & 3 BHK"} <br />
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-700 mb-4">
                    {projectData?.topLocation || "Thoraipakkam, Chennai"}
                  </p>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                    {projectData?.topDescription ||
                      "A home where pride, prestige and panache reign supreme."}
                  </p>
                </div>

                {/* RIGHT SIDE – Info Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-7 md:p-8 lg:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-6 sm:gap-x-10">
                    {/* TYPE */}
                    <div className="space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500">
                        TYPE
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {projectData?.type || "NA"}
                      </p>
                    </div>

                    {/* DEVELOPMENT SIZE */}
                    <div className="space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500">
                        DEVELOPMENT SIZE
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {projectData?.developmentSize || "NA"}
                      </p>
                    </div>

                    {/* NO OF UNITS */}
                    <div className="space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500">
                        NO. OF UNITS
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {projectData?.numberOfUnits || "NA"}
                      </p>
                    </div>

                    {/* PRICE PER SQFT */}
                    <div className="space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500">
                        PRICE / SQ.FT
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {projectData?.pricePerSqft
                          ? `₹ ${projectData.pricePerSqft} / Sq.Ft`
                          : "NA"}
                      </p>
                    </div>

                    {/* PROJECT STATUS */}
                    <div className="space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500">
                        PROJECT STATUS
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {projectData?.completionPercentage
                          ? `${projectData.completionPercentage}% Completed`
                          : projectStatus === "completed"
                            ? "Completed"
                            : "NA"}
                      </p>
                    </div>

                    {/* RERA NUMBER */}
                    <div className="space-y-1">
                      <h3 className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500">
                        RERA NUMBER
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                        {projectData?.reraNumber || "NA"}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-[30px] pb-[20px] pl-[5px] pr-[10px] flex-wrap">
                    {/* Cinematic 360 */}
                    <button
                      onClick={openCinematic360}
                      className="cursor-pointer flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#67a139] text-white shadow-lg hover:scale-105 transition-all"
                    >
                      <Camera className="w-4 sm:w-5 h-4 sm:h-5" />
                      Cinematic 360°
                    </button>

                    {/* Route Map */}
                    <button
                      onClick={openRouteMap}
                      className="cursor-pointer flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-gray-800 border border-gray-200 shadow-sm hover:border-gray-300 hover:scale-105 transition-all"
                    >
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      Route Map
                    </button>

                    {/* Download Brochure */}
                    <button
onClick={() => {
  if (!brochureUrl) {
    Swal.fire({
      icon: "info",
      title: "Brochure not available",
    });
    return;
  }

  if (leadVerified) {
    window.open(brochureUrl, "_blank");
    return;
  }

  setShowLeadPopup(true);
}}
                      className="cursor-pointer flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-yellow-500 text-black shadow-lg hover:bg-yellow-600 hover:scale-105 transition-all"
                    >
                      <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                      Brochure
                    </button>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                {[
                  {
                    img: projectData?.image1
                      ? `${Imagebase}${projectData.image1}`
                      : "/interior1.webp",
                    label: "Kilambakkam Bus Terminal",
                  },
                  {
                    img: projectData?.image2
                      ? `${Imagebase}${projectData.image2}`
                      : "/interior2.webp",
                    label: "Shriram Gateway",
                  },
                  {
                    img: projectData?.image3
                      ? `${Imagebase}${projectData.image3}`
                      : "/interior3.webp",
                    label: "Crescent College",
                  },
                  {
                    img: projectData?.image4
                      ? `${Imagebase}${projectData.image4}`
                      : "/interior4.webp",
                    label: "Vandalur Railway Station",
                  },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center space-y-3 hover:scale-105 transition-all duration-300 group cursor-pointer"
                  >
                    <img
                      src={feat.img}
                      className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain group-hover:drop-shadow-xl transition"
                    />
                    <p
                      className="font-semibold text-black text-xs sm:text-sm leading-tight"
                      dangerouslySetInnerHTML={{ __html: feat.label }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY SECTION */}
          <section
            id="section-why"
            style={{ scrollMarginTop: totalStickyHeight }}
          >
            <div className="space-y-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="text-center space-y-4 px-4 mb-4">
                <h2 className="text-3xl md:text-5xl text-gray-900 leading-tight">
                  Why Choose{" "}
                  <span className="text-[#67a139]">{projectData?.name}?</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover what makes {projectData?.name} your perfect investment for
                  a premium lifestyle
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
                {whyPoints.length === 0 ? (
                  <p className="text-center text-gray-500 col-span-3">
                    No Why Points added for this project yet.
                  </p>
                ) : (
                  whyPoints.map((item, index) => (
                    <div
                      key={index}
                      className="cursor-pointer group bg-white/70 backdrop-blur-md border border-gray-200/50 p-6 md:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white"
                    >
                      <div className="text-[#67a139] mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                        {iconMap[item.iconKey] || (
                          <CheckCircle2 className="w-10 h-10" />
                        )}
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#67a139] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* LOCATION SECTION */}
          <section
            id="section-location"
            style={{ scrollMarginTop: totalStickyHeight }}
          >
            <div className="space-y-20 py-5 md:py-5 relative px-4 md:px-0">
              <div className="absolute top-10 left-0 w-48 h-48 md:w-64 md:h-64 bg-green-300 opacity-20 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-20 right-0 w-48 h-48 md:w-64 md:h-64 bg-green-300 opacity-20 blur-[100px] rounded-full"></div>

              <div className="text-center relative mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl md:text-5xl text-gray-900"
                >
                  Location Highlights
                </motion.h2>
                <p className="text-base md:text-lg text-gray-600 mt-3 md:mt-4">
                  Futuristic connectivity for a smart lifestyle
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-green-100 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-5"></div>
                  <div className="flex items-center gap-3 md:gap-4 mb-6">
                    <Globe2 className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      Smart Connectivity
                    </h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {connectivity.map((place, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-3 md:p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-gray-100 shadow-md hover:shadow-lg transition cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-sm md:text-base text-gray-900">
                            {place.name}
                          </div>
                          <div className="text-gray-500 text-xs md:text-sm">
                            {place.distance}
                          </div>
                        </div>
                        <span className="text-green-600 text-sm md:text-base font-semibold">
                          {place.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-green-100 space-y-5 md:space-y-6"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-2">
                    <Navigation className="w-8 h-8 md:w-10 md:h-10 text-[#67a139]" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      Nearby Facilities
                    </h3>
                  </div>
                  <div className="grid gap-2 md:gap-5">
                    {facilities.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.07 }}
                        className="flex items-center gap-2 md:gap-3 bg-white/80 p-2.5 md:p-3 shadow rounded-xl border border-gray-100 hover:bg-green-50 transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#67a139]" />
                        <span className="text-gray-700 text-sm md:text-base">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FLOOR PLANS SECTION */}
          {!isPlotProject && (
            <section
              id="section-floor"
              style={{ scrollMarginTop: totalStickyHeight }}
            >
              <div className="space-y-12 py-12">
                <div className="text-center px-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Floor Plans
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    Choose from our carefully designed layouts to suit your lifestyle
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                  {(floorPlans.length > 0
                    ? floorPlans
                    : [
                      {
                        id: 1,
                        type: "Studio",
                        area: "718 Sq.Ft",
                        image: "/floorplan.webp",
                      },
                      {
                        id: 2,
                        type: "1 BHK",
                        area: "850 Sq.Ft",
                        image: "/floorplan.webp",
                      },
                      {
                        id: 3,
                        type: "2 BHK",
                        area: "1150 Sq.Ft",
                        image: "/floorplan.webp",
                      },
                      {
                        id: 4,
                        type: "3 BHK",
                        area: "1357 Sq.Ft",
                        image: "/floorplan.webp",
                      },
                    ]
                  ).map((plan, index) => (
                    <div
                      key={plan.id || index}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-48 sm:h-56 md:h-52 bg-gray-100">
                        <img
                          src={
                            plan.image
                              ? plan.image.startsWith("http")
                                ? plan.image
                                : `${Imagebase}/${plan.image}`
                              : "/floorplan.webp"
                          }
                          alt={`${plan.type} Floor Plan`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => openFloorPlan(plan)}
                          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900">
                          {plan.type}
                        </h3>
                        <p className="text-yellow-600 font-semibold">
                          {plan.area}
                        </p>
                        <button
                          onClick={() => openFloorPlan(plan)}
                          className="w-full mt-3 bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* SITE PLAN & PLOT AREA STATEMENT SECTION */}
          {isPlotProject && (
            <section
              id="section-siteplan"
              style={{ scrollMarginTop: totalStickyHeight }}
            >
              <div className="">
                {/* Header */}
                <div className="text-center px-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
                    {projectData?.sitePlanHeading ? (
                      projectData.sitePlanHeading
                    ) : (
                      <>
                        <span className="text-yellow-500">Layout</span>{" "}
                        <span className="text-gray-900">Plan</span>
                      </>
                    )}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    {projectData?.sitePlanDescription ||
                      "Well-planned plots with sunlight, privacy and easy access for building your dream house"}
                  </p>
                </div>

                {/* Sub-tab + Content Layout */}
                <div className="flex flex-col md:flex-row gap-6 px-4">
                  {/* Left — Sub Tabs */}
                  <div className="flex flex-row md:flex-col gap-3 md:gap-0 md:w-56 flex-shrink-0">
                    {/* SITE PLAN tab */}
                    <button
                      onClick={() => setSitePlanSubTab("sitePlan")}
                      className={`cursor-pointer relative text-left px-5 py-4 font-semibold text-sm tracking-wide transition-all duration-200 ${
                        sitePlanSubTab === "sitePlan"
                          ? "bg-[#67a139] text-white shadow-md"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      SITE PLAN
                      {sitePlanSubTab === "sitePlan" && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-700 rounded-r" />
                      )}
                    </button>

                    <div className="hidden md:block w-full border-b border-gray-200 my-1" />

                    {/* PLOT AREA STATEMENT tab */}
                    <button
                      onClick={() => setSitePlanSubTab("plotArea")}
                      className={`cursor-pointer relative text-left px-5 py-4 font-semibold text-sm tracking-wide transition-all duration-200 ${
                        sitePlanSubTab === "plotArea"
                          ? "bg-[#67a139] text-white shadow-md"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      PLOT AREA STATEMENT
                      {sitePlanSubTab === "plotArea" && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-700 rounded-r" />
                      )}
                    </button>

                    <div className="hidden md:block w-px bg-gray-200 mx-5 mt-2 flex-1" />
                  </div>

                  {/* Right — Content Panel */}
                  <div className="flex-1 rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100 min-h-[280px] sm:min-h-[380px] flex items-center justify-center">
                    {/* SITE PLAN IMAGE */}
                    {sitePlanSubTab === "sitePlan" ? (
                      projectData?.sitePlanImage ? (
                        <img
                          src={`${Imagebase}${projectData.sitePlanImage}`}
                          alt="Site Plan"
                          className="w-full h-full object-contain max-h-[400px] sm:max-h-[520px] p-4 transition-all duration-300"
                        />
                      ) : (
                        <div className="text-center text-gray-400 py-20 px-8">
                          <p className="font-semibold text-gray-500 text-base">
                            Site Plan Coming Soon
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Contact us to get the latest layout details
                          </p>
                          <button
                            onClick={() => setShowEnquiry(true)}
                            className="mt-5 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition text-sm"
                          >
                            Enquire Now
                          </button>
                        </div>
                      )
                    ) : (
                      /* PLOT AREA STATEMENT IMAGE */
                      projectData?.plotAreaStatementImage ? (
                        <img
                          src={`${Imagebase}${projectData.plotAreaStatementImage}`}
                          alt="Plot Area Statement"
                          className="w-full h-full object-contain max-h-[400px] sm:max-h-[520px] p-4 transition-all duration-300"
                        />
                      ) : (
                        <div className="text-center text-gray-400 py-20 px-8">
                          <p className="font-semibold text-gray-500 text-base">
                            Plot Area Statement Coming Soon
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Detailed layout data will be available shortly
                          </p>
                          <button
                            onClick={() => setShowEnquiry(true)}
                            className="mt-5 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition text-sm"
                          >
                            Get Details
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
{/* Modern Sleek Lead Popup */}
{showLeadPopup && (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 backdrop-blur-md"
      onClick={() => setShowLeadPopup(false)}
    />

    {/* Modal Card */}
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
className="
relative
w-full
max-w-md
bg-white
rounded-2xl
shadow-2xl
max-h-[90vh]
overflow-y-auto
"    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Get Brochure
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            Enter your details to instantly download the brochure
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 sm:space-y-5">
          {/* Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Your Name"
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67a139] focus:border-transparent outline-none transition bg-white/50 text-sm"
            />
          </div>

          {/* Phone Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={leadForm.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setLeadForm({ ...leadForm, phone: value });
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67a139] focus:border-transparent outline-none transition bg-white/50 text-sm"
            />
          </div>

          {/* Hidden location field (optional) */}
          <input
            type="hidden"
            value={leadForm.location || window.location.pathname}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

  {/* Cancel */}
  <button
    onClick={() => setShowLeadPopup(false)}
    className="
      w-full
      sm:w-1/2
      px-4
      py-3
      border
      border-gray-300
      text-gray-700
      rounded-xl
      font-semibold
      hover:bg-gray-50
      transition
      text-sm
    "
  >
    Cancel
  </button>

  {/* Verify */}
  <button
    onClick={openOtpWidget}
    disabled={!leadForm.phone || leadForm.phone.length < 10}
    className="
      w-full
      sm:w-1/2
      bg-gradient-to-r
      from-[#67a139]
      to-[#4a8f2f]
      text-white
      py-3
      rounded-xl
      font-semibold
      shadow-lg
      hover:shadow-xl
      disabled:opacity-50
      disabled:cursor-not-allowed
      transition-all
      flex
      items-center
      justify-center
      gap-2
      text-sm
    "
  >
    <Send className="w-4 h-4" />
    Verify & Download
  </button>

</div>
</div>


        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-6">
          We'll send the brochure link via SMS after verification.
        </p>
      </div>
    </motion.div>
  </div>
)}
          {/* AMENITIES SECTION */}
        <section
  id="section-amenities"
  style={{ scrollMarginTop: totalStickyHeight }}
>
  <div>

    {/* Header */}
    <div className="text-center mb-16">
      <p className="text-xs tracking-[0.3em] uppercase text-[#67a139] mb-3">
        Amenities
      </p>

      <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
        World Class <span className="text-[#67a139]">Amenities</span>
      </h2>

      <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Experience thoughtfully designed amenities crafted to elevate your lifestyle.
      </p>
    </div>

    {/* Grid */}
    {amenities.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {amenities.map((item) => (
          <div
            key={item.id}
            className="group border border-gray-200 rounded-xl p-8 bg-white transition-all duration-300 hover:border-[#67a139] hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">

              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#67a139]" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#67a139] transition-colors duration-300">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description || 
                    "Designed to enhance comfort and deliver a refined modern lifestyle experience."}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">
        No amenities added for this project yet.
      </p>
    )}
  </div>
</section>

          {/* PRICE SECTION */}
          <section
            id="section-price"
            style={{ scrollMarginTop: totalStickyHeight }}
          >
            <div className="space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-4">
                <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4 sm:mb-6">
                  {projectStatus === 'completed' ? 'Project Status' : 'Price List'}
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  {projectStatus === 'completed'
                    ? 'Information about this completed project'
                    : 'Transparent pricing for all unit types'}
                </p>
              </div>

              {projectStatus === 'completed' ? (
                // Completed project view
                <div className="max-w-2xl mx-auto">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 md:p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Project Fully Sold Out!
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      All units in this completed project have been successfully sold and handed over to residents.
                    </p>

                    {projectData?.totalUnits && (
                      <div className="mb-6">
                        <p className="text-gray-700 font-medium">
                          Total Units: <span className="text-blue-600 font-bold">{projectData.totalUnits}</span>
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          All units are now occupied by happy homeowners.
                        </p>
                      </div>
                    )}

                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Looking for available units?</h4>
                      <p className="text-gray-600">
                        Check out our ongoing projects for current availability and pricing.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowEnquiry(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
                    >
                      View Ongoing Projects
                    </button>
                  </div>
                </div>
              ) : (
                // Price list for ongoing projects
                <>
                  {loadingPrice && (
                    <p className="text-center text-gray-500 text-lg">Loading price list...</p>
                  )}
                  {priceError && (
                    <p className="text-center text-red-500 text-lg">{priceError}</p>
                  )}

                  <div className="max-w-4xl mx-auto space-y-8">
                    {/* MOBILE: Card layout (hidden on sm+) */}
                    <div className="flex flex-col gap-3 sm:hidden">
                      {(priceList.length > 0
                        ? priceList
                        : [
                            { unit: "Studio - 718 Sq.Ft", price: "₹45 Lakhs" },
                            { unit: "1 BHK - 850 Sq.Ft", price: "₹55 Lakhs" },
                            { unit: "2 BHK - 1150 Sq.Ft", price: "₹75 Lakhs" },
                            { unit: "3 BHK - 1357 Sq.Ft", price: "₹90 Lakhs" },
                          ]
                      ).map((unit, index) => {
                        const label = unit.unit || "";
                        const [uType = "", uArea = ""] = label.split(" - ");
                        return (
                          <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                          >
                            {/* Green accent top strip */}
                            <div className="h-1 w-full bg-[#67a139]" />

                            <div className="p-4 flex items-center justify-between gap-3">
                              {/* Left: type + area stacked */}
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-gray-900 text-base leading-tight truncate">
                                  {uType}
                                </p>
                                {uArea ? (
                                  <p className="text-gray-500 text-xs mt-0.5">{uArea}</p>
                                ) : null}
                              </div>

                              {/* Center: price badge */}
                              <div className="flex-shrink-0 bg-[#67a139]/10 px-3 py-1.5 rounded-lg">
                                <p className="text-[#67a139] font-bold text-sm whitespace-nowrap">
                                  {unit.price}
                                </p>
                              </div>

                              {/* Right: enquire button */}
                              <button
                                onClick={() => setShowEnquiry(true)}
                                className="flex-shrink-0 bg-[#67a139] text-white px-4 py-2 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
                              >
                                Enquire
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* DESKTOP: Original table (hidden on mobile) */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                        <thead className="bg-[#67a139]">
                          <tr>
                            <th className="px-4 py-3 text-left text-white font-bold text-sm sm:text-base">
                              Property Type
                            </th>
                            <th className="px-4 py-3 text-left text-white font-bold text-sm sm:text-base">
                              Size in Sq.Ft
                            </th>
                            <th className="px-4 py-3 text-left text-white font-bold text-sm sm:text-base">
                              Price
                            </th>
                            <th className="px-4 py-3 text-left text-white font-bold text-sm sm:text-base">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(priceList.length > 0
                            ? priceList
                            : [
                                { unit: "Studio - 718 Sq.Ft", price: "₹45 Lakhs" },
                                { unit: "1 BHK - 850 Sq.Ft", price: "₹55 Lakhs" },
                                { unit: "2 BHK - 1150 Sq.Ft", price: "₹75 Lakhs" },
                                { unit: "3 BHK - 1357 Sq.Ft", price: "₹90 Lakhs" },
                              ]
                          ).map((unit, index) => {
                            const label = unit.unit || "";
                            const [uType = "", uArea = ""] = label.split(" - ");
                            return (
                              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                <td className="px-4 py-3 text-gray-900 font-semibold text-sm sm:text-base">
                                  {uType}
                                </td>
                                <td className="px-4 py-3 text-gray-600 text-sm sm:text-base">
                                  {uArea}
                                </td>
                                <td className="px-4 py-3 text-[#67a139] font-bold text-sm sm:text-base">
                                  {unit.price}
                                </td>
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => setShowEnquiry(true)}
                                    className="bg-[#67a139] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#4a8f2f] transition-colors"
                                  >
                                    Enquire
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section
            id="section-gallery"
            style={{ scrollMarginTop: totalStickyHeight }}
          >
            <div className="space-y-12 p-0 mt-[45px]">
              <h2 className="text-center text-black text-3xl sm:text-4xl font-semibold tracking-wider">
                GALLERY
              </h2>

              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                {/* Main Image */}
                <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] overflow-hidden shadow-lg bg-gray-100">
                  <img
                    src={
                      galleryImages.length > 0
                        ? `${Imagebase}${galleryImages[current]?.image}`
                        : images[current]
                    }
                    className="w-full h-full object-cover transition-all duration-500"
                    alt="Gallery"
                  />

                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full"
                  >
                    ←
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full"
                  >
                    →
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-8 justify-center flex-wrap">
                  {(galleryImages.length > 0 ? galleryImages : images).map(
                    (img, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`cursor-pointer overflow-hidden ${
                          current === index
                            ? "ring-4 ring-yellow-500 scale-105"
                            : "ring-2 ring-gray-300"
                        } transition-all`}
                      >
                        <img
                          src={
                            galleryImages.length > 0
                              ? `${Imagebase}${img.image}`
                              : img
                          }
                          className="w-16 h-12 sm:w-24 sm:h-20 object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Smart Investment Section */}
      <section className="relative w-full bg-gradient-to-b from-gray-200 to-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute right-0 top-0 h-full opacity-20 pointer-events-none select-none">
          <img
            src="/sketchbg.png"
            alt="Decorative Shape"
            className="h-full w-auto object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12 relative z-1">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light leading-snug sm:leading-tight">
              <span className="text-[#67a139]">
                {projectStatus === 'completed'
                  ? 'Successfully Delivered.'
                  : smartInvestment?.titleLine1 || 'Smart Investment.'}
              </span>
              <br />
              <span className="text-black">
                {projectStatus === 'completed'
                  ? 'Quality Homes. Happy Residents.'
                  : smartInvestment?.titleLine2 || 'Stylish Spaces. Life Well-Lived.'}
              </span>
            </h1>

            <p className="mt-6 sm:mt-10 text-lg sm:text-xl font-bold text-gray-900">
              {projectStatus === 'completed'
                ? `A SUCCESSFULLY COMPLETED PROJECT BY Vishwak Properties`
                : smartInvestment?.tagline || `SECURE YOUR DREAM INVESTMENT AT Vishwak Properties`}
            </p>

            <p className="mt-4 inline-block bg-[#67a139] text-white font-bold px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-lg leading-snug sm:leading-normal">
              {projectStatus === 'completed'
                ? `WHERE DREAMS BECOME REALITY AND FAMILIES CREATE MEMORIES.`
                : smartInvestment?.highlightText || `WHERE BUDGET MEETS OPPORTUNITY AND MODERN COMFORT MEETS CONNECTIVITY.`}
            </p>
          </div>

          <div className="text-gray-700 text-base sm:text-lg leading-relaxed sm:leading-8 mt-6 sm:mt-8">
            {projectStatus === 'completed'
              ? `This project has been successfully completed and all units are now occupied. Residents are enjoying premium amenities, excellent connectivity, and a vibrant community. If you're interested in similar quality homes, explore our ongoing projects.`
              : smartInvestment?.mainDescription || `Vishwak Properties brings together comfort, convenience, and affordability...`}
          </div>
        </div>

        {projectStatus === 'ongoing' && (
          <button
            onClick={() => setShowEnquiry(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#67a139] text-white px-3 sm:px-4 py-3 sm:py-4 font-bold tracking-[0.2em] text-[11px] sm:text-[13px] uppercase shadow-lg writing-vertical-rl hover:bg-yellow-600 transition-colors z-40"
          >
            ENQUIRE NOW
          </button>
        )}
      </section>

      {/* Stats Section (hidden) */}
      <div className="bg-gradient-to-br from-white to-gray-50 hidden">
        {/* stats content hidden */}
      </div>

      {/* Floor Plan Modal */}
      {selectedFloorPlan && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl w-full sm:w-[90%] md:w-[70%] lg:w-[60%] max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {selectedFloorPlan.type} - {selectedFloorPlan.area}
                </h3>
                <button
                  onClick={closeFloorPlan}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </div>

              <div className="relative h-64 sm:h-96 bg-gray-100 rounded-lg">
                <img
                  src={
                    selectedFloorPlan.image
                      ? selectedFloorPlan.image.startsWith("http")
                        ? selectedFloorPlan.image
                        : `${Imagebase}/${selectedFloorPlan.image}`
                      : selectedFloorPlan.image
                  }
                  alt={`${selectedFloorPlan.type} Floor Plan`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 bg-yellow-500 text-gray-900 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors text-sm sm:text-base">
                  Download Plan
                </button>

                <button
                  onClick={() => {
                    setSelectedFloorPlan(selectedFloorPlan);
                    setShowEnquiry(true);
                  }}
                  className="flex-1 bg-gray-900 text-white py-2 sm:py-3 rounded-lg"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Plan Enquiry Modal */}
      {showPaymentEnquiry && selectedPaymentPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Payment Plan Enquiry</h3>
              <button
                onClick={() => setShowPaymentEnquiry(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch(`${API_BASE}/payment-enquiry`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    projectId: Number(projectId),
                    stage: selectedPaymentPlan.stage,
                    amount: selectedPaymentPlan.amount,
                    fullName: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                  }),
                });

                if (res.ok) {
                  toast.success("Enquiry submitted successfully!");
                  setShowPaymentEnquiry(false);
                } else {
                  toast.error("Failed to submit enquiry");
                }
              }}
              className="space-y-4"
            >
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-gray-800 font-semibold text-sm">
                  <strong>Stage:</strong> {selectedPaymentPlan.stage}
                </p>
                <p className="text-yellow-700 font-bold text-sm">
                  <strong>Amount:</strong> {selectedPaymentPlan.amount}
                </p>
              </div>

              <div>
                <label className="font-medium">Full Name</label>
                <input
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Route Map Modal */}
{showRouteMap && media.routeMap && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden">

      {/* Header with address, rating and close button */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#67a139]" />
            Project Location
          </h3>
          <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
            {projectAddress.full}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Rating badge */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <span className="text-yellow-500 font-bold">{projectAddress.rating.split(' ')[0]}</span>
            <span className="text-gray-500 text-sm">{projectAddress.rating.split(' ')[1]}</span>
          </div>
          {/* Close button */}
          <button
            onClick={() => setShowRouteMap(false)}
            className="text-gray-500 hover:text-black transition-colors"
            aria-label="Close map"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full h-[55vh]">
        <iframe
          src={media.routeMap}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Footer with directions button */}
      <div className="p-5 bg-gray-50 flex justify-center">
        <button
          onClick={() => {
            const dirUrl = getDirectionUrl(media.routeMap, projectAddress.full);
            window.open(dirUrl || media.routeMap, "_blank");
          }}
          className="flex items-center gap-2 bg-[#67a139] text-white px-7 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          <Navigation className="w-5 h-5" />
          Get Directions
        </button>
      </div>

    </div>
  </div>
)}

      {/* Cinematic 360 Modal */}
      {showCinematic360 && (
        
        <div className="fixed inset-0 bg-black z-50 overflow-hidden">
          <div className="relative w-full h-full min-h-screen">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                  animation: "gridMove 20s linear infinite",
                }}
              />
            </div>

            <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-l-2 border-yellow-400/50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-r-2 border-yellow-400/50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-b-2 border-l-2 border-yellow-400/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-b-2 border-r-2 border-yellow-400/50 pointer-events-none" />

            <div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50 pointer-events-none"
              style={{ animation: "scanLine 3s ease-in-out infinite" }}
            />

            <div className="absolute top-0 left-0 right-0 z-20">
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 gap-4 sm:gap-0">
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4 rounded-2xl border border-yellow-400/30">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50 animate-pulse" />
                        <Camera className="relative w-5 sm:w-7 h-5 sm:h-7 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                          IMMERSIVE 360° EXPERIENCE
                        </h3>
                        <p className="text-[9px] sm:text-xs text-gray-400 tracking-widest">
                          VIRTUAL REALITY TOUR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeCinematic360}
                  className="relative group mt-2 sm:mt-0"
                >
                  <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-red-400/30 hover:border-red-400/60 transition-all duration-300">
                    <X className="w-5 sm:w-6 h-5 sm:h-6 text-red-400" />
                  </div>
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6">
              <div className="max-w-full sm:max-w-5xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 blur-2xl" />
                  <div className="relative bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-yellow-400/20 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 flex-wrap">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-[180px]">
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-400/30 blur-lg animate-pulse" />
                          <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 p-2 sm:p-3 rounded-xl">
                            <Move className="w-5 sm:w-6 h-5 sm:h-6 text-black" />
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-xs sm:text-sm">
                            <span className="hidden sm:inline">
                              Drag to Explore • Scroll to Zoom
                            </span>
                            <span className="sm:hidden">Drag &amp; Pinch to Zoom</span>
                          </p>
                          <p className="text-gray-400 text-[9px] sm:text-xs tracking-wide">
                            INTERACTIVE CONTROLS
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                        <button
                          onClick={() => {
                            if (cameraRef.current) {
                              cameraRef.current.fov = 75;
                              cameraRef.current.updateProjectionMatrix();
                            }
                          }}
                          className="group relative"
                          title="Reset View"
                        >
                          <div className="absolute inset-0 bg-blue-500/20 blur-lg group-hover:blur-xl transition-all duration-300" />
                          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-blue-400/30 hover:border-blue-400/60 hover:scale-110 transition-all duration-300">
                            <RotateCw className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
                          </div>
                        </button>

                        <div className="h-10 sm:h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />

                        <button
                          onClick={() => {
                            if (cameraRef.current) {
                              cameraRef.current.fov = Math.min(
                                90,
                                cameraRef.current.fov + 10
                              );
                              cameraRef.current.updateProjectionMatrix();
                            }
                          }}
                          className="group relative"
                          title="Zoom Out"
                        >
                          <div className="absolute inset-0 bg-purple-500/20 blur-lg group-hover:blur-xl transition-all duration-300" />
                          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-xl border border-purple-400/30 hover:border-purple-400/60 hover:scale-110 transition-all duration-300">
                            <span className="text-xl sm:text-2xl font-bold text-purple-400">
                              −
                            </span>
                          </div>
                        </button>

                        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-4 rounded-xl border border-gray-600/30 flex items-center justify-center">
                          <Maximize2 className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                        </div>

                        <button
                          onClick={() => {
                            if (cameraRef.current) {
                              cameraRef.current.fov = Math.max(
                                30,
                                cameraRef.current.fov - 10
                              );
                              cameraRef.current.updateProjectionMatrix();
                            }
                          }}
                          className="group relative"
                          title="Zoom In"
                        >
                          <div className="absolute inset-0 bg-green-500/20 blur-lg group-hover:blur-xl transition-all duration-300" />
                          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-xl border border-green-400/30 hover:border-green-400/60 hover:scale-110 transition-all duration-300">
                            <span className="text-xl sm:text-2xl font-bold text-green-400">
                              +
                            </span>
                          </div>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          closeCinematic360();
                          setShowEnquiry(true);
                        }}
                        className="group relative overflow-hidden mt-3 sm:mt-0 flex-1 sm:flex-none min-w-[160px]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 blur-xl group-hover:blur-2xl transition-all duration-300 animate-gradient" />
                        <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-black shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2">
                          Schedule Visit
                          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl animate-pulse" />
                <ChevronLeft
                  className="relative w-12 sm:w-16 h-12 sm:h-16 text-yellow-400"
                  style={{ animation: "float 2s ease-in-out infinite" }}
                />
              </div>
            </div>

            <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl animate-pulse" />
                <ChevronRight
                  className="relative w-12 sm:w-16 h-12 sm:h-16 text-yellow-400"
                  style={{
                    animation: "float 2s ease-in-out infinite",
                    animationDelay: "1s",
                  }}
                />
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{
                filter: "contrast(1.05) brightness(1.05)",
                transition: "filter 0.3s ease",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
              }}
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none"
              style={{ opacity: 0, animation: "fadeOut 1s ease-out forwards" }}
            >
              <div className="text-center">
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                  <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-full" />
                  <div className="absolute inset-0 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-yellow-400 font-bold tracking-widest text-xs sm:text-sm">
                  LOADING 360° VIEW
                </p>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes gridMove {
              0% { transform: translateY(0); }
              100% { transform: translateY(50px); }
            }

            @keyframes scanLine {
              0%, 100% { transform: translateY(0); opacity: 0; }
              50% { transform: translateY(100vh); opacity: 0.5; }
            }

            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }

            @keyframes fadeOut {
              to { opacity: 0; pointer-events: none; }
            }

            @keyframes gradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }

            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 3s ease infinite;
            }
          `}</style>
        </div>
      )}

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-full sm:max-w-lg mx-auto max-h-[95vh] overflow-y-auto">
            <div className="p-5 sm:p-8">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Enquire Now
                </h3>
                <button
                  onClick={() => setShowEnquiry(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                >
                  <X className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base min-w-0"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base min-w-0"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                   <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  required
  placeholder="10 digit Mobile Number"
  className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base min-w-0"
/>

{phoneError && (
  <p className="text-red-500 text-xs mt-1">
    Enter valid 10 digit mobile number
  </p>
)}
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <select
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      required
                      className="flex-1 outline-none text-gray-900 bg-transparent cursor-pointer text-sm sm:text-base min-w-0"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="villas">Villas</option>
                      <option value="plots">Plots</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Project Dropdown */}
                {isClient && projectOptions.length > 0 && (
                  <div className="relative">
                    <div className="flex items-center gap-3 border-b-2 border-gray-300 focus-within:border-[#67a139] transition-colors pb-2">
                      <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <select
                        name="projectId"
                        value={formData.projectId || ""}
                        onChange={handleChange}
                        required
                        className="flex-1 outline-none text-gray-900 bg-transparent cursor-pointer text-sm sm:text-base min-w-0"
                      >
                        <option value="">Select Project</option>
                        {projectOptions.map((project) => (
                          <option key={project.projectId} value={project.projectId}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="relative">
                  <div className="border-2 border-gray-300 focus-within:border-[#67a139] rounded-xl transition-colors p-3">
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message (Optional)"
                      className="w-full outline-none text-gray-900 placeholder-gray-400 resize-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
  type="submit"
  disabled={loadingSubmit || phoneError}
  className={`w-full py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
  ${
    loadingSubmit || phoneError
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#67a139] hover:bg-[#4a8f2f] text-white"
  }`}
>
  <Send className="w-5 h-5" />
  {loadingSubmit ? "Sending..." : "Send Enquiry"}
</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Script
  src="https://verify.msg91.com/otp-provider.js"
  strategy="afterInteractive"
/>
    </div>
  );
}