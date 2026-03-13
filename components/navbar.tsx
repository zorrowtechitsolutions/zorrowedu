"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-black">
            <div className="w-8 h-8 flex-shrink-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20BLACK-nhJwfThkwbrBZfFUdqbcr3N7EKbf8S.png"
                alt="ZorrowEdu"
                className="w-full h-full object-contain"
              />
            </div>
            <span>ZorrowEdu</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-black hover:text-gray-600 font-medium transition">
              Home
            </Link>
            <Link href="/colleges" className="text-black hover:text-gray-600 font-medium transition">
              Colleges
            </Link>
            <Link href="/courses" className="text-black hover:text-gray-600 font-medium transition">
              Courses
            </Link>
            <Link href="/entrance-exams" className="text-black hover:text-gray-600 font-medium transition">
              Entrance Exams
            </Link>
            <Link href="/dashboard" className="text-black hover:text-gray-600 font-medium transition">
              Dashboard
            </Link>
            <Link href="/college-admin" className="text-black hover:text-gray-600 font-medium transition">
              For Colleges
            </Link>
            <Link href="/admin" className="text-black hover:text-gray-600 font-medium transition">
              Admin
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="text-black" /> : <Menu className="text-black" />}
          </button>

          {isOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 md:hidden">
              <div className="flex flex-col gap-4 p-4">
                <Link href="/" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link href="/colleges" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  Colleges
                </Link>
                <Link href="/courses" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  Courses
                </Link>
                <Link href="/entrance-exams" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  Entrance Exams
                </Link>
                <Link href="/dashboard" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/college-admin" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  For Colleges
                </Link>
                <Link href="/admin" className="text-black hover:text-gray-600 font-medium transition" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
