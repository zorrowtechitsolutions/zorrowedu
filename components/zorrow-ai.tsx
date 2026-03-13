'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { X, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ZorrowAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi, I\'m Zorrow AI. I\'m here to help you choose the right college, understand courses, prepare for entrance exams, and plan your career. What can I help you with today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    
    const timer = setTimeout(scrollToBottom, 0)
    return () => clearTimeout(timer)
  }, [messages, isLoading])

  // AI Response Generator based on user query
  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    // Course guidance
    if (lowerInput.includes('course') || lowerInput.includes('what should i study') || lowerInput.includes('engineering') || lowerInput.includes('btech')) {
      const courseResponses = [
        'Great! Choosing a course is crucial for your career. Here are the popular courses in Kerala:\n\n• B.Tech Computer Science: Requires JEE Main/Advanced, excellent job prospects (12-25 LPA), top colleges like IIT Delhi, NIT Calicut.\n\n• MBBS: Requires NEET, duration 5.5 years, high demand in healthcare sector.\n\n• BBA: No entrance exam needed, good for management roles, average salary 6-12 LPA.\n\nWhat interests you most?',
        'To choose the right course, consider:\n\n1. Your interests and strengths\n2. Career goals and salary expectations\n3. Entrance exam requirements (JEE, NEET, CAT, etc.)\n4. Duration and fees\n5. Job market demand\n\nWhich field interests you - Engineering, Medicine, Business, or something else?',
      ]
      return courseResponses[Math.floor(Math.random() * courseResponses.length)]
    }

    // College guidance
    if (lowerInput.includes('college') || lowerInput.includes('which college') || lowerInput.includes('nit') || lowerInput.includes('cusat')) {
      const collegeResponses = [
        'Popular colleges in Kerala include:\n\n• NIT Calicut: Top engineering college, average package 12-15 LPA, strong placement record\n• CUSAT: Good for engineering and science programs\n• Government Medical College: Prestigious medical institution\n• Mar Ivanios College: Excellent for commerce and science\n\nWhat course are you interested in? I can recommend specific colleges.',
        'When choosing a college, consider:\n\n1. Reputation and rankings\n2. Course offerings\n3. Placement records (average package, companies recruiting)\n4. Fees and scholarships\n5. Campus facilities and location\n\nTell me your stream (Engineering, Medicine, Commerce) and I\'ll suggest top colleges!',
      ]
      return collegeResponses[Math.floor(Math.random() * collegeResponses.length)]
    }

    // Entrance exam guidance
    if (lowerInput.includes('exam') || lowerInput.includes('jee') || lowerInput.includes('neet') || lowerInput.includes('keam') || lowerInput.includes('cuet')) {
      const examResponses = [
        'Key entrance exams for Kerala students:\n\n• JEE Main: For engineering (national), 2-3 attempts per year\n• JEE Advanced: For top engineering colleges\n• NEET: For medical courses, conducted once a year\n• KEAM: Kerala-specific engineering exam\n• CUET: For undergraduate admissions\n\nWhich exam are you preparing for? I can help with preparation tips!',
        'Exam Preparation Tips:\n\n1. Start early - Begin 6-12 months before the exam\n2. Create a study schedule\n3. Focus on weak areas\n4. Take regular mock tests\n5. Stay motivated and healthy\n6. Solve previous year papers\n\nWhich exam are you targeting?',
      ]
      return examResponses[Math.floor(Math.random() * examResponses.length)]
    }

    // Career guidance
    if (lowerInput.includes('career') || lowerInput.includes('job') || lowerInput.includes('salary') || lowerInput.includes('future')) {
      const careerResponses = [
        'Career planning involves:\n\n1. Understanding your interests and strengths\n2. Researching career paths and job roles\n3. Choosing education aligned with goals\n4. Building skills and experience\n5. Networking with professionals\n\nWhat field are you interested in? I can help with career guidance!',
        'Popular career paths in Kerala:\n\n• Tech & IT: High demand, salaries 12-40 LPA, roles like software engineer, data scientist\n• Healthcare: MBBS, nursing, pharmacy - always in demand\n• Management: MBA graduates, average 15-40 LPA\n• Law: Growing field with 8-20 LPA opportunities\n\nWhat interests you?',
      ]
      return careerResponses[Math.floor(Math.random() * careerResponses.length)]
    }

    // Admission process
    if (lowerInput.includes('admission') || lowerInput.includes('apply') || lowerInput.includes('deadline') || lowerInput.includes('process')) {
      const admissionResponses = [
        'Admission Process in Kerala:\n\n1. Write entrance exam (JEE, NEET, etc.)\n2. Check your rank/percentile\n3. Register and fill college preferences\n4. Download allotment letter\n5. Report to college with documents\n6. Complete admission formalities\n\nWhich college admission process would you like to know about?',
        'Key admission timelines:\n\n• JEE Main: January & April\n• NEET: Usually May-June\n• KEAM: June-July\n• Counselling: June-August\n• College admission: July-September\n\nCheck official websites for exact dates. Need help with any specific exam?',
      ]
      return admissionResponses[Math.floor(Math.random() * admissionResponses.length)]
    }

    // Study tips & motivation
    if (lowerInput.includes('study') || lowerInput.includes('stuck') || lowerInput.includes('confused') || lowerInput.includes('help') || lowerInput.includes('tips')) {
      const studyResponses = [
        'Study Tips for Success:\n\n1. Create a structured daily schedule\n2. Study in 45-minute blocks with breaks\n3. Focus on understanding, not just memorizing\n4. Use active recall and spaced repetition\n5. Join study groups and discuss concepts\n6. Take regular practice tests\n7. Stay healthy - sleep 7-8 hours daily\n\nRemember: Consistency beats intensity. Small daily efforts lead to big results!',
        'Feeling stuck? That\'s normal! Here\'s what helps:\n\n✓ Break big goals into smaller tasks\n✓ Change your study environment\n✓ Talk to mentors or teachers\n✓ Take short breaks and exercise\n✓ Focus on one concept at a time\n✓ Celebrate small wins\n\nYou\'ve got this! What specific topic can I help you with?',
      ]
      return studyResponses[Math.floor(Math.random() * studyResponses.length)]
    }

    // Eligibility & fees
    if (lowerInput.includes('eligible') || lowerInput.includes('eligibility') || lowerInput.includes('fees') || lowerInput.includes('cost')) {
      const eligibilityResponses = [
        'General Eligibility Requirements:\n\n• Engineering: 12th PCM, JEE Main/Advanced\n• Medicine: 12th PCB, NEET (50% marks)\n• Commerce: 12th PCM/M, no entrance exam usually\n• Arts: 12th any stream, no entrance exam\n\nFees vary by college (₹1-15 lakhs per year). Government colleges are cheaper. Tell me your interests!',
        'Checking Eligibility:\n\n1. Score in qualifying exam (12th)\n2. Entrance exam rank/percentile\n3. Category and seat reservation\n4. Age limit (if applicable)\n5. Residency status (for state quotas)\n\nWhich course\'s eligibility would you like to know?',
      ]
      return eligibilityResponses[Math.floor(Math.random() * eligibilityResponses.length)]
    }

    // Default helpful response
    const defaultResponses = [
      'I can help you with:\n\n• Choosing the right course and college\n• Understanding entrance exams (JEE, NEET, KEAM, etc.)\n• Learning about admission procedures\n• Career guidance and job opportunities\n• Study tips and exam preparation\n\nWhat would you like to know?',
      'I\'m here to support your education journey! You can ask me about:\n\n• Colleges and their programs\n• Course selection and career paths\n• Entrance exam details and preparation\n• Admission timelines and processes\n• Study strategies and motivation\n\nWhat\'s on your mind?',
    ]
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Generate contextual AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-white text-black shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-black overflow-hidden"
        aria-label="Open ZORROW AI"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20BLACK-nhJwfThkwbrBZfFUdqbcr3N7EKbf8S.png"
            alt="ZORROW AI"
            className="w-8 h-8 object-contain"
          />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-24px)] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-96">
          {/* Header - Fixed */}
          <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20BLACK-nhJwfThkwbrBZfFUdqbcr3N7EKbf8S.png"
                  alt="ZorrowEdu"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Zorrow AI</h3>
                <p className="text-xs text-gray-300">Admission Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-gray-800 rounded-lg p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Zorrow AI typing</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input - Fixed at Bottom */}
          <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex gap-2 flex-shrink-0 bg-white dark:bg-zinc-900">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Zorrow AI about colleges, courses, or your career..."
              className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              size="sm"
              className="bg-black hover:bg-gray-900 text-white flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
