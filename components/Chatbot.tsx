'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your VA assistant. How can I help you today? I can provide information about our services, pricing, or answer any questions about virtual assistants.",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const predefinedResponses: { [key: string]: string } = {
    'hello': "Hello! Welcome to Pines VA. I'm here to help you learn about our virtual assistant services. What would you like to know?",
    'services': "We offer 4 main services: GVA (General Virtual Assistant), EVA (Executive Virtual Assistant), ISA (Inside Sales Agent), and VMA (Virtual Medical Assistant). Which one interests you?",
    'pricing': "Our pricing is competitive and tailored to your specific needs. For accurate pricing, I'd recommend scheduling a free consultation where we can discuss your requirements in detail.",
    'gva': "Our General Virtual Assistant (GVA) service includes email management, calendar scheduling, data entry, customer support, and document management. Perfect for daily business operations!",
    'eva': "Executive Virtual Assistant (EVA) provides high-level support including executive calendar management, travel planning, meeting coordination, and strategic planning support for C-suite professionals.",
    'isa': "Inside Sales Agent (ISA) focuses on lead generation, cold calling, CRM management, sales pipeline management, and follow-up campaigns to drive your revenue growth.",
    'vma': "Virtual Medical Assistant (VMA) offers specialized healthcare support including patient scheduling, medical records management, insurance verification, and appointment reminders - all HIPAA compliant.",
    'contact': "You can reach us at hello@pinesva.com or call +1 (234) 567-8900. We typically respond within 2 hours during business hours!",
    'hours': "Our business hours are Monday-Friday 8:00 AM - 8:00 PM (EST), Saturday 9:00 AM - 5:00 PM (EST), and emergency support only on Sunday.",
    'default': "I understand you're asking about that. For detailed information, I'd recommend speaking with our team directly. You can contact us at hello@pinesva.com or schedule a free consultation!"
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return predefinedResponses['hello']
    } else if (message.includes('service') || message.includes('what do you offer')) {
      return predefinedResponses['services']
    } else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
      return predefinedResponses['pricing']
    } else if (message.includes('gva') || message.includes('general')) {
      return predefinedResponses['gva']
    } else if (message.includes('eva') || message.includes('executive')) {
      return predefinedResponses['eva']
    } else if (message.includes('isa') || message.includes('sales')) {
      return predefinedResponses['isa']
    } else if (message.includes('vma') || message.includes('medical')) {
      return predefinedResponses['vma']
    } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
      return predefinedResponses['contact']
    } else if (message.includes('hours') || message.includes('time')) {
      return predefinedResponses['hours']
    } else {
      return predefinedResponses['default']
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <div>
                <h3 className="font-semibold">Pines VA Assistant</h3>
                <p className="text-xs text-blue-100">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-white text-gray-800 border'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className="flex items-start">
                    {message.isBot && (
                      <Bot className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                    )}
                    {!message.isBot && (
                      <User className="w-4 h-4 ml-2 mt-0.5 text-blue-100 order-2" />
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border px-3 py-2 rounded-lg max-w-xs">
                  <div className="flex items-center">
                    <Bot className="w-4 h-4 mr-2 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}