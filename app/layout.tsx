import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ZorrowAI } from "@/components/zorrow-ai"
import { SplashScreen } from "@/components/splash-screen"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZorrowEdu - Kerala's Smartest College & Admission Platform",
  description: "Search colleges. Explore courses. Apply easily. Get guided by AI with ZorrowEdu, the premium AI-powered Kerala college platform.",
  generator: "v0.app",
  metadataBase: new URL("https://zorrowedu.com"),
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "ZorrowEdu - Kerala's Smartest College & Admission Platform",
    description: "AI-powered college search and admission platform for Kerala students",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SplashScreen />
        {children}
        <ZorrowAI />
        <Analytics />
      </body>
    </html>
  )
}
