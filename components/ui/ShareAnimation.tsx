'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface ShareAnimationProps {
  width?: number
  height?: number
  className?: string
}

export default function ShareAnimation({ 
  width = 320, 
  height = 280, 
  className = "" 
}: ShareAnimationProps) {
  const [animationData, setAnimationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/animations/share-animation.json')
        if (!response.ok) {
          throw new Error('Failed to load animation')
        }
        const data = await response.json()
        setAnimationData(data)
      } catch (err) {
        console.error('Error loading Share animation:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadAnimation()
  }, [])

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg animate-pulse ${className}`}
        style={{ width, height }}
      >
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !animationData) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">Share & Connect</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  )
}