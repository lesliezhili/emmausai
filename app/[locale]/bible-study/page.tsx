import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import AiBibleChat from '@/components/ai/AiBibleChat'

type Props = { params: Promise<{ locale: string }> }

export default async function BibleStudyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <BibleStudyContent />
}

function BibleStudyContent() {
  const t = useTranslations('bibleStudy')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>
      <AiBibleChat />
      <p className="text-xs text-gray-400 text-center mt-4 italic">{t('disclaimer')}</p>
    </div>
  )
}
