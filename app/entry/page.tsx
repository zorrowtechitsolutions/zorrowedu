'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, Zap, CheckCircle, Download } from 'lucide-react'

export default function EntryPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => setStep(1), 300)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find colleges by stream, district, fees, and entrance exams',
      delay: 'delay-100',
    },
    {
      icon: Zap,
      title: 'AI Guidance',
      description: 'Get personalized college recommendations from Zorrow AI',
      delay: 'delay-200',
    },
    {
      icon: CheckCircle,
      title: 'Easy Apply',
      description: 'Apply to multiple colleges with just one form',
      delay: 'delay-300',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Logo Splash Screen */}
      {step === 0 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20BLACK-nhJwfThkwbrBZfFUdqbcr3N7EKbf8S.png"
                alt="ZorrowEdu"
                className="w-full h-full invert"
              />
            </div>
            <h1 className="text-5xl font-bold text-center">ZorrowEdu</h1>
          </div>
        </div>
      )}


      {/* Main Content - Slides in after logo animation */}
      {step > 0 && (
      <div className="relative min-h-screen flex flex-col">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
          {/* Header with Logo */}
          <div className="pt-8 pb-12 md:pt-12 md:pb-16">
            <div className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20BLACK-nhJwfThkwbrBZfFUdqbcr3N7EKbf8S.png"
                alt="ZorrowEdu"
                className="w-8 h-8 invert"
              />
              <span className="font-bold text-xl">ZorrowEdu</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            {/* Hero Text */}
            <div className={`mb-16 transform transition-all duration-700 ${step > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Kerala's Smartest College & Admission Platform
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl text-balance">
                Discover colleges, explore courses, get AI guidance, and apply—all in one place.
              </p>
            </div>

            {/* Features Grid */}
            <div className={`grid md:grid-cols-3 gap-6 mb-12 transform transition-all duration-700 ${step > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`bg-gray-900 border-2 border-gray-800 rounded-2xl p-6 hover:border-white transition-all duration-300 ${feature.delay}`}
                >
                  <feature.icon className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${step > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-300`}>
              <Link href="/colleges" className="flex-1">
                <Button className="w-full bg-white hover:bg-gray-100 text-black py-6 text-base font-bold rounded-xl">
                  Start Exploring <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full border-2 border-white text-white hover:bg-white/10 py-6 text-base font-bold rounded-xl bg-transparent">
                  My Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className={`py-8 md:py-12 border-t border-gray-800 mt-16 transform transition-all duration-700 ${step > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-500`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Quick Access</p>
                <Link href="/colleges" className="text-sm hover:text-white transition">
                  Browse Colleges
                </Link>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">For Colleges</p>
                <Link href="/college-admin" className="text-sm hover:text-white transition">
                  Admin Portal
                </Link>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Platform</p>
                <Link href="/admin" className="text-sm hover:text-white transition">
                  Super Admin
                </Link>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Version</p>
                <p className="text-sm text-gray-400">1.0.0</p>
              </div>
            </div>
            <div className="text-center text-gray-500 text-xs">
              <p>ZORROW © 2026. All rights reserved.</p>
              <p className="mt-2">Kerala's Premium College Platform</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
