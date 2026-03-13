'use client'

import { MobileLayout } from '@/components/mobile-layout'
import { MobileNav } from '@/components/mobile-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { User, Mail, Phone, BookOpen, LogOut, Settings, FileText } from 'lucide-react'

export default function MobileProfilePage() {
  const userProfile = {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    board: 'CBSE',
    marks: '95%',
    stream: 'Science',
    district: 'Ernakulam',
    appliedCount: 3,
    savedCount: 5,
  }

  const menuItems = [
    { icon: FileText, label: 'My Applications', href: '/mobile/applications' },
    { icon: Settings, label: 'Settings', href: '/mobile/settings' },
    { icon: Mail, label: 'Help & Support', href: '/mobile/support' },
  ]

  return (
    <>
      <MobileLayout>
        {/* Header */}
        <div className="bg-black text-white pt-4 pb-8 px-4">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="px-4 py-6">
          <Card className="p-6 border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-black">{userProfile.name}</h2>
                <p className="text-sm text-gray-600">{userProfile.district} District</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-black">{userProfile.appliedCount}</div>
                <p className="text-xs text-gray-600 mt-1">Applied</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-black">{userProfile.savedCount}</div>
                <p className="text-xs text-gray-600 mt-1">Saved</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button className="w-full bg-black hover:bg-gray-900 text-white">
              Edit Profile
            </Button>
          </Card>
        </div>

        {/* Personal Information */}
        <div className="px-4 py-4">
          <h3 className="font-bold text-black mb-3">Personal Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Email</p>
                <p className="text-sm font-medium text-black">{userProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Phone</p>
                <p className="text-sm font-medium text-black">{userProfile.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="px-4 py-4">
          <h3 className="font-bold text-black mb-3">Academic Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Board</span>
              <Badge className="bg-black text-white">{userProfile.board}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Marks</span>
              <Badge className="bg-black text-white">{userProfile.marks}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Stream</span>
              <Badge className="bg-black text-white">{userProfile.stream}</Badge>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <Link key={idx} href={item.href}>
                  <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-black rounded-lg transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-black" />
                      <span className="font-bold text-black">{item.label}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 py-6 pb-24">
          <Button className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </MobileLayout>
      <MobileNav />
    </>
  )
}
