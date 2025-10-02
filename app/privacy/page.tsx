import { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Shield, FileText, Users, Lock, Eye, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - Pines VA',
  description: 'Privacy Policy for Pines VA virtual assistant services. Learn how we protect your data and maintain confidentiality across all our administrative, healthcare, and real estate support services.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy and data security are our top priorities at Pines VA
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At Pines VA, we are committed to protecting the privacy and security of our clients&apos; information. 
              As a provider of virtual assistant services specializing in administrative excellence, healthcare support, 
              and real estate assistance, we understand the sensitive nature of the data we handle. This Privacy Policy 
              explains how we collect, use, protect, and share information when you use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 text-blue-600 mr-3" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700">
                  We collect personal information you provide directly, including name, email address, phone number, 
                  business information, and any other details necessary to provide our virtual assistant services.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Information (HIPAA Protected)</h3>
                <p className="text-gray-700">
                  For our Medical Virtual Assistant (MVA) services, we may handle Protected Health Information (PHI) 
                  as defined by HIPAA. We maintain strict compliance with all HIPAA requirements and have appropriate 
                  Business Associate Agreements in place.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business and Client Information</h3>
                <p className="text-gray-700">
                  In providing administrative and real estate support, we may access client databases, contact information, 
                  financial records, and other business-sensitive data as required to perform our services.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Information</h3>
                <p className="text-gray-700">
                  We collect technical information including IP addresses, browser type, device information, and usage 
                  data to improve our services and ensure security.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              How We Use Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Service Delivery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Provide virtual assistant services</li>
                  <li>• Manage your account and communications</li>
                  <li>• Process appointments and scheduling</li>
                  <li>• Handle administrative tasks</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Business Operations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Improve our services and processes</li>
                  <li>• Ensure security and prevent fraud</li>
                  <li>• Comply with legal obligations</li>
                  <li>• Communicate important updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection & Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 text-blue-600 mr-3" />
              Data Protection & Security
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                  <p className="text-sm text-gray-700">All data is encrypted in transit and at rest using industry-standard protocols</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliance</h3>
                  <p className="text-sm text-gray-700">Full HIPAA compliance for all healthcare-related virtual assistant services</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Access Control</h3>
                  <p className="text-sm text-gray-700">Strict access controls and regular security training for all team members</p>
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing & Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, rent, or share your personal information with third parties except in the following circumstances:
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <p className="text-gray-700">With your explicit consent</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <p className="text-gray-700">As required by law or legal process</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <p className="text-gray-700">To protect our rights, property, or safety</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <p className="text-gray-700">With trusted service providers under strict confidentiality agreements</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights & Choices</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Data Rights</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Access your personal information</li>
                  <li>• Request corrections or updates</li>
                  <li>• Request deletion of your data</li>
                  <li>• Withdraw consent where applicable</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Communication Preferences</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Opt-out of marketing communications</li>
                  <li>• Choose communication methods</li>
                  <li>• Set privacy preferences</li>
                  <li>• Request information about data use</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-blue-600 mr-3" />
              Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your information for as long as necessary to provide our services and comply with legal obligations. 
              For healthcare information, we follow HIPAA retention requirements. For business information, we typically 
              retain data for 7 years after service termination unless otherwise required by law or requested for deletion.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">privacy@pinesva.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">1-800-PINES-VA</span>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by 
              posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. We encourage you 
              to review this Privacy Policy periodically for any changes.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}