"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { colleges } from "@/lib/data"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

interface FormData {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  pincode: string
  board: string
  percentage: string
  entranceExam: string
  entranceScore: string
  preferredCourse: string
  motivation: string
  achievements: string
}

export default function ApplicationFormPage() {
  const params = useParams()
  const router = useRouter()
  const collegeId = Number.parseInt(params.id as string)
  const college = colleges.find((c) => c.id === collegeId)

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    board: "",
    percentage: "",
    entranceExam: "",
    entranceScore: "",
    preferredCourse: "",
    motivation: "",
    achievements: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Valid 10-digit phone is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.board) newErrors.board = "Board is required"
    if (!formData.percentage) newErrors.percentage = "Percentage is required"
    if (!formData.entranceExam) newErrors.entranceExam = "Entrance exam is required"
    if (!formData.entranceScore) newErrors.entranceScore = "Entrance score is required"
    if (!formData.preferredCourse) newErrors.preferredCourse = "Preferred course is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitted(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  if (!college) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background py-12">
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-center text-muted-foreground">College not found.</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/colleges/${collegeId}`}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to College
          </Link>

          {submitted ? (
            <Card className="p-12 border border-border text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Application Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Your application to {college.name} has been successfully submitted. You will be redirected to your
                dashboard.
              </p>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to your registered email address.
              </p>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Header */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h1 className="text-3xl font-bold text-card-foreground mb-2">Application Form</h1>
                <p className="text-muted-foreground">Applying to: {college.name}</p>
              </div>

              {/* Personal Information */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-bold text-card-foreground mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="10-digit phone number"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">State</label>
                      <Input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pincode</label>
                      <Input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Academic Information */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-bold text-card-foreground mb-6">Academic Information</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Board/University *</label>
                      <select
                        value={formData.board}
                        onChange={(e) => handleInputChange("board", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.board ? "border-red-500" : "border-border"}`}
                      >
                        <option value="">Select board</option>
                        <option value="cbse">CBSE</option>
                        <option value="isce">ISCE</option>
                        <option value="state">State Board</option>
                      </select>
                      {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">12th Percentage *</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.percentage}
                        onChange={(e) => handleInputChange("percentage", e.target.value)}
                        placeholder="Enter percentage"
                        className={errors.percentage ? "border-red-500" : ""}
                      />
                      {errors.percentage && <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Entrance Exam *</label>
                      <select
                        value={formData.entranceExam}
                        onChange={(e) => handleInputChange("entranceExam", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.entranceExam ? "border-red-500" : "border-border"}`}
                      >
                        <option value="">Select exam</option>
                        <option value="jee-main">JEE Main</option>
                        <option value="jee-advanced">JEE Advanced</option>
                        <option value="keam">KEAM</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.entranceExam && <p className="text-red-500 text-sm mt-1">{errors.entranceExam}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Entrance Score/Percentile *
                      </label>
                      <Input
                        type="text"
                        value={formData.entranceScore}
                        onChange={(e) => handleInputChange("entranceScore", e.target.value)}
                        placeholder="Score or percentile"
                        className={errors.entranceScore ? "border-red-500" : ""}
                      />
                      {errors.entranceScore && <p className="text-red-500 text-sm mt-1">{errors.entranceScore}</p>}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Application Details */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-bold text-card-foreground mb-6">Application Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Preferred Course *</label>
                    <select
                      value={formData.preferredCourse}
                      onChange={(e) => handleInputChange("preferredCourse", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.preferredCourse ? "border-red-500" : "border-border"}`}
                    >
                      <option value="">Select course</option>
                      {college.courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                    {errors.preferredCourse && <p className="text-red-500 text-sm mt-1">{errors.preferredCourse}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Motivation Letter</label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      placeholder="Tell us why you want to study at this college..."
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Achievements & Extracurricular
                    </label>
                    <textarea
                      value={formData.achievements}
                      onChange={(e) => handleInputChange("achievements", e.target.value)}
                      placeholder="List your achievements, awards, or extracurricular activities..."
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Link href={`/colleges/${collegeId}`} className="flex-1">
                  <Button variant="outline" className="w-full border-border bg-transparent">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Submit Application
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  )
}
