import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Users, Clock, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'General Virtual Assistant (GVA) - Pines VA',
  description: 'Professional General Virtual Assistant services to help streamline your business operations and increase productivity.',
}

export default function GVAPage() {
  const features = [
    'Administrative Support',
    'Email Management',
    'Calendar Scheduling',
    'Data Entry & Research',
    'Customer Service',
    'Document Preparation',
    'Travel Arrangements',
    'Social Media Management'
  ]

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: '24/7 Availability',
      description: 'Get support when you need it, across different time zones'
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Skilled Professionals',
      description: 'Experienced VAs with diverse backgrounds and expertise'
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: 'Cost-Effective',
      description: 'Save up to 70% compared to hiring in-house staff'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/expertise" className="text-blue-600 hover:underline">Expertise</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">General Virtual Assistant</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/expertise" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Expertise
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            General Virtual Assistant (GVA)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your business operations with our skilled General Virtual Assistants. 
            Handle day-to-day tasks efficiently while you focus on growing your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our GVAs Can Do</h2>
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
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-24 w-24 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Professional Support</h3>
              <p className="text-gray-600">Dedicated virtual assistants ready to help</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Why Choose Our GVA Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
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

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Flexible Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Part-Time</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">$8-12/hr</p>
              <p className="text-gray-600">20 hours per week</p>
            </div>
            <div className="text-center p-6 border-2 border-blue-600 rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full-Time</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">$6-10/hr</p>
              <p className="text-gray-600">40 hours per week</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Project-Based</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">Custom</p>
              <p className="text-gray-600">Flexible timeline</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">Connect with us today and find your perfect General Virtual Assistant</p>
          <Link 
            href="/connect" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  )
}