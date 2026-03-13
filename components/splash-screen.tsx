'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function SplashScreen() {
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Don't show splash screen if user is already on splash, entry, login pages
    if (pathname === '/splash' || pathname === '/entry' || pathname === '/login') {
      setIsVisible(false)
      return
    }

    // Show splash screen for 2 seconds on initial load
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Redirect logic: you can check if user is logged in here
      // For now, we'll redirect to home if already on root, or stay on current page
      if (pathname === '/') {
        router.prefetch('/')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [pathname, router])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {/* Logo with fade-in animation */}
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Zorrow Logo */}
        <div className="w-24 h-24 flex items-center justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20BLACK-nhJwfThkwbrBZfFUdqbcr3N7EKbf8S.png"
            alt="ZorrowEdu Logo"
            className="w-full h-full object-contain invert"
          />
        </div>

        {/* Text below logo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white">ZorrowEdu</h1>
          <p className="text-gray-400 text-sm md:text-base">Powered by ZORROW AI</p>
        </div>
      </div>

      {/* Optional loading indicator */}
      <div className="absolute bottom-12 flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>

      {/* Fade out animation style */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}
