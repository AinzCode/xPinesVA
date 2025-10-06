'use client'


import { Shield, Lock, Users, Award, FileCheck, Eye } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'Enterprise-grade security protocols protect your sensitive business information with encrypted storage and transmission.',
    color: 'bg-[#4C8B4A]/10',
    iconColor: 'text-[#4C8B4A]'
  },
  {
    icon: FileCheck,
    title: 'Confidentiality Agreements',
    description: 'All VAs sign comprehensive NDAs and confidentiality agreements before accessing any client information.',
    color: 'bg-[#C7A97B]/10',
    iconColor: 'text-[#C7A97B]'
  },
  {
    icon: Users,
    title: 'Background Verification',
    description: 'Rigorous background checks, reference verification, and identity confirmation for every team member.',
    color: 'bg-[#4C8B4A]/10',
    iconColor: 'text-[#4C8B4A]'
  },
  {
    icon: Lock,
    title: 'Secure Access Controls',
    description: 'Multi-factor authentication, role-based permissions, and secure VPN connections for all work activities.',
    color: 'bg-[#C7A97B]/10',
    iconColor: 'text-[#C7A97B]'
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Regular security audits, activity monitoring, and compliance checks ensure ongoing protection.',
    color: 'bg-[#4C8B4A]/10',
    iconColor: 'text-[#4C8B4A]'
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Our VAs receive ongoing security training and maintain certifications in data protection best practices.',
    color: 'bg-[#C7A97B]/10',
    iconColor: 'text-[#C7A97B]'
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
    <section className="py-16 bg-[#F4EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4">Security & Trust</h2>
          <p className="text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto">
            Your business data and confidential information are protected by industry-leading 
            security measures and strict confidentiality protocols.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-[#C7A97B]/20">
              <div className="text-2xl lg:text-3xl font-bold text-[#4C8B4A] mb-2">
                {metric.number}
              </div>
              <div className="text-[#2D2D2D]/70 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-[#C7A97B]/20">
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">{feature.title}</h3>
              <p className="text-[#2D2D2D]/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Compliance Section */}
        <div className="mt-12 bg-white rounded-lg p-6 text-center shadow-xl border border-[#C7A97B]/20">
          <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">Industry Compliance</h3>
          <p className="text-sm text-[#2D2D2D]/70 mb-4 max-w-2xl mx-auto">
            We maintain compliance with international data protection standards.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#4C8B4A]/5 px-3 py-2 rounded-lg border border-[#4C8B4A]/20 hover:bg-[#4C8B4A]/10 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium text-[#4C8B4A]">GDPR Compliant</span>
            </div>
            <div className="bg-[#C7A97B]/5 px-3 py-2 rounded-lg border border-[#C7A97B]/20 hover:bg-[#C7A97B]/10 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium text-[#C7A97B]">HIPAA Trained</span>
            </div>
            <div className="bg-[#4C8B4A]/5 px-3 py-2 rounded-lg border border-[#4C8B4A]/20 hover:bg-[#4C8B4A]/10 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium text-[#4C8B4A]">ISO 27001 Aligned</span>
            </div>
            <div className="bg-[#C7A97B]/5 px-3 py-2 rounded-lg border border-[#C7A97B]/20 hover:bg-[#C7A97B]/10 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium text-[#C7A97B]">SOC 2 Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
