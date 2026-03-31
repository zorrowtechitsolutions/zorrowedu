'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

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

export function RecommendationModal({
  isOpen,
  onClose,
  onSubmit
}: RecommendationModalProps) {

  const [formData, setFormData] = useState<FormData>({
    stream: '',
    marks: '',
    course: '',
    budget: '',
    district: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {

    const newErrors: Record<string, string> = {}

    if (!formData.stream)
      newErrors.stream = 'Please select a stream'

    if (!formData.marks)
      newErrors.marks = 'Please enter your marks'

    if (!formData.budget)
      newErrors.budget = 'Please select a budget'

    if (!formData.district)
      newErrors.district = 'Please select a district'

    const marks = parseFloat(formData.marks)

    if (isNaN(marks) || marks < 0 || marks > 100)
      newErrors.marks = 'Enter valid percentage (0-100)'

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

      <DialogContent
        className="
        w-[95%] max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        bg-white200
        shadow-2xl
        rounded-xl
        border
        border-gray-200
      "
      >

        <DialogHeader className="flex items-center justify-between">

          <div>
            <DialogTitle className="text-2xl font-bold">
              Find Your Best College
            </DialogTitle>

            <DialogDescription>
              Answer a few questions and we will recommend the best colleges for you
            </DialogDescription>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5"/>
          </button>

        </DialogHeader>

        <div className="space-y-6 py-4">

          {/* Stream */}

          <div className="space-y-3">

            <Label className="text-base font-semibold">
              Stream
            </Label>

            <RadioGroup
              value={formData.stream}
              onValueChange={(v)=>
                setFormData(prev=>({...prev,stream:v}))
              }
            >

              <div className="grid grid-cols-3 gap-4">

                {['Science','Commerce','Arts'].map(option => (

                  <div
                    key={option}
                    className="flex items-center space-x-2"
                  >

                    <RadioGroupItem
                      value={option}
                      id={option}
                    />

                    <Label htmlFor={option}>
                      {option}
                    </Label>

                  </div>

                ))}

              </div>

            </RadioGroup>

            {errors.stream &&
              <p className="text-red-600 text-sm">
                {errors.stream}
              </p>
            }

          </div>

          {/* Marks */}

          <div className="space-y-3">

            <Label>
              +2 Marks / Percentage
            </Label>

            <Input
              type="number"
              placeholder="Enter marks"
              value={formData.marks}
              onChange={(e)=>
                setFormData(prev=>({...prev,marks:e.target.value}))
              }
            />

            {errors.marks &&
              <p className="text-red-600 text-sm">
                {errors.marks}
              </p>
            }

          </div>

          {/* Course */}

          <div className="space-y-3">

            <Label>
              Preferred Course (Optional)
            </Label>

            <Select
              value={formData.course}
              onValueChange={(v)=>
                setFormData(prev=>({...prev,course:v}))
              }
            >

              <SelectTrigger>
                <SelectValue placeholder="Select course"/>
              </SelectTrigger>

              <SelectContent>

                {courseOptions.map(option => (

                  <SelectItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          {/* Budget */}

          <div className="space-y-3">

            <Label>
              Budget Range
            </Label>

            <RadioGroup
              value={formData.budget}
              onValueChange={(v)=>
                setFormData(prev=>({...prev,budget:v}))
              }
            >

              <div className="grid grid-cols-2 gap-4">

                {budgetRanges.map(option => (

                  <div
                    key={option}
                    className="flex items-center space-x-2"
                  >

                    <RadioGroupItem
                      value={option}
                      id={option}
                    />

                    <Label htmlFor={option}>
                      {option}
                    </Label>

                  </div>

                ))}

              </div>

            </RadioGroup>

            {errors.budget &&
              <p className="text-red-600 text-sm">
                {errors.budget}
              </p>
            }

          </div>

          {/* District */}

          <div className="space-y-3">

            <Label>
              Preferred District
            </Label>

            <Select
              value={formData.district}
              onValueChange={(v)=>
                setFormData(prev=>({...prev,district:v}))
              }
            >

              <SelectTrigger>
                <SelectValue placeholder="Select district"/>
              </SelectTrigger>

              <SelectContent>

                {keralaDistricts.map(d => (

                  <SelectItem
                    key={d}
                    value={d}
                  >
                    {d}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

            {errors.district &&
              <p className="text-red-600 text-sm">
                {errors.district}
              </p>
            }

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
            className="flex-1 bg-black text-white"
          >
            Get Recommendations
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  )
}
