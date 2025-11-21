'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, MapPin, Building2, Home, Maximize2, Calendar, CheckCircle2, Phone, Mail, Share2, Heart, X, Camera, PlayCircle, Map, Move, RotateCw} from 'lucide-react';
import * as THREE from 'three';

export default function ProjectDetailsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const [showCinematic360, setShowCinematic360] = useState(false);
  const [current360Image, setCurrent360Image] = useState('/vp1.jpg');
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereRef = useRef(null);
  const animationFrameRef = useRef(null);

  const projectImages = [
    '/project1.jpg',
    '/project2.png',
    '/Rash.jpg',
    '/Rash2.jpg'
  ];

   const images = [
    "/vp1.jpg",
    "/vp2.png",
    "/vp3.jpg",
    "/vp1.jpg",
    "/vp2.png",
  ];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'why', label: 'WHY AIRA' },
    { id: 'location', label: 'LOCATION HIGHLIGHTS' },
    { id: 'floor', label: 'FLOOR PLANS' },
    { id: 'amenities', label: 'AMENITIES' },
    { id: 'specifications', label: 'SPECIFICATIONS' },
    { id: 'construction', label: 'CONSTRUCTION UPDATES' },
    { id: 'price', label: 'PRICE LIST' }
  ];

  const amenitiesList = [
    'Swimming Pool', 'Gymnasium', 'Children\'s Play Area', 'Landscaped Gardens',
    'Clubhouse', '24/7 Security', 'Power Backup', 'Covered Parking',
    'Meditation Area', 'Jogging Track', 'Indoor Games', 'Party Hall'
  ];

  const specifications = [
    { category: 'Flooring', detail: 'Vitrified tiles in living & bedrooms' },
    { category: 'Kitchen', detail: 'Granite counter with stainless steel sink' },
    { category: 'Bathroom', detail: 'Premium sanitaryware & CP fittings' },
    { category: 'Doors', detail: 'Main door - Teak wood frame with decorative laminate' },
    { category: 'Windows', detail: 'UPVC windows with mosquito mesh' },
    { category: 'Electrical', detail: 'Concealed copper wiring with modular switches' }
  ];

  const floorPlans = [
    { type: 'Studio', area: '718 Sq.Ft', image: '/floor-plan1.jpg' },
    { type: '1 BHK', area: '850 Sq.Ft', image: '/floor-plan2.jpg' },
    { type: '2 BHK', area: '1150 Sq.Ft', image: '/floor-plan3.jpg' },
    { type: '3 BHK', area: '1357 Sq.Ft', image: '/floor-plan4.jpg' }
  ];

  const constructionUpdates = [
    { date: '2024-01-15', update: 'Foundation work completed', progress: 25 },
    { date: '2024-02-28', update: 'Structure up to 5th floor completed', progress: 50 },
    { date: '2024-04-10', update: 'Electrical and plumbing work in progress', progress: 70 },
    { date: '2024-05-20', update: 'Interior work started', progress: 85 }
  ];

  const priceList = [
    { unit: 'Studio - 718 Sq.Ft', price: '₹45 Lakhs' },
    { unit: '1 BHK - 850 Sq.Ft', price: '₹55 Lakhs' },
    { unit: '2 BHK - 1150 Sq.Ft', price: '₹75 Lakhs' },
    { unit: '3 BHK - 1357 Sq.Ft', price: '₹90 Lakhs' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const openFloorPlan = (plan) => {
    setSelectedFloorPlan(plan);
  };

  const closeFloorPlan = () => {
    setSelectedFloorPlan(null);
  };

  const openFullscreenImage = () => {
    setShowFullscreenImage(true);
  };

  const closeFullscreenImage = () => {
    setShowFullscreenImage(false);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setShowEnquiry(false);
  };

  const openCinematic360 = () => {
    setCurrent360Image('/site.webp');
    setShowCinematic360(true);
  };

  const closeCinematic360 = () => {
    setShowCinematic360(false);
    // Cleanup Three.js
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };

  // Initialize Three.js 360 viewer
  useEffect(() => {
    if (!showCinematic360 || !canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Create sphere for 360 image
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert to see inside

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(current360Image);
    texture.minFilter = THREE.LinearFilter;
    
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Mouse/Touch controls
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

      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;

      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
      
      // Limit vertical rotation
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

    // Event listeners
    const container = canvasRef.current;
    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown);
    container.addEventListener('touchmove', onPointerMove);
    container.addEventListener('touchend', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Update camera rotation
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

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      container.removeEventListener('touchend', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Updated Header - Non-Sticky */}
      <header className="absolute top-0 left-0 right-0 bg-transparent z-50">
       
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/banner1.png"
            alt="Project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-2">AIRA AVENUE</h1>
                <p className="text-lg mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Secure your dream investment at Urapakkam
                </p>
                <div className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded text-sm font-bold">
                  Bang on GST Road
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-4 font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Premium 2 & 3 BHK Apartments
                  </h1>
                  <p className="text-lg text-gray-700 mb-6">Thoraipakkam, Chennai</p>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    Discover a world where luxury takes centre stage. A world where architectural
                    brilliance meets aesthetic functionality. A home where pride, prestige and
                    panache reign supreme. A home that's a true testament to your achievements
                    and aspirations.
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    More than a home, it's your luxury paradise, zen zone, memory trove and a
                    whole lot of other things. A home that's not just for today but for eternity.
                  </p>
                </div>

                <div className="space-y-4 text-gray-800">
                  <div>
                    <h3 className="font-semibold">TYPE:</h3>
                    <p>2BHK, 3BHK, 4BHK & 5BHK Apartments</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Block A & B</h3>
                    <p>2 Basement + Stilt + 22 Floors</p>
                    <p>2 Basement + Stilt + 10 Floors</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Development Size:</h3>
                    <p>2.21 acres</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">No. of Units:</h3>
                    <p>215 Apartments</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6">
                    <button
                      onClick={openCinematic360}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium 
                        bg-gradient-to-r from-green-600 to-green-500 text-white 
                        shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <Camera className="w-5 h-5" />
                      Cinematic 360° Experience
                    </button>

                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium 
                      bg-white text-gray-800 border border-gray-200 
                      shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-105 transition-all">
                        <MapPin className="w-5 h-5 text-yellow-600" />
                        Route Map
                    </button>

                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium 
                      bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all">
                        <PlayCircle className="w-5 h-5" />
                        Walkthrough
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 pt-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <img src="/riverwood1.png" className="w-20" alt="Feature 1" />
                  <p className="font-semibold text-black">DELIVERING ONLY<br />THE BEST</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                  <img src="/riverwood2.png" className="w-20" alt="Feature 2" />
                  <p className="font-semibold text-black">AFFORDABLE<br />HOMES</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                  <img src="/riverwood3.png" className="w-20" alt="Feature 3" />
                  <p className="font-semibold text-black">TOP CLASS<br />AMENITIES</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                  <img src="/riverwood4.png" className="w-20" alt="Feature 4" />
                  <p className="font-semibold text-black">ECO-FRIENDLY<br />PROJECTS</p>
                </div>
              </div>
            </div>
          )}

          {/* Why AIRA Tab */}
          {activeTab === 'why' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose AIRA AVENUE?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover the unique advantages that make AIRA AVENUE the perfect choice for your dream home
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Prime Location',
                    description: 'Strategic location on GST Road with excellent connectivity to all major hubs',
                    icon: <MapPin className="w-8 h-8" />
                  },
                  {
                    title: 'Quality Construction',
                    description: 'Built with premium materials and superior construction techniques',
                    icon: <Building2 className="w-8 h-8" />
                  },
                  {
                    title: 'Modern Amenities',
                    description: 'State-of-the-art facilities for comfortable and luxurious living',
                    icon: <Home className="w-8 h-8" />
                  },
                  {
                    title: 'Rental Assurance',
                    description: 'Guaranteed rental returns for 3 years with full furnishings',
                    icon: <Calendar className="w-8 h-8" />
                  },
                  {
                    title: 'Ready to Move',
                    description: 'Immediate possession available for quick settlement',
                    icon: <CheckCircle2 className="w-8 h-8" />
                  },
                  {
                    title: 'Value Appreciation',
                    description: 'High potential for property value growth in developing area',
                    icon: <TrendingUp className="w-8 h-8" />
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-yellow-600 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Highlights Tab */}
          {activeTab === 'location' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Location Highlights</h2>
                <p className="text-xl text-gray-600">
                  Strategically located for maximum convenience and connectivity
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Connectivity & Accessibility</h3>
                  <div className="grid gap-4">
                    {[
                      { name: 'Chennai Airport', distance: '15 km', time: '25 mins' },
                      { name: 'Chennai Central', distance: '25 km', time: '40 mins' },
                      { name: 'Tambaram Railway Station', distance: '8 km', time: '15 mins' },
                      { name: 'GST Road', distance: '0 km', time: '0 mins' },
                      { name: 'OMR IT Corridor', distance: '12 km', time: '20 mins' }
                    ].map((location, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                        <div>
                          <div className="font-semibold text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-600">{location.distance}</div>
                        </div>
                        <div className="text-yellow-600 font-semibold">{location.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Nearby Facilities</h3>
                  <div className="grid gap-4">
                    {[
                      'Fortis Hospital - 3 km',
                      'Chromepet Medical Center - 2 km',
                      'SRM University - 5 km',
                      'VIT University - 8 km',
                      'Phoenix Market City - 10 km',
                      'VGP Snow Kingdom - 12 km',
                      'Tidel Park - 15 km',
                      'DLF IT Park - 8 km'
                    ].map((facility, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow">
                        <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Location Map</h3>
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Map Coming Soon</p>
                    <p className="text-sm text-gray-500">Urapakkam, GST Road, Chennai</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floor Plans Tab */}
          {activeTab === 'floor' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Floor Plans</h2>
                <p className="text-xl text-gray-600">
                  Choose from our carefully designed layouts to suit your lifestyle
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {floorPlans.map((plan, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={plan.image}
                        alt={`${plan.type} Floor Plan`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => openFloorPlan(plan)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900">{plan.type}</h3>
                      <p className="text-yellow-600 font-semibold">{plan.area}</p>
                      <button
                        onClick={() => openFloorPlan(plan)}
                        className="w-full mt-3 bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities Tab */}
          {activeTab === 'amenities' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">World Class Amenities</h2>
                <p className="text-xl text-gray-600">
                  Experience luxury living with our comprehensive range of amenities
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amenitiesList.map((amenity, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-900 font-semibold text-lg">{amenity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {['/amenity1.jpg', '/amenity2.jpg', '/amenity3.jpg', '/amenity4.jpg'].map((image, index) => (
                  <div key={index} className="relative h-64 rounded-2xl overflow-hidden">
                    <img
                      src={image}
                      alt={`Amenity ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Quality Specifications</h2>
                <p className="text-xl text-gray-600">
                  Built with premium materials and superior craftsmanship
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {specifications.map((spec, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-yellow-600 mb-3">{spec.category}</h3>
                    <p className="text-gray-700">{spec.detail}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Fire fighting system as per NBC',
                    'High speed elevators',
                    'Video door phone',
                    'Solar water heating',
                    'Rain water harvesting',
                    'Sewage treatment plant'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Construction Updates Tab */}
          {activeTab === 'construction' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Construction Updates</h2>
                <p className="text-xl text-gray-600">
                  Track the progress of your dream home
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {constructionUpdates.map((update, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        {index < constructionUpdates.length - 1 && (
                          <div className="w-0.5 h-full bg-yellow-500/30 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg mb-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{update.update}</h3>
                          <span className="text-yellow-600 font-semibold">{update.progress}%</span>
                        </div>
                        <p className="text-gray-600 mb-4">{new Date(update.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', month: 'long', year: 'numeric' 
                        })}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${update.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {['/imag12.jpg', '/image3.jpg', '/image9.jpg'].map((image, index) => (
                  <div key={index} className="relative h-64 rounded-2xl overflow-hidden">
                    <img
                      src={image}
                      alt={`Construction ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price List Tab */}
          {activeTab === 'price' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Price List</h2>
                <p className="text-xl text-gray-600">
                  Transparent pricing for all unit types
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-yellow-500">
                      <tr>
                        <th className="px-6 py-4 text-left text-gray-900 font-bold">Unit Type</th>
                        <th className="px-6 py-4 text-left text-gray-900 font-bold">Carpet Area</th>
                        <th className="px-6 py-4 text-left text-gray-900 font-bold">Price</th>
                        <th className="px-6 py-4 text-left text-gray-900 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceList.map((unit, index) => (
                        <tr key={index} className="border-b border-gray-200 last:border-b-0">
                          <td className="px-6 py-4 text-gray-900 font-semibold">{unit.unit.split(' - ')[0]}</td>
                          <td className="px-6 py-4 text-gray-600">{unit.unit.split(' - ')[1]}</td>
                          <td className="px-6 py-4 text-yellow-600 font-bold">{unit.price}</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => setShowEnquiry(true)}
                              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                            >
                              Enquire
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Plan</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { stage: 'Booking Amount', amount: '₹1,00,000' },
                      { stage: 'Within 30 days', amount: '20% of total' },
                      { stage: 'On Completion', amount: '75% of total' },
                      { stage: 'On Possession', amount: '100% of total' }
                    ].map((plan, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-900">{plan.stage}</span>
                        <span className="text-yellow-600 font-bold">{plan.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Smart Investment Section */}
      <section className="relative w-full bg-gradient-to-b from-gray-200 to-white py-24 overflow-hidden">
        <div className="absolute right-0 top-0 h-full opacity-20 pointer-events-none select-none">
          <img 
            src="/sketchbg.png"
            alt="Decorative Shape"
            className="h-full w-auto object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 gap-12 relative z-10">
          <div>
            <h1 className="text-5xl lg:text-7xl font-light leading-tight">
              <span className="text-yellow-500">Smart Investment.</span>
              <br />
              <span className="text-black">Stylish</span>{" "}
              <span className="text-black">Spaces. Life Well-Lived.</span>
            </h1>

            <p className="mt-10 text-xl font-bold text-gray-900">
              SECURE YOUR DREAM INVESTMENT <br />
              AT Vishwak Properties, URAPAKKAM
            </p>

            <p className="mt-4 inline-block bg-yellow-500 text-black font-bold px-3 py-2 text-lg leading-normal">
              WHERE BUDGET MEETS OPPORTUNITY AND <br />
              MODERN COMFORT MEETS CONNECTIVITY.
            </p>
          </div>

          <div className="text-gray-700 text-lg leading-8 mt-8">
            Vishwak Properties brings together comfort, convenience, and affordability in one smart investment
            opportunity. Offering hotel-style studio accommodations, this development redefines modern
            urban living while ensuring consistent rental demand and long-term value appreciation.
            Whether for personal use or rental income, Vishwak Properties ensures your investment grows with
            Chennai's expanding real estate corridor.
          </div>
        </div>

        <button 
          onClick={() => setShowEnquiry(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-4 font-bold tracking-[0.2em] text-[13px] uppercase shadow-lg writing-vertical-rl hover:bg-yellow-600 transition-colors z-40"
        >
          ENQUIRE NOW
        </button>
      </section>

<section className="w-full bg-white py-16">
  <h2 className="text-center text-black text-4xl font-semibold tracking-wider mb-12">
    GALLERY
  </h2>

  <div className="max-w-[1200px] mx-auto">

    {/* MAIN IMAGE */}
    <div className="relative w-full h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden shadow-lg bg-gray-100">

      <img
        src={images[current]}
        className="w-full h-full object-cover transition-all duration-500"
        alt="Gallery"
      />

      {/* LEFT BUTTON */}
      <button
        onClick={handlePrev}
        className="
          absolute left-6 top-1/2 -translate-y-1/2 
          w-12 h-12 rounded-xl 
          bg-white 
          flex items-center justify-center
          hover:shadow-[3px_3px_8px_rgba(0,0,0,0.2),_-3px_-3px_8px_rgba(255,255,255,0.6)]
          transition-all duration-300
        "
      >
        <span className="text-gray-700 text-2xl font-bold">←</span>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={handleNext}
        className="
          absolute right-6 top-1/2 -translate-y-1/2 
          w-12 h-12 rounded-xl 
          bg-white
          flex items-center justify-center
          hover:shadow-[3px_3px_8px_rgba(0,0,0,0.2),_-3px_-3px_8px_rgba(255,255,255,0.6)]
          transition-all duration-300
        "
      >
        <span className="text-gray-700 text-2xl font-bold">→</span>
      </button>

    </div>

    {/* THUMBNAILS */}
    <div className="flex gap-4 mt-8 justify-center flex-wrap">
      {images.map((img, index) => (
        <div
          key={index}
          onClick={() => setCurrent(index)}
          className={`
            cursor-pointer rounded-xl overflow-hidden
            transition-all duration-300 
            ${
              current === index
                ? "ring-4 ring-blue-500 shadow-xl scale-105"
                : "ring-2 ring-gray-300 shadow"
            }
            hover:scale-105 hover:shadow-lg
          `}
        >
          <img
            src={img}
            className="w-24 h-20 object-cover"
            alt="Thumbnail"
          />
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Stats Section */}
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "NO. OF UNITS", value: "40", sub: "Units" },
              { label: "SQ.FT", value: "718 – 1357", sub: "Sq.Ft" },
              { label: "SALEABLE AREA", value: "32,400", sub: "Area" },
              { label: "NO. OF FLOORS", value: "8th To 12th", sub: "Floors" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center bg-white p-6 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-yellow-400/20 text-yellow-700 text-xs font-bold px-4 py-1 inline-block rounded-full mb-3">
                  {item.label}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">
                  {item.value}
                </div>
                <div className="text-gray-600 text-sm mt-1">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <img
              src="/logo.png"
              alt="Project Logo"
              className="mx-auto opacity-95 h-20 w-auto"
            />
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white shadow-md border border-gray-200 px-8 py-3 rounded-full text-gray-800 font-semibold">
              <MapPin className="w-5 h-5 text-yellow-500" />
              BANG ON GST ROAD
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="/floorplan4.jpg"
              alt="DRA Cove Building"
              className="w-full h-[400px] md:h-[780px] object-cover group-hover:scale-105 transition-all duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3">
                <Download className="w-6 h-6" />
                DOWNLOAD BROCHURE
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/40 text-white text-xs md:text-sm px-4 py-2 rounded-xl backdrop-blur-sm">
              marketing.chennai@drahomes.in
            </div>
          </div>

          <div className="fixed bottom-8 right-8 z-50">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 relative">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0-1.414 0z" />
              </svg>

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floor Plan Modal */}
      {selectedFloorPlan && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedFloorPlan.type} - {selectedFloorPlan.area}
                </h3>
                <button
                  onClick={closeFloorPlan}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative h-96 bg-gray-100 rounded-lg">
                <img
                  src={selectedFloorPlan.image}
                  alt={`${selectedFloorPlan.type} Floor Plan`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-6 flex gap-4">
                <button className="flex-1 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                  Download Plan
                </button>
                <button 
                  onClick={() => setShowEnquiry(true)}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Cinematic 360 Modal - Futuristic Design */}
      {showCinematic360 && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="relative w-full h-full">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
              }} />
            </div>

            {/* Corner Frames - Futuristic UI */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-yellow-400/50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-yellow-400/50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-yellow-400/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-yellow-400/50 pointer-events-none" />

            {/* Scanning Line Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50 pointer-events-none" 
                 style={{ animation: 'scanLine 3s ease-in-out infinite' }} />

            {/* Top Control Bar */}
            <div className="absolute top-0 left-0 right-0 z-20">
              <div className="flex items-center justify-between p-6">
                {/* Title with Holographic Effect */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl px-8 py-4 rounded-2xl border border-yellow-400/30">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50 animate-pulse" />
                        <Camera className="relative w-7 h-7 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                          IMMERSIVE 360° EXPERIENCE
                        </h3>
                        <p className="text-xs text-gray-400 tracking-widest">VIRTUAL REALITY TOUR</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeCinematic360}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl p-4 rounded-2xl border border-red-400/30 hover:border-red-400/60 transition-all duration-300">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Control Panel - Futuristic Design */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
              <div className="max-w-5xl mx-auto">
                {/* Main Control Bar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 blur-2xl" />
                  <div className="relative bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-yellow-400/20 p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      
                      {/* Instructions */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-400/30 blur-lg animate-pulse" />
                          <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl">
                            <Move className="w-6 h-6 text-black" />
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm sm:text-base">
                            <span className="hidden sm:inline">Drag to Explore • Scroll to Zoom</span>
                            <span className="sm:hidden">Drag & Pinch</span>
                          </p>
                          <p className="text-gray-400 text-xs tracking-wide">INTERACTIVE CONTROLS</p>
                        </div>
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center gap-3">
                        {/* Reset View */}
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
                          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-4 rounded-xl border border-blue-400/30 hover:border-blue-400/60 hover:scale-110 transition-all duration-300">
                            <RotateCw className="w-5 h-5 text-blue-400" />
                          </div>
                        </button>

                        {/* Zoom Divider */}
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />

                        {/* Zoom Out */}
                        <button
                          onClick={() => {
                            if (cameraRef.current) {
                              cameraRef.current.fov = Math.min(90, cameraRef.current.fov + 10);
                              cameraRef.current.updateProjectionMatrix();
                            }
                          }}
                          className="group relative"
                          title="Zoom Out"
                        >
                          <div className="absolute inset-0 bg-purple-500/20 blur-lg group-hover:blur-xl transition-all duration-300" />
                          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-5 py-4 rounded-xl border border-purple-400/30 hover:border-purple-400/60 hover:scale-110 transition-all duration-300">
                            <span className="text-2xl font-bold text-purple-400">−</span>
                          </div>
                        </button>

                        {/* Zoom Indicator */}
                        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-4 py-4 rounded-xl border border-gray-600/30">
                          <Maximize2 className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Zoom In */}
                        <button
                          onClick={() => {
                            if (cameraRef.current) {
                              cameraRef.current.fov = Math.max(30, cameraRef.current.fov - 10);
                              cameraRef.current.updateProjectionMatrix();
                            }
                          }}
                          className="group relative"
                          title="Zoom In"
                        >
                          <div className="absolute inset-0 bg-green-500/20 blur-lg group-hover:blur-xl transition-all duration-300" />
                          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-5 py-4 rounded-xl border border-green-400/30 hover:border-green-400/60 hover:scale-110 transition-all duration-300">
                            <span className="text-2xl font-bold text-green-400">+</span>
                          </div>
                        </button>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => {
                          closeCinematic360();
                          setShowEnquiry(true);
                        }}
                        className="group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 blur-xl group-hover:blur-2xl transition-all duration-300 animate-gradient" />
                        <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 px-8 py-4 rounded-xl font-bold text-black shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform group-hover:scale-105">
                          <span className="flex items-center gap-2">
                            Schedule Visit
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Directional Hints - Minimal & Modern */}
            <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl animate-pulse" />
                <ChevronLeft className="relative w-16 h-16 text-yellow-400" style={{ animation: 'float 2s ease-in-out infinite' }} />
              </div>
            </div>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl animate-pulse" />
                <ChevronRight className="relative w-16 h-16 text-yellow-400" style={{ animation: 'float 2s ease-in-out infinite', animationDelay: '1s' }} />
              </div>
            </div>

            {/* Three.js Canvas with Enhanced Visual */}
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              style={{ 
                filter: 'contrast(1.05) brightness(1.05)',
                transition: 'filter 0.3s ease'
              }}
            />

            {/* Vignette Effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
            }} />

            {/* Loading Indicator (shows initially) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none" style={{ opacity: 0, animation: 'fadeOut 1s ease-out forwards' }}>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-full" />
                  <div className="absolute inset-0 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-yellow-400 font-bold tracking-widest">LOADING 360° VIEW</p>
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Enquire Now</h3>
                <button
                  onClick={() => setShowEnquiry(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interested In
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                    <option>Studio - 718 Sq.Ft</option>
                    <option>1 BHK - 850 Sq.Ft</option>
                    <option>2 BHK - 1150 Sq.Ft</option>
                    <option>3 BHK - 1357 Sq.Ft</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);