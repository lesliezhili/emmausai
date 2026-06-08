"use client"

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Award, Download } from 'lucide-react'

function CertificateContent() {
  const t = useTranslations('certificate')
  const params = useSearchParams()
  const course = params.get('course') || 'Course'
  const name = params.get('name') || 'Student'
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white border-4 border-primary-500 rounded-2xl p-8 text-center shadow-lg">
        <Award className="w-16 h-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-serif font-bold text-secondary-900 mb-2">{t('title')}</h1>
        <p className="text-gray-500 mb-6">{t('subtitle')}</p>
        <div className="border-t border-b border-gray-200 py-6 my-6">
          <p className="text-lg text-gray-600 mb-2">{t('presented')}</p>
          <p className="text-2xl font-bold text-secondary-900 mb-4">{name}</p>
          <p className="text-gray-600">{t('completed')}</p>
          <p className="text-xl font-semibold text-primary-700 mt-1">{course}</p>
        </div>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-xs text-gray-400 mt-2">EmmausAI</p>
      </div>
      <div className="text-center mt-6">
        <button onClick={() => window.print()} className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center gap-2 mx-auto">
          <Download className="w-4 h-4" /> {t('download')}
        </button>
      </div>
    </div>
  )
}

export default function CertificatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CertificateContent />
    </Suspense>
  )
}
