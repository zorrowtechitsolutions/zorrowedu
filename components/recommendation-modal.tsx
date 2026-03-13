'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface RecommendationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => void
}

export interface FormData {
  stream: string
  marks: string
  course: string
  budget: string
  district: string
}

const keralaDistricts = [
  'Thiruvananthapuram',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
]

const courseOptions = [
  'Engineering',
  'Medical',
  'Business',
  'Arts',
  'IT'
]

const budgetRanges = [
  'Below ₹50k',
  '₹50k – ₹1L',
  '₹1L – ₹3L',
  '₹3L+'
]

export function RecommendationModal({ isOpen, onClose, onSubmit }: RecommendationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    stream: '',
    marks: '',
    course: '',
    budget: '',
    district: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleStreamChange = (value: string) => {
    setFormData(prev => ({ ...prev, stream: value }))
    setErrors(prev => ({ ...prev, stream: '' }))
  }

  const handleMarksChange = (value: string) => {
    setFormData(prev => ({ ...prev, marks: value }))
    setErrors(prev => ({ ...prev, marks: '' }))
  }

  const handleCourseChange = (value: string) => {
    setFormData(prev => ({ ...prev, course: value }))
  }

  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({ ...prev, budget: value }))
    setErrors(prev => ({ ...prev, budget: '' }))
  }

  const handleDistrictChange = (value: string) => {
    setFormData(prev => ({ ...prev, district: value }))
    setErrors(prev => ({ ...prev, district: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.stream) newErrors.stream = 'Please select a stream'
    if (!formData.marks) newErrors.marks = 'Please enter your marks/percentage'
    if (!formData.budget) newErrors.budget = 'Please select a budget range'
    if (!formData.district) newErrors.district = 'Please select a district'

    const marks = parseFloat(formData.marks)
    if (isNaN(marks) || marks < 0 || marks > 100) {
      newErrors.marks = 'Please enter a valid percentage (0-100)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">Find Your Best College</DialogTitle>
            <DialogDescription>
              Answer a few questions and we'll recommend the best colleges for you
            </DialogDescription>
          </div>
          <button
            onClick={onClose}
            className="ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Stream Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-black">Stream</Label>
            <RadioGroup value={formData.stream} onValueChange={handleStreamChange}>
              <div className="grid grid-cols-3 gap-4">
                {['Science', 'Commerce', 'Arts'].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`stream-${option}`} />
                    <Label htmlFor={`stream-${option}`} className="font-normal cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {errors.stream && <p className="text-red-600 text-sm">{errors.stream}</p>}
          </div>

          {/* +2 Marks */}
          <div className="space-y-3">
            <Label htmlFor="marks" className="text-base font-semibold text-black">
              +2 Marks / Percentage
            </Label>
            <Input
              id="marks"
              type="number"
              placeholder="Enter your percentage (0-100)"
              value={formData.marks}
              onChange={(e) => handleMarksChange(e.target.value)}
              className="border-2 border-gray-200 focus:border-black"
              min="0"
              max="100"
            />
            {errors.marks && <p className="text-red-600 text-sm">{errors.marks}</p>}
          </div>

          {/* Preferred Course (Optional) */}
          <div className="space-y-3">
            <Label htmlFor="course" className="text-base font-semibold text-black">
              Preferred Course <span className="text-gray-500 font-normal">(Optional)</span>
            </Label>
            <Select value={formData.course} onValueChange={handleCourseChange}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-black">
                <SelectValue placeholder="Select a course (optional)" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-black">Budget Range</Label>
            <RadioGroup value={formData.budget} onValueChange={handleBudgetChange}>
              <div className="grid grid-cols-2 gap-4">
                {budgetRanges.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`budget-${option}`} />
                    <Label htmlFor={`budget-${option}`} className="font-normal cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {errors.budget && <p className="text-red-600 text-sm">{errors.budget}</p>}
          </div>

          {/* District Selection */}
          <div className="space-y-3">
            <Label htmlFor="district" className="text-base font-semibold text-black">
              Preferred District
            </Label>
            <Select value={formData.district} onValueChange={handleDistrictChange}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-black">
                <SelectValue placeholder="Select a district" />
              </SelectTrigger>
              <SelectContent>
                {keralaDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-black hover:bg-gray-900 text-white"
          >
            Get Recommendations
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
