'use client'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, AlertCircle, Heart, BookOpen, User, Lightbulb, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RecommendationModal, FormData } from '@/components/recommendation-modal'
import { RecommendationResults, RecommendedCollege } from '@/components/recommendation-results'
import { colleges } from '@/lib/data'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'applications' | 'saved' | 'profile'>('applications')
  const [showModal, setShowModal] = useState(false)
  const [recommendations, setRecommendations] = useState<RecommendedCollege[]>([])
  const [showResults, setShowResults] = useState(false)

  // Motivational quotes
  const motivationalQuotes = [
    "Your dream college starts with the right decision today. Keep moving forward.",
    "Success is not final, failure is not fatal. Your effort today shapes your tomorrow.",
    "The best time to prepare for your college entrance was yesterday. The next best time is now.",
    "You are capable of more than you know. Push yourself to greatness every single day.",
    "Great achievements require great effort. Your dedication will pay off soon.",
    "Don't watch the clock; do what it does. Keep going. Your success is coming.",
    "The only person who can limit your growth is yourself. Believe in your potential.",
    "Every challenge you overcome makes you stronger. Keep pushing forward."
  ]

  // Exam data with countdown
  const exams = [
    { name: 'KEAM', daysLeft: 25, date: 'May 25, 2024' },
    { name: 'NEET', daysLeft: 40, date: 'June 9, 2024' },
    { name: 'CUET', daysLeft: 32, date: 'June 1, 2024' },
    { name: 'JEE Mains', daysLeft: 45, date: 'June 14, 2024' },
  ]

  const getDayColor = (days: number) => {
    if (days <= 7) return 'text-red-600'
    if (days <= 14) return 'text-orange-600'
    return 'text-green-600'
  }

  // Generate recommendations based on form data
  const generateRecommendations = (formData: FormData) => {
    const marks = parseFloat(formData.marks)
    
    // Filter colleges based on criteria
    const filtered = colleges.filter(college => {
      // Stream match
      if (college.stream !== formData.stream) return false
      
      // District match
      if (formData.district && college.district !== formData.district) {
        // Still include but with lower match score
      }
      
      // Budget check - convert avgFees to budget range
      const fees = parseInt(college.avgFees)
      const budgetOk = checkBudgetMatch(fees, formData.budget)
      if (!budgetOk) return false
      
      return true
    })

    // Score and rank the filtered colleges
    const scored = filtered.map(college => {
      let matchScore = 50 // Base score
      
      // Marks alignment (max 30 points)
      const cutoff = parseFloat(college.cutoff)
      if (marks >= cutoff) matchScore += 30
      else if (marks >= cutoff - 5) matchScore += 20
      else if (marks >= cutoff - 10) matchScore += 10
      
      // District preference (max 15 points)
      if (college.district === formData.district) matchScore += 15
      
      // Course match (max 25 points)
      if (formData.course) {
        const hasCourse = college.courses.some(c => 
          c.toLowerCase().includes(formData.course.toLowerCase())
        )
        if (hasCourse) matchScore += 25
      } else {
        matchScore += 10
      }
      
      const reason = getRecommendationReason(college, formData, marks)
      
      return {
        id: college.id,
        name: college.name,
        course: formData.course || college.courses[0],
        location: college.location,
        district: college.district,
        estimatedFees: `₹${(parseInt(college.avgFees) / 100000).toFixed(1)} L`,
        match: Math.min(100, Math.round(matchScore)),
        reason
      }
    })

    // Sort by match score and take top 6
    const sorted = scored.sort((a, b) => b.match - a.match).slice(0, 6)
    
    setRecommendations(sorted)
    setShowResults(true)
    setShowModal(false)
  }

  const checkBudgetMatch = (collegeFees: number, budgetRange: string): boolean => {
    const feesInLakhs = collegeFees / 100000
    
    switch (budgetRange) {
      case 'Below ₹50k':
        return feesInLakhs <= 0.5
      case '₹50k – ₹1L':
        return feesInLakhs <= 1
      case '₹1L – ₹3L':
        return feesInLakhs <= 3
      case '₹3L+':
        return true
      default:
        return true
    }
  }

  const getRecommendationReason = (college: any, formData: FormData, marks: number): string => {
    const reasons = []
    
    if (college.district === formData.district) {
      reasons.push('Located in your preferred district')
    }
    
    const cutoff = parseFloat(college.cutoff)
    if (marks >= cutoff) {
      reasons.push('Your marks align well with the cutoff')
    } else {
      reasons.push('Competitive cutoff, good preparation needed')
    }
    
    if (formData.course && college.courses.some(c => c.toLowerCase().includes(formData.course.toLowerCase()))) {
      reasons.push(`Offers ${formData.course} program`)
    }
    
    if (college.placements) {
      reasons.push(`${college.placements} placement rate`)
    }
    
    return reasons.slice(0, 2).join(' • ')
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setShowResults(false)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setRecommendations([])
  }

  const applications = [
    {
      id: 1,
      collegeName: 'IIT Delhi',
      status: 'submitted',
      submittedDate: '2024-01-15',
      cutoff: '99.5%ile',
      course: 'B.Tech CSE',
    },
    {
      id: 2,
      collegeName: 'NIT Calicut',
      status: 'pending',
      submittedDate: '2024-01-18',
      cutoff: '95%ile',
      course: 'B.Tech CSE',
    },
    {
      id: 3,
      collegeName: 'CUSAT',
      status: 'approved',
      submittedDate: '2024-01-10',
      cutoff: '80%ile',
      course: 'B.Tech IT',
    },
  ]

  const savedColleges = [
    { id: 1, name: 'IIT Delhi', location: 'New Delhi', ranking: 1 },
    { id: 2, name: 'NIT Calicut', location: 'Kozhikode', ranking: 25 },
  ]

  const profileData = {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    board: 'CBSE',
    marks: '95%',
    stream: 'Science',
    district: 'Ernakulam',
    budget: '10 Lakhs',
  }

  const getStatusIcon = (status: string) => {
    if (status === 'approved')
      return <CheckCircle className="w-5 h-5 text-green-600" />
    if (status === 'pending')
      return <Clock className="w-5 h-5 text-yellow-600" />
    return <AlertCircle className="w-5 h-5 text-blue-600" />
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const stats = [
    { label: 'Total Applications', value: applications.length, icon: BookOpen, color: 'black' },
    { label: 'Approved', value: applications.filter((a) => a.status === 'approved').length, icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: applications.filter((a) => a.status === 'pending').length, icon: Clock, color: 'yellow' },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">Student Dashboard</h1>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">Manage your applications and college preferences</p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Daily Motivation Section */}
          <Card className="mb-8 md:mb-12 p-6 md:p-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-black mb-2">Today's Motivation</h2>
                <p className="text-gray-700 text-base md:text-lg italic">
                  "{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"
                </p>
                <p className="text-sm text-gray-600 mt-3">Remember: Small consistent efforts lead to big dreams!</p>
              </div>
            </div>
          </Card>

          {/* Exam Countdown Section */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Upcoming Entrance Exams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {exams.map((exam, idx) => (
                <Card key={idx} className="p-4 md:p-6 border-2 border-gray-200 hover:border-black transition">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-black">{exam.name}</h3>
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${getDayColor(exam.daysLeft)}`}>
                    {exam.daysLeft}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Days Left</p>
                  <p className="text-xs md:text-sm text-gray-700 mb-4 font-semibold">{exam.date}</p>
                  <Button className="w-full bg-black hover:bg-gray-900 text-white text-xs md:text-sm py-2">
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Best College Recommendation Section */}
          <Card className="mb-8 md:mb-12 p-6 md:p-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-black mb-1">Find Best College for Me</h2>
                  <p className="text-gray-700 text-sm md:text-base">
                    Answer a few quick questions and get personalized college recommendations from Zorrow AI based on your marks, stream, budget, and location.
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleOpenModal}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 md:py-3 text-sm md:text-base flex-shrink-0 whitespace-nowrap"
              >
                Get Recommendation
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-4 md:p-6 border-2 border-gray-200 hover:border-black transition">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <stat.icon className={`w-6 md:w-8 h-6 md:h-8 text-${stat.color}-600`} />
                  <span className="text-xs md:text-sm font-semibold text-gray-600">Total</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-black mb-1 md:mb-2">{stat.value}</div>
                <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:border-b-2 border-gray-200">
            {['applications', 'saved', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-lg border-b-2 sm:border-b-4 transition ${
                  activeTab === tab
                    ? 'border-black text-black bg-white sm:bg-transparent'
                    : 'border-gray-200 sm:border-transparent text-gray-600 hover:text-black'
                }`}
              >
                {tab === 'applications' ? 'My Applications' : tab === 'saved' ? 'Saved Colleges' : 'My Profile'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="border-2 border-gray-200 overflow-hidden hover:border-black transition">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div>{getStatusIcon(app.status)}</div>
                        <div>
                          <h3 className="text-xl font-bold text-black">{app.collegeName}</h3>
                          <p className="text-gray-600">{app.course}</p>
                        </div>
                      </div>
                      <Badge className={`${app.status === 'approved' ? 'bg-green-600' : app.status === 'pending' ? 'bg-yellow-600' : 'bg-blue-600'} text-white`}>
                        {getStatusLabel(app.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">Submitted</p>
                        <p className="text-black font-bold">{new Date(app.submittedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">Cutoff</p>
                        <p className="text-black font-bold">{app.cutoff}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">Application ID</p>
                        <p className="text-black font-bold">APP-{app.id}0001</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="grid md:grid-cols-2 gap-6">
              {savedColleges.map((college) => (
                <Card key={college.id} className="p-6 border-2 border-gray-200 hover:border-black transition">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-black">{college.name}</h3>
                    <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                  </div>
                  <p className="text-gray-600 mb-4">{college.location}</p>
                  <Badge className="bg-black text-white">Ranking: #{college.ranking}</Badge>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'profile' && (
            <Card className="p-8 border-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', value: profileData.name },
                      { label: 'Email', value: profileData.email },
                      { label: 'Phone', value: profileData.phone },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <p className="text-xs text-gray-600 font-semibold mb-1">{item.label}</p>
                        <p className="text-black font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Academic Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Stream', value: profileData.stream },
                      { label: 'Board', value: profileData.board },
                      { label: 'Marks', value: profileData.marks },
                      { label: 'District', value: profileData.district },
                      { label: 'Budget', value: profileData.budget },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <p className="text-xs text-gray-600 font-semibold mb-1">{item.label}</p>
                        <p className="text-black font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Recommendations Results */}
        {showResults && (
          <RecommendationResults 
            results={recommendations}
            onClose={handleCloseResults}
          />
        )}
      </main>

      {/* Recommendation Modal */}
      <RecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={generateRecommendations}
      />
    </>
  )
}
