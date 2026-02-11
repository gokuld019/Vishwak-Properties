"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Briefcase,
  MapPin,
  Building2,
  User,
  ArrowRight,
  Upload,
  Star,
  X,
  Search,
  Filter,
  Sparkles,
  Users,
  Trophy,
  Clock,
  Heart,
  Send,
  Menu,
} from "lucide-react";

export default function CareersPremium() {
  // JOB DATA
  const jobs = [
    {
      id: 1,
      title: "Sales Executive",
      dept: "Sales",
      location: "Chennai",
      type: "Full-time",
      experience: "2+ years",
      salary: "₹4-6 LPA",
      desc: "Handle leads, site visits, and guide clients on project offerings. Build lasting relationships with potential homebuyers.",
      tags: ["Communication", "Sales", "Real Estate"],
      featured: true,
    },
    {
      id: 2,
      title: "CRM Executive",
      dept: "Customer Relations",
      location: "Hyderabad",
      type: "Full-time",
      experience: "3+ years",
      salary: "₹5-7 LPA",
      desc: "Manage handover, documentation, and customer satisfaction. Ensure seamless customer journey from booking to possession.",
      tags: ["Customer Service", "Documentation", "CRM"],
      featured: false,
    },
    {
      id: 3,
      title: "Digital Marketing Executive",
      dept: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      salary: "₹4-5 LPA",
      desc: "Performance marketing, campaigns, SEO, and brand growth. Drive digital presence across all platforms.",
      tags: ["Digital Marketing", "SEO", "Social Media"],
      featured: true,
    },
    {
      id: 4,
      title: "Site Engineer",
      dept: "Construction",
      location: "Chennai",
      type: "Full-time",
      experience: "4+ years",
      salary: "₹6-8 LPA",
      desc: "Oversee construction quality, timelines, and compliance. Ensure projects meet highest standards.",
      tags: ["Construction", "Quality Control", "Engineering"],
      featured: false,
    },
  ];

  // STATE
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    dept: "All",
    location: "All",
    search: "",
  });
  const [resume, setResume] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // NEW: form data + loading
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentCompany: "",
    coverLetter: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const matchesDept = filters.dept === "All" || job.dept === filters.dept;
    const matchesLocation =
      filters.location === "All" || job.location === filters.location;
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.desc.toLowerCase().includes(filters.search.toLowerCase());

    return matchesDept && matchesLocation && matchesSearch;
  });

  const departments = ["All", ...new Set(jobs.map((job) => job.dept))];
  const locations = ["All", ...new Set(jobs.map((job) => job.location))];

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!selectedJob) return;

    if (!formData.fullName || !formData.email || !formData.phone) {
      Swal.fire({
        title: "Missing details",
        text: "Please fill Full Name, Email and Phone.",
        icon: "warning",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    setSubmitLoading(true);

    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("currentCompany", formData.currentCompany);
      fd.append("coverLetter", formData.coverLetter);
      if (resume) fd.append("resume", resume);

      await axios.post(
        `http://localhost:5000/api/careers/jobs/${selectedJob.id}/apply`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire({
        title: "Application Submitted!",
        text: "Thank you for applying. Our team will get in touch with you soon.",
        icon: "success",
        confirmButtonColor: "#16a34a",
        background: "#ffffff",
      });

      // Reset
      setSelectedJob(null);
      setResume(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        currentCompany: "",
        coverLetter: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        title: "Something went wrong",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-green-100 via-green-200 to-white rounded-b-[60px] md:rounded-b-[60px] shadow-lg"></div>
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-green-300/30 blur-[150px] rounded-full hidden md:block"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-100/20 to-green-100/20 rounded-full blur-3xl hidden md:block"></div>

      <div className="relative z-10">
        {/* HERO SECTION - Mobile Optimized */}
        <section className="pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6 md:mb-8"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">
                  We're Hiring
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-4 md:mb-6 px-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Build Your
                <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                  Future With Us
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
              >
                Join a forward-thinking real estate company that's reshaping
                urban living spaces with innovation and sustainability.
              </motion.p>

              {/* Animated Stats - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 md:mt-12 px-2"
              >
                {[
                  { icon: Trophy, value: "15+", label: "Years Experience" },
                  { icon: Users, value: "1200+", label: "Happy Customers" },
                  { icon: Building2, value: "30+", label: "Projects Delivered" },
                  { icon: Heart, value: "98%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 min-w-[130px] sm:min-w-[140px] md:min-w-[160px] group hover:shadow-xl transition-all duration-300"
                  >
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-green-600 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FILTERS & SEARCH - Mobile Optimized */}
        <section className="px-4 md:px-6 mb-12 md:mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 md:p-8 shadow-lg border border-white/50"
            >
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch md:items-center justify-between">
                {/* Search */}
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm text-sm md:text-base"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <select
                    value={filters.dept}
                    onChange={(e) =>
                      setFilters({ ...filters, dept: e.target.value })
                    }
                    className="flex-1 min-w-[140px] px-3 md:px-4 py-2.5 md:py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm text-sm md:text-base"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="flex-1 min-w-[140px] px-3 md:px-4 py-2.5 md:py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm text-sm md:text-base"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* JOB CARDS - Mobile Optimized */}
        <section className="px-4 md:px-6 mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
            >
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-5 md:p-8 shadow-lg border border-white/50 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                      job.featured ? "ring-2 ring-green-500/20" : ""
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    {/* Featured Badge */}
                    {job.featured && (
                      <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-2 h-2 md:w-3 md:h-3" />
                        <span className="hidden sm:inline">Featured</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl md:rounded-2xl">
                          <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm">{job.dept}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                      {job.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                          <User className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Experience</div>
                        <div className="font-semibold text-gray-900">
                          {job.experience}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Salary</div>
                        <div className="font-bold text-green-600">
                          {job.salary}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-green-600 font-semibold mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 text-sm md:text-base"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 md:py-16"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 md:w-10 md:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">
                  No positions found
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Try adjusting your search criteria
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* TESTIMONIALS - Mobile Optimized */}
        <section className="px-4 md:px-6 mb-16 md:mb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
                Life at <span className="text-green-600">Vishwak</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-2 md:px-0">
                Hear from our team members about their journey and experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "CRM Executive",
                  quote:
                    "Amazing work culture, supportive management, and great opportunities to grow. The work-life balance is exceptional.",
                  rating: 5,
                  tenure: "2 years",
                },
                {
                  name: "Rahul Kumar",
                  role: "Sales Manager",
                  quote:
                    "The growth opportunities here are tremendous. Management truly invests in employee development and career progression.",
                  rating: 5,
                  tenure: "3 years",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 md:p-8 shadow-lg border border-white/50"
                >
                  <div className="flex gap-1 md:gap-2 mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {testimonial.role} • {testimonial.tenure}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* APPLY FORM MODAL - Mobile Optimized */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4 py-4 md:py-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full p-4 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* CLOSE */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="mb-6 md:mb-8 pr-6 md:pr-0">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-4 text-gray-600 text-sm md:text-base">
                  <span className="flex items-center gap-1 md:gap-2">
                    <Building2 className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{selectedJob.dept}</span>
                  </span>
                  <span className="flex items-center gap-1 md:gap-2">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{selectedJob.location}</span>
                  </span>
                  <span className="flex items-center gap-1 md:gap-2">
                    <User className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{selectedJob.type}</span>
                  </span>
                </div>
              </div>

              {/* FORM */}
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Current Company
                    </label>
                    <input
                      type="text"
                      placeholder="Where do you work now?"
                      value={formData.currentCompany}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentCompany: e.target.value,
                        })
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you're interested in this position..."
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coverLetter: e.target.value,
                      })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 md:gap-3 border-2 border-dashed border-gray-300 p-4 md:p-6 rounded-xl cursor-pointer hover:border-green-500 transition-colors group">
                    <div className="p-2 md:p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Upload className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm md:text-base truncate">
                        {resume
                          ? resume.name
                          : "Upload Resume (PDF, DOC, DOCX)"}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        Max file size: 5MB
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-all disabled:opacity-70"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                  {submitLoading ? "Submitting..." : "Submit Application"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}