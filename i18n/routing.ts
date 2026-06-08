import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh-CN', 'zh-TW', 'es', 'ko', 'ja', 'pt-BR'],
  defaultLocale: 'en',
  pathnames: {
    '/':           { en: '/', 'zh-CN': '/', 'zh-TW': '/', es: '/', ko: '/', ja: '/', 'pt-BR': '/' },
    '/courses':    { en: '/courses', 'zh-CN': '/courses', 'zh-TW': '/courses', es: '/cursos', ko: '/courses', ja: '/courses', 'pt-BR': '/cursos' },
    '/bible-study':{ en: '/bible-study', 'zh-CN': '/bible-study', 'zh-TW': '/bible-study', es: '/estudio-biblico', ko: '/bible-study', ja: '/bible-study', 'pt-BR': '/estudo-biblico' },
    '/devotional': { en: '/devotional', 'zh-CN': '/devotional', 'zh-TW': '/devotional', es: '/devocional', ko: '/devotional', ja: '/devotional', 'pt-BR': '/devocional' },
    '/community':  { en: '/community', 'zh-CN': '/community', 'zh-TW': '/community', es: '/comunidad', ko: '/community', ja: '/community', 'pt-BR': '/comunidade' },
    '/profile':    { en: '/profile', 'zh-CN': '/profile', 'zh-TW': '/profile', es: '/perfil', ko: '/profile', ja: '/profile', 'pt-BR': '/perfil' },
    '/login':      { en: '/login', 'zh-CN': '/login', 'zh-TW': '/login', es: '/login', ko: '/login', ja: '/login', 'pt-BR': '/login' },
    '/register':   { en: '/register', 'zh-CN': '/register', 'zh-TW': '/register', es: '/registro', ko: '/register', ja: '/register', 'pt-BR': '/cadastro' },
  },
})

export type Locale = (typeof routing.locales)[number]
