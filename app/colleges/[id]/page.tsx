'use client'

import { Navbar } from '@/components/navbar'
import { colleges } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Users, BookOpen, Award, Zap, DollarSign, CheckCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function CollegeDetailPage() {
  const params = useParams()
  const collegeId = Number.parseInt(params.id as string)
  const college = colleges.find((c) => c.id === collegeId)

  if (!college) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-gray-600">College not found.</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/colleges" className="flex items-center gap-2 text-black hover:text-gray-700 mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to Colleges
            </Link>

            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-black mb-4">{college.name}</h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge className="bg-black text-white text-sm">{college.category}</Badge>
                  <Badge variant="outline" className="border-gray-300 text-sm">{college.type}</Badge>
                  <Badge variant="outline" className="border-gray-300 text-sm">Est. {college.established}</Badge>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{college.location}, {college.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">{college.district} District</span>
                  </div>
                </div>
              </div>

              <img
                src={college.image}
                alt={college.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Key Stats */}
                <Card className="p-6 border-2 border-black">
                  <h3 className="font-bold text-black mb-6 text-lg">Key Statistics</h3>
                  <div className="space-y-5">
                    <div className="pb-5 border-b border-gray-200">
                      <div className="text-xs text-gray-600 font-semibold uppercase mb-1">Overall Ranking</div>
                      <div className="text-3xl font-bold text-black">#{college.ranking}</div>
                    </div>
                    <div className="pb-5 border-b border-gray-200">
                      <div className="text-xs text-gray-600 font-semibold uppercase mb-1">Placement Rate</div>
                      <div className="text-2xl font-bold text-black">{college.placements}</div>
                    </div>
                    <div className="pb-5 border-b border-gray-200">
                      <div className="text-xs text-gray-600 font-semibold uppercase mb-1">JEE Cutoff</div>
                      <div className="text-xl font-bold text-black">{college.cutoff}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 font-semibold uppercase mb-1">Avg Annual Fees</div>
                      <div className="text-xl font-bold text-black">₹{parseInt(college.avgFees) / 100000}L</div>
                    </div>
                  </div>
                </Card>

                {/* Apply Button */}
                <Link href={`/apply/${college.id}`} className="w-full">
                  <Button className="w-full bg-black hover:bg-gray-900 text-white py-6 text-base font-bold">
                    Apply Now
                  </Button>
                </Link>

                {/* Accreditation */}
                <Card className="p-6 bg-gray-50 border-2 border-gray-200">
                  <h3 className="font-bold text-black mb-3">Accreditation</h3>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-black" />
                    <span className="text-black font-semibold">{college.accreditation}</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <section>
                <h2 className="text-3xl font-bold text-black mb-4">About the College</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{college.description}</p>
              </section>

              {/* Quick Info */}
              <section className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-black mb-6">Quick Information</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Entrance Exam</p>
                    <p className="text-lg font-bold text-black">{college.entranceExam}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Admission Process</p>
                    <p className="text-lg font-bold text-black">{college.admissionProcess}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Streams Offered</p>
                    <p className="text-lg font-bold text-black">{college.stream}</p>
                  </div>
                </div>
              </section>

              {/* Courses */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Courses Offered
                </h2>
                <div className="space-y-4">
                  {college.coursesDetails && college.coursesDetails.map((course, idx) => (
                    <Card key={idx} className="p-6 border-2 border-gray-200 hover:border-black transition">
                      <Link href={`/courses/${college.id}-${idx}`} className="block">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-black">{course.name}</h3>
                          <Badge className="bg-black text-white">{course.level}</Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 font-semibold">Duration</p>
                            <p className="text-black font-bold">{course.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-semibold">Seats</p>
                            <p className="text-black font-bold">{course.seats}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-semibold">Avg Salary</p>
                            <p className="text-black font-bold">{course.avgSalary}</p>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Facilities */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-6">Campus Facilities</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {college.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                      <span className="text-black font-medium">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
