'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "How quickly can we get started?",
    answer: "Most clients are matched with their ideal VA within 48-72 hours of our initial consultation. We prioritize quality matching while maintaining quick turnaround times to meet your business needs."
  },
  {
    question: "What is your VA screening and selection process?",
    answer: "Our VAs undergo rigorous screening including skills assessments, background checks, English proficiency tests, and multiple interviews. We only accept the top 3% of applicants to ensure you receive exceptional talent."
  },
  {
    question: "How do you ensure quality and consistency?",
    answer: "We provide ongoing training, regular performance reviews, and dedicated account management. Each VA has backup support, and we maintain quality standards through continuous monitoring and client feedback."
  },
  {
    question: "What if my VA isn't the right fit?",
    answer: "We offer a satisfaction guarantee. If you're not completely satisfied within the first two weeks, we'll find you a better match at no additional cost. Your success is our priority."
  },
  {
    question: "How do you handle confidentiality and data security?",
    answer: "All VAs sign comprehensive NDAs and undergo security training. We use encrypted communication channels, secure file sharing systems, and follow strict data protection protocols to safeguard your business information."
  },
  {
    question: "Can I scale my VA support up or down as needed?",
    answer: "Absolutely! Our flexible model allows you to adjust hours, add team members, or modify services as your business grows. We adapt to your changing needs without long-term commitments."
  },
  {
    question: "What time zones do your VAs work in?",
    answer: "Our VAs are strategically located across multiple time zones to provide coverage when you need it. We can match you with VAs who work during your business hours or provide 24/7 support."
  },
  {
    question: "How do you communicate and manage projects?",
    answer: "We use your preferred communication tools (Slack, Teams, Zoom, etc.) and project management platforms. Regular check-ins, detailed reporting, and transparent communication ensure seamless collaboration."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about working with Pines VA. 
            Have a specific question? We'd love to help.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              We're here to help. Schedule a free consultation to discuss your specific needs.
            </p>
            <a
              href="/connect"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}