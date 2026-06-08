import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Heart, BookOpen, Sunrise } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export default async function DevotionalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <DevotionalContent />
}

function DevotionalContent() {
  const t = useTranslations('devotional')

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Sunrise className="w-12 h-12 mx-auto text-primary-500 mb-4" />
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Today's Devotional */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
        <p className="text-sm text-primary-600 font-medium mb-2">{t('today')} — June 5, 2026</p>
        
        <blockquote className="text-xl font-serif italic text-secondary-800 border-l-4 border-primary-400 pl-4 my-6">
          &ldquo;For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
        </blockquote>
        <p className="text-sm text-gray-500 mb-6">— Jeremiah 29:11 (NIV)</p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-secondary-900 flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary-600" />
              {t('reflection')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              God&apos;s plans for us are always good, even when our circumstances don&apos;t feel that way. The Israelites were in exile — displaced, confused, grieving. Yet God spoke hope into their despair. Today, whatever exile you find yourself in — whether emotional, relational, or spiritual — know that God has not forgotten you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-secondary-900 flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-accent" />
              {t('prayer')}
            </h3>
            <p className="text-gray-700 italic leading-relaxed">
              Lord, help me trust Your plans even when I cannot see the path ahead. Give me hope and patience in this season. Amen.
            </p>
          </div>

          <div className="bg-primary-50 rounded-lg p-4">
            <h3 className="font-semibold text-secondary-900 mb-1">{t('application')}</h3>
            <p className="text-gray-700 text-sm">
              Write down one area where you need to trust God&apos;s plan today. Pray specifically about it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
