'use client'

import { Shield, Lock, Users, Award, FileCheck, Eye } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'Enterprise-grade security protocols protect your sensitive business information with encrypted storage and transmission.',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: FileCheck,
    title: 'Confidentiality Agreements',
    description: 'All VAs sign comprehensive NDAs and confidentiality agreements before accessing any client information.',
    color: 'bg-brown-100',
    iconColor: 'text-brown-600'
  },
  {
    icon: Users,
    title: 'Background Verification',
    description: 'Rigorous background checks, reference verification, and identity confirmation for every team member.',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Lock,
    title: 'Secure Access Controls',
    description: 'Multi-factor authentication, role-based permissions, and secure VPN connections for all work activities.',
    color: 'bg-brown-100',
    iconColor: 'text-brown-600'
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Regular security audits, activity monitoring, and compliance checks ensure ongoing protection.',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Our VAs receive ongoing security training and maintain certifications in data protection best practices.',
    color: 'bg-brown-100',
    iconColor: 'text-brown-600'
  }
]

const trustMetrics = [
  { number: '99.9%', label: 'Data Security Uptime' },
  { number: '100%', label: 'NDA Compliance' },
  { number: '24/7', label: 'Security Monitoring' },
  { number: '3%', label: 'Acceptance Rate' }
]

export default function SecurityTrust() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Security & Trust</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your business data and confidential information are protected by industry-leading 
            security measures and strict confidentiality protocols.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                {metric.number}
              </div>
              <div className="text-gray-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Compliance Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-brown-50 rounded-2xl p-8 lg:p-12 text-center border border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Compliance</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            We maintain compliance with international data protection standards including GDPR, 
            and follow industry best practices for healthcare (HIPAA), financial services, 
            and other regulated industries.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
            <span className="bg-white px-4 py-2 rounded-full border border-gray-200">GDPR Compliant</span>
            <span className="bg-white px-4 py-2 rounded-full border border-gray-200">HIPAA Trained</span>
            <span className="bg-white px-4 py-2 rounded-full border border-gray-200">ISO 27001 Aligned</span>
            <span className="bg-white px-4 py-2 rounded-full border border-gray-200">SOC 2 Ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}