import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { CheckCircle, Briefcase, Clock, Shield, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Executive Virtual Assistant (EVA) - Pines VA',
  description: 'Elite Executive Virtual Assistant services for C-level executives and business leaders. Professional support for high-level business operations.',
}

export default function EVAPage() {
  const features = [
    'Calendar & Schedule Management',
    'Email & Communication Management',
    'Travel Planning & Coordination',
    'Meeting Preparation & Documentation',
    'Project & Task Management',
    'Research & Data Gathering',
    'Document & File Management',
    'Confidential Support'
  ]

  const benefits = [
    {
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      title: 'Executive-Level Expertise',
      description: 'Experienced in supporting C-suite executives and senior management'
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: 'Confidentiality Assured',
      description: 'Strict NDAs and security protocols for sensitive information'
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: 'Priority Support',
      description: 'Dedicated support with fastest response times'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-4">
            Executive Virtual Assistant (EVA)
          </h1>
          <p className="text-xl text-justify text-gray-600 max-w-3xl mx-auto">
            Executive Virtual Assistance at PinesVA isn’t just about managing tasks, it's about making your life easier. 
            We take care of the behind-the-scenes details like scheduling, emails, travel plans, and project coordination 
            so you can focus on leading, creating, and growing your business. Think of us as your right hand, always ready 
            to step in with reliability, discretion, and a personal touch. Our goal is simple: to free up your time, reduce 
            your stress, and give you the confidence that everything is being handled with care.

          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-10">
          {/* Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive-Level Services</h2>
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Briefcase className="h-24 w-24 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Executive Excellence</h3>
              <p className="text-gray-600">Premium support for business leaders</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our EVA Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Makes Our EVAs Special</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Bachelor's degree or higher</li>
                <li>• 5+ years executive support experience</li>
                <li>• Advanced English proficiency</li>
                <li>• Professional certifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Strategic thinking and analysis</li>
                <li>• Advanced MS Office & G-Suite</li>
                <li>• Project management tools</li>
                <li>• Discretion and confidentiality</li>
              </ul>
            </div>
          </div>
        </div>



        {/* CTA */}
        <div className="bg-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready for Executive-Level Support?</h2>
          <p className="text-lg mb-6">Connect with us today and elevate your business operations</p>
          <Link
            href="/fill-up/eva"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Get Started Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
