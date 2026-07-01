"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Plus,
  Trash2,
  Upload,
  Save,
  Eye,
  Image as ImageIcon,
  FileText,
  MapPin,
  Home,
  Building,
  DollarSign,
  BarChart3,
  Settings,
  Calendar,
  CheckSquare,
  ChevronRight,
  Search,
  Download,
  Users,
  X,
  FolderOpen,
  Layers,
  Wrench,
  Construction,
  Star,
  TrendingUp,
  Grid3X3,
  FilePieChart,
  Bell,
  Menu,
  LogOut,
  Edit,
  ChevronDown,
  CheckCircle,
  Clock,
  Globe,
  Navigation,
  Maximize2,
  RotateCw,
  Camera,
  PlayCircle,
  Map,
  Move,
  LocateFixed,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/* =========================
   MODERN UI COMPONENTS
========================= */
const Input = ({ label, icon: Icon, ...props }) => (
  <div className="mb-4 group">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
        {label}
      </label>
    )}
    <input
      {...props}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 text-gray-800 placeholder-gray-500"
    />
  </div>
);

const Textarea = ({ label, icon: Icon, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
        {label}
      </label>
    )}
    <textarea
      {...props}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 text-gray-800 placeholder-gray-500 resize-y min-h-[120px]"
    />
  </div>
);

const Select = ({ label, icon: Icon, options, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
        {label}
      </label>
    )}
    <select
      {...props}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 text-gray-800 appearance-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Card = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 ${className}`}>
    {title && (
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          {Icon && <Icon className="w-5 h-5 text-blue-600 mr-3" />}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
    )}
    {children}
  </div>
);

const Section = ({ title, subtitle, icon: Icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center mb-6">
      {Icon && (
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", icon: Icon, onClick, className = "", size = "md", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-6 py-4 text-lg"
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
      {children}
    </button>
  );
};

const FileUpload = ({ label, accept, onChange, icon: Icon, multiple = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-200 bg-gray-50 hover:bg-blue-50">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        multiple={multiple}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center">
        {Icon ? (
          <Icon className="w-12 h-12 text-gray-400 mb-3" />
        ) : (
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
        )}
        <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500">{accept ? `Acceptable formats: ${accept}` : ""}</p>
      </div>
    </div>
  </div>
);

const Toggle = ({ enabled, onChange, label }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      type="button"
      className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
      onClick={() => onChange(!enabled)}
    >
      <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`} />
    </button>
  </div>
);

const StatCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    indigo: "bg-indigo-100 text-indigo-600",
    pink: "bg-pink-100 text-pink-600",
    teal: "bg-teal-100 text-teal-600"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

// Helper function to get complete image URL
const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `${BASE_URL}${path}`;
  return `${BASE_URL}/${path}`;
};

/* =========================
   MAIN CMS - MODERN REDESIGN
========================= */
export default function AdminCMS() {
  const router = useRouter();

  // ─── AUTH GUARD ────────────────────────────────────────────────
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);
  // ───────────────────────────────────────────────────────────────

  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [section, setSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // ← default FALSE on mobile
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalImages: 0,
    recentUpdates: 0
  });

  /* OVERVIEW */
  const [overview, setOverview] = useState({
    name: "",
    category: "",
    status: "",
    type: "",
    developmentSize: "",
    numberOfUnits: "",
    topTitle: "",
    topLocation: "",
    topDescription: "",
    heroImageDesktop: null,
    heroImageMobile: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    sitePlanImage: null,
    plotAreaStatementImage: null,
  });
  const [overviewFiles, setOverviewFiles] = useState({});

  /* WHY */
  const [why, setWhy] = useState([]);

  /* LOCATION */
  const [connectivity, setConnectivity] = useState([]);
  const [facilities, setFacilities] = useState([]);

  /* FLOOR PLANS */
  const [floors, setFloors] = useState([]);
  const [floorForm, setFloorForm] = useState({
    type: "",
    area: "",
    image: null,
  });

  /* SPECIFICATIONS */
  const [specs, setSpecs] = useState([]);
  const [specForm, setSpecForm] = useState({
    category: "",
    detail: "",
  });

  /* CONSTRUCTION UPDATES */
  const [updates, setUpdates] = useState([]);
  const [updateForm, setUpdateForm] = useState({
    update: "",
    date: "",
    progress: "",
    image: null,
  });

  /* PROJECT AMENITIES */
  const [projectAmenities, setProjectAmenities] = useState([]);
  const [projectAmenityForm, setProjectAmenityForm] = useState({
    name: "",
    description: "",
  });

  const [editingAmenityId, setEditingAmenityId] = useState(null);
  const [editingAmenityForm, setEditingAmenityForm] = useState({
    name: "",
    description: "",
  });

  /* PRICE */
  const [prices, setPrices] = useState([]);
  const [priceForm, setPriceForm] = useState({
    unit: "",
    price: "",
  });

  /* SMART INVESTMENT */
  const [smartInvestment, setSmartInvestment] = useState({
    titleLine1: "",
    titleLine2: "",
    highlightText: "",
    tagline: "",
    mainDescription: "",
  });

  /* GALLERY */
  const [gallery, setGallery] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  /* PROJECT STATS */
  const [projectStats, setProjectStats] = useState({
    totalUnits: "",
    sqftRange: "",
    saleableArea: "",
    floors: "",
    badgeText: "",
  });

  /* BROCHURE */
  const [brochure, setBrochure] = useState({
    title: "",
    fileUrl: "",
    thumbnailUrl: "",
  });
  const [brochureFiles, setBrochureFiles] = useState({
    brochure: null,
    thumbnail: null,
  });

  /* HOME BANNERS */
  const [banners, setBanners] = useState([]);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    deviceType: "web",
    sortOrder: 0,
    isActive: true,
    image: null,
  });

  /* AMENITIES MANAGEMENT */
  const [amenityList, setAmenityList] = useState([]);
  const [amenityForm, setAmenityForm] = useState({
    label: "",
    icon: null,
  });

  /* PROJECT MEDIA */
  const [projectMedia, setProjectMedia] = useState({
    cinematic360: "",
    routeMap: "",
  });

  const [mediaFiles, setMediaFiles] = useState({
    cinematic360: null,
  });

  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editingPriceForm, setEditingPriceForm] = useState({
    unit: "",
    price: "",
  });

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [brochureFile, setBrochureFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [heroDesktopFile, setHeroDesktopFile] = useState(null);
  const [heroMobileFile, setHeroMobileFile] = useState(null);

  /* ─── HELPER: navigate section and close sidebar on mobile ─── */
  const navigateSection = (id) => {
    setSection(id);
    setSidebarOpen(false); // always close sidebar after selection on mobile
  };

  /* ─── HELPER: open project and close sidebar on mobile ─── */
  const handleOpenProject = (id) => {
    openProject(id);
    setSidebarOpen(false);
  };

  /* LOAD PROJECT LIST */
  useEffect(() => {
    if (!authChecked) return;
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/project-details/ongoing`);
        const projectsData = Array.isArray(res.data?.data) ? res.data.data : [];
        setProjects(projectsData);

        setStats({
          totalProjects: projectsData.length,
          activeProjects: projectsData.filter(p => p.status === 'ongoing').length,
          totalImages: projectsData.reduce((acc, p) => acc + (p.imageCount || 0), 0),
          recentUpdates: projectsData.filter(p => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(p.updatedAt) > weekAgo;
          }).length
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [authChecked]);

  /* OPEN PROJECT */
  const openProject = async (id) => {
    setLoading(true);
    setProjectId(id);
    setSection("overview");

    try {
      const [
        overviewRes,
        whyRes,
        locRes,
        floorRes,
        specRes,
        updateRes,
        projectAmenityRes,
        priceRes,
        smartRes,
        galleryRes,
        statsRes,
        brochureRes,
        mediaRes,
      ] = await Promise.all([
        axios.get(`${API}/project-details/${id}`),
        axios.get(`${API}/why/${id}`),
        axios.get(`${API}/location/${id}`),
        axios.get(`${API}/floorplans/${id}`),
        axios.get(`${API}/specifications/${id}`),
        axios.get(`${API}/construction-updates/${id}`),
        axios.get(`${API}/project-amenities/${id}`),
        axios.get(`${API}/pricelist/${id}`),
        axios.get(`${API}/smart-investment/${id}`),
        axios.get(`${API}/gallery/${id}`),
        axios.get(`${API}/project-stats/${id}`),
        axios.get(`${API}/brochure/${id}`),
        axios.get(`${API}/project-media/${id}`),
      ]);

      const o = overviewRes.data || {};
      setOverview({
        name: o.name || "",
        category: o.category || "",
        status: o.status || "",
        type: o.type || "",
        developmentSize: o.developmentSize || "",
        numberOfUnits: o.numberOfUnits || "",
        topTitle: o.topTitle || "",
        topLocation: o.topLocation || "",
        topDescription: o.topDescription || "",
        heroImageDesktop: o.heroImageDesktop || null,
        heroImageMobile: o.heroImageMobile || null,
        image1: o.image1 || null,
        image2: o.image2 || null,
        image3: o.image3 || null,
        image4: o.image4 || null,
        sitePlanImage: o.sitePlanImage || null,
        plotAreaStatementImage: o.plotAreaStatementImage || null,
      });

      setWhy(
        Array.isArray(whyRes.data)
          ? whyRes.data.map((p) => ({
              id: p.id,
              title: p.title || "",
              description: p.description || "",
              iconKey: p.iconKey || "MapPin",
              sortOrder: p.sortOrder,
            }))
          : []
      );

      const loc = Array.isArray(locRes.data) ? locRes.data : [];
      setConnectivity(
        loc
          .filter((l) => l.type === "connectivity")
          .map((l) => ({
            id: l.id,
            name: l.name || "",
            distance: l.distance || "",
            time: l.time || "",
            sortOrder: l.sortOrder,
          }))
      );
      setFacilities(
        loc
          .filter((l) => l.type === "facility")
          .map((l) => ({
            id: l.id,
            name: l.name || "",
            sortOrder: l.sortOrder,
          }))
      );

      setFloors(Array.isArray(floorRes.data) ? floorRes.data : []);
      setSpecs(specRes.data?.specifications || []);
      setUpdates(updateRes.data?.updates || []);

      setPrices(
        Array.isArray(priceRes.data?.priceList)
          ? priceRes.data.priceList
          : []
      );

      const si = smartRes.data || {};
      setSmartInvestment({
        titleLine1: si.titleLine1 || "",
        titleLine2: si.titleLine2 || "",
        highlightText: si.highlightText || "",
        tagline: si.tagline || "",
        mainDescription: si.mainDescription || "",
      });

      setProjectAmenities(
        Array.isArray(projectAmenityRes.data.amenities)
          ? projectAmenityRes.data.amenities
          : []
      );

      setGallery(Array.isArray(galleryRes.data?.gallery) ? galleryRes.data.gallery : []);

      const s = statsRes?.data?.stats || {};
      setProjectStats({
        totalUnits: s.totalUnits || "",
        sqftRange: s.sqftRange || "",
        saleableArea: s.saleableArea || "",
        floors: s.floors || "",
        badgeText: s.badgeText || "",
      });

      const b = brochureRes.data || {};
      setBrochure({
        title: b.title || "",
        fileUrl: b.fileUrl ? getImageUrl(b.fileUrl) : "",
        thumbnailUrl: b.thumbnailUrl ? getImageUrl(b.thumbnailUrl) : "",
      });

      const m = mediaRes?.data?.data || {};
      setProjectMedia({
        cinematic360: m.cinematic360 ? getImageUrl(m.cinematic360) : "",
        routeMap: m.routeMap || "",
      });

    } catch (error) {
      console.error("Error loading project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load project data",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProjectMedia = async () => {
    if (!projectId) return;
    try {
      const fd = new FormData();
      fd.append("projectId", projectId);
      fd.append("routeMap", projectMedia.routeMap);
      if (mediaFiles.cinematic360) {
        fd.append("cinematic360", mediaFiles.cinematic360);
      }
      await axios.post(`${API}/project-media`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("Project media saved successfully");
    } catch (error) {
      toast("Error saving project media", "error");
    }
  };

  /* LOAD HOME BANNERS & AMENITIES */
  useEffect(() => {
    if (!authChecked) return;
    if (section === "home-banner" || section === "manage-amenities") {
      fetchHomeData();
    }
  }, [section, authChecked]);

  const fetchHomeData = async () => {
    try {
      const res = await axios.get(`${API}/banners`);
      setBanners(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to sign out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("adminEmail");
        router.replace("/admin/login");
      }
    });
  };

  const updatePrice = async () => {
    if (!editingPriceForm.unit || !editingPriceForm.price) {
      toast("Please fill all fields", "error");
      return;
    }
    try {
      const res = await axios.put(
        `${API}/pricelist/${editingPriceId}`,
        { unit: editingPriceForm.unit, price: editingPriceForm.price }
      );
      const updatedItem = res.data.data;
      setPrices((prev) =>
        prev.map((p) => (p.id === editingPriceId ? updatedItem : p))
      );
      setEditingPriceId(null);
      setEditingPriceForm({ unit: "", price: "" });
      toast("Price updated successfully");
    } catch (err) {
      console.error(err);
      toast("Error updating price", "error");
    }
  };

  /* TOAST NOTIFICATION */
  const toast = (msg, type = "success") =>
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: msg,
      timer: 2000,
      showConfirmButton: false,
      background: type === 'error' ? '#dc2626' : '#059669',
      color: 'white',
    });

  const saveOverview = async () => {
    try {
      if (!projectId) {
        toast("Select a project first", "error");
        return;
      }
      const fd = new FormData();
      fd.append("projectId", projectId);
      fd.append("name", overview.name || "");
      fd.append("category", overview.category || "");
      fd.append("status", overview.status || "");
      fd.append("type", overview.type || "");
      fd.append("developmentSize", overview.developmentSize || "");
      fd.append("numberOfUnits", overview.numberOfUnits || "");
      fd.append("topTitle", overview.topTitle || "");
      fd.append("topLocation", overview.topLocation || "");
      fd.append("topDescription", overview.topDescription || "");
      fd.append("sitePlanHeading", overview.sitePlanHeading || "");
      if (heroDesktopFile) fd.append("heroImageDesktop", heroDesktopFile);
      if (heroMobileFile) fd.append("heroImageMobile", heroMobileFile);
      if (overview.sitePlanImage instanceof File) fd.append("sitePlanImage", overview.sitePlanImage);
      if (overview.plotAreaStatementImage instanceof File) fd.append("plotAreaStatementImage", overview.plotAreaStatementImage);

      await axios.post(`${API}/project-details`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("Overview saved successfully");
    } catch (error) {
      console.error(error);
      toast("Error saving overview", "error");
    }
  };

  const addProjectAmenity = async () => {
    if (!projectAmenityForm.name) {
      toast("Amenity name required", "error");
      return;
    }
    try {
      const res = await axios.post(`${API}/project-amenities`, {
        projectId,
        name: projectAmenityForm.name,
        description: projectAmenityForm.description,
      });
      setProjectAmenities([...projectAmenities, res.data.amenity]);
      setProjectAmenityForm({ name: "", description: "" });
      toast("Amenity added");
    } catch (err) {
      toast("Error adding amenity", "error");
    }
  };

  const updateProjectAmenity = async () => {
    if (!editingAmenityForm.name) {
      toast("Amenity name required", "error");
      return;
    }
    try {
      const res = await axios.put(
        `${API}/project-amenities/${editingAmenityId}`,
        { name: editingAmenityForm.name, description: editingAmenityForm.description }
      );
      setProjectAmenities(
        projectAmenities.map((a) => (a.id === editingAmenityId ? res.data.amenity : a))
      );
      setEditingAmenityId(null);
      setEditingAmenityForm({ name: "", description: "" });
      toast("Amenity updated");
    } catch (err) {
      toast("Error updating amenity", "error");
    }
  };

  const deleteProjectAmenity = async (id) => {
    try {
      await axios.delete(`${API}/project-amenities/${id}`);
      setProjectAmenities(projectAmenities.filter(a => a.id !== id));
      toast("Amenity deleted");
    } catch (err) {
      toast("Error deleting amenity", "error");
    }
  };

  const saveWhy = async () => {
    try {
      await axios.post(`${API}/why/${projectId}`, { points: why });
      toast("Why section saved");
    } catch (error) {
      toast("Error saving why section", "error");
    }
  };

  const saveLocation = async () => {
    try {
      await axios.post(`${API}/location/${projectId}`, { connectivity, facilities });
      toast("Location data saved");
    } catch (error) {
      toast("Error saving location data", "error");
    }
  };

  const addFloor = async () => {
    if (!floorForm.type || !floorForm.area || !floorForm.image) {
      toast("Please fill all fields", "error");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("projectId", projectId);
      fd.append("type", floorForm.type);
      fd.append("area", floorForm.area);
      fd.append("image", floorForm.image);
      await axios.post(`${API}/floorplans`, fd);
      const res = await axios.get(`${API}/floorplans/${projectId}`);
      setFloors(res.data || []);
      setFloorForm({ type: "", area: "", image: null });
      toast("Floor plan added successfully");
    } catch (error) {
      toast("Error adding floor plan", "error");
    }
  };

  const addSpec = async () => {
    if (!specForm.category || !specForm.detail) {
      toast("Please fill all fields", "error");
      return;
    }
    try {
      await axios.post(`${API}/specifications`, { projectId, specs: [specForm] });
      const res = await axios.get(`${API}/specifications/${projectId}`);
      setSpecs(res.data.specifications || []);
      setSpecForm({ category: "", detail: "" });
      toast("Specification added");
    } catch (error) {
      toast("Error adding specification", "error");
    }
  };

  const addUpdate = async () => {
    if (!updateForm.update || !updateForm.date || !updateForm.image) {
      toast("Please fill all required fields", "error");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("projectId", projectId);
      fd.append("updates", JSON.stringify([{ update: updateForm.update, date: updateForm.date, progress: updateForm.progress }]));
      fd.append("files", updateForm.image);
      await axios.post(`${API}/construction-updates`, fd);
      const res = await axios.get(`${API}/construction-updates/${projectId}`);
      setUpdates(res.data.updates || []);
      setUpdateForm({ update: "", date: "", progress: "", image: null });
      toast("Construction update added");
    } catch (error) {
      toast("Error adding update", "error");
    }
  };

  const saveBrochure = async () => {
    try {
      if (!projectId) {
        alert("Please select a project");
        return;
      }
      const formData = new FormData();
      formData.append("projectId", projectId);
      formData.append("brochure", brochureFile);
      formData.append("thumbnail", thumbnailFile);
      if (heroDesktopFile) formData.append("heroImageDesktop", heroDesktopFile);
      if (heroMobileFile) formData.append("heroImageMobile", heroMobileFile);

      const res = await fetch(`${API_BASE}/brochure/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      toast("Brochure uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast("Error uploading brochure", "error");
    }
  };

  const addPrice = async () => {
    if (!priceForm.unit || !priceForm.price) {
      toast("Please fill all fields", "error");
      return;
    }
    try {
      await axios.post(`${API}/pricelist`, { projectId, items: [priceForm] });
      const res = await axios.get(`${API}/pricelist/${projectId}`);
      setPrices(Array.isArray(res.data?.priceList) ? res.data.priceList : []);
      setPriceForm({ unit: "", price: "" });
      toast("Price added successfully");
    } catch (error) {
      console.error(error);
      toast("Error adding price", "error");
    }
  };

  const saveSmartInvestment = async () => {
    if (!projectId) return;
    try {
      await axios.post(`${API}/smart-investment`, { projectId, ...smartInvestment });
      toast("Smart Investment saved");
    } catch (error) {
      toast("Error saving Smart Investment", "error");
    }
  };

  const saveProjectStats = async () => {
    if (!projectId) return;
    try {
      await axios.post(`${API}/project-stats`, { projectId, ...projectStats });
      toast("Project stats saved");
    } catch (error) {
      toast("Error saving project stats", "error");
    }
  };

  const uploadGallery = async () => {
    if (!projectId || galleryFiles.length === 0) {
      toast("Please select images to upload", "error");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("projectId", projectId);
      galleryFiles.forEach((file) => fd.append("images", file));
      await axios.post(`${API}/gallery`, fd);
      const res = await axios.get(`${API}/gallery/${projectId}`);
      setGallery(res.data?.gallery || []);
      setGalleryFiles([]);
      toast("Gallery images uploaded");
    } catch (error) {
      toast("Error uploading gallery", "error");
    }
  };

  const addBanner = async () => {
    try {
      if (!bannerForm.image) {
        toast("Please select image", "error");
        return;
      }

      const fd = new FormData();
      fd.append("title", bannerForm.title);
      fd.append("subtitle", bannerForm.subtitle);
      fd.append("deviceType", bannerForm.deviceType);
      fd.append("sortOrder", bannerForm.sortOrder);
      fd.append("isActive", bannerForm.isActive);
      fd.append("image", bannerForm.image);

      await axios.post(`${API}/banners`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Banner added successfully");
      fetchHomeData();
      setBannerForm({
        title: "",
        subtitle: "",
        deviceType: "web",
        sortOrder: 0,
        isActive: true,
        image: null,
      });
    } catch (err) {
      console.log(err);
      toast("Error adding banner", "error");
    }
  };

  const deleteBanner = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This banner will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        await axios.delete(`${API}/banners/${id}`);
        fetchHomeData();
        toast("Banner deleted successfully");
      }
    } catch (error) {
      toast("Error deleting banner", "error");
    }
  };

  const addAmenity = async () => {
    if (!amenityForm.label || !amenityForm.icon) {
      toast("Please fill all fields and select an icon", "error");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("label", amenityForm.label);
      fd.append("icon", amenityForm.icon);
      await axios.post(`${API}/amenities`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchHomeData();
      setAmenityForm({ label: "", icon: null });
      toast("Amenity added successfully");
    } catch (error) {
      toast("Error adding amenity", "error");
    }
  };

  const deleteAmenity = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This amenity will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        await axios.delete(`${API}/amenities/${id}`);
        fetchHomeData();
        toast("Amenity deleted successfully");
      }
    } catch (error) {
      toast("Error deleting amenity", "error");
    }
  };

  /* SIDEBAR SECTIONS */
  const sidebarSections = [
    { id: "overview", label: "Project Overview", icon: Eye, color: "blue" },
    { id: "why", label: "Why Choose Us", icon: Star, color: "yellow" },
    { id: "location", label: "Location & Connectivity", icon: MapPin, color: "green" },
    { id: "site-plan", label: "Site Plan & Plot Area", icon: Map, color: "indigo" },
    { id: "amenities", label: "Project Amenities", icon: CheckSquare, color: "pink" },
    { id: "price", label: "Price List", icon: DollarSign, color: "emerald" },
    { id: "smart-investment", label: "Smart Investment", icon: TrendingUp, color: "teal" },
    { id: "gallery", label: "Project Gallery", icon: Grid3X3, color: "rose" },
    { id: "home-banner", label: "Home Banners", icon: Home, color: "amber" },
  ];

  /* FILTERED PROJECTS */
  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ─── SHOW LOADING SPINNER UNTIL AUTH CHECK COMPLETES ──────────
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent" />
          <p className="text-gray-500 text-sm font-medium">Verifying session…</p>
        </div>
      </div>
    );
  }
  // ───────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* MOBILE OVERLAY — tap outside to close */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MODERN SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72
          bg-gradient-to-b from-gray-900 to-gray-800 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col shadow-2xl
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Vishwak Properties</h1>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            {/* CLOSE BUTTON — mobile only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-300">Projects</h2>
            <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">{projects.length}</span>
          </div>

          {/* SEARCH */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PROJECTS SCROLLABLE LIST */}
          <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
            {filteredProjects.map((p) => (
              <button
                key={p.projectId}
                onClick={() => handleOpenProject(p.projectId)}   // ← closes sidebar
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 ${
                  projectId === p.projectId
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${p.status === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <span className="text-sm truncate">{p.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        </div>

        {/* DASHBOARD SECTIONS */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-semibold text-gray-300 mb-4 px-2">Dashboard</h3>
          <nav className="space-y-1">
            {sidebarSections.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateSection(item.id)}   // ← closes sidebar
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    section === item.id
                      ? `bg-blue-600 text-white shadow-lg`
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {typeof window !== "undefined"
                  ? localStorage.getItem("adminEmail") || "Admin"
                  : "Admin"}
              </p>
              <p className="text-xs text-gray-400 truncate">Administrator</p>
            </div>
            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* HAMBURGER — visible on mobile, hidden on desktop */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate max-w-[180px] sm:max-w-none">
                  {projectId
                    ? `Editing: ${overview.name || "Project"}`
                    : section.replace('-', ' ').toUpperCase()}
                </h2>
                <p className="text-sm text-gray-600 hidden sm:block">Manage your real estate content</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="hidden sm:flex space-x-2">
                <Button variant="outline" icon={Download}>Export Data</Button>
                <Button variant="primary" icon={Save}>Save All</Button>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD STATS */}
        {!projectId && section === "overview" && (
          <div className="p-4 md:p-6">
            <Section title="Dashboard Overview" subtitle="Welcome back, Admin" icon={BarChart3}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <StatCard title="Total Projects" value={stats.totalProjects} icon={FolderOpen} color="blue" />
                <StatCard title="Active Projects" value={stats.activeProjects} icon={CheckSquare} color="green" />
                <StatCard title="Total Images" value={stats.totalImages} icon={ImageIcon} color="purple" />
                <StatCard title="Recent Updates" value={stats.recentUpdates} icon={Bell} color="orange" />
              </div>

              <Card title="Quick Actions">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <Plus className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="font-medium text-blue-700 text-sm">New Project</span>
                    </div>
                  </button>
                  <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-100 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-green-600 mb-2" />
                      <span className="font-medium text-green-700 text-sm">Upload Media</span>
                    </div>
                  </button>
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-100 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <FileText className="w-8 h-8 text-purple-600 mb-2" />
                      <span className="font-medium text-purple-700 text-sm">Generate Report</span>
                    </div>
                  </button>
                  <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-100 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <Users className="w-8 h-8 text-orange-600 mb-2" />
                      <span className="font-medium text-orange-700 text-sm">View Users</span>
                    </div>
                  </button>
                </div>
              </Card>

              <div className="mt-8">
                <Card title="Recent Projects">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="text-left text-sm text-gray-600 border-b">
                          <th className="pb-3 px-4">Project Name</th>
                          <th className="pb-3 px-4">Status</th>
                          <th className="pb-3 px-4">Last Updated</th>
                          <th className="pb-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.slice(0, 5).map((project) => (
                          <tr key={project.projectId} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium">{project.name}</td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                project.status === 'ongoing'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {project.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {new Date(project.updatedAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenProject(project.projectId)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </Section>
          </div>
        )}

        {/* PROJECT CONTENT */}
        {projectId && (
          <div className="p-4 md:p-6">
            {/* PROJECT INFO BAR */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 text-white shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">{overview.name}</h1>
                  <p className="text-blue-100 mt-1 text-sm">{overview.category} • {overview.type}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">{overview.status}</span>
                </div>
              </div>
            </div>

            {/* SECTION CONTENT */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {section === "overview" && (
                  <Section title="Project Overview" icon={Eye}>
                    <Card title="Basic Project Information">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Project Name" value={overview.name} onChange={(e) => setOverview({ ...overview, name: e.target.value })} />
                        <Input label="Category" value={overview.category} onChange={(e) => setOverview({ ...overview, category: e.target.value })} />
                        <Input label="Status" value={overview.status} onChange={(e) => setOverview({ ...overview, status: e.target.value })} />
                        <Input label="Type" value={overview.type} onChange={(e) => setOverview({ ...overview, type: e.target.value })} />
                        <Input label="Development Size" value={overview.developmentSize} onChange={(e) => setOverview({ ...overview, developmentSize: e.target.value })} />
                        <Input label="Number of Units" value={overview.numberOfUnits} onChange={(e) => setOverview({ ...overview, numberOfUnits: e.target.value })} />
                        <Input label="Top Title" value={overview.topTitle} onChange={(e) => setOverview({ ...overview, topTitle: e.target.value })} />
                        <Input label="Top Location" value={overview.topLocation} onChange={(e) => setOverview({ ...overview, topLocation: e.target.value })} />
                        <div className="md:col-span-2">
                          <Textarea label="Top Description" value={overview.topDescription} onChange={(e) => setOverview({ ...overview, topDescription: e.target.value })} />
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button onClick={saveOverview} icon={Save} variant="primary">Save Basic Details</Button>
                      </div>

                      {/* HERO IMAGES */}
                      <div className="mt-8 border-t pt-8">
                        <h3 className="text-lg font-semibold mb-6">Hero Section Images</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FileUpload label="Hero Image (Desktop)" accept="image/*" onChange={(e) => setHeroDesktopFile(e.target.files[0])} />
                          <FileUpload label="Hero Image (Mobile)" accept="image/*" onChange={(e) => setHeroMobileFile(e.target.files[0])} />
                        </div>
                      </div>
                    </Card>

                    {/* PROJECT MEDIA */}
                    <Card title="Project Media & Route Map" className="mt-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <FileUpload
                            label="Upload Project Media Image"
                            accept="image/*"
                            icon={ImageIcon}
                            onChange={(e) => setMediaFiles({ ...mediaFiles, cinematic360: e.target.files[0] })}
                          />
                          {projectMedia.cinematic360 && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 mb-2">Current Uploaded Image:</p>
                              <img
                                src={projectMedia.cinematic360}
                                alt="Project Media"
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                                onError={(e) => { e.target.src = "https://placehold.co/600x400/3b82f6/ffffff?text=Project+Image"; }}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <Textarea
                            label="Google Route Map Embed URL"
                            placeholder="Paste Google Maps embed link"
                            value={projectMedia.routeMap}
                            onChange={(e) => setProjectMedia({ ...projectMedia, routeMap: e.target.value })}
                          />
                          {projectMedia.routeMap && (
                            <div className="mt-4 rounded-lg overflow-hidden border shadow-sm">
                              <iframe src={projectMedia.routeMap} width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button onClick={saveProjectMedia} icon={Save} variant="primary">Save Media</Button>
                      </div>
                    </Card>

                    {/* BROCHURE */}
                    <Card title="Project Brochure" className="mt-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <Input label="Brochure Title" value={brochure.title} onChange={(e) => setBrochure({ ...brochure, title: e.target.value })} />
                          <div className="mt-4 space-y-4">
                            <FileUpload label="Upload Brochure (PDF)" accept=".pdf" onChange={(e) => setBrochureFile(e.target.files[0])} />
                            <FileUpload label="Upload Thumbnail Image" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} />
                          </div>
                        </div>
                        <div>
                          {brochure.fileUrl && (
                            <div className="border rounded-xl p-6 bg-blue-50 shadow-sm">
                              <div className="flex items-center space-x-4 mb-4">
                                <FileText className="w-10 h-10 text-blue-600" />
                                <div>
                                  <h4 className="font-semibold text-gray-900">Current Brochure</h4>
                                  <p className="text-sm text-gray-600">{brochure.title}</p>
                                </div>
                              </div>
                              <a href={brochure.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                                <Download className="w-4 h-4 mr-2" />
                                Download Brochure
                              </a>
                              {brochure.thumbnailUrl && (
                                <div className="mt-4">
                                  <img src={brochure.thumbnailUrl} alt="Brochure Thumbnail" className="w-32 h-32 object-cover rounded-lg" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button onClick={saveBrochure} icon={Save} variant="primary">Save Brochure</Button>
                      </div>
                    </Card>
                  </Section>
                )}

                {section === "site-plan" && (
                  <Section title="Site Plan & Plot Area Statement" icon={Map}>
                    <Card title="Site Plan Section">
                      <Input label="Site Plan Heading" value={overview.sitePlanHeading || ""} onChange={(e) => setOverview({ ...overview, sitePlanHeading: e.target.value })} />
                      <FileUpload label="Upload Site Plan Image" accept="image/*" icon={ImageIcon} onChange={(e) => setOverview({ ...overview, sitePlanImage: e.target.files[0] })} />
                      {overview.sitePlanImage && (
                        <div className="mt-4">
                          <img
                            src={overview.sitePlanImage instanceof File ? URL.createObjectURL(overview.sitePlanImage) : getImageUrl(overview.sitePlanImage)}
                            alt="Site Plan"
                            className="w-full h-80 object-cover rounded-lg shadow"
                          />
                        </div>
                      )}
                    </Card>

                    <Card title="Plot Area Statement" className="mt-8">
                      <FileUpload label="Upload Plot Area Statement Image" accept="image/*" icon={ImageIcon} onChange={(e) => setOverview({ ...overview, plotAreaStatementImage: e.target.files[0] })} />
                      {overview.plotAreaStatementImage && (
                        <div className="mt-4">
                          <img
                            src={overview.plotAreaStatementImage instanceof File ? URL.createObjectURL(overview.plotAreaStatementImage) : getImageUrl(overview.plotAreaStatementImage)}
                            alt="Plot Area Statement"
                            className="w-full h-80 object-cover rounded-lg shadow"
                          />
                        </div>
                      )}
                      <div className="mt-6">
                        <Button onClick={saveOverview} icon={Save} variant="primary">Save Site Plan Data</Button>
                      </div>
                    </Card>
                  </Section>
                )}

                {section === "why" && (
                  <Section title="Why Choose This Project" icon={Star}>
                    <Card>
                      {why.map((w, i) => (
                        <div key={i} className="mb-6 p-4 border border-gray-200 rounded-xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input label="Title" value={w.title} onChange={(e) => { const copy = [...why]; copy[i].title = e.target.value; setWhy(copy); }} />
                            <Textarea label="Description" value={w.description} onChange={(e) => { const copy = [...why]; copy[i].description = e.target.value; setWhy(copy); }} />
                            <Input label="Icon Key" value={w.iconKey} onChange={(e) => { const copy = [...why]; copy[i].iconKey = e.target.value; setWhy(copy); }} placeholder="e.g., MapPin, CheckCircle2" />
                            <Input label="Sort Order" type="number" value={w.sortOrder} onChange={(e) => { const copy = [...why]; copy[i].sortOrder = parseInt(e.target.value); setWhy(copy); }} />
                          </div>
                          <Button variant="danger" icon={Trash2} onClick={() => setWhy(why.filter((_, index) => index !== i))}>Remove Point</Button>
                        </div>
                      ))}
                      <div className="flex flex-wrap gap-3">
                        <Button onClick={() => setWhy([...why, { title: "", description: "", iconKey: "MapPin", sortOrder: why.length + 1 }])} icon={Plus} variant="secondary">Add New Point</Button>
                        <Button onClick={saveWhy} icon={Save} variant="primary">Save Why Section</Button>
                      </div>
                    </Card>
                  </Section>
                )}

                {section === "location" && (
                  <Section title="Location & Connectivity" icon={MapPin}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card title="Connectivity Points">
                        {connectivity.map((point, i) => (
                          <div key={i} className="mb-4 p-4 border rounded-lg">
                            <div className="grid grid-cols-2 gap-3">
                              <Input label="Name" value={point.name} onChange={(e) => { const copy = [...connectivity]; copy[i].name = e.target.value; setConnectivity(copy); }} />
                              <Input label="Distance" value={point.distance} onChange={(e) => { const copy = [...connectivity]; copy[i].distance = e.target.value; setConnectivity(copy); }} />
                              <Input label="Time" value={point.time} onChange={(e) => { const copy = [...connectivity]; copy[i].time = e.target.value; setConnectivity(copy); }} />
                              <Input label="Sort Order" type="number" value={point.sortOrder} onChange={(e) => { const copy = [...connectivity]; copy[i].sortOrder = parseInt(e.target.value); setConnectivity(copy); }} />
                            </div>
                          </div>
                        ))}
                        <Button onClick={() => setConnectivity([...connectivity, { name: "", distance: "", time: "", sortOrder: connectivity.length + 1 }])} icon={Plus} variant="secondary">Add Connectivity Point</Button>
                      </Card>

                      <Card title="Nearby Facilities">
                        {facilities.map((facility, i) => (
                          <div key={i} className="mb-4 p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <Input label="Facility Name" value={facility.name} onChange={(e) => { const copy = [...facilities]; copy[i].name = e.target.value; setFacilities(copy); }} className="flex-1" />
                              <Input label="Order" type="number" value={facility.sortOrder} onChange={(e) => { const copy = [...facilities]; copy[i].sortOrder = parseInt(e.target.value); setFacilities(copy); }} className="w-24" />
                            </div>
                          </div>
                        ))}
                        <Button onClick={() => setFacilities([...facilities, { name: "", sortOrder: facilities.length + 1 }])} icon={Plus} variant="secondary">Add Facility</Button>
                      </Card>
                    </div>
                    <div className="mt-6">
                      <Button onClick={saveLocation} icon={Save} variant="primary" size="lg">Save Location Data</Button>
                    </div>
                  </Section>
                )}

                {section === "amenities" && (
                  <Section title="Project Amenities" icon={CheckSquare}>
                    <Card>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {projectAmenities.map((amenity) => (
                          <div key={amenity.id} className="border rounded-xl p-5 hover:shadow-md transition">
                            {editingAmenityId === amenity.id ? (
                              <>
                                <Input label="Amenity Name" value={editingAmenityForm.name} onChange={(e) => setEditingAmenityForm({ ...editingAmenityForm, name: e.target.value })} />
                                <Textarea label="Description" value={editingAmenityForm.description} onChange={(e) => setEditingAmenityForm({ ...editingAmenityForm, description: e.target.value })} />
                                <div className="flex space-x-3 mt-4">
                                  <Button icon={Save} variant="primary" onClick={updateProjectAmenity}>Save</Button>
                                  <Button variant="secondary" onClick={() => setEditingAmenityId(null)}>Cancel</Button>
                                </div>
                              </>
                            ) : (
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{amenity.name}</h4>
                                  {amenity.description && <p className="text-gray-600 text-sm mt-2">{amenity.description}</p>}
                                </div>
                                <div className="flex space-x-2">
                                  <Button icon={Edit} size="sm" variant="outline" onClick={() => { setEditingAmenityId(amenity.id); setEditingAmenityForm({ name: amenity.name, description: amenity.description || "" }); }} />
                                  <Button icon={Trash2} size="sm" variant="danger" onClick={() => deleteProjectAmenity(amenity.id)} />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold mb-4">Add New Amenity</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input label="Amenity Name" value={projectAmenityForm.name} onChange={(e) => setProjectAmenityForm({ ...projectAmenityForm, name: e.target.value })} />
                          <Textarea label="Description (Optional)" value={projectAmenityForm.description} onChange={(e) => setProjectAmenityForm({ ...projectAmenityForm, description: e.target.value })} />
                        </div>
                        <div className="mt-6">
                          <Button icon={Plus} variant="primary" onClick={addProjectAmenity}>Add Amenity</Button>
                        </div>
                      </div>
                    </Card>
                  </Section>
                )}

                {section === "price" && (
                  <Section title="Price List" icon={DollarSign}>
                    <Card>
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full min-w-[400px]">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-3 px-4 text-left font-semibold text-gray-700">Unit Type</th>
                              <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
                              <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prices.map((price) => (
                              <tr key={price.id} className="border-b hover:bg-gray-50">
                                {editingPriceId === price.id ? (
                                  <>
                                    <td className="py-4 px-4"><input className="border rounded px-2 py-1 w-full" value={editingPriceForm.unit} onChange={(e) => setEditingPriceForm({ ...editingPriceForm, unit: e.target.value })} /></td>
                                    <td className="py-4 px-4"><input type="number" className="border rounded px-2 py-1 w-full" value={editingPriceForm.price} onChange={(e) => setEditingPriceForm({ ...editingPriceForm, price: e.target.value })} /></td>
                                    <td className="py-4 px-4 flex space-x-2">
                                      <Button size="sm" icon={Save} onClick={updatePrice}>Save</Button>
                                      <Button size="sm" variant="secondary" onClick={() => setEditingPriceId(null)}>Cancel</Button>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="py-4 px-4">{price.unit}</td>
                                    <td className="py-4 px-4 font-medium">{price.price}</td>
                                    <td className="py-4 px-4 flex space-x-2">
                                      <Button variant="outline" icon={Edit} size="sm" onClick={() => { setEditingPriceId(price.id); setEditingPriceForm({ unit: price.unit, price: price.price }); }} />
                                      <Button variant="danger" icon={Trash2} size="sm" onClick={async () => { await axios.delete(`${API}/pricelist/${price.id}`); setPrices(prices.filter((x) => x.id !== price.id)); toast("Price deleted"); }} />
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-lg mb-4">Add New Price</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input label="Unit Type" placeholder="e.g., 2BHK, 3BHK" value={priceForm.unit} onChange={(e) => setPriceForm({ ...priceForm, unit: e.target.value })} />
                          <Input label="Price (₹)" placeholder="e.g., 5000000" value={priceForm.price} onChange={(e) => setPriceForm({ ...priceForm, price: e.target.value })} type="number" />
                        </div>
                        <Button onClick={addPrice} icon={Plus} variant="primary">Add Price</Button>
                      </div>
                    </Card>
                  </Section>
                )}

                {section === "smart-investment" && (
                  <Section title="Smart Investment" icon={TrendingUp}>
                    <Card>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Input label="Title Line 1" value={smartInvestment.titleLine1} onChange={(e) => setSmartInvestment({ ...smartInvestment, titleLine1: e.target.value })} />
                        <Input label="Title Line 2" value={smartInvestment.titleLine2} onChange={(e) => setSmartInvestment({ ...smartInvestment, titleLine2: e.target.value })} />
                        <Input label="Highlight Text" value={smartInvestment.highlightText} onChange={(e) => setSmartInvestment({ ...smartInvestment, highlightText: e.target.value })} />
                        <Input label="Tagline" value={smartInvestment.tagline} onChange={(e) => setSmartInvestment({ ...smartInvestment, tagline: e.target.value })} />
                      </div>
                      <Textarea label="Main Description" value={smartInvestment.mainDescription} onChange={(e) => setSmartInvestment({ ...smartInvestment, mainDescription: e.target.value })} />
                      <div className="mt-6">
                        <Button onClick={saveSmartInvestment} icon={Save} variant="primary">Save Smart Investment</Button>
                      </div>
                    </Card>
                  </Section>
                )}

                {section === "gallery" && (
                  <Section title="Project Gallery" icon={Grid3X3}>
                    <Card>
                      <div className="mb-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                          <input type="file" multiple onChange={(e) => setGalleryFiles([...e.target.files])} className="hidden" id="gallery-upload" />
                          <label htmlFor="gallery-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-700 mb-2">Upload Images</h4>
                            <p className="text-gray-600 mb-4">Drag and drop images here or click to browse</p>
                            {galleryFiles.length > 0 && <p className="text-blue-600">{galleryFiles.length} file(s) selected</p>}
                          </label>
                        </div>
                      </div>
                      {galleryFiles.length > 0 && (
                        <div className="mb-6">
                          <Button onClick={uploadGallery} icon={Upload} variant="primary">Upload {galleryFiles.length} Image(s)</Button>
                        </div>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gallery.map((img) => (
                          <div key={img.id} className="group relative rounded-xl overflow-hidden border">
                            <img
                              src={getImageUrl(img.image)}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => { e.target.src = `https://placehold.co/400x300/3b82f6/ffffff?text=Gallery`; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button onClick={async () => { await axios.delete(`${API}/gallery/${img.id}`); setGallery(gallery.filter((g) => g.id !== img.id)); toast("Image deleted"); }} className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Section>
                )}
              </>
            )}
          </div>
        )}

        {/* HOME BANNER MANAGEMENT */}
        {section === "home-banner" && (
          <div className="p-4 md:p-6">
            <Section title="Home Page Banners" subtitle="Manage website banners" icon={Home}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card title="Add New Banner" className="lg:col-span-2">
                  <div className="space-y-4">
                    <Input label="Banner Title" value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} />
                    <Textarea label="Subtitle" value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="Device Type" options={[{ value: 'web', label: 'Web' }, { value: 'mobile', label: 'Mobile' }]} value={bannerForm.deviceType} onChange={(e) => setBannerForm({ ...bannerForm, deviceType: e.target.value })} />
                      <Input label="Sort Order" type="number" value={bannerForm.sortOrder} onChange={(e) => setBannerForm({ ...bannerForm, sortOrder: parseInt(e.target.value) || 0 })} />
                    </div>
                    <Toggle label="Active Banner" enabled={bannerForm.isActive} onChange={(val) => setBannerForm({ ...bannerForm, isActive: val })} />
                    <FileUpload
                      label="Banner Image"
                      accept="image/*"
                      onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.files[0] })}
                    />
                    <Button onClick={addBanner} icon={Upload} variant="primary">Add Banner</Button>
                  </div>
                </Card>

                <Card title="Active Banners">
                  <div className="space-y-4">
                    {banners.filter(b => b.isActive).map((banner) => (
                      <div key={banner.id} className="border rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <img src={getImageUrl(banner.image)} alt={banner.title} className="w-12 h-12 rounded object-cover" onError={(e) => { e.target.src = `https://placehold.co/100x100/3b82f6/ffffff?text=Banner`; }} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{banner.title}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded ${banner.deviceType === 'web' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{banner.deviceType}</span>
                              <span className="text-xs text-gray-600">Order: {banner.sortOrder}</span>
                            </div>
                          </div>
                          <button onClick={() => deleteBanner(banner.id)} className="p-1 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card title="All Banners" className="mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Image</th>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Device</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((banner) => (
                        <tr key={banner.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4"><img src={getImageUrl(banner.image)} alt={banner.title} className="w-16 h-10 object-cover rounded" onError={(e) => { e.target.src = `https://placehold.co/100x100/3b82f6/ffffff?text=Banner`; }} /></td>
                          <td className="py-3 px-4"><div><p className="font-medium">{banner.title}</p><p className="text-sm text-gray-600">{banner.subtitle}</p></div></td>
                          <td className="py-3 px-4"><span className={`px-3 py-1 rounded-full text-xs ${banner.deviceType === 'web' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{banner.deviceType}</span></td>
                          <td className="py-3 px-4"><span className={`px-3 py-1 rounded-full text-xs ${banner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{banner.isActive ? 'Active' : 'Inactive'}</span></td>
                          <td className="py-3 px-4"><Button variant="danger" icon={Trash2} size="sm" onClick={() => deleteBanner(banner.id)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Section>
          </div>
        )}

        {/* AMENITY MANAGEMENT */}
        {section === "manage-amenities" && (
          <div className="p-4 md:p-6">
            <Section title="Manage Amenities" subtitle="Add and manage global amenities" icon={Settings}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card title="Add New Amenity" className="lg:col-span-2">
                  <div className="space-y-4">
                    <Input label="Amenity Label" value={amenityForm.label} onChange={(e) => setAmenityForm({ ...amenityForm, label: e.target.value })} placeholder="e.g., Swimming Pool, Gymnasium" />
                    <FileUpload label="Amenity Icon" accept="image/*" onChange={(e) => setAmenityForm({ ...amenityForm, icon: e.target.files[0] })} icon={ImageIcon} />
                    <p className="text-sm text-gray-600">Recommended: 100x100px transparent PNG icon</p>
                    <Button onClick={addAmenity} icon={Plus} variant="primary">Add Amenity</Button>
                  </div>
                </Card>

                <Card title="Quick Stats">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{amenityList.length}</p>
                      <p className="text-gray-600">Total Amenities</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Most Used Amenities</p>
                      <div className="space-y-1">
                        {amenityList.slice(0, 3).map((amenity) => (
                          <div key={amenity.id} className="flex items-center justify-between">
                            <span className="text-sm">{amenity.label}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {amenity.id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card title="All Amenities" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {amenityList.map((amenity) => (
                    <div key={amenity.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <img src={getImageUrl(amenity.icon)} alt={amenity.label} className="w-12 h-12 object-contain" onError={(e) => { e.target.src = `https://placehold.co/100x100/3b82f6/ffffff?text=${amenity.label.charAt(0)}`; }} />
                        <Button variant="danger" icon={Trash2} size="sm" onClick={() => deleteAmenity(amenity.id)} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{amenity.label}</h4>
                      <p className="text-xs text-gray-600">ID: {amenity.id}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>
          </div>
        )}

        {/* NO PROJECT SELECTED */}
        {!projectId && section !== "overview" && !["home-banner", "manage-amenities"].includes(section) && (
          <div className="p-4 md:p-6">
            <Card>
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Project Selected</h3>
                <p className="text-gray-600 mb-6">Please select a project from the sidebar to manage its content</p>
                <Button onClick={() => navigateSection("overview")} variant="primary" icon={Home}>Go to Dashboard</Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}