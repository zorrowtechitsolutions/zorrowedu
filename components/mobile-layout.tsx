'use client'

import { ReactNode } from 'react'

interface MobileLayoutProps {
  children: ReactNode
  showNav?: boolean
}

export function MobileLayout({ children, showNav = true }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Mobile Optimized Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Safe Area Top */}
        <div className="h-safe-top bg-white"></div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 md:pb-0">
          {children}
        </main>
        
        {/* Safe Area Bottom */}
        <div className="h-safe-bottom bg-white"></div>
      </div>
    </div>
  )
}
