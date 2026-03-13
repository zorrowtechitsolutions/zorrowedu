'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, Bell, User } from 'lucide-react'

const navItems = [
  { href: '/mobile', icon: Home, label: 'Home', id: 'home' },
  { href: '/mobile/search', icon: Search, label: 'Search', id: 'search' },
  { href: '/mobile/saved', icon: Heart, label: 'Saved', id: 'saved' },
  { href: '/mobile/notifications', icon: Bell, label: 'Updates', id: 'updates' },
  { href: '/mobile/profile', icon: User, label: 'Profile', id: 'profile' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-40 flex md:hidden">
      <div className="flex w-full justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                isActive ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
