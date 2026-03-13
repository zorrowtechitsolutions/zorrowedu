'use client'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Users, Building2, TrendingUp, CheckCircle, Plus } from 'lucide-react'
import { useState } from 'react'

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'colleges' | 'applications' | 'districts'>('analytics')

  const stats = [
    { label: 'Total Colleges', value: 156, icon: Building2 },
    { label: 'Total Students', value: 12450, icon: Users },
    { label: 'Applications', value: 34521, icon: TrendingUp },
    { label: 'Approved', value: 8945, icon: CheckCircle, color: 'green' },
  ]

  const colleges = [
    { id: 1, name: 'IIT Delhi', status: 'approved', applications: 2134, students: 456 },
    { id: 2, name: 'NIT Calicut', status: 'approved', applications: 1890, students: 378 },
    { id: 3, name: 'CUSAT', status: 'pending', applications: 1534, students: 312 },
    { id: 4, name: 'Rajagiri College', status: 'approved', applications: 945, students: 189 },
  ]

  const districtStats = [
    { district: 'Ernakulam', applications: 4532, colleges: 28, avgCutoff: '82%ile' },
    { district: 'Kozhikode', applications: 3890, colleges: 22, avgCutoff: '80%ile' },
    { district: 'Thiruvananthapuram', applications: 5123, colleges: 35, avgCutoff: '75%ile' },
    { district: 'Thrissur', applications: 3456, colleges: 18, avgCutoff: '78%ile' },
  ]

  const topCourses = [
    { name: 'B.Tech Computer Science', applications: 8934, colleges: 89 },
    { name: 'B.Tech Electronics', applications: 6234, colleges: 76 },
    { name: 'MBA', applications: 5123, colleges: 64 },
    { name: 'B.Tech Mechanical', applications: 4567, colleges: 58 },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-2">Super Admin Dashboard</h1>
            <p className="text-gray-300">Platform analytics and management</p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 border-2 border-gray-200">
                <stat.icon className="w-8 h-8 text-black mb-4" />
                <div className="text-3xl font-bold text-black mb-2">{stat.value.toLocaleString()}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b-2 border-gray-200 flex-wrap">
            {['analytics', 'colleges', 'applications', 'districts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 py-3 font-bold border-b-4 transition ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                {tab === 'analytics'
                  ? 'Analytics'
                  : tab === 'colleges'
                    ? 'Colleges'
                    : tab === 'applications'
                      ? 'Applications'
                      : 'By District'}
              </button>
            ))}
          </div>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-6">Popular Courses</h3>
                <div className="space-y-4">
                  {topCourses.map((course, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-black">{course.name}</h4>
                        <span className="text-2xl font-bold text-black">{course.applications.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${(course.applications / 8934) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Offered in {course.colleges} colleges</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-gray-200">
                  <h4 className="font-bold text-black mb-4">Application Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-black">Approved</span>
                      <span className="font-bold text-green-600">8,945</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Pending</span>
                      <span className="font-bold text-yellow-600">18,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Rejected</span>
                      <span className="font-bold text-red-600">7,342</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-gray-200">
                  <h4 className="font-bold text-black mb-4">Platform Growth</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-black">New Colleges (Month)</span>
                      <span className="font-bold text-black">+12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">New Students (Month)</span>
                      <span className="font-bold text-black">+1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Monthly Growth</span>
                      <span className="font-bold text-black">+8.5%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Colleges Tab */}
          {activeTab === 'colleges' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">Manage Colleges</h3>
                <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add College
                </Button>
              </div>
              <div className="space-y-4">
                {colleges.map((college) => (
                  <Card key={college.id} className="p-6 border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-black mb-2">{college.name}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Applications</p>
                            <p className="text-black font-bold">{college.applications.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Students</p>
                            <p className="text-black font-bold">{college.students}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Status</p>
                            <Badge className={`${college.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                              {college.status.charAt(0).toUpperCase() + college.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-300">
                          View
                        </Button>
                        {college.status === 'pending' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <Card className="p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-6">Application Analytics</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-black mb-4">By Status</h4>
                  <div className="space-y-4">
                    {[
                      { status: 'Approved', count: 8945, color: 'bg-green-600' },
                      { status: 'Pending', count: 18234, color: 'bg-yellow-600' },
                      { status: 'Rejected', count: 7342, color: 'bg-red-600' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-black font-semibold">{item.status}</span>
                          <span className="text-black font-bold">{item.count.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / 34521) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-4">Key Metrics</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Total Applications</p>
                      <p className="text-2xl font-bold text-black">34,521</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Approval Rate</p>
                      <p className="text-2xl font-bold text-green-600">25.8%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Avg Processing Time</p>
                      <p className="text-2xl font-bold text-black">4.2 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Districts Tab */}
          {activeTab === 'districts' && (
            <div className="space-y-4">
              {districtStats.map((district, idx) => (
                <Card key={idx} className="p-6 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-black">{district.district}</h4>
                    <Badge className="bg-black text-white">{district.colleges} colleges</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Applications</p>
                      <p className="text-xl font-bold text-black">{district.applications.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Avg Cutoff</p>
                      <p className="text-xl font-bold text-black">{district.avgCutoff}</p>
                    </div>
                    <div className="bg-black text-white p-3 rounded">
                      <p className="text-xs font-semibold mb-1">Rank</p>
                      <p className="text-xl font-bold">#{idx + 1}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
