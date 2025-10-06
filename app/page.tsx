'use client'
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SophisticatedBackground from '../components/ui/SophisticatedBackground'
import ShareAnimation from '../components/ui/ShareAnimation'
import { ArrowRight, CheckCircle, Star, Users, Award, PlayCircle, Eye, Sparkles } from 'lucide-react'
import Link from 'next/link'

// Lazy load SparklesText and SplitText for animations
const SparklesText = dynamic(() => 
  import("../components/ui/sparkles-text").then((mod) => ({ default: mod.SparklesText })),
  { ssr: false }
)

const SplitText = dynamic(() => 
  import("../components/SplitText"),
  { ssr: false }
)

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Wait for SplitText animation to complete, then show sparkles
    const timer = setTimeout(() => {
      setShowSparkles(true)
    }, 2000) // 2 second delay for sparkles to appear after text animation
    
    return () => clearTimeout(timer)
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
      <section className="relative bg-[#097969]/20 pt-24 lg:pt-32 pb-20 overflow-hidden z-10">
        
        {/* Subtle Wavy Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern-main" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 Q25,10 50,25 T100,25" stroke="#059669" strokeWidth="0.5" fill="none" opacity="0.6"/>
                <path d="M0,35 Q25,20 50,35 T100,35" stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern-main)"/>
          </svg>
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

              <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <div className="flex flex-col">
                  <SplitText
                    text="Your Success,"
                    tag="span"
                    className="text-4xl lg:text-7xl font-bold text-gray-900 block"
                    delay={110}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-110px"
                    textAlign="left"
                  />
                  <div className="relative">
                    <SplitText
                      text="Our Mission"
                      tag="span"
                      className="text-4xl lg:text-7xl font-bold text-green-600 block"
                      delay={250}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-110px"
                      textAlign="left"
                    />
                    {showSparkles && (
                      <div className="absolute inset-0 pointer-events-none">
                        <SparklesText 
                          className="text-4xl lg:text-7xl font-bold text-transparent block"
                          colors={{ first: "#059669", second: "#f59e0b" }}
                          sparklesCount={12}
                        >
                          Our Mission
                        </SparklesText>
                      </div>
                    )}
                  </div>
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
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
                  <PlayCircle className="w-5 h-5" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From administrative excellence to specialized healthcare and real estate support, we provide comprehensive virtual assistant services tailored to your industry and business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <Link href="/services/real-estate" className="group">
              <div className="bg-white rounded-xl p-8 hover:bg-blue-50 hover:border-blue-300 border-2 border-transparent shadow-sm transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">Real Estate Services</h3>
                <p className="text-gray-600 leading-relaxed">Success in real estate is all about speed, organization, and relationships. We help you stay ahead of the competition with comprehensive support.</p>
              </div>
            </Link>

            <Link href="/services/administrative-excellence" className="group">
              <div className="bg-white rounded-xl p-8 hover:bg-green-50 hover:border-green-300 border-2 border-transparent shadow-sm transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">Administrative Excellence</h3>
                <p className="text-gray-600 leading-relaxed">Every successful professional has a strong backbone of support. We streamline your daily operations so you can work smarter, not harder.</p>
              </div>
            </Link>

            <Link href="/services/medical-assistance" className="group">
              <div className="bg-white rounded-xl p-8 hover:bg-red-50 hover:border-red-300 border-2 border-transparent shadow-sm transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                    <CheckCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">Healthcare Services</h3>
                <p className="text-gray-600 leading-relaxed">In healthcare, every second matters. We provide reliable, HIPAA-compliant support for healthcare professionals and medical teams.</p>
              </div>
            </Link>

          </div>

          <div className="text-center mt-12">
            <Link 
              href="/expertise"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
            >
              View All Expertise
              <ArrowRight className="w-5 h-5" />
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
