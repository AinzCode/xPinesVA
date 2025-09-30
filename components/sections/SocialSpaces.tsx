'use client'

import { Linkedin, Facebook, Twitter } from 'lucide-react'

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/company/pines-va',
    description: 'Connect with us professionally and stay updated with industry insights.',
    color: 'bg-blue-700 hover:bg-blue-800',
    followers: '5.2K'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/pinesva',
    description: 'Join our community and see success stories from our clients.',
    color: 'bg-blue-600 hover:bg-blue-700',
    followers: '8.1K'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/pinesva',
    description: 'Follow us for quick tips, updates, and virtual assistant best practices.',
    color: 'bg-black hover:bg-gray-800',
    followers: '3.7K'
  },
]

export default function SocialSpaces() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Social Spaces</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with us on social media to stay updated with the latest in virtual assistance, 
            business tips, and success stories from our amazing clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group block"
            >
              <div className="text-center">
                <div className={`${social.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white transition-colors`}>
                  <social.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{social.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{social.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-2xl font-bold text-gray-900">{social.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                
                <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  Follow Us →
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Connected</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of our growing community and get exclusive insights, tips, and updates 
            about virtual assistance and business growth strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <social.icon className="w-5 h-5" />
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}