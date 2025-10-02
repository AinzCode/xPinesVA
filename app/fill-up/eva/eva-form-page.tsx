'use client'
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Building2, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function EVAFillUp() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    company: '',
    industryType: '',
    teamSize: '',
    executiveLevel: '',
    currentChallenges: '',
    executiveTasks: '',
    meetingManagement: '',
    travelFrequency: '',
    hoursPerWeek: '',
    experienceLevel: '',
    timeline: '',
    confidentialityNeeds: '',
    additionalInfo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('EVA Form submitted:', formData)
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
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 pt-24 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-600 p-4 rounded-lg text-white mr-4">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-900">Executive Virtual Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready for high-level executive support? Fill out this form to get matched with 
            an Executive Virtual Assistant who can manage complex tasks and strategic initiatives.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Executive Support Requirements</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal & Professional Information */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title/Position *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                    placeholder="e.g., CEO, VP, Director, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  />
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  />
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size *
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    required
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
              </div>

              {/* Executive Level & Industry */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="executiveLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Executive Level *
                  </label>
                  <select
                    id="executiveLevel"
                    name="executiveLevel"
                    required
                    value={formData.executiveLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  >
                    <option value="">Select level</option>
                    <option value="c-suite">C-Suite (CEO, CFO, COO, etc.)</option>
                    <option value="vp">Vice President</option>
                    <option value="director">Director</option>
                    <option value="senior-manager">Senior Manager</option>
                  </select>
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="consulting">Consulting</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="legal">Legal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Executive Tasks & Requirements */}
              <div>
                <label htmlFor="executiveTasks" className="block text-sm font-medium text-gray-700 mb-2">
                  What executive tasks need support? *
                </label>
                <textarea
                  id="executiveTasks"
                  name="executiveTasks"
                  required
                  rows={4}
                  value={formData.executiveTasks}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  placeholder="e.g., Calendar management, travel planning, meeting coordination, strategic planning support, executive communications..."
                />
              </div>

              <div>
                <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 mb-2">
                  Current executive challenges *
                </label>
                <textarea
                  id="currentChallenges"
                  name="currentChallenges"
                  required
                  rows={4}
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  placeholder="What executive-level challenges are you facing that an EVA could help solve?"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="meetingManagement" className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting management needs *
                  </label>
                  <select
                    id="meetingManagement"
                    name="meetingManagement"
                    required
                    value={formData.meetingManagement}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  >
                    <option value="">Select level</option>
                    <option value="basic">Basic scheduling</option>
                    <option value="moderate">Agenda prep & follow-up</option>
                    <option value="comprehensive">Full meeting management</option>
                    <option value="board-level">Board-level coordination</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="travelFrequency" className="block text-sm font-medium text-gray-700 mb-2">
                    Travel frequency
                  </label>
                  <select
                    id="travelFrequency"
                    name="travelFrequency"
                    value={formData.travelFrequency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  >
                    <option value="">Select frequency</option>
                    <option value="none">No travel</option>
                    <option value="occasional">Occasional (few times/year)</option>
                    <option value="monthly">Monthly</option>
                    <option value="frequent">Frequent (weekly/bi-weekly)</option>
                  </select>
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                >
                  <option value="">Select experience level</option>
                  <option value="senior">Senior level (5+ years executive support)</option>
                  <option value="expert">Expert level (10+ years executive support)</option>
                  <option value="c-suite-exp">C-Suite experience required</option>
                </select>
              </div>

              <div>
                <label htmlFor="confidentialityNeeds" className="block text-sm font-medium text-gray-700 mb-2">
                  Confidentiality & security requirements
                </label>
                <textarea
                  id="confidentialityNeeds"
                  name="confidentialityNeeds"
                  rows={3}
                  value={formData.confidentialityNeeds}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  placeholder="Any specific confidentiality, NDA, or security requirements..."
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700"
                  placeholder="Any other executive support requirements, preferences, or information you'd like us to know..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Submit Executive Application
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Support Team</h2>
            <p className="text-xl text-gray-600">Our executive support specialists are ready to assist you.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-stone-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">executive@xpinesva.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-stone-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-stone-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600 text-sm">Global Remote</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-stone-700 mb-3" />
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
