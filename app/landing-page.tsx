'use client'
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SophisticatedBackground from '../components/ui/SophisticatedBackground'
import ShareAnimation from '../components/ui/ShareAnimation'
import { ArrowRight, CheckCircle, Star, Users, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen relative">
      <div className="relative z-50">
        <Navigation />
      </div>
      
      {/* Sophisticated Background */}
      <div className="fixed inset-0 z-0">
        <SophisticatedBackground />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white/60 via-green-50/40 to-emerald-50/50 pt-24 lg:pt-32 pb-20 overflow-hidden z-10 backdrop-blur-sm">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-green-600 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Award className="w-4 h-4 mr-2" />
                Trusted by 500+ Businesses
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Your Success,
                <span className="text-green-600 block">Our Mission</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              >
                At PinesVA, your goals drive everything we do. We’re dedicated to helping you achieve 
                success by providing seamless support, reliable solutions, and personalized service. 
                Your success is more than just an outcome—it’s our mission, our purpose, and our commitment.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link 
                  href="/connect"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/guides"
                  className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  See How It Works
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>48-72 Hour Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Animation & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="space-y-6">
                
                {/* Featured Lottie Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-green-100"
                >
                  <div className="flex flex-col items-center text-center">
                    <ShareAnimation 
                      width={320}
                      height={280}
                      className="mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Communication</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Seamless collaboration and clear communication that keeps your business connected and growing.
                    </p>
                  </div>
                </motion.div>

                {/* Compact Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">500+</h4>
                        <p className="text-xs text-gray-600">Happy Clients</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">4.9/5</h4>
                        <p className="text-xs text-gray-600">Client Rating</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="relative py-16 bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Specialized Virtual Assistant Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From real estate to medical support, we provide industry-specific virtual assistants who understand your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Link href="/expertise/gva" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 hover:border-blue-300 border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">General VA</h3>
                <p className="text-gray-600 text-sm">Administrative support for everyday business operations</p>
              </div>
            </Link>

            <Link href="/expertise/eva" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-purple-50 hover:border-purple-300 border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">Executive VA</h3>
                <p className="text-gray-600 text-sm">High-level support for executives and leadership teams</p>
              </div>
            </Link>

            <Link href="/expertise/isa" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-emerald-50 hover:border-emerald-300 border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors duration-300">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">Inside Sales Agent</h3>
                <p className="text-gray-600 text-sm">Lead generation and sales support for growing businesses</p>
              </div>
            </Link>

            <Link href="/expertise/mva" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-red-50 hover:border-red-300 border-2 border-transparent transition-all duration-300 cursor-pointer">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors duration-300">Medical VA</h3>
                <p className="text-gray-600 text-sm">HIPAA-compliant support for healthcare professionals</p>
              </div>
            </Link>

          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  )
}