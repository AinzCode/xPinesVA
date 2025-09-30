'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Easy Guides', href: '/guides' },
  { name: 'Social Spaces', href: '/social' },
  { name: 'Let\'s Connect', href: '/connect' },
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
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Pines VA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/our-story"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Our Story
            </Link>
            
            {/* Expertise Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setExpertiseDropdownOpen(!expertiseDropdownOpen)}
                onMouseEnter={() => setExpertiseDropdownOpen(true)}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none"
              >
                Expertise
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expertiseDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {expertiseDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                  onMouseLeave={() => setExpertiseDropdownOpen(false)}
                >
                  <Link 
                    href="/expertise" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                    onClick={() => setExpertiseDropdownOpen(false)}
                  >
                    All Expertise
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  {expertiseItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setExpertiseDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navigation.slice(2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/our-story"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Our Story
              </Link>
              
              {/* Mobile Expertise Menu */}
              <div className="space-y-1">
                <Link
                  href="/expertise"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  All Expertise
                </Link>
                {expertiseItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 block px-6 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {navigation.slice(2).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}