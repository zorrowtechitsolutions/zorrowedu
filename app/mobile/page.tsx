'use client'

import { MobileLayout } from '@/components/mobile-layout'
import { MobileNav } from '@/components/mobile-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Search, Bell, MapPin, Zap } from 'lucide-react'
import { colleges } from '@/lib/data'

export default function MobileHomePage() {
  const topColleges = colleges.slice(0, 4)

  return (
    <>
      <MobileLayout>
        {/* Header */}
        <div className="bg-black text-white sticky top-0 z-30 pt-4 pb-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">ZorrowEdu</h1>
            <Bell className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-300 mb-4">Find your perfect college</p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search colleges..."
              className="pl-10 py-2 bg-gray-900 border-0 text-white placeholder:text-gray-500 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-6 bg-gray-50 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-black">20</div>
            <p className="text-xs text-gray-600 mt-1">Colleges</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-black">14</div>
            <p className="text-xs text-gray-600 mt-1">Districts</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-black">3</div>
            <p className="text-xs text-gray-600 mt-1">Streams</p>
          </div>
        </div>

        {/* Featured Section */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4 text-black">Top Colleges</h2>
          <div className="space-y-4">
            {topColleges.map((college) => (
              <Link key={college.id} href={`/colleges/${college.id}`}>
                <Card className="overflow-hidden border-2 border-gray-200 hover:border-black transition">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm line-clamp-2">{college.name}</h3>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {college.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-black text-white text-xs">#{college.ranking}</Badge>
                        <Badge variant="outline" className="text-xs border-gray-300">{college.placements}</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Assistant CTA */}
        <div className="mx-4 mb-8 bg-black text-white rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold">Ask Zorrow AI</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">Get instant college recommendations and admission guidance</p>
          <Button className="w-full bg-white hover:bg-gray-100 text-black font-bold">
            Start Chat
          </Button>
        </div>
      </MobileLayout>
      <MobileNav />
    </>
  )
}
