'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { courses, colleges } from '@/lib/data'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = Number.parseInt(params.id as string)
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-gray-600">Course not found.</p>
          </div>
        </main>
      </>
    )
  }

  // Filter colleges that offer this course
  const offeringColleges = colleges.filter((college) => 
    college.courses.some(c => c.toLowerCase().includes(course.name.split(' ')[0].toLowerCase()))
  ).slice(0, 5)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/courses" className="flex items-center gap-2 text-black hover:text-gray-700 mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to Courses
            </Link>

            <div>
              <Badge className="bg-black text-white mb-4">{course.category}</Badge>
              <h1 className="text-5xl font-bold text-black mb-4">{course.name}</h1>
              <p className="text-xl text-gray-600">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-6 border-2 border-gray-200">
                  <p className="text-xs text-gray-600 font-semibold mb-2">Duration</p>
                  <p className="text-2xl font-bold text-black">{course.duration}</p>
                </Card>
                <Card className="p-6 border-2 border-gray-200">
                  <p className="text-xs text-gray-600 font-semibold mb-2">Entrance Exam</p>
                  <p className="text-2xl font-bold text-black">{course.entranceExam}</p>
                </Card>
                <Card className="p-6 border-2 border-gray-200">
                  <p className="text-xs text-gray-600 font-semibold mb-2">Average Salary</p>
                  <p className="text-2xl font-bold text-black">{course.avgSalary}</p>
                </Card>
                <Card className="p-6 border-2 border-gray-200">
                  <p className="text-xs text-gray-600 font-semibold mb-2">Eligibility</p>
                  <p className="text-sm font-bold text-black">{course.eligibility}</p>
                </Card>
              </div>

              {/* Course Overview */}
              <section>
                <h2 className="text-3xl font-bold text-black mb-4">Course Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">{course.description}</p>
              </section>

              {/* Eligibility */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">Eligibility Criteria</h2>
                <Card className="p-6 border-2 border-gray-200">
                  <p className="text-black text-lg">{course.eligibility}</p>
                </Card>
              </section>

              {/* Career Opportunities */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">Career Opportunities</h2>
                <div className="space-y-3">
                  {course.careerScope.split(',').map((career, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                      <span className="text-black font-medium">{career.trim()}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Future Scope */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">Future Scope</h2>
                <Card className="p-6 bg-gray-50 border-2 border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">{course.futureScope}</p>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Top Colleges Card */}
                <Card className="p-6 border-2 border-black">
                  <h3 className="font-bold text-black mb-6 text-lg">Top Colleges Offering This Course</h3>
                  <div className="space-y-3 mb-6">
                    {offeringColleges.map((college) => (
                      <Link key={college.id} href={`/colleges/${college.id}`}>
                        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                          <p className="font-semibold text-black text-sm">{college.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{college.location}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/colleges" className="w-full block">
                    <Button className="w-full bg-black hover:bg-gray-900 text-white">
                      Find Colleges Offering This Course
                    </Button>
                  </Link>
                </Card>

                {/* Share Info Card */}
                <Card className="p-6 bg-gray-50 border-2 border-gray-200">
                  <h3 className="font-bold text-black mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Stream</p>
                      <p className="text-black font-medium">Science / Commerce / Arts</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Level</p>
                      <p className="text-black font-medium">Undergraduate</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Category</p>
                      <p className="text-black font-medium">{course.category}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
