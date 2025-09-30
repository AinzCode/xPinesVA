'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function Connect() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    expertise: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with Supabase or your preferred form handling
    console.log('Form submitted:', formData)
    // Show success message or redirect
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to transform your business with premium virtual assistant services? 
            Get in touch with our team and discover how we can help you scale efficiently.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-1">General inquiries:</p>
                    <a href="mailto:hello@pinesva.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      hello@pinesva.com
                    </a>
                    <p className="text-gray-600 mt-2 mb-1">Sales inquiries:</p>
                    <a href="mailto:sales@pinesva.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      sales@pinesva.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-1">Main line:</p>
                    <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700 font-medium">
                      +1 (234) 567-8900
                    </a>
                    <p className="text-gray-600 mt-2 mb-1">Sales hotline:</p>
                    <a href="tel:+1234567891" className="text-blue-600 hover:text-blue-700 font-medium">
                      +1 (234) 567-8901
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 8:00 PM (EST)</p>
                      <p>Saturday: 9:00 AM - 5:00 PM (EST)</p>
                      <p>Sunday: Emergency support only</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Reach</h3>
                    <p className="text-gray-600">
                      We operate globally with team members across multiple time zones 
                      to provide 24/7 support for our clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Response Guarantee</h3>
                <p className="text-gray-600 mb-4">
                  We typically respond to all inquiries within 2 hours during business hours 
                  and within 24 hours on weekends.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  Average response time: 1.5 hours
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="30"
                    />
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>

                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise Needed *
                  </label>
                  <select
                    id="expertise"
                    name="expertise"
                    required
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
                    <option value="gva">General Virtual Assistant (GVA)</option>
                    <option value="eva">Executive Virtual Assistant (EVA)</option>
                    <option value="isa">Inside Sales Agent (ISA)</option>
                    <option value="vma">Virtual Medical Assistant (VMA)</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="consultation">Not sure - Need Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name (Current/Previous)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your specific needs, current challenges, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4 text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}