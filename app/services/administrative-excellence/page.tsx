import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { CheckCircle, Users, Clock, Globe, FileText, Calendar, Phone, Mail, BarChart3, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Administrative Excellence Services - Pines VA',
  description: 'Professional Administrative Excellence services including executive support, sales assistance, and comprehensive business operations management.',
}

export default function AdministrativeExcellenceServicesPage() {
  const services = [
    {
      title: 'Executive Administrative Support',
      icon: <FileText className="w-8 h-8 text-green-600" />,
      description: 'Comprehensive administrative support to streamline your daily operations and enhance productivity.',
      features: ['Email Management & Organization', 'Calendar Scheduling & Coordination', 'Document Preparation & Formatting', 'Data Entry & Database Management', 'Travel Planning & Coordination', 'Meeting Management & Minutes']
    },
    {
      title: 'Inside Sales Agent (ISA)',
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      description: 'Dedicated sales professionals to help convert leads into clients and grow your business across industries.',
      features: ['Lead Qualification & Scoring', 'Cold Calling & Outreach', 'Follow-up Management', 'CRM Management & Updates', 'Appointment Setting', 'Sales Reporting & Analytics']
    },
    {
      title: 'Business Operations Management',
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      description: 'Strategic operational support to optimize business processes and drive efficiency.',
      features: ['Process Documentation', 'Project Coordination', 'Quality Assurance', 'Vendor Management', 'Financial Reporting Support', 'Compliance Monitoring']
    }
  ]

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: 'Maximize Efficiency',
      description: 'Focus on core business activities while we handle administrative tasks'
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: 'Professional Excellence',
      description: 'Experienced professionals who understand business operations'
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: 'Reliable Support',
      description: 'Consistent, dependable service you can count on'
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: 'Scalable Solutions',
      description: 'Services that grow with your business needs'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-4">
            Administrative Excellence Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every successful professional has a strong backbone of support. We streamline your daily operations 
            by managing emails, calendars, reports, and communications bringing structure and balance to your day 
            so you can work smarter, not harder.
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
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
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Administrative Excellence Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-lg p-8 mb-10 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">We understand your specific business needs and administrative requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customization</h3>
              <p className="text-gray-600">We tailor our services to match your workflow and business processes</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Execution</h3>
              <p className="text-gray-600">We deliver consistent, high-quality administrative support that exceeds expectations</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Administrative Excellence?</h2>
          <p className="text-lg mb-6">Connect with us today and transform your business operations</p>
          <Link 
            href="/connect" 
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}