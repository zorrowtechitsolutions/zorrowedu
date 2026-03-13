'use client'

import { MobileLayout } from '@/components/mobile-layout'
import { MobileNav } from '@/components/mobile-nav'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react'

const applications = [
  {
    id: 1,
    collegeName: 'CUSAT',
    course: 'B.Tech Computer Science',
    status: 'approved',
    submittedDate: '2024-01-10',
    score: '92/100',
  },
  {
    id: 2,
    collegeName: 'NIT Calicut',
    course: 'B.Tech CSE',
    status: 'pending',
    submittedDate: '2024-01-18',
    score: '88/100',
  },
  {
    id: 3,
    collegeName: 'IIT Delhi',
    course: 'B.Tech CS',
    status: 'submitted',
    submittedDate: '2024-01-15',
    score: '95/100',
  },
]

export default function MobileApplicationsPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-blue-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 text-white">Approved</Badge>
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>
      default:
        return <Badge className="bg-blue-600 text-white">Submitted</Badge>
    }
  }

  return (
    <>
      <MobileLayout>
        {/* Header */}
        <div className="bg-black text-white sticky top-0 z-30 pt-4 pb-6 px-4">
          <h1 className="text-2xl font-bold">My Applications</h1>
          <p className="text-sm text-gray-300 mt-1">{applications.length} application{applications.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Stats */}
        <div className="px-4 py-4 grid grid-cols-3 gap-2 bg-gray-50">
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-lg font-bold text-green-600">{applications.filter(a => a.status === 'approved').length}</div>
            <p className="text-xs text-gray-600">Approved</p>
          </div>
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-lg font-bold text-yellow-600">{applications.filter(a => a.status === 'pending').length}</div>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-lg font-bold text-blue-600">{applications.filter(a => a.status === 'submitted').length}</div>
            <p className="text-xs text-gray-600">Submitted</p>
          </div>
        </div>

        {/* Applications List */}
        <div className="px-4 py-6 pb-24">
          <div className="space-y-3">
            {applications.map((app) => (
              <Card key={app.id} className="p-4 border-2 border-gray-200">
                <div className="flex gap-3 mb-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-black">{app.collegeName}</h3>
                    <p className="text-sm text-gray-600">{app.course}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-xs">
                    <p className="text-gray-600">Score</p>
                    <p className="font-bold text-black">{app.score}</p>
                  </div>
                  <div className="text-xs text-right">
                    <p className="text-gray-600">Submitted</p>
                    <p className="font-bold text-black">{new Date(app.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {getStatusBadge(app.status)}
                  <button className="p-2 hover:bg-gray-100 rounded transition">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Apply More Button */}
          <div className="mt-8">
            <Link href="/mobile/search">
              <Button className="w-full bg-black hover:bg-gray-900 text-white font-bold">
                Apply to More Colleges
              </Button>
            </Link>
          </div>
        </div>
      </MobileLayout>
      <MobileNav />
    </>
  )
}
