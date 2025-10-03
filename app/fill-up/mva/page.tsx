'use client'
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { Stethoscope, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function MVAFillUp() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    practiceName: '',
    practiceType: '',
    patientVolume: '',
    specialties: '',
    currentChallenges: '',
    administrativeTasks: '',
    ehrSystem: '',
    complianceNeeds: '',
    patientInteraction: '',
    hoursPerWeek: '',
    experienceLevel: '',
    timeline: '',
    hipaaRequirements: '',
    additionalInfo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('MVA Form submitted:', formData)
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
      <section className="bg-gradient-to-br from-red-50 to-red-100 pt-24 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-600 p-4 rounded-lg text-white mr-4">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-900">Medical Virtual Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to streamline your medical practice? Fill out this form to get matched with 
            a Medical Virtual Assistant who can handle HIPAA-compliant administrative tasks.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Medical Practice Support Requirements</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal & Practice Information */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                    placeholder="e.g., MD, Practice Manager, Administrator"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="practiceName" className="block text-sm font-medium text-gray-700 mb-2">
                    Practice/Organization Name *
                  </label>
                  <input
                    type="text"
                    id="practiceName"
                    name="practiceName"
                    required
                    value={formData.practiceName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  />
                </div>
                <div>
                  <label htmlFor="practiceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Type *
                  </label>
                  <select
                    id="practiceType"
                    name="practiceType"
                    required
                    value={formData.practiceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  >
                    <option value="">Select practice type</option>
                    <option value="primary-care">Primary Care</option>
                    <option value="specialty-clinic">Specialty Clinic</option>
                    <option value="dental">Dental Practice</option>
                    <option value="mental-health">Mental Health</option>
                    <option value="urgent-care">Urgent Care</option>
                    <option value="hospital">Hospital</option>
                    <option value="telehealth">Telehealth</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Specialties
                  </label>
                  <input
                    type="text"
                    id="specialties"
                    name="specialties"
                    value={formData.specialties}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                    placeholder="e.g., Cardiology, Family Medicine, Pediatrics"
                  />
                </div>
                <div>
                  <label htmlFor="patientVolume" className="block text-sm font-medium text-gray-700 mb-2">
                    Daily patient volume *
                  </label>
                  <select
                    id="patientVolume"
                    name="patientVolume"
                    required
                    value={formData.patientVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  >
                    <option value="">Select volume</option>
                    <option value="under-20">Under 20 patients</option>
                    <option value="20-50">20-50 patients</option>
                    <option value="50-100">50-100 patients</option>
                    <option value="100+">100+ patients</option>
                  </select>
                </div>
              </div>

              {/* Administrative Tasks & Challenges */}
              <div>
                <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 mb-2">
                  Current administrative challenges *
                </label>
                <textarea
                  id="currentChallenges"
                  name="currentChallenges"
                  required
                  rows={4}
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  placeholder="What administrative challenges are you facing that a MVA could help solve?"
                />
              </div>

              <div>
                <label htmlFor="administrativeTasks" className="block text-sm font-medium text-gray-700 mb-2">
                  Administrative tasks needed *
                </label>
                <textarea
                  id="administrativeTasks"
                  name="administrativeTasks"
                  required
                  rows={4}
                  value={formData.administrativeTasks}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  placeholder="e.g., Appointment scheduling, insurance verification, medical records management, patient communication..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ehrSystem" className="block text-sm font-medium text-gray-700 mb-2">
                    EHR/EMR System *
                  </label>
                  <select
                    id="ehrSystem"
                    name="ehrSystem"
                    required
                    value={formData.ehrSystem}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  >
                    <option value="">Select EHR system</option>
                    <option value="epic">Epic</option>
                    <option value="cerner">Cerner</option>
                    <option value="allscripts">Allscripts</option>
                    <option value="athenahealth">athenaHealth</option>
                    <option value="eclinicworks">eClinicalWorks</option>
                    <option value="drchrono">DrChrono</option>
                    <option value="practice-fusion">Practice Fusion</option>
                    <option value="other">Other</option>
                    <option value="none">No EHR system</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="patientInteraction" className="block text-sm font-medium text-gray-700 mb-2">
                    Patient interaction level *
                  </label>
                  <select
                    id="patientInteraction"
                    name="patientInteraction"
                    required
                    value={formData.patientInteraction}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  >
                    <option value="">Select level</option>
                    <option value="no-contact">No patient contact</option>
                    <option value="phone-only">Phone calls only</option>
                    <option value="phone-email">Phone calls & emails</option>
                    <option value="full-interaction">Full patient interaction</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="complianceNeeds" className="block text-sm font-medium text-gray-700 mb-2">
                  Compliance & regulatory requirements *
                </label>
                <textarea
                  id="complianceNeeds"
                  name="complianceNeeds"
                  required
                  rows={3}
                  value={formData.complianceNeeds}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  placeholder="HIPAA compliance requirements, state regulations, specialty-specific requirements..."
                />
              </div>

              <div>
                <label htmlFor="hipaaRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  HIPAA & security requirements *
                </label>
                <textarea
                  id="hipaaRequirements"
                  name="hipaaRequirements"
                  required
                  rows={3}
                  value={formData.hipaaRequirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  placeholder="Specific HIPAA compliance needs, BAA requirements, security protocols..."
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
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
                  Required healthcare experience *
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  required
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry level (1-2 years healthcare admin)</option>
                  <option value="mid">Mid level (3-5 years healthcare admin)</option>
                  <option value="senior">Senior level (5+ years healthcare admin)</option>
                  <option value="specialty-specific">Specialty-specific experience required</option>
                  <option value="clinical-background">Clinical background preferred</option>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-600 focus:border-stone-600"
                  placeholder="Any other medical practice requirements, certifications needed, or information you'd like us to know..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Submit Medical Application
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Support Team</h2>
            <p className="text-xl text-gray-600">Our healthcare specialists understand medical practice requirements.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-stone-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">medical@xpinesva.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-stone-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-stone-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600 text-sm">HIPAA-Compliant Remote</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-stone-600 mb-3" />
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
