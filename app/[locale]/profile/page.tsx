"use client"

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, CheckCircle, Clock, Award, TrendingUp, Flame } from 'lucide-react'

interface CourseProgress {
  courseId: string
  courseTitle: string
  totalLessons: number
  completedLessons: number
  lastAccessed: string | null
}

const COURSE_LIST = [
  { id: 't4t', title: 'T4T: Training for Trainers', lessons: 9 },
  { id: '4fields', title: '4 Fields: God\'s Kingdom Growing', lessons: 8 },
  { id: 'zume', title: 'Zúme: Multiplying Disciples', lessons: 10 },
  { id: 'mere-christianity', title: 'Mere Christianity', lessons: 8 },
  { id: 'purpose-driven-life', title: 'The Purpose Driven Life', lessons: 8 },
  { id: 'gospel-of-john', title: 'The Gospel of John', lessons: 12 },
  { id: 'cpm', title: 'CPM: Church Planting Movements', lessons: 10 },
  { id: 'dmm', title: 'DMM: Disciple Making Movements', lessons: 7 },
  { id: 'vpt', title: 'VPT: Vision, Plan, Train', lessons: 10 },
]

export default function ProfilePage() {
  const t = useTranslations('profile')
  const [courses, setCourses] = useState<CourseProgress[]>([])
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    // Load progress from localStorage
    const allProgress: CourseProgress[] = []
    let total = 0

    COURSE_LIST.forEach(course => {
      const saved = localStorage.getItem(`emmaus_progress_${course.id}`)
      if (saved) {
        try {
          const data = JSON.parse(saved)
          const completed = Object.values(data).filter((p: unknown) => (p as {completed: boolean}).completed).length
          total += completed
          if (completed > 0) {
            allProgress.push({
              courseId: course.id,
              courseTitle: course.title,
              totalLessons: course.lessons,
              completedLessons: completed,
              lastAccessed: Object.values(data).reduce((latest: string | null, p: unknown) => {
                const item = p as {completedAt?: string}
                if (item.completedAt && (!latest || item.completedAt > latest)) return item.completedAt
                return latest
              }, null) as string | null,
            })
          }
        } catch { /* ignore */ }
      }
    })

    // Sort by most recently accessed
    allProgress.sort((a, b) => (b.lastAccessed || '').localeCompare(a.lastAccessed || ''))
    setCourses(allProgress)
    setTotalCompleted(total)

    // Calculate streak (consecutive days with completions)
    const today = new Date()
    let currentStreak = 0
    for (let i = 0; i < 365; i++) {
      const day = new Date(today)
      day.setDate(day.getDate() - i)
      const dayStr = day.toISOString().split('T')[0]
      const hasActivity = allProgress.some(c => c.lastAccessed?.startsWith(dayStr))
      if (hasActivity || i === 0) currentStreak++
      else break
    }
    setStreak(currentStreak)
  }, [])

  const coursesStarted = courses.length
  const coursesCompleted = courses.filter(c => c.completedLessons >= c.totalLessons).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-secondary-900 mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-4 text-center">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-secondary-900">{totalCompleted}</div>
          <div className="text-xs text-gray-500">{t('lessonsCompleted')}</div>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-secondary-900">{coursesStarted}</div>
          <div className="text-xs text-gray-500">{t('coursesStarted')}</div>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <Award className="w-6 h-6 text-primary-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-secondary-900">{coursesCompleted}</div>
          <div className="text-xs text-gray-500">{t('coursesFinished')}</div>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-secondary-900">{streak}</div>
          <div className="text-xs text-gray-500">{t('dayStreak')}</div>
        </div>
      </div>

      {/* Course Progress */}
      <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" /> {t('myProgress')}
      </h2>

      {courses.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">{t('noCourses')}</p>
          <Link href="/courses" className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
            {t('browseCourses')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map(course => {
            const pct = Math.round((course.completedLessons / course.totalLessons) * 100)
            const isComplete = pct >= 100
            return (
              <Link key={course.courseId} href={`/courses/${course.courseId}`} className="block bg-white rounded-xl border hover:border-primary-300 transition p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-secondary-900 text-sm">{course.courseTitle}</h3>
                  {isComplete ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{t('complete')}</span>
                  ) : (
                    <span className="text-xs text-gray-500">{course.completedLessons}/{course.totalLessons}</span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-primary-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
