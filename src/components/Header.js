'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigationLinks = [
  {
    name: 'ABOUT US',
    href: '/about',
  },
  {
    name: 'ONGOING PROJECTS',
    href: '/projects/ongoing',
    megaMenu: {
      categories: [
        {
          title: 'PLOTS',
          items: [
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
          ]
        },
        {
          title: 'VILLAS',
          items: [
            { name: 'Mahaa Ganapathy Avenue – Villas @ Kandigai', href: '/projects/ongoing/villas/luxury-gardens', tag: 'Premium' },
            { name: 'Vijay Ganapathy Nagar – 1 BHK & 2 BHK Villas @ Mannivakkam', href: '/projects/ongoing/villas/dream-retreat', tag: 'New Launch' },
            { name: 'Sri Mangal Avenue – 1 BHK & 2 BHK Villas @ Chengalpattu', href: '/projects/ongoing/villas/serenity' },
            { name: 'Kumaran Nagar – 2 BHK VILLAS at Urapakkam', href: '/projects/ongoing/villas/grand-vista', tag: 'Selling Fast' },
          ]
        }
      ]
    }
  },
  {
    name: 'COMPLETED PROJECTS',
    href: '/projects/completed',
  },
  {
    name: 'EMI CALCULATOR',
    href: '/emi-calculator',
  },
  {
    name: 'CAREERS',
    href: '/careers',
  },
  {
    name: 'CONTACT US',
    href: '/contactus',
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      {/* Top Header Bar - Only show when scrolled */}
      {isScrolled && (
        <div className="bg-[#2d2d2d] text-white py-1.5 px-6 flex justify-between items-center text-[11px]">
          <div className="tracking-wide">Email : vishwakproperties@gmail.com</div>
          <div className="tracking-wide">Call us now : +91 - 93455 66568</div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className={`transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
<div className={`max-w-[95%] mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
  isScrolled ? "mt-0" : "mt-5"
}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Vishwak Logo"
              width={isScrolled ? 130 : 150}
              height={isScrolled ? 40 : 50}
              className="object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Menu - All text in black */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-bold tracking-[0.1em] uppercase text-black">
            {navigationLinks.map((link) => {
              // If link has mega menu (ONGOING PROJECTS)
              if (link.megaMenu) {
                return (
                  <li
                    key={link.name}
                    className="relative cursor-pointer hover:text-[#f59e0b] transition-colors duration-200"
                    onMouseEnter={() => setOpenMenu(link.name)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <div className="flex items-center gap-1">
                      <Link href={link.href}>{link.name}</Link>
                      <ChevronDown className="w-3 h-3" />
                    </div>

                    {/* Mega Menu Dropdown */}
                    {openMenu === link.name && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-4 w-[600px]">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                          <div className="grid grid-cols-2 gap-6 p-6">
                            {link.megaMenu.categories.map((category) => (
                              <div key={category.title}>
                                <div className={`flex items-center space-x-2 mb-4 pb-3 border-b-2 ${
                                  category.title === 'PLOTS' ? 'border-orange-500' : 'border-green-600'
                                }`}>
                                  <h3 className="text-base font-bold text-gray-900">{category.title}</h3>
                                  <span className={`ml-auto text-xs px-2 py-1 rounded-full font-semibold ${
                                    category.title === 'PLOTS' 
                                      ? 'bg-orange-100 text-orange-600' 
                                      : 'bg-green-100 text-green-600'
                                  }`}>
                                    {category.items.length} Projects
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {category.items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        className={`group flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 ${
                                          category.title === 'PLOTS'
                                            ? 'hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50'
                                            : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50'
                                        }`}
                                      >
                                        <span className={`text-xs text-gray-700 font-medium transition-colors normal-case ${
                                          category.title === 'PLOTS'
                                            ? 'group-hover:text-orange-600'
                                            : 'group-hover:text-green-600'
                                        }`}>
                                          {item.name}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Action Bar */}
                          <div className="bg-gradient-to-r from-[#2d2d2d] to-gray-800 px-6 py-3">
                            <div className="flex items-center justify-between text-white">
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs font-medium normal-case">Need help choosing?</span>
                              </div>
                              <Link
                                href="/contact"
                                className="text-xs bg-[#f59e0b] text-white px-4 py-1.5 rounded-lg font-bold hover:bg-[#ea950a] transition-colors uppercase tracking-wider"
                              >
                                Talk to Expert
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              // Regular link without mega menu
              return (
                <li key={link.name} className="cursor-pointer hover:text-[#f59e0b] transition-colors duration-200">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Icon - Black color */}
          <button
            className="lg:hidden text-black transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-2xl max-h-[80vh] overflow-y-auto">
          <ul className="p-6 space-y-4 text-sm font-bold text-black uppercase">
            {navigationLinks.map((link) => {
              if (link.megaMenu) {
                return (
                  <li key={link.name} className="border-b border-gray-200 pb-3">
                    <Link href={link.href} className="block mb-2" onClick={() => setMobileMenuOpen(false)}>
                      {link.name}
                    </Link>
                    {link.megaMenu.categories.map((category) => (
                      <div key={category.title} className="mt-2">
                        <div className={`font-bold mb-2 ${
                          category.title === 'PLOTS' ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {category.title}
                        </div>
                        <ul className="space-y-2 pl-4">
                          {category.items.map((item) => (
                            <li key={item.name} className="text-xs normal-case font-medium">
                              <Link 
                                href={item.href} 
                                className="flex justify-between items-center"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name}
                                {item.tag && (
                                  <span className={`text-[10px] text-white px-2 py-0.5 rounded ${
                                    category.title === 'PLOTS' ? 'bg-orange-500' : 'bg-green-600'
                                  }`}>
                                    {item.tag}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </li>
                );
              }
              return (
                <li key={link.name} className="border-b border-gray-200 pb-3">
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}