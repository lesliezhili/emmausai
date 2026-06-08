"use client"

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/courses', label: t('courses') },
    { href: '/bible-study', label: t('bibleStudy') },
    { href: '/devotional', label: t('devotional') },
    { href: '/community', label: t('community') },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-secondary-700 font-bold text-xl">
          <BookOpen className="w-6 h-6 text-primary-600" />
          EmmausAI
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition ${
                pathname.includes(href) ? 'text-primary-700' : 'text-gray-600 hover:text-secondary-700'
              }`}
            >
              {label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link href="/search" className="text-sm text-gray-600 hover:text-primary-600 transition">🔍</Link>
          <Link href="/profile" className="text-sm text-gray-600 hover:text-primary-600 transition">📊</Link>
          <Link href="/login" className="text-sm px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition">
            {t('login')}
          </Link>
          <Link href="/register" className="text-sm px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition">
            {t('register')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="block text-gray-700 hover:text-primary-700" onClick={() => setMobileOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t">
            <LanguageSwitcher />
          </div>
          <Link href="/search" className="text-sm text-gray-600 hover:text-primary-600 transition">🔍</Link>
          <Link href="/profile" className="text-sm text-gray-600 hover:text-primary-600 transition">📊</Link>
          <Link href="/login" className="block text-secondary-600 font-medium" onClick={() => setMobileOpen(false)}>
            {t('login')}
          </Link>
          <Link href="/register" className="block text-white bg-secondary-600 px-4 py-2 rounded-lg text-center" onClick={() => setMobileOpen(false)}>
            {t('register')}
          </Link>
        </div>
      )}
    </nav>
  )
}
