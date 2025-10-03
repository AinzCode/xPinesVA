'use client';

import { useState } from 'react';
import { Award, Star, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SubmitTestimonialPage() {
  const [formData, setFormData] = useState({
    client_name: '',
    client_company: '',
    client_role: '',
    testimonial: '',
    rating: 5,
    service_type: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit testimonial');
      }

      setSubmitted(true);
      setFormData({
        client_name: '',
        client_company: '',
        client_role: '',
        testimonial: '',
        rating: 5,
        service_type: '',
        email: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#052814] to-[#074d24] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600">
              Your testimonial has been submitted successfully and is pending approval.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setSubmitted(false)}
              className="w-full px-6 py-3 bg-[#052814] text-white rounded-lg font-medium hover:bg-[#074d24] transition-colors"
            >
              Submit Another Testimonial
            </button>
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#052814] to-[#074d24] pt-24 lg:pt-32 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <Award className="h-8 w-8 text-[#052814]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Share Your Experience</h1>
          <p className="text-green-100">
            Help us improve by sharing your experience with Pines VA
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814] focus:border-transparent"
                placeholder="john@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your email won&apos;t be displayed publicly
              </p>
            </div>

            {/* Company & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.client_company}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814] focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  value={formData.client_role}
                  onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814] focus:border-transparent"
                  placeholder="CEO, Manager, etc."
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Used <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.service_type}
                onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814] focus:border-transparent"
              >
                <option value="">Select a service</option>
                <option value="GVA">General Virtual Assistant (GVA)</option>
                <option value="EVA">Executive Virtual Assistant (EVA)</option>
                <option value="ISA">Instagram Social Assistant (ISA)</option>
                <option value="MVA">Medical Virtual Assistant (MVA)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600 self-center">
                  {formData.rating} out of 5 stars
                </span>
              </div>
            </div>

            {/* Testimonial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814] focus:border-transparent resize-none"
                placeholder="Tell us about your experience with Pines VA..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.testimonial.length} characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                By submitting this testimonial, you agree that Pines VA may use your feedback 
                on our website and marketing materials. Your testimonial will be reviewed 
                before being published.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#052814] text-white rounded-lg font-medium hover:bg-[#074d24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Testimonial
                  </>
                )}
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-green-100 text-sm mt-6">
          Questions? Contact us at{' '}
          <a href="mailto:support@pinesva.com" className="underline hover:text-white">
            support@pinesva.com
          </a>
        </p>
      </div>
    </div>
  );
}
