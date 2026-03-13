'use client'

import { useState, useMemo } from 'react'
import { MobileLayout } from '@/components/mobile-layout'
import { MobileNav } from '@/components/mobile-nav'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Search, ChevronDown, MapPin } from 'lucide-react'
import { colleges, districts, streams, collegeTypes, feeRanges } from '@/lib/data'

export default function MobileSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedStream, setSelectedStream] = useState<string>('')
  const [selectedFeeRange, setSelectedFeeRange] = useState<string>('')

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDistrict = !selectedDistrict || college.district === selectedDistrict
      const matchesType = !selectedType || college.type === selectedType
      const matchesStream = !selectedStream || college.stream.includes(selectedStream)
      const matchesFee =
        !selectedFeeRange ||
        (() => {
          const range = feeRanges.find((r) => r.label === selectedFeeRange)
          const collegeFees = parseInt(college.avgFees)
          return range && collegeFees >= range.min && collegeFees <= range.max
        })()

      return matchesSearch && matchesDistrict && matchesType && matchesStream && matchesFee
    })
  }, [searchQuery, selectedDistrict, selectedType, selectedStream, selectedFeeRange])

  const activeFilters = [selectedDistrict, selectedType, selectedStream, selectedFeeRange].filter(Boolean).length

  return (
    <>
      <MobileLayout>
        {/* Header */}
        <div className="bg-black text-white sticky top-0 z-30 pt-4 pb-4 px-4">
          <h1 className="text-2xl font-bold mb-4">Search Colleges</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="College name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 bg-gray-900 border-0 text-white placeholder:text-gray-500 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 font-bold text-black"
          >
            <span>Filters</span>
            {activeFilters > 0 && (
              <Badge className="bg-black text-white text-xs">{activeFilters}</Badge>
            )}
            <ChevronDown className={`w-4 h-4 transition ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          {activeFilters > 0 && (
            <button
              onClick={() => {
                setSelectedDistrict('')
                setSelectedType('')
                setSelectedStream('')
                setSelectedFeeRange('')
              }}
              className="text-xs text-gray-600 hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-4 py-4 bg-gray-50 space-y-4 border-b border-gray-200">
            <div>
              <label className="text-sm font-bold text-black block mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-black block mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="">All Types</option>
                {collegeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-black block mb-2">Stream</label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="">All Streams</option>
                {['Science', 'Commerce', 'Arts'].map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-black block mb-2">Fee Range</label>
              <select
                value={selectedFeeRange}
                onChange={(e) => setSelectedFeeRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              >
                <option value="">All Ranges</option>
                {feeRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="px-4 py-4">
          <p className="text-sm text-gray-600 mb-4">
            {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''} found
          </p>

          {filteredColleges.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-2">No colleges found</p>
              <p className="text-xs text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-3 pb-8">
              {filteredColleges.map((college) => (
                <Link key={college.id} href={`/colleges/${college.id}`}>
                  <Card className="overflow-hidden border-2 border-gray-200 hover:border-black transition">
                    <div className="flex gap-3 p-3">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1 line-clamp-2">{college.name}</h3>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          {college.location}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className="bg-black text-white text-xs">#{college.ranking}</Badge>
                          <Badge variant="outline" className="text-xs border-gray-300">{college.placements}</Badge>
                          <Badge variant="outline" className="text-xs border-gray-300">{college.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </MobileLayout>
      <MobileNav />
    </>
  )
}
