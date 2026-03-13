'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, DollarSign, BookOpen, X } from 'lucide-react'
import Link from 'next/link'

export interface RecommendedCollege {
  id: number
  name: string
  course: string
  location: string
  district: string
  estimatedFees: string
  match: number
  reason: string
}

interface RecommendationResultsProps {
  results: RecommendedCollege[]
  onClose: () => void
}

export function RecommendationResults({ results, onClose }: RecommendationResultsProps) {
  const getMatchColor = (match: number) => {
    if (match >= 85) return 'bg-green-100 text-green-800'
    if (match >= 70) return 'bg-blue-100 text-blue-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  const getMatchLabel = (match: number) => {
    if (match >= 85) return 'Excellent Match'
    if (match >= 70) return 'Good Match'
    return 'Fair Match'
  }

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black">Recommended Colleges</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {results.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600 text-lg">No colleges found matching your criteria. Try adjusting your preferences.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {results.map((college) => (
            <Card key={college.id} className="p-6 border-2 border-gray-200 hover:border-black transition overflow-hidden">
              {/* Header with match badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-1">{college.name}</h3>
                  <p className="text-sm text-gray-600">{college.course}</p>
                </div>
                <Badge className={`${getMatchColor(college.match)} ml-3 flex-shrink-0`}>
                  {college.match}% Match
                </Badge>
              </div>

              {/* Location and fees */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">
                    {college.location}, {college.district}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-semibold">
                    Est. Fees: {college.estimatedFees}
                  </span>
                </div>
              </div>

              {/* Match reason */}
              <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded">
                <span className="font-semibold text-black">Why this match? </span>
                {college.reason}
              </p>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Link href={`/colleges/${college.id}`} className="flex-1">
                  <Button className="w-full bg-black hover:bg-gray-900 text-white text-sm">
                    View College
                  </Button>
                </Link>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm">
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
