'use client'

import { useState } from 'react'
import { MobileLayout } from '@/components/mobile-layout'
import { MobileNav } from '@/components/mobile-nav'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const initialNotifications = [
  {
    id: 1,
    type: 'approved',
    title: 'Application Approved!',
    college: 'CUSAT',
    message: 'Your application has been approved. Next steps coming soon.',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'pending',
    title: 'Application Under Review',
    college: 'NIT Calicut',
    message: 'Your application is being reviewed by the admissions team.',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    type: 'update',
    title: 'New College Added',
    message: 'Check out the new colleges added to our platform.',
    timestamp: '3 days ago',
  },
  {
    id: 4,
    type: 'deadline',
    title: 'Application Deadline Approaching',
    college: 'IIT Delhi',
    message: 'Only 5 days left to submit your application.',
    timestamp: '5 days ago',
  },
]

export default function MobileNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'deadline':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-blue-600" />
    }
  }

  return (
    <>
      <MobileLayout>
        {/* Header */}
        <div className="bg-black text-white sticky top-0 z-30 pt-4 pb-6 px-4">
          <h1 className="text-2xl font-bold">Updates</h1>
          <p className="text-sm text-gray-300 mt-1">{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Notifications */}
        <div className="px-4 py-6 pb-24">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-bold mb-2">No notifications</p>
              <p className="text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className="p-4 border-2 border-gray-200">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-black">{notification.title}</h3>
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                      {notification.college && (
                        <Badge className="bg-black text-white text-xs mb-2">
                          {notification.college}
                        </Badge>
                      )}
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.timestamp}</p>
                    </div>
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
