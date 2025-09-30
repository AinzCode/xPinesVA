'use client'

import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-16 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">Trusted by 500+ businesses</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Virtual Assistant 
              <span className="text-blue-600"> Services</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your business with our expert Virtual Assistants. From general admin to specialized healthcare support, 
              we provide top-tier professionals to scale your operations efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/connect"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/expertise"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
              >
                View Our Services
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Pines VA?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Highly skilled professionals</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">24/7 dedicated support</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Cost-effective solutions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Rapid scaling capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}