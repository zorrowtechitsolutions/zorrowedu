'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { colleges, districts, streams, collegeTypes, feeRanges } from '@/lib/data'
import Link from 'next/link'
import { Search, MapPin, DollarSign, Zap } from 'lucide-react'

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState('')
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Colleges</h1>
            <p className="text-gray-300 text-lg">Find your perfect college match in Kerala</p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="bg-gray-50 border-b border-gray-200 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search colleges or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 bg-white border-2 border-gray-200 rounded-lg text-lg focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                    <h3 className="font-semibold text-black mb-4 text-lg">Filters</h3>

                    {/* District Filter */}
                    <div className="mb-6">
                      <label className="font-semibold text-sm text-black mb-3 block">District</label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">All Districts</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* College Type Filter */}
                    <div className="mb-6">
                      <label className="font-semibold text-sm text-black mb-3 block">College Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">All Types</option>
                        {collegeTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Stream Filter */}
                    <div className="mb-6">
                      <label className="font-semibold text-sm text-black mb-3 block">Stream</label>
                      <select
                        value={selectedStream}
                        onChange={(e) => setSelectedStream(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">All Streams</option>
                        {streams.map((stream) => (
                          <option key={stream} value={stream}>
                            {stream}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Fee Range Filter */}
                    <div className="mb-6">
                      <label className="font-semibold text-sm text-black mb-3 block">Fee Range</label>
                      <select
                        value={selectedFeeRange}
                        onChange={(e) => setSelectedFeeRange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">All Ranges</option>
                        {feeRanges.map((range) => (
                          <option key={range.label} value={range.label}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Filters */}
                    {(selectedDistrict || selectedType || selectedStream || selectedFeeRange) && (
                      <Button
                        onClick={() => {
                          setSelectedDistrict('')
                          setSelectedType('')
                          setSelectedStream('')
                          setSelectedFeeRange('')
                        }}
                        variant="outline"
                        className="w-full bg-white border-gray-300 text-black hover:bg-gray-50"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-bold text-black">
                    {filteredColleges.length} College{filteredColleges.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>

                {filteredColleges.length === 0 ? (
                  <Card className="p-12 text-center border-2 border-gray-200">
                    <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-black mb-2">No colleges found</h3>
                    <p className="text-gray-600">Try adjusting your filters to find more options</p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {filteredColleges.map((college) => (
                      <Link key={college.id} href={`/colleges/${college.id}`}>
                        <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-gray-200 cursor-pointer">
                          <div className="grid md:grid-cols-4 gap-0">
                            {/* Image */}
                            <div className="md:col-span-1 h-48 md:h-full bg-gray-200 overflow-hidden">
                              <img
                                src={college.image}
                                alt={college.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                              />
                            </div>

                            {/* Content */}
                            <div className="md:col-span-3 p-6 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="text-xl font-bold text-black mb-2">{college.name}</h3>
                                    <div className="flex gap-2 flex-wrap mb-3">
                                      <Badge className="bg-black text-white">{college.category}</Badge>
                                      <Badge variant="outline" className="border-gray-300">{college.type}</Badge>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-gray-600">Ranking</div>
                                    <div className="text-2xl font-bold text-black">#{college.ranking}</div>
                                  </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4">{college.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Location</div>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                                      <MapPin className="w-4 h-4" />
                                      {college.location}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Placements</div>
                                    <div className="text-sm font-semibold text-black">{college.placements}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Cutoff</div>
                                    <div className="text-sm font-semibold text-black">{college.cutoff}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Avg Fees</div>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                                      <DollarSign className="w-4 h-4" />
                                      {parseInt(college.avgFees) / 100000}L
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex gap-2">
                                  {college.courses.slice(0, 3).map((course, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-gray-50 border-gray-300 text-xs">
                                      {course.split(' ')[0]}
                                    </Badge>
                                  ))}
                                </div>
                                <Button className="bg-black hover:bg-gray-900 text-white">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
