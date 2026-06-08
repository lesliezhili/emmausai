"use client"

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { RotateCcw, CheckCircle, X, ChevronRight, Brain } from 'lucide-react'

const VERSES = [
  { ref: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
  { ref: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
  { ref: 'Philippians 4:13', text: 'I can do all this through him who gives me strength.' },
  { ref: 'Jeremiah 29:11', text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
  { ref: 'Psalm 23:1', text: 'The Lord is my shepherd, I lack nothing.' },
  { ref: '2 Timothy 2:2', text: 'And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.' },
  { ref: 'Matthew 28:19-20', text: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.' },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
  { ref: 'Isaiah 41:10', text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.' },
  { ref: 'Ephesians 2:8-9', text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.' },
  { ref: 'Romans 12:2', text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.' },
  { ref: 'Galatians 2:20', text: 'I have been crucified with Christ and I no longer live, but Christ lives in me.' },
  { ref: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
  { ref: 'James 1:22', text: 'Do not merely listen to the word, and so deceive yourselves. Do what it says.' },
  { ref: '1 John 4:19', text: 'We love because he first loved us.' },
]

export default function FlashcardsPage() {
  const t = useTranslations('flashcards')
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<number[]>([])
  const [deck] = useState(VERSES.map((_, i) => i))

  useEffect(() => {
    const saved = localStorage.getItem('emmaus_flashcards_known')
    if (saved) try { setKnown(JSON.parse(saved)) } catch {}
  }, [])

  const card = VERSES[deck[current]]
  const remaining = deck.length - known.filter(k => deck.includes(k)).length

  const markKnown = () => {
    const updated = [...known, deck[current]]
    setKnown(updated)
    localStorage.setItem('emmaus_flashcards_known', JSON.stringify(updated))
    next()
  }

  const next = () => {
    setFlipped(false)
    setCurrent(prev => (prev + 1) % deck.length)
  }

  const reset = () => {
    setKnown([])
    setCurrent(0)
    setFlipped(false)
    localStorage.removeItem('emmaus_flashcards_known')
  }

  const isKnown = known.includes(deck[current])

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary-900 flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary-500" /> {t('title')}
        </h1>
        <button onClick={reset} className="text-sm text-gray-500 hover:text-primary-500 flex items-center gap-1">
          <RotateCcw className="w-4 h-4" /> {t('reset')}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">{remaining} {t('remaining')} / {deck.length} {t('total')}</p>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full h-64 cursor-pointer perspective-1000 mb-6"
      >
        <div className={`w-full h-full rounded-2xl shadow-lg border-2 transition-all duration-500 flex items-center justify-center p-6 ${
          flipped ? 'bg-primary-50 border-primary-300' : 'bg-white border-gray-200'
        } ${isKnown ? 'opacity-50' : ''}`}>
          {!flipped ? (
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">{t('tapToReveal')}</p>
              <p className="text-xl font-bold text-primary-700">{card.ref}</p>
              <p className="text-sm text-gray-400 mt-4">{t('whatVerse')}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-primary-600 mb-3">{card.ref}</p>
              <p className="text-base text-secondary-900 leading-relaxed italic">&ldquo;{card.text}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={next} className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <X className="w-4 h-4" /> {t('again')}
        </button>
        <button onClick={markKnown} className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" /> {t('gotIt')}
        </button>
        <button onClick={next} className="flex-1 py-3 border-2 border-primary-200 text-primary-600 rounded-xl hover:bg-primary-50 transition flex items-center justify-center gap-2">
          <ChevronRight className="w-4 h-4" /> {t('skip')}
        </button>
      </div>
    </div>
  )
}
