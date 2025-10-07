import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { CheckCircle, Phone, Clock, Target, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Inside Sales Agent (ISA) - Pines VA',
  description: 'Professional Inside Sales Agent services to boost your sales pipeline and convert more leads into customers.',
}

export default function ISAPage() {
  const features = [
    'Lead Outreach & Cold Calling',
    'Warm Calling & Follow-Ups',
    'Client Qualification',
    'Sales Presentations',
    'Pipeline Management',
    'Target Achievement',
    'Customer Relationship Building',
    'Collaboration with Sales Team'
  ]

  const benefits = [
    {
      icon: <Target className="h-6 w-6 text-green-600" />,
      title: 'Higher Conversion Rates',
      description: 'Experienced agents who know how to turn prospects into customers'
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: 'Professional Outreach',
      description: 'Skilled in communication and relationship building'
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: 'Consistent Follow-up',
      description: 'Systematic approach to nurturing leads and closing deals'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-4">
            Inside Sales Agent (ISA)
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            An Inside Sales Associate at PinesVA is focused on driving growth through client outreach 
            and sales. The role involves making outbound calls, following up with leads, qualifying 
            prospects, and nurturing relationships to generate new business opportunities. With strong 
            communication skills and a results-driven mindset, the SA turns conversations into conversions 
            while keeping the sales pipeline active and thriving.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-10">
          {/* Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
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
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Target className="h-24 w-24 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Sales Excellence</h3>
              <p className="text-gray-600">Dedicated agents focused on results</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our ISA Services</h2>
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

        {/* Process */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Sales Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lead Research</h3>
              <p className="text-gray-600 text-sm">Identify and research qualified prospects</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Initial Contact</h3>
              <p className="text-gray-600 text-sm">Professional outreach and engagement</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualification</h3>
              <p className="text-gray-600 text-sm">Assess needs and buying potential</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Conversion</h3>
              <p className="text-gray-600 text-sm">Close deals and schedule appointments</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Sales?</h2>
          <p className="text-lg mb-6">Connect with us today and start converting more leads into customers</p>
          <Link 
            href="/connect" 
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
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
