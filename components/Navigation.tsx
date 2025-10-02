'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Services', href: '/services' },
  { name: 'Easy Guides', href: '/guides' },
  { name: 'Social Spaces', href: '/social-spaces' },
  { name: 'Let&apos;s Connect', href: '/connect' },
]

const expertiseItems = [
  { name: 'General Virtual Assistant (GVA)', href: '/expertise/gva' },
  { name: 'Executive Virtual Assistant (EVA)', href: '/expertise/eva' },
  { name: 'Inside Sales Agent (ISA)', href: '/expertise/isa' },
  { name: 'Virtual Medical Assistant (VMA)', href: '/expertise/vma' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [expertiseDropdownOpen, setExpertiseDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpertiseDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  }

  return (
    <motion.nav 
      className="sticky top-0 z-50 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20 relative">
          <div className="absolute left-0 flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link 
                href="/" 
                className="flex items-center"
                onMouseEnter={() => setExpertiseDropdownOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3134.92 773.14" className="h-10 w-auto">
                <defs>
                  <style>{`.cls-1{font-size:549.27px;fill:#27423b;font-family:Colmeak;}.cls-2,.cls-3{fill:#c2b59b;}.cls-2{letter-spacing:-0.12em;}.cls-4{fill:#28443b;}`}</style>
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <text className="cls-1" transform="translate(847.23 581.83)">Pines<tspan className="cls-2" x="1518.71" y="0">V</tspan><tspan className="cls-3" x="1867.5" y="0">A</tspan></text>
                    <path className="cls-4" d="M227,524.8V249.16c-76.18,1-137.62,62.38-137.62,138,0,76.21,62.46,138,139.51,138,3.06,0,6.1-.11,9.12-.31Z"/>
                    <path className="cls-4" d="M545.13,249.09h-.71V525.05h.71c77,0,139.5-61.77,139.5-138S622.18,249.09,545.13,249.09Z"/>
                    <path className="cls-4" d="M248.24,228.05c0,.24,0,.47,0,.71h276c0-.24,0-.47,0-.71,0-77.25-61.78-139.87-138-139.87S248.24,150.8,248.24,228.05Z"/>
                    <path className="cls-4" d="M524.21,546.56c0-.24,0-.47,0-.71h-276c0,.24,0,.47,0,.71,0,77.05,61.77,139.5,138,139.5S524.21,623.61,524.21,546.56Z"/>
                    <path className="cls-4" d="M544.25,94.49v133.9H675.32c0-.23,0-.45,0-.68C675.33,156.28,617.25,98,544.25,94.49Z"/>
                    <path className="cls-4" d="M93,228.76H226.84V97.68h-.68C154.73,97.68,96.42,155.76,93,228.76Z"/>
                    <path className="cls-4" d="M226.57,679.4V545.5H95.49c0,.23,0,.46,0,.68C95.48,617.61,153.56,675.93,226.57,679.4Z"/>
                    <path className="cls-4" d="M678.32,545.85H544.42V676.93h.68C616.53,676.94,674.84,618.85,678.32,545.85Z"/>
                    <path className="cls-4" d="M703.85,268.75V505.51c40.62-24.12,67.8-68.1,67.8-118.38S744.47,292.87,703.85,268.75Z"/>
                    <path className="cls-4" d="M67.8,505.51V268.75C27.18,292.87,0,336.86,0,387.13S27.18,481.39,67.8,505.51Z"/>
                    <path className="cls-4" d="M502.09,705.34H265.33c24.12,40.61,68.11,67.8,118.38,67.8S478,746,502.09,705.34Z"/>
                    <path className="cls-4" d="M267.84,67.8H504.6C480.48,27.18,436.49,0,386.22,0S292,27.18,267.84,67.8Z"/>
                    <path className="cls-3" d="M384.7,249.14c-77,0-139.5,61.77-139.5,138s62.46,138,139.5,138,139.51-61.78,139.51-138S461.75,249.14,384.7,249.14Zm62.85,105.53q-13.31,18.74-26.69,37.4c-10.39,14.54-20.83,29.05-31.16,43.64-3.33,4.69-7.5,7.51-13.42,7.31a12.5,12.5,0,0,1-7.08-2.37q-20.71-15.18-41.37-30.47c-5-3.71-6.63-9-5.43-14.91,1.12-5.53,4.67-9.25,10.22-10.91a16.85,16.85,0,0,1,3.19-.35,14,14,0,0,1,9.8,3.11c8.6,6.38,17.24,12.7,25.8,19.12,1.73,1.3,2.6,1.65,4.14-.54q24.06-34,48.38-67.81c6.11-8.52,17.2-8.89,23.54-.9A14.87,14.87,0,0,1,447.55,354.67Z"/>
                  </g>
                </g>
              </svg>
            </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link
              href="/our-story"
              className="text-gray-600 hover:text-[#095028] px-4 py-3 rounded-md text-base font-semibold transition-colors"
              onMouseEnter={() => setExpertiseDropdownOpen(false)}
            >
              Our Story
            </Link>

            <Link
              href="/services"
              className="text-gray-700 hover:text-[#095028] px-4 py-3 rounded-md text-base font-semibold transition-colors"
              onMouseEnter={() => setExpertiseDropdownOpen(false)}
            >
              Services
            </Link>
            
            {/* Expertise Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setExpertiseDropdownOpen(!expertiseDropdownOpen)}
                onMouseEnter={() => setExpertiseDropdownOpen(true)}
                className="flex items-center text-black hover:text-[#095028] px-4 py-3 rounded-md text-base font-semibold transition-colors focus:outline-none"
              >
                Expertise
                <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-200 ${expertiseDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {expertiseDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl py-2 z-50 border border-gray-200 overflow-hidden"
                    onMouseLeave={() => setExpertiseDropdownOpen(false)}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href="/expertise" 
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-[#095028] font-semibold transition-colors duration-200"
                      onClick={() => setExpertiseDropdownOpen(false)}
                    >
                      All Expertise
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    {expertiseItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 text-base text-gray-600 hover:bg-gray-50 hover:text-[#095028] font-semibold transition-colors duration-200"
                        onClick={() => setExpertiseDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navigation.slice(2, 4).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#095028] px-4 py-3 rounded-md text-base font-semibold transition-colors"
                onMouseEnter={() => setExpertiseDropdownOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Let's Connect button positioned on the right */}
          <div className="absolute right-0 hidden md:flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/connect"
                className="bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                onMouseEnter={() => setExpertiseDropdownOpen(false)}
              >
                Let&apos;s Connect
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="mt-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-xl border border-gray-200 py-4 shadow-xl">
                <Link
                  href="/our-story"
                  className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-4 py-3 rounded-lg mx-2 text-lg font-semibold transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Our Story
                </Link>

                <Link
                  href="/services"
                  className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-4 py-3 rounded-lg mx-2 text-lg font-semibold transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                
                {/* Mobile Expertise Menu */}
                <div className="space-y-1">
                  <Link
                    href="/expertise"
                    className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-4 py-3 rounded-lg mx-2 text-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    All Expertise
                  </Link>
                  {expertiseItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-green-600 hover:bg-gray-50 block px-8 py-3 rounded-lg mx-2 text-base font-semibold transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {navigation.slice(2, 4).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-4 py-3 rounded-lg mx-2 text-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="px-4 py-2">
                  <Link
                    href="/connect"
                    className="block w-full text-center bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-full text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Let&apos;s Connect
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
