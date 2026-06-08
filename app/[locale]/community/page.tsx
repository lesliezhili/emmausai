import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Users, MessageCircle, Heart } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CommunityContent />
}

function CommunityContent() {
  const t = useTranslations('community')

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-xl bg-white shadow-md text-center">
          <Users className="w-10 h-10 mx-auto text-secondary-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('studyGroups')}</h3>
          <p className="text-gray-600 text-sm">Join a small group studying through books of the Bible together.</p>
        </div>
        <div className="p-8 rounded-xl bg-white shadow-md text-center">
          <Heart className="w-10 h-10 mx-auto text-accent mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('prayerWall')}</h3>
          <p className="text-gray-600 text-sm">Share prayer requests and stand together in faith.</p>
        </div>
        <div className="p-8 rounded-xl bg-white shadow-md text-center">
          <MessageCircle className="w-10 h-10 mx-auto text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('discussions')}</h3>
          <p className="text-gray-600 text-sm">Discuss theology, ask questions, and grow together.</p>
        </div>
      </div>
    </div>
  )
}
