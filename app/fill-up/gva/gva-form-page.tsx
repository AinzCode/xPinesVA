'use client'
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { UserCheck, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function GVAFillUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    currentChallenges: '',
    tasksToDelegate: '',
    hoursPerWeek: '',
    experience: '',
    timeline: '',
    additionalInfo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('GVA Form submitted:', formData)
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
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 pt-24 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-lg text-white mr-4">
              <UserCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-900">General Virtual Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to streamline your business operations? Fill out this form to get matched with 
            a General Virtual Assistant who can handle your administrative tasks and boost your productivity.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tell Us About Your Needs</h2>
            
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type/Industry *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your industry</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="consulting">Consulting</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="legal">Legal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 mb-2">
                  What are your current business challenges? *
                </label>
                <textarea
                  id="currentChallenges"
                  name="currentChallenges"
                  required
                  rows={4}
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the main challenges you're facing that a VA could help solve..."
                />
              </div>

              <div>
                <label htmlFor="tasksToDelegate" className="block text-sm font-medium text-gray-700 mb-2">
                  What tasks would you like to delegate? *
                </label>
                <textarea
                  id="tasksToDelegate"
                  name="tasksToDelegate"
                  required
                  rows={4}
                  value={formData.tasksToDelegate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Email management, data entry, customer service, scheduling, research..."
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select hours</option>
                    <option value="10-20">10-20 hours</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience level preference
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">No preference</option>
                  <option value="entry">Entry level (1-2 years)</option>
                  <option value="mid">Mid level (3-5 years)</option>
                  <option value="senior">Senior level (5+ years)</option>
                </select>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any other requirements, preferences, or information you'd like us to know..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Submit Application
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-xl text-gray-600">Our team is here to assist you with any questions.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">hrteam@pinesva.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600 text-sm">+(074) 661 4195</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600 text-sm">Global Remote</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-green-600 mb-3" />
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
