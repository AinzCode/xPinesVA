import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Stethoscope, CheckCircle, Clock, Shield, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Healthcare Services - Pines VA',
  description: 'Professional Virtual Medical Assistant (VMA) services for clinics, healthcare providers, and medical businesses.',
}

export default function HealthcareServicesPage() {
  const features = [
    'Patient Scheduling',
    'Medical Records Management',
    'Insurance Verification',
    'Appointment Reminders',
    'Prescription Coordination',
    'Billing Support',
    'HIPAA Compliance',
    'Telehealth Support'
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
      description: 'Reduce administrative burden and focus on patient care'
    }
  ]

  const specializations = [
    'General Practice',
    'Pediatrics', 
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Mental Health'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Healthcare Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Virtual Medical Assistants (VMA) provide specialized healthcare support for clinics, 
            healthcare providers, and medical businesses. We handle administrative tasks, patient coordination, 
            scheduling, and back-office support with professionalism and compassion.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Virtual Medical Assistants (VMA) Can Do</h2>
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Stethoscope className="h-24 w-24 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Healthcare Excellence</h3>
              <p className="text-gray-600">HIPAA-compliant support for medical practices</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Why Choose Our Medical Assistance</h2>
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

        {/* Specializations */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Healthcare Specializations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {specializations.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{spec}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-red-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Medical Practice?</h2>
          <p className="text-lg mb-6">Connect with us today and find your HIPAA-compliant Medical Virtual Assistant</p>
          <Link 
            href="/connect" 
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