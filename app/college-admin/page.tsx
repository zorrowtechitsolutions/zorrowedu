'use client'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, Settings, BarChart3, Plus } from 'lucide-react'
import { useState } from 'react'

export default function CollegeAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'applications' | 'settings'>('overview')

  const collegeInfo = {
    name: 'NIT Calicut',
    registrationDate: '2024-01-01',
    totalApplications: 245,
    approvedApplications: 78,
    pendingApplications: 125,
  }

  const courses = [
    { id: 1, name: 'B.Tech CSE', seats: 80, applications: 120, filled: 65 },
    { id: 2, name: 'B.Tech ECE', seats: 60, applications: 95, filled: 48 },
    { id: 3, name: 'B.Tech ME', seats: 100, applications: 140, filled: 82 },
  ]

  const applications = [
    { id: 1, studentName: 'Rajesh Kumar', course: 'B.Tech CSE', status: 'pending', appliedDate: '2024-02-01' },
    { id: 2, studentName: 'Priya Singh', course: 'B.Tech ECE', status: 'approved', appliedDate: '2024-01-28' },
    { id: 3, studentName: 'Amit Patel', course: 'B.Tech ME', status: 'rejected', appliedDate: '2024-01-25' },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-2">{collegeInfo.name} Admin Panel</h1>
            <p className="text-gray-300">Manage courses, admissions, and student applications</p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Applications', value: collegeInfo.totalApplications, icon: Users },
              { label: 'Approved', value: collegeInfo.approvedApplications, icon: Badge, color: 'green' },
              { label: 'Pending', value: collegeInfo.pendingApplications, icon: BarChart3, color: 'yellow' },
              { label: 'Active Courses', value: courses.length, icon: BookOpen },
            ].map((stat, idx) => (
              <Card key={idx} className="p-6 border-2 border-gray-200">
                <stat.icon className="w-8 h-8 text-black mb-4" />
                <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b-2 border-gray-200 flex-wrap">
            {['overview', 'courses', 'applications', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 py-3 font-bold border-b-4 transition ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                {tab === 'overview'
                  ? 'Overview'
                  : tab === 'courses'
                    ? 'Courses'
                    : tab === 'applications'
                      ? 'Applications'
                      : 'Settings'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card className="p-6 border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-6">College Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">College Name</p>
                    <p className="text-black font-bold">{collegeInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Registration Date</p>
                    <p className="text-black font-bold">{collegeInfo.registrationDate}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-black font-semibold">Total Applications</span>
                    <span className="text-2xl font-bold text-black">{collegeInfo.totalApplications}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-black font-semibold">Approved</span>
                    <span className="text-2xl font-bold text-green-600">{collegeInfo.approvedApplications}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                    <span className="text-black font-semibold">Pending Review</span>
                    <span className="text-2xl font-bold text-yellow-600">{collegeInfo.pendingApplications}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">Manage Courses</h3>
                <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Course
                </Button>
              </div>
              {courses.map((course) => (
                <Card key={course.id} className="p-6 border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black">{course.name}</h4>
                      <p className="text-gray-600">Total Seats: {course.seats}</p>
                    </div>
                    <Button variant="outline" className="border-gray-300">
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Applications</p>
                      <p className="text-2xl font-bold text-black">{course.applications}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Filled</p>
                      <p className="text-2xl font-bold text-green-600">{course.filled}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Available</p>
                      <p className="text-2xl font-bold text-black">{course.seats - course.filled}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="p-6 border-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-black">{app.studentName}</h4>
                      <p className="text-gray-600">{app.course}</p>
                      <p className="text-xs text-gray-500 mt-1">Applied: {app.appliedDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${
                          app.status === 'approved'
                            ? 'bg-green-600'
                            : app.status === 'pending'
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                        } text-white`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-300">
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <Card className="p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                College Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">College Name</label>
                  <input
                    type="text"
                    defaultValue={collegeInfo.name}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="admin@nitcalicut.edu"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+91-483-2941234"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <Button className="bg-black hover:bg-gray-900 text-white w-full">Save Changes</Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </>
  )
}
