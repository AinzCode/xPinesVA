import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Home, CheckCircle, Users, Clock, Globe, UserCheck, Building2, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Real Estate Services - Pines VA',
  description: 'Professional Real Estate Virtual Assistant services including GVA, EVA, and ISA to help maximize efficiency and close more deals.',
}

export default function RealEstateServicesPage() {
  const services = [
    {
      title: 'General Virtual Assistant (GVA)',
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      description: 'Administrative support, email management, calendar scheduling, and day-to-day operations for real estate professionals.',
      features: ['Administrative Support', 'Email Management', 'Calendar Scheduling', 'Data Entry & Research', 'Customer Service', 'Document Preparation']
    },
    {
      title: 'Executive Virtual Assistant (EVA)',
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      description: 'High-level executive support for real estate leaders, including strategic planning and complex task management.',
      features: ['Strategic Planning Support', 'Executive Communication', 'Project Management', 'Stakeholder Coordination', 'Financial Reporting', 'Meeting Management']
    },
    {
      title: 'Inside Sales Agent (ISA)',
      icon: <Phone className="w-8 h-8 text-green-600" />,
      description: 'Dedicated sales professionals to help convert real estate leads into clients and grow your business.',
      features: ['Lead Qualification', 'Cold Calling', 'Follow-up Management', 'CRM Management', 'Appointment Setting', 'Sales Reporting']
    }
  ]

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: 'Save Time',
      description: 'Focus on closing deals while we handle administrative tasks'
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Expert Support',
      description: 'Real estate-trained VAs who understand the industry'
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: 'Scalable Solutions',
      description: 'Grow your business with flexible support options'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Real Estate Support Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From managing listings to coordinating with buyers and sellers, we provide seamless assistance 
            to real estate professionals who want to maximize efficiency and close more deals.
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-3 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mr-2" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Why Choose Our Real Estate Support</h2>
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

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Real Estate Business?</h2>
          <p className="text-lg mb-6">Connect with us today and find your perfect Real Estate Virtual Assistant</p>
          <Link 
            href="/connect" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}