import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download, QrCode, Smartphone, Zap, CheckCircle, Users, Search } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const appFeatures = [
    { icon: Zap, title: "AI Admission Assistant", desc: "Smart guidance on colleges and courses" },
    { icon: ArrowRight, title: "One-click Apply", desc: "Apply to multiple colleges instantly" },
    { icon: Users, title: "Application Tracking", desc: "Track your application status live" },
    { icon: Search, title: "College Comparison", desc: "Compare colleges side by side" },
  ]

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white py-20 md:py-32 overflow-hidden min-h-screen flex items-center" style={{
          backgroundImage: 'url(/hero-campus-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/75"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center space-y-6">

              <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
                Kerala's Smartest College & Admission Platform
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                Search colleges. Explore courses. Apply easily. Get guided by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/colleges">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-black w-full sm:w-auto font-semibold">
                    Explore Colleges <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto font-semibold bg-transparent">
                    Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* App Entry System Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Phone Mockup */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative w-48 h-80 sm:w-56 sm:h-96 md:w-64 md:h-96 bg-black rounded-3xl border-4 sm:border-6 md:border-8 border-gray-800 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
                    <div className="p-4 text-white text-center pt-12">
                      <h3 className="text-sm font-semibold mb-4">ZORROW AI</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-800 rounded-lg p-3 text-xs">Smart Search</div>
                        <div className="bg-gray-800 rounded-lg p-3 text-xs">One-click Apply</div>
                        <div className="bg-gray-800 rounded-lg p-3 text-xs">Live Tracking</div>
                        <div className="bg-gray-800 rounded-lg p-3 text-xs">AI Guidance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6 md:space-y-8 order-1 md:order-2">
                <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Get the ZorrowEdu App
                </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Access all features on the go. Search, compare, and apply to colleges anytime, anywhere.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="space-y-4">
                  {appFeatures.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download for Android
                  </Button>
                  <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download for iOS
                  </Button>
                </div>

                {/* QR Code Section */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Scan to Download</p>
                      <p className="text-sm text-gray-600">Quick access to the ZorrowEdu app</p>
                    </div>
                  </div>
                </div>

                {/* Email Capture */}
                <div className="bg-black text-white rounded-lg p-6">
                  <p className="font-semibold mb-3">Get Notified on Launch</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-2 rounded-lg text-black focus:outline-none"
                    />
                    <Button className="bg-white hover:bg-gray-100 text-black">
                      Notify
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
              Why Choose ZORROW?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-black rounded-2xl p-8">
                <Search className="w-8 h-8 text-black mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-black">Smart Search</h3>
                <p className="text-gray-600">
                  Filter by course, district, fees, and entrance exams. Find the perfect college instantly.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-8">
                <Zap className="w-8 h-8 text-black mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-black">AI Guidance</h3>
                <p className="text-gray-600">
                  Get personalized advice from ZORROW AI on eligibility, fees, and career scope.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-8">
                <CheckCircle className="w-8 h-8 text-black mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-black">Easy Apply</h3>
                <p className="text-gray-600">
                  Apply to multiple colleges with one form. Track applications in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Start Your Journey Today</h2>
            <p className="text-xl text-gray-300">
              Join thousands of Kerala students discovering their perfect college match
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-black font-semibold">
                  Explore Colleges <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                Download App
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4">ZorrowEdu</h3>
                <p className="text-gray-400 text-sm">Kerala's smartest admission platform</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-sm">Platform</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="/colleges">Colleges</Link></li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-sm">For Colleges</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="/college-admin">Admin Panel</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-sm">Legal</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2026 ZorrowEdu. All rights reserved.</p>
              <p>Kerala's Premium College Platform</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
