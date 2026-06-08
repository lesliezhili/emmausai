import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import '@/app/globals.css'

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

const LOCALE_TO_LANG: Record<string, string> = {
  en: 'en',
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hant',
  es: 'es',
  ko: 'ko',
  ja: 'ja',
  'pt-BR': 'pt',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!(routing.locales as readonly string[]).includes(locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()
  const htmlLang = LOCALE_TO_LANG[locale] ?? locale

  return (
    <html lang={htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="EmmausAI — AI-aided Bible education for all people under God. Free. Open Source. 7 Languages." />
        <title>EmmausAI — Walk with Jesus, Learn through AI</title>
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-white">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
