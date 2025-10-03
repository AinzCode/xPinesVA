import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { CheckCircle, Heart, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Medical Virtual Assistant (MVA) - Pines VA',
  description: 'Professional Medical Virtual Assistant services for healthcare providers. HIPAA-compliant support for medical practices.',
}

export default function MVAPage() {
  const features = [
    'Patient Records Management',
    'Medical Transcription',
    'Billing & Insurance Support',
    'Medical Documentation ',
    'Prescription & Referral Coordination ',
    'Lab & Test Coordination ',
    'Compliance & Confidentiality',
    'Research & Medical Data Support',
    'Administrative Support '
  ]

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-red-600" />,
      title: 'HIPAA Compliant',
      description: 'Fully trained in healthcare privacy and security regulations'
    },
    {
      icon: <Heart className="h-6 w-6 text-red-600" />,
      title: 'Healthcare Expertise',
      description: 'Specialized knowledge in medical terminology and procedures'
    },
    {
      icon: <Clock className="h-6 w-6 text-red-600" />,
      title: 'Improved Efficiency',
      description: 'Streamline operations and reduce administrative burden'
    }
  ]

  const specializations = [
    'General Practice',
    'Dental Offices',
    'Specialist Clinics',
    'Telehealth Platforms',
    'Medical Billing Companies',
    'Healthcare Startups'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-4">
            Medical Virtual Assistant (MVA)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Medical Virtual Assistant at PinesVA is like an extra set of hands for doctors, clinics, 
            and healthcare teams. We take care of the important but time-consuming tasks like managing patient records, 
            transcribing notes, handling billing and insurance paperwork, coordinating prescriptions, and keeping lab 
            results organized. Everything is done with accuracy, care, and confidentiality, so providers can focus on 
            what they do best: taking care of patients.

          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-10">
          {/* Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Healthcare Services We Provide</h2>
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
          <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Heart className="h-24 w-24 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Healthcare Excellence</h3>
              <p className="text-gray-600">Specialized medical support</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our MVA Services</h2>
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

        {/* Compliance Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">HIPAA Compliance & Security</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HIPAA-compliant data handling</li>
                <li>• Secure communication channels</li>
                <li>• Regular compliance training</li>
                <li>• Audit trail documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Healthcare Specializations</h3>
              <div className="grid grid-cols-2 gap-2">
                {specializations.map((spec, index) => (
                  <div key={index} className="text-gray-600 text-sm">
                    • {spec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our MVA Qualifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Healthcare Education</h3>
              <p className="text-gray-600 text-sm">Medical administration or healthcare-related degrees</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">HIPAA Certification</h3>
              <p className="text-gray-600 text-sm">Certified in healthcare privacy and security</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
              <p className="text-gray-600 text-sm">Minimum 3 years in healthcare administration</p>
            </div>
          </div>
        </div>


        {/* CTA */}
        <div className="bg-red-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Healthcare Practice?</h2>
          <p className="text-lg mb-6">Connect with us today and find your HIPAA-compliant Medical Virtual Assistant</p>
          <Link 
            href="/fill-up/mva" 
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
