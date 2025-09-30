import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Phone, Clock, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Inside Sales Agent (ISA) - Pines VA',
  description: 'Professional Inside Sales Agent services to boost your sales pipeline and convert more leads into customers.',
}

export default function ISAPage() {
  const features = [
    'Lead Qualification & Nurturing',
    'Cold Calling & Outreach',
    'CRM Management',
    'Sales Pipeline Development',
    'Appointment Setting',
    'Follow-up Campaigns',
    'Sales Reporting & Analytics',
    'Customer Relationship Building',
    'Market Research',
    'Competitor Analysis'
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
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-green-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/expertise" className="text-green-600 hover:underline">Expertise</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Inside Sales Agent</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/expertise" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Expertise
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inside Sales Agent (ISA)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Boost your sales performance with our skilled Inside Sales Agents. 
            Professional lead generation, qualification, and conversion specialists.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Services We Provide</h2>
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
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Why Choose Our ISA Services</h2>
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

        {/* Process */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
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

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Flexible Pricing Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hourly Rate</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">$10-15/hr</p>
              <p className="text-gray-600">Pay for actual hours worked</p>
            </div>
            <div className="text-center p-6 border-2 border-green-600 rounded-lg bg-green-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission Based</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">15-25%</p>
              <p className="text-gray-600">Pay only for closed deals</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hybrid Model</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">Custom</p>
              <p className="text-gray-600">Base + commission structure</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Sales?</h2>
          <p className="text-lg mb-6">Connect with us today and start converting more leads into customers</p>
          <Link 
            href="/connect" 
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  )
}