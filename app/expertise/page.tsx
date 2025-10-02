import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Building2, UserCheck, Phone, Stethoscope, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'gva',
    icon: UserCheck,
    title: 'General Virtual Assistant (GVA)',
    subtitle: 'Comprehensive Administrative Support',
    description: 'Perfect for businesses looking to streamline their daily operations with reliable, professional administrative support.',
    features: [
      'Email Management & Organization',
      'Calendar Scheduling & Coordination',
      'Data Entry & Database Management',
      'Customer Support & Communication',
      'Document Creation & Management',
      'Research & Information Gathering',
      'Social Media Management',
      'Basic Bookkeeping & Invoicing'
    ],
    benefits: [
      'Save 20+ hours per week',
      'Improve response times',
      'Better organization',
      'Cost-effective solution'
    ],
    idealFor: ['Small to medium businesses', 'Entrepreneurs', 'Busy professionals', 'Startups'],
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'eva',
    icon: Building2,
    title: 'Executive Virtual Assistant (EVA)',
    subtitle: 'High-Level Executive Support',
    description: 'Specialized support for executives and business leaders who need sophisticated, confidential assistance.',
    features: [
       'Calendar & Schedule Management',
      'Email & Communication Management',
      'Travel Planning & Coordination',
      'Meeting Preparation & Documentation',
      'Project & Task Management',
      'Research & Data Gathering',
      'Document & File Management',
      'Confidential Support'
    ],
    benefits: [
      'Focus on strategic decisions',
      'Improved productivity',
      'Professional representation',
      'Confidential handling'
    ],
    idealFor: ['C-suite executives', 'Business leaders', 'Senior management', 'Consultants'],
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'isa',
    icon: Phone,
    title: 'Inside Sales Agent (ISA)',
    subtitle: 'Dedicated Sales Professionals',
    description: 'Drive revenue growth with dedicated sales professionals who focus on lead generation and customer acquisition.',
    features: [
      'Lead Generation & Qualification',
      'Cold Calling & Outreach',
      'CRM Management & Updates',
      'Sales Pipeline Development',
      'Follow-up Campaigns',
      'Appointment Setting',
      'Sales Reporting & Analytics',
      'Customer Relationship Building'
    ],
    benefits: [
      'Increase sales pipeline',
      'Better lead conversion',
      'Consistent outreach',
      'Revenue growth'
    ],
    idealFor: ['Sales teams', 'Real estate agents', 'B2B companies', 'Service providers'],
    color: 'bg-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 'mva',
    icon: Stethoscope,
    title: 'Medical Virtual Assistant (MVA)',
    subtitle: 'Specialized Healthcare Support',
    description: 'HIPAA-compliant virtual assistants specialized in healthcare administration and patient communication.',
    features: [
      'Patient Scheduling & Coordination',
      'Medical Records Management',
      'Insurance Verification & Claims',
      'Appointment Reminders',
      'Patient Communication',
      'Medical Billing Support',
      'Prescription Refill Coordination',
      'HIPAA Compliance Management'
    ],
    benefits: [
      'Reduce administrative burden',
      'Improve patient satisfaction',
      'HIPAA compliant processes',
      'Better appointment management'
    ],
    idealFor: ['Medical practices', 'Healthcare providers', 'Dental offices', 'Specialty clinics'],
    color: 'bg-red-500',
    bgColor: 'bg-red-50'
  }
]

export default function Expertise() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-6">Our Expertise</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            At Pines VA, we provide more than just virtual assistance, we deliver partnership, reliability, and peace of mind. 
            Our team specializes in supporting professionals in the real estate and medical industries, helping them focus on 
            what matters most: their clients and patients. We understand that both fields move fast and demand precision. 
            Whether it’s coordinating with clients and prospects in real estate or managing sensitive medical tasks with 
            accuracy, we bring the skills and dedication needed to keep your operations seamless.

          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={service.id} className={`${service.bgColor} rounded-3xl p-8 lg:p-12`}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className={`${service.color} p-4 rounded-xl text-white mr-4`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                        <p className="text-lg text-gray-600">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/fill-up/${service.id}`}
                      className={`inline-flex items-center ${service.color} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Get Started with {service.id.toUpperCase()}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Features</h3>
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Ideal for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.idealFor.map((ideal, idealIndex) => (
                            <span
                              key={idealIndex}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {ideal}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Not Sure Which Service is Right for You?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our experts will help you choose the perfect virtual assistant solution for your specific needs. 
            Get a free consultation and discover how we can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              href="/guides"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
