"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import Link from 'next/link'
import { Search as SearchIcon, BookOpen, ArrowRight } from 'lucide-react'

const ALL_CONTENT = [
  { course: 'T4T: Training for Trainers', id: 't4t', lessons: ['The T4T Vision: Everyone a Trainer','The Three-Thirds Process','Looking Back: Pastoral Care','Looking Up: Discovery Bible Study','Looking Ahead: Practice & Goals','Sharing Your Story & God\'s Story','Tracking Generational Growth','Overcoming Barriers to Multiplication','From T4T Group to Church'] },
  { course: '4 Fields: God\'s Kingdom Growing', id: '4fields', lessons: ['The Parable of the Sower & 4 Fields','Field 1: The Empty Field — Entry','Field 2: The Seeded Field — Gospel','Field 3: The Growing Field — Discipleship','Field 4: The Harvest — Church Formation','Leadership in the 4 Fields','Multiplication: Field to Field','Using 4 Fields as a Planning Tool'] },
  { course: 'Zúme: Multiplying Disciples', id: 'zume', lessons: ['God Uses Ordinary People','Simple Definition of Disciple & Church','Spiritual Breathing','SOAPS Bible Reading','Accountability Groups','Person of Peace','Prayer Cycle & Prayer Walking','Three-Thirds Group','Coaching & Duckling Discipleship','Vision for Multiplication'] },
  { course: 'Mere Christianity', id: 'mere-christianity', lessons: ['Right and Wrong as a Clue','What God Is Like','The Shocking Alternative','The Perfect Penitent','Counting the Cost','Faith','The Three-Personal God','Is Christianity Hard or Easy?'] },
  { course: 'The Purpose Driven Life', id: 'purpose-driven-life', lessons: ['It All Starts with God','You Are Not an Accident','What Drives Your Life?','Made to Last Forever','Seeing Life from God\'s View','Planned for God\'s Pleasure','Shaped for Serving God','Made for a Mission'] },
  { course: 'The Gospel of John', id: 'gospel-of-john', lessons: ['In the Beginning Was the Word','Water into Wine','You Must Be Born Again','The Woman at the Well','The Bread of Life','The Light of the World','The Good Shepherd','The Raising of Lazarus','The Farewell Discourse','The High Priestly Prayer','The Cross and Resurrection','Do You Love Me?'] },
  { course: 'CPM: Church Planting Movements', id: 'cpm', lessons: ['Extraordinary Prayer','Abundant Evangelism','Intentional Planting','Authority of the Bible','Local Leadership','Lay Leaders','House Churches','Churches Planting Churches','Rapid Reproduction','Healthy Churches'] },
  { course: 'Romans: Heart of the Gospel', id: 'romans', lessons: ['The Gospel Revealed','The Human Problem','Justification by Faith','Peace with God','Dead to Sin','The Struggle Within','Life in the Spirit','Israel and Sovereignty','Living Sacrifices','Love Fulfills the Law'] },
]

export default function SearchPage() {
  const t = useTranslations('search')
  const [query, setQuery] = useState('')

  const results = query.length >= 2 ? ALL_CONTENT.flatMap(course =>
    course.lessons
      .map((lesson, idx) => ({ course: course.course, id: course.id, lesson, idx: idx + 1 }))
      .filter(item =>
        item.lesson.toLowerCase().includes(query.toLowerCase()) ||
        item.course.toLowerCase().includes(query.toLowerCase())
      )
  ) : []

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-secondary-900 mb-6">{t('title')}</h1>
      
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 transition"
          autoFocus
        />
      </div>

      {query.length >= 2 && (
        <p className="text-sm text-gray-500 mb-4">{results.length} {t('results')}</p>
      )}

      <div className="space-y-2">
        {results.slice(0, 20).map((item, i) => (
          <Link key={i} href={`/courses/${item.id}/${item.idx}`} className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:border-primary-300 transition group">
            <BookOpen className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-secondary-900 truncate">{item.lesson}</div>
              <div className="text-xs text-gray-500">{item.course} • Lesson {item.idx}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition" />
          </Link>
        ))}
      </div>

      {query.length < 2 && (
        <div className="text-center py-12 text-gray-400">
          <SearchIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{t('hint')}</p>
        </div>
      )}
    </div>
  )
}
