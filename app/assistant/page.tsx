"use client"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"
import { Send, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

const aiResponses: { [key: string]: string } = {
  admission:
    "The admission process typically involves submitting your academic records, entrance exam scores, and a personal statement. Different colleges have different requirements. Would you like to know about a specific college?",
  course:
    "We offer a wide range of courses including engineering, science, commerce, and arts. What field are you interested in?",
  placement:
    "Placement rates vary by college and course. Top engineering colleges typically have 95-98% placement rates. Would you like details about a specific college?",
  scholarship:
    "Many colleges offer merit-based and need-based scholarships. Some even offer full tuition coverage. Check with individual colleges for their scholarship programs.",
  cutoff:
    "Cutoff scores depend on the college and course. For top colleges like IITs, the cutoff is usually above 99%ile in entrance exams.",
  hostel:
    "Most colleges provide hostel facilities for students. There are usually different categories available. Hostel fees vary by college and room type.",
  default:
    "That's a great question! I can help you with information about colleges, courses, admissions, placements, and more. What would you like to know?",
}

function getResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  for (const [key, response] of Object.entries(aiResponses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  return aiResponses["default"]
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI admission assistant. I can help you with questions about colleges, courses, admissions, placements, and more. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get AI response
    const assistantResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(inputValue),
      sender: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantResponse])
    setIsLoading(false)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">AI Admission Assistant</h1>
            <p className="text-muted-foreground">Get personalized guidance about colleges and admissions</p>
          </div>

          <Card className="border border-border h-96 md:h-[500px] flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-card-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="bg-card border border-border px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
