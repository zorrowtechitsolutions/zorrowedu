'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Clock, Target, TrendingUp } from 'lucide-react'

const entranceExams = [
  {
    id: 1,
    name: 'JEE Main',
    field: 'Engineering',
    difficulty: 'Moderate to Hard',
    frequency: 'Twice a year',
    applicationDeadline: 'Usually in December and March',
    examDate: 'January and April',
    topPercentile: 'Top 2,50,000 qualify',
    description: 'Joint Entrance Examination (Main) is the gateway to engineering colleges across India including NITs and IIITs.',
    collegesToReach: ['NIT Calicut', 'CUSAT', 'Government Engineering Colleges'],
    prepTime: '12-18 months',
    syllabus: 'Physics, Chemistry, Mathematics (Class 11 & 12)',
  },
  {
    id: 2,
    name: 'JEE Advanced',
    field: 'Engineering',
    difficulty: 'Very Hard',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in April',
    examDate: 'May/June',
    topPercentile: 'Top 2.5 lakh JEE Mains qualifiers',
    description: 'Advanced level entrance exam for admission to IITs, one of the toughest exams in the world.',
    collegesToReach: ['IIT Delhi', 'IIT Bombay', 'IIT Madras'],
    prepTime: '18-24 months',
    syllabus: 'Advanced Physics, Chemistry, Mathematics',
  },
  {
    id: 3,
    name: 'NEET',
    field: 'Medical',
    difficulty: 'Hard',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in January',
    examDate: 'May',
    topPercentile: 'Top 9 lakhs qualify for medical seats',
    description: 'National Eligibility cum Entrance Test for admission to MBBS and BDS programs across India.',
    collegesToReach: ['Government Medical College', 'Private Medical Colleges'],
    prepTime: '12-18 months',
    syllabus: 'Biology (Botany & Zoology), Physics, Chemistry',
  },
  {
    id: 4,
    name: 'CUSAT CAT',
    field: 'Engineering/Science',
    difficulty: 'Moderate',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in April',
    examDate: 'May/June',
    topPercentile: 'Merit-based selection',
    description: 'Cochin University of Science and Technology Common Admission Test for engineering and science programs.',
    collegesToReach: ['CUSAT', 'Affiliated colleges'],
    prepTime: '6-12 months',
    syllabus: 'Physics, Chemistry, Mathematics',
  },
  {
    id: 5,
    name: 'KEAM',
    field: 'Engineering',
    difficulty: 'Moderate',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in March',
    examDate: 'April/May',
    topPercentile: 'Merit-based selection',
    description: 'Kerala Engineering Architecture Medical exam for admission to engineering colleges in Kerala.',
    collegesToReach: ['All Kerala Engineering Colleges'],
    prepTime: '10-14 months',
    syllabus: 'Physics, Chemistry, Mathematics',
  },
  {
    id: 6,
    name: 'CLAT',
    field: 'Law',
    difficulty: 'Moderate',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in January',
    examDate: 'February/March',
    topPercentile: 'Merit-based selection',
    description: 'Common Law Admission Test for admission to top law colleges across India.',
    collegesToReach: ['Top National Law Universities', 'Government Law Colleges'],
    prepTime: '8-12 months',
    syllabus: 'Legal Reasoning, English, General Knowledge',
  },
  {
    id: 7,
    name: 'CAT',
    field: 'Management (MBA)',
    difficulty: 'Hard',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in September',
    examDate: 'November/December',
    topPercentile: '99+ percentile for top colleges',
    description: 'Common Admission Test for MBA programs from top business schools across India.',
    collegesToReach: ['IIMs', 'FMS Delhi', 'MDI Gurgaon'],
    prepTime: '4-6 months',
    syllabus: 'Quantitative Ability, Verbal Ability, Data Interpretation',
  },
  {
    id: 8,
    name: 'GUJCET / State Board Exams',
    field: 'Engineering/Science',
    difficulty: 'Easy to Moderate',
    frequency: 'Once a year',
    applicationDeadline: 'Usually in January',
    examDate: 'March/April',
    topPercentile: 'Merit-based selection',
    description: 'State board entrance exams for engineering and science colleges.',
    collegesToReach: ['State Government Colleges'],
    prepTime: '6-10 months',
    syllabus: 'As per state board curriculum',
  },
]

export default function EntranceExamsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Entrance Exams Guide</h1>
            <p className="text-gray-300 text-lg">Comprehensive information about major entrance exams in India</p>
          </div>
        </section>

        {/* Exams Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {entranceExams.map((exam) => (
                <Card key={exam.id} className="border-2 border-gray-200 overflow-hidden hover:border-black transition">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-2">{exam.name}</h3>
                        <Badge className="bg-black text-white">{exam.field}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 font-semibold mb-1">Difficulty</div>
                        <div className="text-sm font-bold text-black">{exam.difficulty}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{exam.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600 font-semibold mb-1">Frequency</p>
                        <p className="text-black font-medium">{exam.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold mb-1">Prep Time</p>
                        <p className="text-black font-medium">{exam.prepTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold mb-1">Application</p>
                        <p className="text-black font-medium text-xs">{exam.applicationDeadline}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold mb-1">Exam Date</p>
                        <p className="text-black font-medium text-xs">{exam.examDate}</p>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-t border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold mb-2">Top Colleges</p>
                      <div className="flex flex-wrap gap-2">
                        {exam.collegesToReach.map((college, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50 border-gray-300 text-xs">
                            {college}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={`/entrance-exams/${exam.id}`}>
                      <Button className="w-full bg-black hover:bg-gray-900 text-white">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">Exam Preparation Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="p-6 border-2 border-gray-200">
                <Target className="w-8 h-8 text-black mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Set Clear Goals</h3>
                <p className="text-gray-600 text-sm">Define your target colleges and entrance exams early. This helps you plan your preparation strategy effectively.</p>
              </Card>
              <Card className="p-6 border-2 border-gray-200">
                <Clock className="w-8 h-8 text-black mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Time Management</h3>
                <p className="text-gray-600 text-sm">Create a study schedule, dedicate specific hours daily, and stick to deadlines. Consistency is key to success.</p>
              </Card>
              <Card className="p-6 border-2 border-gray-200">
                <TrendingUp className="w-8 h-8 text-black mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Regular Practice</h3>
                <p className="text-gray-600 text-sm">Solve previous years' question papers, take mock tests, and analyze your performance regularly.</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
