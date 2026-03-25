"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Sparkles,
  Trophy,
  Users,
  Building2,
  Heart,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star,
} from "lucide-react";

export default function CareersCommonPage() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentCompany: "",
    experience: "",
    preferredLocation: "",
    expectedSalary: "",
    coverLetter: "",
  });

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.phone) {
      Swal.fire("Missing Fields", "Please fill required details", "warning");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("fullName", form.fullName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append(
        "currentCompany",
        `${form.currentCompany} | Exp:${form.experience}yrs | Preferred:${form.preferredLocation} | Expected:${form.expectedSalary}`
      );
      fd.append("coverLetter", form.coverLetter);

      if (resume) fd.append("resume", resume);

      await axios.post(
        `http://localhost:5000/api/careers/jobs/1/apply`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire("Application Submitted", "Our HR team will contact you soon.", "success");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        currentCompany: "",
        experience: "",
        preferredLocation: "",
        expectedSalary: "",
        coverLetter: "",
      });

      setResume(null);
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">

      {/* BG SHAPES */}
      <div className="absolute top-0 left-0 w-full h-[520px] md:h-[600px] bg-gradient-to-br from-green-100 via-green-200 to-white rounded-b-[40px] md:rounded-b-[60px] shadow-lg"></div>
      <div className="absolute top-0 right-0 w-[250px] md:w-[380px] h-[250px] md:h-[380px] bg-green-300/30 blur-[120px] md:blur-[150px] rounded-full"></div>

      <div className="relative z-10">

        {/* HERO */}
        <section className="pt-24 md:pt-40 pb-10 md:pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>

              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-5 md:mb-8">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs md:text-sm font-medium text-gray-700">We're Hiring</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Build Your
                <span className="block text-green-600 mt-2">Future With Us</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto mt-4">
                Join a forward-thinking real estate company shaping modern urban living.
              </p>

              {/* STATS */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 mt-10 md:mt-14">
  {[
    { icon: Trophy, value: "15+", label: "Years Experience" },
    { icon: Users, value: "1200+", label: "Happy Customers" },
    { icon: Building2, value: "30+", label: "Projects Delivered" },
    { icon: Heart, value: "98%", label: "Satisfaction" },
  ].map((s) => (
    <div
      key={s.label}
      className="bg-white/80 backdrop-blur rounded-xl md:rounded-2xl p-4 md:p-6 shadow border flex flex-col items-center text-center"
    >
      <div className=" rounded-full p-2 md:p-3 mb-2 md:mb-3">
        <s.icon className="text-green-600 w-5 h-5 md:w-7 md:h-7" />
      </div>

      <h3 className="text-lg md:text-2xl font-bold">{s.value}</h3>
      <p className="text-gray-600 text-[11px] md:text-sm mt-1">
        {s.label}
      </p>
    </div>
  ))}
</div>

            </motion.div>
          </div>
        </section>

        {/* FORM */}
        <section className="pb-20 px-3 sm:px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-5 sm:p-6 md:p-10">

            <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 md:mb-8">
              Upload Your Resume
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <Input icon={User} label="Full Name" value={form.fullName}
                onChange={(v)=>setForm({...form,fullName:v})}/>
              <Input icon={Mail} label="Email" value={form.email}
                onChange={(v)=>setForm({...form,email:v})}/>
              <Input icon={Phone} label="Phone" value={form.phone}
                onChange={(v)=>setForm({...form,phone:v})}/>
              <Input icon={Building2} label="Current Company" value={form.currentCompany}
                onChange={(v)=>setForm({...form,currentCompany:v})}/>
              <Input icon={Briefcase} label="Experience (Years)" value={form.experience}
                onChange={(v)=>setForm({...form,experience:v})}/>
              <Input icon={MapPin} label="Preferred Location" value={form.preferredLocation}
                onChange={(v)=>setForm({...form,preferredLocation:v})}/>
              <Input icon={Star} label="Expected Salary" value={form.expectedSalary}
                onChange={(v)=>setForm({...form,expectedSalary:v})}/>
            </div>

            <textarea
              className="w-full border rounded-xl p-3 md:p-4 mt-4 text-sm md:text-base"
              placeholder="Tell about your real estate experience"
              value={form.coverLetter}
              onChange={(e)=>setForm({...form,coverLetter:e.target.value})}
            />

            {/* Resume Upload */}
            <label className="flex items-center gap-3 border-2 border-dashed mt-5 p-4 md:p-6 rounded-xl cursor-pointer hover:border-green-500 transition">
              <Upload className="text-green-600 w-5 h-5 md:w-6 md:h-6"/>
              <span className="text-sm md:text-base truncate">
                {resume ? resume.name : "Upload Resume (PDF/DOC)"}
              </span>
              <input type="file" className="hidden"
                onChange={(e)=>setResume(e.target.files[0])}/>
            </label>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg active:scale-[0.98] transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}

function Input({icon:Icon,label,value,onChange}){
  return(
    <div className="flex items-center gap-2 md:gap-3 border p-2.5 md:p-3 rounded-xl">
      <Icon className="text-green-600 w-4 h-4 md:w-5 md:h-5"/>
      <input
        className="w-full outline-none text-sm md:text-base"
        placeholder={label}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  )
}