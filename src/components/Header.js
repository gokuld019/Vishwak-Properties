'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
          ]
        },
        {
          title: 'VILLAS',
          items: [
            { name: 'Mahaa Ganapathy Avenue – Villas @ Kandigai', href: '/projects/ongoing/villas/luxury-gardens', tag: 'Premium' },
            { name: 'Vijay Ganapathy Nagar – 1 BHK & 2 BHK Villas @ Mannivakkam', href: '/projects/ongoing/villas/dream-retreat', tag: 'New Launch' },
            { name: 'Sri Mangal Avenue – 1 BHK & 2 BHK Villas @ Chengalpattu', href: '/projects/ongoing/villas/serenity' },
            { name: 'Kumaran Nagar – 2 BHK Villas @ Urapakkam', href: '/projects/ongoing/villas/grand-vista', tag: 'Selling Fast' },
          ]
        }
      ]
    }
  },
  {
    name: 'COMPLETED PROJECTS',
    href: '/projects/completed',
    megaMenu: {
      categories: [
        {
          title: 'PLOTS',
          items: [
            { name: 'Sameera Grand City – East Tambaram', href: '/projects/completed/plots/green-meadows' },
            { name: 'Kumaran Nagar – Vandalur', href: '/projects/completed/plots/sundaram-enclave' },
            { name: 'Anna Nagar – Vandalur', href: '/projects/completed/plots/aaditya-nagar', tag: 'Sold Out' },
          ]
        },
        {
          title: 'VILLAS',
          items: [
            { name: 'Sameera Grand City -Villas @ East Tambaram', href: '/projects/completed/villas/elite-homes', tag: 'Premium' },
          ]
        }
      ]
    }
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
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hoverColor = 'hover:text-[#67a139]';
  const hoverBgColor = 'hover:bg-[#e0f2d6]';

  // Determine header background based on page and scroll state
  const getHeaderClasses = () => {
    // All pages: transparent initially, white on scroll
    return isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClasses()}`}>
      {(isScrolled || !isHomePage) && (
        <div className="bg-[#2d2d2d] text-white py-2 px-4 lg:py-1.5 lg:px-6">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px]">
            <div className="tracking-wide text-center sm:text-left">Email: vishwakproperties@gmail.com</div>
            <div className="tracking-wide text-center sm:text-left">Call us: +91 - 93455 66568</div>
          </div>
        </div>
      )}

      <nav className={`transition-all duration-300 ${(isScrolled || !isHomePage) ? 'py-2 lg:py-0' : 'py-3 lg:py-4'}`}>
        <div className={`w-[92%] lg:max-w-[80%] mx-auto flex items-center justify-between px-3 lg:px-6 transition-all duration-300 ${!isHomePage ? "mt-0" : (isScrolled ? "mt-0" : "mt-3 lg:mt-5")}`}>
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="Vishwak Logo"
              width={100}
              height={35}
              className="object-contain transition-all duration-300 mt-2 lg:mt-4 w-[75px] sm:w-[85px] lg:w-[100px] h-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-bold tracking-[0.1em] uppercase text-black">
            {navigationLinks.map((link) => {
              if (link.megaMenu) {
                return (
                  <li
                    key={link.name}
                    className={`relative cursor-pointer transition-colors duration-200 ${hoverColor}`}
                    onMouseEnter={() => setOpenMenu(link.name)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <div className="flex items-center gap-1">
                      <Link href={link.href}>{link.name}</Link>
                      <ChevronDown className="w-3 h-3" />
                    </div>

                    {openMenu === link.name && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-4 w-[600px]">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                          <div className="grid grid-cols-2 gap-6 p-6">
                            {link.megaMenu.categories.map((category) => (
                              <div key={category.title}>
                                <div className="flex items-center space-x-2 mb-4 pb-3 border-b-2 border-gray-200">
                                  <h3 className="text-base font-bold text-gray-900">{category.title}</h3>
                                  <span className="ml-auto text-xs px-2 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">{category.items.length} Projects</span>
                                </div>
                                <ul className="space-y-2">
                                  {category.items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        className={`group flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 ${hoverColor} ${hoverBgColor}`}
                                      >
                                        <span className="text-xs text-gray-700 font-medium transition-colors normal-case">{item.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

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
                                className="text-xs bg-[#67a139] text-white px-4 py-1.5 rounded-lg font-bold hover:bg-green-700 transition-colors uppercase tracking-wider"
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

              return (
                <li key={link.name} className={`cursor-pointer transition-colors duration-200 ${hoverColor}`}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Icon */}
          <button 
            className="lg:hidden text-black transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md shadow-2xl max-h-[75vh] overflow-y-auto border-t border-gray-100">
          <ul className="p-4 space-y-3 text-sm font-bold text-black">
            {navigationLinks.map((link) => {
              if (link.megaMenu) {
                return (
                  <li key={link.name} className="border-b border-gray-100 pb-3">
                    <Link 
                      href={link.href} 
                      className={`block mb-3 uppercase text-base ${hoverColor}`} 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.megaMenu.categories.map((category) => (
                      <div key={category.title} className="mt-3 bg-gray-50 rounded-lg p-3">
                        <div className={`font-bold mb-2 text-sm uppercase ${hoverColor} text-gray-800`}>
                          {category.title}
                        </div>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item.name} className="text-xs normal-case font-medium">
                              <Link
                                href={item.href}
                                className={`flex justify-between items-center p-2 rounded-md transition-all duration-200 ${hoverColor} ${hoverBgColor}`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="flex-1 pr-2">{item.name}</span>
                                {item.tag && (
                                  <span className="text-[9px] text-white px-2 py-0.5 rounded-full bg-[#67a139] whitespace-nowrap flex-shrink-0">
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
                <li key={link.name} className="border-b border-gray-100 pb-3">
                  <Link 
                    href={link.href} 
                    className={`block uppercase text-base ${hoverColor}`} 
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