import { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Handshake, AlertTriangle, Scale, Clock, Shield, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - Pines VA',
  description: 'Terms of Service for Pines VA virtual assistant services. Understand our service agreements, responsibilities, and terms for administrative, healthcare, and real estate support.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Scale className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Professional virtual assistant services agreement and terms
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
              <Handshake className="w-6 h-6 text-green-600 mr-3" />
              Agreement Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Pines VA. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our virtual assistant services, 
              including Administrative Excellence, Healthcare Services (Medical Virtual Assistant - MVA), and Real Estate 
              Support services. By engaging our services, you agree to be bound by these Terms.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 font-medium">
                Our mission is to provide professional, reliable, and confidential virtual assistant services that help 
                your business thrive while maintaining the highest standards of integrity and professionalism.
              </p>
            </div>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 text-green-600 mr-3" />
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-green-600">Administrative Excellence</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Executive administrative support</li>
                  <li>• Inside Sales Agent (ISA) services</li>
                  <li>• Business operations management</li>
                  <li>• Email and calendar management</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-red-600">Healthcare Services (MVA)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• HIPAA-compliant patient support</li>
                  <li>• Medical appointment scheduling</li>
                  <li>• Insurance verification</li>
                  <li>• Medical records management</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-blue-600">Real Estate Support</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• General Virtual Assistant (GVA)</li>
                  <li>• Executive Virtual Assistant (EVA)</li>
                  <li>• Transaction coordination</li>
                  <li>• Client relationship management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Client Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              Client Responsibilities
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Information Accuracy</h3>
                <p className="text-gray-700">
                  Clients must provide accurate, complete, and up-to-date information necessary for service delivery. 
                  Any changes to business processes, contact information, or service requirements must be communicated promptly.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access and Permissions</h3>
                <p className="text-gray-700">
                  Clients are responsible for providing appropriate access credentials, permissions, and training materials 
                  required for our virtual assistants to perform their duties effectively and securely.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication and Feedback</h3>
                <p className="text-gray-700">
                  Maintain regular communication, provide timely feedback, and participate in scheduled check-ins to ensure 
                  service quality and alignment with business objectives.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance and Legal Requirements</h3>
                <p className="text-gray-700">
                  Ensure all requested tasks comply with applicable laws, regulations, and industry standards. For healthcare 
                  clients, maintain HIPAA compliance and provide necessary Business Associate Agreements.
                </p>
              </div>
            </div>
          </section>

          {/* Service Standards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              Our Service Standards
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quality Assurance</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Professional, trained virtual assistants</li>
                    <li>• Regular quality monitoring and feedback</li>
                    <li>• Continuous training and skill development</li>
                    <li>• Escalation procedures for complex issues</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security and Confidentiality</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Strict confidentiality agreements</li>
                    <li>• Secure data handling protocols</li>
                    <li>• HIPAA compliance for healthcare services</li>
                    <li>• Regular security training and updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-green-600 mr-3" />
              Payment and Billing Terms
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Billing Cycle</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Monthly billing for ongoing services</li>
                    <li>• Project-based billing for specific tasks</li>
                    <li>• Hourly rates for ad-hoc support</li>
                    <li>• Custom packages available</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Terms</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Net 15 payment terms</li>
                    <li>• Accepted payment methods: ACH, wire transfer</li>
                    <li>• Late fees may apply after 30 days</li>
                    <li>• Service suspension for non-payment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-green-600 mr-3" />
              Limitation of Liability
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Limitations</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  Our virtual assistants provide professional support services but are not licensed professionals in 
                  healthcare, legal, or financial services. Clients retain full responsibility for final decisions 
                  and compliance with industry regulations.
                </p>
                <p>
                  Pines VA's liability is limited to the amount paid for services in the preceding 12 months. We are 
                  not liable for indirect, consequential, or incidental damages arising from service use.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Termination</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Client Termination</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 30-day written notice required</li>
                  <li>• Outstanding invoices must be paid</li>
                  <li>• Data return within 30 days</li>
                  <li>• Confidentiality obligations continue</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Pines VA Termination</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 30-day notice for non-breach termination</li>
                  <li>• Immediate termination for breach of terms</li>
                  <li>• Non-payment or violation of policies</li>
                  <li>• Illegal or unethical requests</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All work products, documents, and materials created by our virtual assistants belong to the client. 
              However, Pines VA retains ownership of its methodologies, processes, and proprietary systems used 
              in service delivery.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Any pre-existing intellectual property, training materials, or proprietary 
                systems developed by Pines VA remain our property and may be used across multiple client engagements.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of the State of [Your State] without regard to conflict of law 
                principles. Any disputes will be resolved through binding arbitration in accordance with the rules 
                of the American Arbitration Association.
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Dispute Resolution Process</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Direct negotiation between parties</li>
                  <li>2. Mediation with neutral third party</li>
                  <li>3. Binding arbitration if necessary</li>
                  <li>4. All proceedings conducted confidentially</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms</h2>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service or need clarification on any provisions, 
                please contact our team:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@pinesva.com</p>
                <p><strong>Phone:</strong> 1-800-PINES-VA</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
              </div>
            </div>
          </section>

          {/* Updates to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms of Service from time to time to reflect changes in our services, legal 
              requirements, or business practices. We will notify clients of material changes at least 30 days 
              in advance. Continued use of our services after changes take effect constitutes acceptance of the 
              updated terms.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}