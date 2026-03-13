'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { courseCategories, courses } from '@/lib/data'
import Link from 'next/link'
import { Search, ArrowRight, Filter } from 'lucide-react'

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStream, setSelectedStream] = useState<string>('')
  const [selectedEntrance, setSelectedEntrance] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || course.category === selectedCategory
      const matchesStream = !selectedStream || course.eligibility.toLowerCase().includes(selectedStream.toLowerCase())
      const matchesEntrance = !selectedEntrance || 
        (selectedEntrance === 'yes' ? course.entranceExam !== 'None' : course.entranceExam === 'None')
      
      return matchesSearch && matchesCategory && matchesStream && matchesEntrance
    })
  }, [searchQuery, selectedCategory, selectedStream, selectedEntrance])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">Explore Courses</h1>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">
              Discover the best courses, eligibility requirements, entrance exams, and career opportunities.
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="bg-gray-50 border-b border-gray-200 py-6 md:py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-2 md:py-3 bg-white border-2 border-gray-200 rounded-lg text-base md:text-lg focus:border-black focus:outline-none w-full"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Toggle for Mobile */}
            <div className="lg:hidden mb-4 md:mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-black hover:bg-gray-900 text-white flex items-center gap-2 text-sm md:text-base"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Filters Sidebar */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
                <div className="sticky top-20 space-y-6 bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                  <div>
                    <h3 className="font-bold text-black mb-4 text-lg">Filters</h3>

                    {/* Category Filter */}
                    <div className="mb-6">
                      <label className="font-semibold text-sm text-black mb-3 block">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">All Categories</option>
                        {courseCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
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
                        <option value="science">Science</option>
                        <option value="commerce">Commerce</option>
                        <option value="arts">Arts</option>
                      </select>
                    </div>

                    {/* Entrance Exam Filter */}
                    <div className="mb-6">
                      <label className="font-semibold text-sm text-black mb-3 block">Entrance Required</label>
                      <select
                        value={selectedEntrance}
                        onChange={(e) => setSelectedEntrance(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {/* Clear Filters */}
                    {(selectedCategory || selectedStream || selectedEntrance) && (
                      <Button
                        onClick={() => {
                          setSelectedCategory('')
                          setSelectedStream('')
                          setSelectedEntrance('')
                        }}
                        className="w-full bg-white border-gray-300 text-black hover:bg-gray-50 border-2"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-black">
                    {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>

                {filteredCourses.length === 0 ? (
                  <Card className="p-12 text-center border-2 border-gray-200">
                    <p className="text-lg text-gray-600">No courses found matching your criteria.</p>
                  </Card>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {filteredCourses.map((course) => (
                      <Link key={course.id} href={`/courses/${course.id}`}>
                        <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-gray-200 h-full cursor-pointer">
                          <div className="p-6 flex flex-col h-full">
                            <div className="mb-4">
                              <Badge className="bg-black text-white mb-3">{course.category}</Badge>
                              <h3 className="text-xl font-bold text-black">{course.name}</h3>
                            </div>

                            <div className="space-y-3 mb-6 flex-1">
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-1">Duration</p>
                                <p className="text-black font-medium">{course.duration}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-1">Entrance Exam</p>
                                <p className="text-black font-medium">{course.entranceExam}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-1">Average Salary</p>
                                <p className="text-black font-medium">{course.avgSalary}</p>
                              </div>
                            </div>

                            <Button className="w-full bg-black hover:bg-gray-900 text-white">
                              View Course <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
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

        {/* Popular Courses Section */}
        {filteredCourses.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-200 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-black mb-8">Course Categories</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courseCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-black transition text-left"
                  >
                    <h3 className="font-bold text-black text-lg">{category}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {courses.filter((c) => c.category === category).length} courses
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
