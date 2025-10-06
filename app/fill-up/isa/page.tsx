'use client'
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function ISAFillUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industryType: '',
    salesVolume: '',
    leadSources: '',
    currentChallenges: '',
    salesProcesses: '',
    crmSystem: '',
    callVolume: '',
    conversionGoals: '',
    hoursPerWeek: '',
    experienceLevel: '',
    timeline: '',
    kpiRequirements: '',
    additionalInfo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('ISA Form submitted:', formData)
    // Add form submission logic here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-[#097969]/20 pt-24 lg:pt-32 pb-12 overflow-hidden">
        {/* Subtle Wavy Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern-isa" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 Q25,10 50,25 T100,25" stroke="#059669" strokeWidth="0.5" fill="none" opacity="0.6"/>
                <path d="M0,35 Q25,20 50,35 T100,35" stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern-isa)"/>
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-600 p-4 rounded-lg text-white mr-4">
              <Phone className="w-8 h-8" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Inside Sales Agent</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to boost your sales performance? Fill out this form to get matched with 
            an Inside Sales Agent who can convert leads and drive revenue growth.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sales Support Requirements</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry Type *
                  </label>
                  <select
                    id="industryType"
                    name="industryType"
                    required
                    value={formData.industryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  >
                    <option value="">Select industry</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="insurance">Insurance</option>
                    <option value="financial-services">Financial Services</option>
                    <option value="saas">SaaS/Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="automotive">Automotive</option>
                    <option value="solar">Solar/Energy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="salesVolume" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly sales volume *
                  </label>
                  <select
                    id="salesVolume"
                    name="salesVolume"
                    required
                    value={formData.salesVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  >
                    <option value="">Select volume</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-50k">$10K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k+">$500K+</option>
                  </select>
                </div>
              </div>

              {/* Sales Process Details */}
              <div>
                <label htmlFor="leadSources" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary lead sources *
                </label>
                <textarea
                  id="leadSources"
                  name="leadSources"
                  required
                  rows={3}
                  value={formData.leadSources}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  placeholder="e.g., Online ads, referrals, cold outreach, website inquiries, social media..."
                />
              </div>

              <div>
                <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 mb-2">
                  Current sales challenges *
                </label>
                <textarea
                  id="currentChallenges"
                  name="currentChallenges"
                  required
                  rows={4}
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  placeholder="What sales challenges are you facing that an ISA could help solve?"
                />
              </div>

              <div>
                <label htmlFor="salesProcesses" className="block text-sm font-medium text-gray-700 mb-2">
                  Sales processes needed *
                </label>
                <textarea
                  id="salesProcesses"
                  name="salesProcesses"
                  required
                  rows={4}
                  value={formData.salesProcesses}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  placeholder="e.g., Lead qualification, cold calling, follow-up sequences, appointment setting, CRM management..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="crmSystem" className="block text-sm font-medium text-gray-700 mb-2">
                    CRM System *
                  </label>
                  <select
                    id="crmSystem"
                    name="crmSystem"
                    required
                    value={formData.crmSystem}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  >
                    <option value="">Select CRM</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="hubspot">HubSpot</option>
                    <option value="pipedrive">Pipedrive</option>
                    <option value="zoho">Zoho CRM</option>
                    <option value="followup-boss">Follow Up Boss</option>
                    <option value="chime">Chime</option>
                    <option value="other">Other</option>
                    <option value="none">No CRM yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="callVolume" className="block text-sm font-medium text-gray-700 mb-2">
                    Expected call volume per day *
                  </label>
                  <select
                    id="callVolume"
                    name="callVolume"
                    required
                    value={formData.callVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  >
                    <option value="">Select volume</option>
                    <option value="20-50">20-50 calls</option>
                    <option value="50-100">50-100 calls</option>
                    <option value="100-200">100-200 calls</option>
                    <option value="200+">200+ calls</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="conversionGoals" className="block text-sm font-medium text-gray-700 mb-2">
                  Conversion goals & KPIs *
                </label>
                <textarea
                  id="conversionGoals"
                  name="conversionGoals"
                  required
                  rows={3}
                  value={formData.conversionGoals}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  placeholder="e.g., 20% lead-to-appointment conversion, 50 qualified leads per week, $10K monthly revenue..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 mb-2">
                    Hours per week needed *
                  </label>
                  <select
                    id="hoursPerWeek"
                    name="hoursPerWeek"
                    required
                    value={formData.hoursPerWeek}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  >
                    <option value="">Select hours</option>
                    <option value="20-30">20-30 hours</option>
                    <option value="30-40">30-40 hours</option>
                    <option value="40+">40+ hours (Full-time)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    When do you need to start? *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediately">Immediately</option>
                    <option value="within-week">Within a week</option>
                    <option value="within-month">Within a month</option>
                    <option value="flexible">I'm flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Required experience level *
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  required
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry level (1-2 years sales)</option>
                  <option value="mid">Mid level (3-5 years sales)</option>
                  <option value="senior">Senior level (5+ years sales)</option>
                  <option value="industry-specific">Industry-specific experience required</option>
                </select>
              </div>

              <div>
                <label htmlFor="kpiRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  KPI tracking & reporting requirements
                </label>
                <textarea
                  id="kpiRequirements"
                  name="kpiRequirements"
                  rows={3}
                  value={formData.kpiRequirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  placeholder="What metrics and reports do you need tracked and delivered?"
                />
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  placeholder="Any other sales requirements, commission structures, team dynamics, or information you'd like us to know..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Submit Sales Application
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sales Team Support</h2>
            <p className="text-xl text-gray-600">Our sales specialists are ready to help you grow your revenue.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-green-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">hrteam@pinesva.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-green-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600 text-sm">+(074) 661 4195</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-green-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600 text-sm">Global Remote</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-green-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
              <p className="text-gray-600 text-sm">Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
