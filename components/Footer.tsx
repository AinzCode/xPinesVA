'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react'


const services = [
  { name: 'General Virtual Assistant', href: '/expertise/gva' },
  { name: 'Executive Virtual Assistant', href: '/expertise/eva' },
  { name: 'Inside Sales Agent', href: '/expertise/isa' },
  { name: 'Medical Virtual Assistant', href: '/expertise/mva' },
]

const company = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Mission & Vision', href: '/our-story#mission' },
  { name: 'Guides', href: '/guides' },
  { name: 'Social Spaces', href: '/social-spaces' },
]

const support = [
  { name: 'Contact Us', href: '/connect' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Share Your Feedback', href: '/testimonials/submit' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
]

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/pines-va/' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/PinesVAStaffing' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/PinesVA' },
]

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {/* Brand Section */}
          <div>
              <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                PinesVA
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Rooted in Trust. Branching into Success.
              </p>
              
              <div className="space-y-3">
              <a href="mailto:hrteam@pinesva.com" className="flex items-center text-gray-300 hover:text-[#4C8B4A] transition-colors duration-300">
                <Mail className="w-5 h-5 mr-3" />
                hrteam@pinesva.com
              </a>
              <a href="tel:+1234567890" className="flex items-center text-gray-300 hover:text-[#4C8B4A] transition-colors duration-300">
                <Phone className="w-5 h-5 mr-3" />
                +(074) 661 4195
              </a>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3" />
                  Baguio City, Philippines 2600
                </div>
              </div>
            </div>
          {/* Services */}
          <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href} className="text-gray-300 hover:text-[#4C8B4A] transition-colors duration-300">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          {/* Company */}
          <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-300 hover:text-[#C7A97B] transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          {/* Support */}
          <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-300 hover:text-[#C7A97B] transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <div className="text-gray-400 text-sm">
                  © 2025 PinesVA. All rights reserved. | Built with passion for business growth.
                </div>
                <div className="flex space-x-4 text-xs">
                  <Link href="/privacy" className="text-gray-400 hover:text-[#4C8B4A] transition-colors duration-300">
                    Privacy Policy
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link href="/terms" className="text-gray-400 hover:text-[#4C8B4A] transition-colors duration-300">
                    Terms of Service
                  </Link>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-4 md:mt-0">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#C7A97B] transition-colors duration-300 transform hover:scale-110"
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
    </footer>
  )
}
