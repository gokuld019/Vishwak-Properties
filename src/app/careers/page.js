"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  const [filters, setFilters] = useState({ dept: "All", location: "All", search: "" });
  const [resume, setResume] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const matchesDept = filters.dept === "All" || job.dept === filters.dept;
    const matchesLocation = filters.location === "All" || job.location === filters.location;
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.desc.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesDept && matchesLocation && matchesSearch;
  });

  const departments = ["All", ...new Set(jobs.map(job => job.dept))];
  const locations = ["All", ...new Set(jobs.map(job => job.location))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-green-100 via-green-200 to-white rounded-b-[60px] shadow-lg"></div>
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-green-300/30 blur-[150px] rounded-full"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-100/20 to-green-100/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-40 pb-20 px-6">
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
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">We're Hiring</span>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Build Your
                <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  Future With Us
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Join a forward-thinking real estate company that's reshaping urban living spaces with innovation and sustainability.
              </motion.p>

              {/* Animated Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-6 mt-12"
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
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 min-w-[160px] group hover:shadow-xl transition-all duration-300"
                  >
                    <stat.icon className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FILTERS & SEARCH */}
        <section className="px-6 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/50"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  <select
                    value={filters.dept}
                    onChange={(e) => setFilters({ ...filters, dept: e.target.value })}
                    className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* JOB CARDS */}
        <section className="px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
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
                    className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                      job.featured ? 'ring-2 ring-green-500/20' : ''
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    {/* Featured Badge */}
                    {job.featured && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{job.dept}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{job.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Experience</div>
                        <div className="font-semibold text-gray-900">{job.experience}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Salary</div>
                        <div className="font-bold text-green-600">{job.salary}</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-green-600 font-semibold mt-6 pt-6 border-t border-gray-200"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
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
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Life at <span className="text-green-600">Vishwak</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Hear from our team members about their journey and experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "CRM Executive",
                  quote: "Amazing work culture, supportive management, and great opportunities to grow. The work-life balance is exceptional.",
                  rating: 5,
                  tenure: "2 years"
                },
                {
                  name: "Rahul Kumar",
                  role: "Sales Manager",
                  quote: "The growth opportunities here are tremendous. Management truly invests in employee development and career progression.",
                  rating: 5,
                  tenure: "3 years"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50"
                >
                  <div className="flex gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role} • {testimonial.tenure}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* APPLY FORM MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* CLOSE */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {selectedJob.dept}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selectedJob.type}
                  </span>
                </div>
              </div>

              {/* FORM */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Company
                    </label>
                    <input
                      type="text"
                      placeholder="Where do you work now?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us why you're interested in this position..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:border-green-500 transition-colors group">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Upload className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {resume ? resume.name : "Upload Resume (PDF, DOC, DOCX)"}
                      </div>
                      <div className="text-sm text-gray-500">
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
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}