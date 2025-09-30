'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react'

const services = [
  { name: 'General Virtual Assistant', href: '/expertise/gva' },
  { name: 'Executive Virtual Assistant', href: '/expertise/eva' },
  { name: 'Inside Sales Agent', href: '/expertise/isa' },
  { name: 'Virtual Medical Assistant', href: '/expertise/vma' },
]

const company = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Mission & Vision', href: '/our-story#mission' },
  { name: 'How It Works', href: '/guides' },
  { name: 'Success Stories', href: '/success-stories' },
]

const support = [
  { name: 'Contact Us', href: '/connect' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
]

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/pines-va' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/pinesva' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/pinesva' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Pines VA
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leave as blank
            </p>
            
            <div className="space-y-3">
              <a href="mailto:hello@pinesva.com" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mr-3" />
                hello@pinesva.com
              </a>
              <a href="tel:+1234567890" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 mr-3" />
                +63 000 000 0000
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
                  <Link href={service.href} className="text-gray-300 hover:text-white transition-colors">
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
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
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
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Pines VA. All rights reserved. | Built with passion for business growth.
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
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