'use client'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  BookOpen,
  User,
  Lightbulb,
  Zap
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

import {
  RecommendationModal,
  FormData
} from '@/components/recommendation-modal'

import {
  RecommendationResults,
  RecommendedCollege
} from '@/components/recommendation-results'

import { colleges } from '@/lib/data'

export default function DashboardPage() {

  const [activeTab, setActiveTab] =
    useState<'applications' | 'saved' | 'profile'>('applications')

  const [showModal, setShowModal] = useState(false)

  const [recommendations, setRecommendations] =
    useState<RecommendedCollege[]>([])

  const [showResults, setShowResults] = useState(false)

  // Motivation messages
  const motivationalQuotes = [
    "Your dream college starts with the right decision today.",
    "Success is built with daily effort.",
    "Your preparation today builds your future.",
    "Push yourself to greatness every day."
  ]

  // Entrance exams
  const exams = [
    { name: 'KEAM', daysLeft: 25, date: 'May 25, 2024' },
    { name: 'NEET', daysLeft: 40, date: 'June 9, 2024' },
    { name: 'CUET', daysLeft: 32, date: 'June 1, 2024' },
    { name: 'JEE Mains', daysLeft: 45, date: 'June 14, 2024' }
  ]

  const getDayColor = (days: number) => {
    if (days <= 7) return 'text-red-600'
    if (days <= 14) return 'text-orange-600'
    return 'text-green-600'
  }

  const checkBudgetMatch = (fees: number, range: string) => {

    const feesLakhs = fees / 100000

    switch (range) {
      case 'Below ₹50k':
        return feesLakhs <= 0.5
      case '₹50k – ₹1L':
        return feesLakhs <= 1
      case '₹1L – ₹3L':
        return feesLakhs <= 3
      case '₹3L+':
        return true
      default:
        return true
    }
  }

  const getReason = (college: any, form: FormData, marks: number) => {

    const reasons = []

    if (college.district === form.district)
      reasons.push('Preferred district')

    const cutoff = parseFloat(college.cutoff)

    if (marks >= cutoff)
      reasons.push('Marks match cutoff')
    else
      reasons.push('Cutoff slightly higher')

    return reasons.join(' • ')
  }

  const generateRecommendations = (formData: FormData) => {

    const marks = parseFloat(formData.marks)

    const filtered = colleges.filter(college => {

      if (college.stream !== formData.stream)
        return false

      const fees =
        parseInt(college.avgFees.replace(/,/g, ''))

      if (!checkBudgetMatch(fees, formData.budget))
        return false

      return true
    })

    const scored = filtered.map(college => {

      let score = 50

      const cutoff = parseFloat(college.cutoff)

      if (marks >= cutoff) score += 30
      else if (marks >= cutoff - 5) score += 20
      else if (marks >= cutoff - 10) score += 10

      if (college.district === formData.district)
        score += 15

      return {
        id: college.id,
        name: college.name,
        course: formData.course || college.courses[0],
        location: college.location,
        district: college.district,
        estimatedFees:
          `₹${(parseInt(college.avgFees.replace(/,/g, '')) / 100000).toFixed(1)} L`,
        match: Math.min(100, score),
        reason: getReason(college, formData, marks)
      }
    })

    const sorted =
      scored.sort((a, b) => b.match - a.match).slice(0, 6)

    setRecommendations(sorted)

    setShowModal(false)

    setShowResults(true)
  }

  const handleOpenModal = () => {

    setShowResults(false)

    setShowModal(true)
  }

  const handleCloseResults = () => {

    setRecommendations([])

    setShowResults(false)
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Header */}
        <section className="bg-black text-white py-10">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-bold">
              Student Dashboard
            </h1>
            <p className="text-gray-300">
              Manage your applications and college preferences
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Motivation */}
          <Card className="mb-10 p-8 border border-blue-200 bg-blue-50">

            <div className="flex gap-4">

              <Lightbulb className="w-8 h-8 text-blue-600"/>

              <div>

                <h2 className="text-xl font-bold">
                  Today's Motivation
                </h2>

                <p className="text-gray-700 italic">
                  "{motivationalQuotes[Math.floor(Math.random()*motivationalQuotes.length)]}"
                </p>

              </div>

            </div>

          </Card>

          {/* Recommendation */}
          <Card className="mb-10 p-8 border border-green-200 bg-green-50">

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <Zap className="w-8 h-8 text-green-600"/>

                <div>

                  <h2 className="text-xl font-bold">
                    Find Best College for Me
                  </h2>

                  <p className="text-gray-600">
                    Get AI college recommendations
                  </p>

                </div>

              </div>

              <Button
                onClick={handleOpenModal}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Get Recommendation
              </Button>

            </div>

          </Card>

        </div>

        {showResults && (
          <RecommendationResults
            results={recommendations}
            onClose={handleCloseResults}
          />
        )}

      </main>

      <RecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={generateRecommendations}
      />

    </>
  )
}
