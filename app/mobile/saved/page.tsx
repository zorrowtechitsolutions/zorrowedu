'use client'

import { useState } from 'react'
import { MobileLayout } from '@/components/mobile-layout'
import { MobileNav } from '@/components/mobile-nav'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, MapPin, Trash2 } from 'lucide-react'

const initialSavedColleges = [
  { id: 1, name: 'IIT Delhi', location: 'New Delhi', ranking: 1, type: 'IIT' },
  { id: 2, name: 'NIT Calicut', location: 'Kozhikode', ranking: 25, type: 'NIT' },
  { id: 4, name: 'CUSAT', location: 'Kochi', ranking: 55, type: 'University' },
]

export default function MobileSavedPage() {
  const [savedColleges, setSavedColleges] = useState(initialSavedColleges)

  const handleRemove = (id: number) => {
    setSavedColleges(savedColleges.filter((c) => c.id !== id))
  }

  return (
    <>
      <MobileLayout>
        {/* Header */}
        <div className="bg-black text-white sticky top-0 z-30 pt-4 pb-6 px-4">
          <h1 className="text-2xl font-bold">Saved Colleges</h1>
          <p className="text-sm text-gray-300 mt-1">{savedColleges.length} colleges saved</p>
        </div>

        {/* Content */}
        <div className="px-4 py-6 pb-24">
          {savedColleges.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-bold mb-2">No saved colleges yet</p>
              <p className="text-sm text-gray-500 mb-6">Save colleges you're interested in to track them easily</p>
              <Link href="/mobile/search">
                <Button className="bg-black text-white hover:bg-gray-900">
                  Explore Colleges
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedColleges.map((college) => (
                <Card key={college.id} className="overflow-hidden border-2 border-gray-200">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Link href={`/colleges/${college.id}`} className="flex-1">
                        <h3 className="font-bold text-black hover:underline">{college.name}</h3>
                      </Link>
                      <button
                        onClick={() => handleRemove(college.id)}
                        className="ml-2 p-2 hover:bg-gray-100 rounded transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />
                      {college.location}
                    </p>

                    <div className="flex gap-2 mb-3">
                      <Badge className="bg-black text-white">#{college.ranking}</Badge>
                      <Badge variant="outline" className="border-gray-300">{college.type}</Badge>
                    </div>

                    <Link href={`/colleges/${college.id}`}>
                      <Button className="w-full bg-black hover:bg-gray-900 text-white text-sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </MobileLayout>
      <MobileNav />
    </>
  )
}
