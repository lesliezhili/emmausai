import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { BookOpen, MessageCircle, Users, Globe, Heart, Sparkles, Headphones, Baby, MapPin, Calendar } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomeContent />
}

function HomeContent() {
  const t = useTranslations('home')
  const tc = useTranslations('common')

  const features = [
    { key: 'aiTutor', icon: Sparkles, color: 'text-primary-600' },
    { key: 'courses', icon: BookOpen, color: 'text-secondary-600' },
    { key: 'devotional', icon: Heart, color: 'text-accent' },
    { key: 'community', icon: Users, color: 'text-green-600' },
    { key: 'audioBible', icon: Headphones, color: 'text-indigo-600' },
    { key: 'readingPlan', icon: Calendar, color: 'text-teal-600' },
    { key: 'kids', icon: Baby, color: 'text-pink-600' },
    { key: 'multilingual', icon: Globe, color: 'text-purple-600' },
    { key: 'churchFinder', icon: MapPin, color: 'text-amber-600' },
    { key: 'free', icon: MessageCircle, color: 'text-orange-600' },
  ]

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full py-20 px-4 text-center bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-700 text-white">
        <h1 className="text-5xl font-bold mb-4">{t('heroTitle')}</h1>
        <p className="text-xl mb-2 text-primary-200">{t('heroSubtitle')}</p>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{t('heroDesc')}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/bible-study" className="px-8 py-3 bg-primary-500 text-secondary-900 font-semibold rounded-lg hover:bg-primary-400 transition">
            {t('ctaStart')}
          </Link>
          <Link href="/courses" className="px-8 py-3 border-2 border-primary-300 text-primary-200 rounded-lg hover:bg-white/10 transition">
            {t('ctaExplore')}
          </Link>
        </div>
        <p className="mt-8 text-sm opacity-70 italic">{tc('verse')}</p>
      </section>

      {/* Features */}
      <section className="w-full max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary-900">{t('features.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ key, icon: Icon, color }) => (
            <div key={key} className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition border border-gray-100">
              <Icon className={`w-9 h-9 mb-3 ${color}`} />
              <h3 className="text-lg font-semibold mb-1">{t(`features.${key}.title`)}</h3>
              <p className="text-gray-600 text-sm">{t(`features.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inspired By */}
      <section className="w-full py-8 text-center bg-gray-50 border-t">
        <p className="text-sm text-gray-500">{t('inspiredBy')}</p>
        <p className="text-xs text-gray-400 mt-1">{tc('free')}</p>
      </section>
    </div>
  )
}
