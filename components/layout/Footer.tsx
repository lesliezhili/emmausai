import { useTranslations } from 'next-intl'
import { BookOpen, Heart } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-secondary-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary-400" />
              <span className="font-bold text-lg">EmmausAI</span>
            </div>
            <p className="text-sm text-gray-400 italic">{t('verse')}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold mb-3 text-primary-300">{t('platform')}</h4>
            <p className="text-sm text-gray-400">{t('freeStack')}</p>
            <p className="text-sm text-gray-500 mt-2">{t('inspiredBy')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-primary-300">{t('resources')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://github.com/lesliezhili/emmausai" className="hover:text-white transition">GitHub (Open Source)</a></li>
              <li><a href="https://gracecovenant.vercel.app" className="hover:text-white transition">GraceCovenant</a></li>
              <li><a href="https://silverconnect.vercel.app" className="hover:text-white transition">SilverConnect</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Heart className="w-3 h-3 text-accent" /> {t('copyright')}
          </p>
          <p className="text-xs text-gray-600">100% Free · Open Source · For All People Under God</p>
        </div>
      </div>
    </footer>
  )
}
