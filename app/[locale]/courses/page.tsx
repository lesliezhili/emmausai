"use client"

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, Church, Heart, Users, Baby, Briefcase, Shield, Globe2 } from 'lucide-react'

export default function CoursesPage() {
  const t = useTranslations('courses')
  const [filter, setFilter] = useState('all')
  const locale = useLocale()
  const allCourseNames = useTranslations('courseNames')
  const getTitle = (id: string, fallback: string) => {
    try { const v = allCourseNames(`${id}.title`); return v && !v.includes('.title') ? v : fallback } catch { return fallback }
  }
  const getDesc = (id: string, fallback: string) => {
    try { const v = allCourseNames(`${id}.desc`); return v && !v.includes('.desc') ? v : fallback } catch { return fallback }
  }

  const categories = [
    { key: 'all', icon: BookOpen, color: 'bg-gray-100 text-gray-700', activeColor: 'bg-gray-700 text-white' },
    { key: 'church-planting', icon: Church, color: 'bg-blue-100 text-blue-700', activeColor: 'bg-blue-700 text-white' },
    { key: 'apologetics', icon: Shield, color: 'bg-indigo-100 text-indigo-700', activeColor: 'bg-indigo-700 text-white' },
    { key: 'discipleship', icon: Heart, color: 'bg-purple-100 text-purple-700', activeColor: 'bg-purple-700 text-white' },
    { key: 'gospel', icon: BookOpen, color: 'bg-green-100 text-green-700', activeColor: 'bg-green-700 text-white' },
    { key: 'bible-books', icon: BookOpen, color: 'bg-emerald-100 text-emerald-700', activeColor: 'bg-emerald-700 text-white' },
    { key: 'christian-living', icon: Heart, color: 'bg-rose-100 text-rose-700', activeColor: 'bg-rose-700 text-white' },
    { key: 'leadership', icon: Users, color: 'bg-amber-100 text-amber-700', activeColor: 'bg-amber-700 text-white' },
    { key: 'missions', icon: Globe2, color: 'bg-teal-100 text-teal-700', activeColor: 'bg-teal-700 text-white' },
    { key: 'family', icon: Baby, color: 'bg-pink-100 text-pink-700', activeColor: 'bg-pink-700 text-white' },
    { key: 'vocation', icon: Briefcase, color: 'bg-cyan-100 text-cyan-700', activeColor: 'bg-cyan-700 text-white' },
    { key: 'vce', icon: BookOpen, color: 'bg-sky-100 text-sky-700', activeColor: 'bg-sky-700 text-white' },
  ]

  const courses = [
    { id: 't4t', title: 'T4T: Training for Trainers', author: 'Based on Ying Kai', desc: 'Every believer trains others who train others.', category: 'church-planting', difficulty: 'beginner', lessons: 9 },
    { id: '4fields', title: '4 Fields: God\'s Kingdom Growing', author: 'Based on Nathan Shank', desc: 'Four stages of kingdom growth as a coaching tool.', category: 'church-planting', difficulty: 'beginner', lessons: 8 },
    { id: 'zume', title: 'Zume: Multiplying Disciples', author: 'zumeproject.com', desc: 'Free training for disciple-multiplication movements.', category: 'church-planting', difficulty: 'beginner', lessons: 10 },
    { id: 'cpm', title: 'CPM: Church Planting Movements', author: 'Based on David Garrison', desc: 'The 10 universal elements in every Church Planting Movement.', category: 'church-planting', difficulty: 'intermediate', lessons: 10 },
    { id: 'dmm', title: 'DMM: Disciple Making Movements', author: 'Based on David Watson', desc: 'Discovery Bible Study approach for non-believers.', category: 'church-planting', difficulty: 'beginner', lessons: 7 },
    { id: 'vpt', title: 'VPT: Vision, Plan, Train', author: 'Church Planting Framework', desc: 'Cast vision, develop plans, train leaders for church planting.', category: 'church-planting', difficulty: 'intermediate', lessons: 10 },
    { id: 'dcpi-essentials', title: 'DCPI: Church Planting Essentials', author: 'Dynamic Church Planting Intl', desc: 'Biblical foundations: 5 phases from Preparation to Multiplication.', category: 'church-planting', difficulty: 'beginner', lessons: 8 },
    { id: 'dcpi-multiplying', title: 'DCPI: Multiplying Churches Globally', author: 'Dynamic Church Planting Intl', desc: 'Advanced training for reproducing churches across cultures.', category: 'church-planting', difficulty: 'advanced', lessons: 6 },
    { id: 'dcpi-toolkit', title: 'DCPI: Church Planter\'s Toolkit', author: 'Dynamic Church Planting Intl', desc: 'Practical tools for community analysis and team building.', category: 'church-planting', difficulty: 'intermediate', lessons: 7 },
    { id: 'mere-christianity', title: 'Mere Christianity', author: 'Based on C.S. Lewis', desc: 'The rational case for Christian faith.', category: 'apologetics', difficulty: 'intermediate', lessons: 8 },
    { id: 'reason-for-god', title: 'The Reason for God', author: 'Based on Timothy Keller', desc: 'Engaging doubts with intellectual honesty.', category: 'apologetics', difficulty: 'intermediate', lessons: 8 },
    { id: 'knowing-god', title: 'Knowing God', author: 'Based on J.I. Packer', desc: 'From knowing about God to knowing Him personally.', category: 'apologetics', difficulty: 'intermediate', lessons: 8 },
    { id: 'cost-of-discipleship', title: 'The Cost of Discipleship', author: 'Based on Dietrich Bonhoeffer', desc: 'Cheap grace vs costly grace.', category: 'discipleship', difficulty: 'advanced', lessons: 6 },
    { id: 'foundations-of-faith', title: 'Foundations of Faith', author: 'EmmausAI', desc: 'Core beliefs for new believers and seekers.', category: 'discipleship', difficulty: 'beginner', lessons: 6 },
    { id: 'prayer-disciplines', title: 'Prayer & Spiritual Disciplines', author: 'EmmausAI', desc: 'Building a vibrant prayer life.', category: 'discipleship', difficulty: 'beginner', lessons: 8 },
    { id: 'prayer-keller', title: 'Prayer: Experiencing Awe and Intimacy', author: 'Based on Timothy Keller', desc: 'Combining theology and practice of prayer.', category: 'discipleship', difficulty: 'intermediate', lessons: 6 },
    { id: 'ruthless-elimination', title: 'The Ruthless Elimination of Hurry', author: 'Based on John Mark Comer', desc: 'Slowing down to live the unhurried life of Jesus.', category: 'discipleship', difficulty: 'beginner', lessons: 6 },
    { id: 'emmaus-road', title: 'The Emmaus Road: Walking with Jesus', author: 'EmmausAI', desc: 'Daily practices for recognizing Jesus in everyday life.', category: 'discipleship', difficulty: 'beginner', lessons: 7 },
    { id: 'prodigal-god', title: 'The Prodigal God', author: 'Based on Timothy Keller', desc: 'The radical grace of the Father.', category: 'gospel', difficulty: 'beginner', lessons: 5 },
    { id: 'meaning-of-marriage', title: 'The Meaning of Marriage', author: 'Based on Timothy Keller', desc: 'Marriage as reflection of Christ\'s love.', category: 'christian-living', difficulty: 'intermediate', lessons: 8 },
    { id: 'meaning-of-work', title: 'The Meaning of Work', author: 'Based on Timothy Keller', desc: 'How the gospel transforms your work.', category: 'vocation', difficulty: 'intermediate', lessons: 7 },
    { id: 'purpose-driven-life', title: 'The Purpose Driven Life', author: 'Based on Rick Warren', desc: 'Five purposes God has for your life.', category: 'christian-living', difficulty: 'beginner', lessons: 8 },
    { id: 'wild-at-heart', title: 'Wild at Heart', author: 'Based on John Eldredge', desc: 'Discovering the passionate heart God gave every man.', category: 'christian-living', difficulty: 'beginner', lessons: 6 },
    { id: 'women-of-bible', title: 'Women of the Bible: Stories of Faith', author: 'EmmausAI', desc: 'Courageous women whose faith shaped history.', category: 'christian-living', difficulty: 'beginner', lessons: 8 },
    { id: 'servant-leadership', title: 'Servant Leadership: The Jesus Model', author: 'EmmausAI', desc: 'Leading like Jesus through humility and service.', category: 'leadership', difficulty: 'intermediate', lessons: 6 },
    { id: 'parenting', title: 'Parenting with Purpose', author: 'EmmausAI', desc: 'Raising children with faith and grace.', category: 'family', difficulty: 'beginner', lessons: 6 },
    { id: 'youth-foundations', title: 'Youth Foundations: Knowing God', author: 'EmmausAI', desc: 'Faith foundations for young believers.', category: 'family', difficulty: 'beginner', lessons: 8 },
    { id: 'gospel-of-john', title: 'The Gospel of John', author: 'Bible Study', desc: 'Meet Jesus through John\'s eyewitness account.', category: 'bible-books', difficulty: 'beginner', lessons: 12 },
    { id: 'romans', title: 'Romans: The Heart of the Gospel', author: 'Bible Study', desc: 'Grace, justification, and new life.', category: 'bible-books', difficulty: 'intermediate', lessons: 10 },
    { id: 'genesis', title: 'Genesis: In the Beginning', author: 'Bible Study', desc: 'Creation, fall, promise.', category: 'bible-books', difficulty: 'beginner', lessons: 10 },
    { id: 'psalms', title: 'Psalms: The Prayer & Worship Book', author: 'Bible Study', desc: 'Ancient prayers for every emotion.', category: 'bible-books', difficulty: 'beginner', lessons: 10 },
    { id: 'biblical-evangelism', title: 'Biblical Evangelism in the Digital Age', author: 'EmmausAI', desc: 'Sharing faith online and offline.', category: 'missions', difficulty: 'beginner', lessons: 5 },
    { id: 'financial-stewardship', title: 'Biblical Financial Stewardship', author: 'EmmausAI', desc: 'Managing money God\'s way.', category: 'christian-living', difficulty: 'beginner', lessons: 6 },
    { id: 'nations-be-glad', title: 'Let the Nations Be Glad', author: 'Based on John Piper', desc: 'Global missions and the unreached.', category: 'missions', difficulty: 'intermediate', lessons: 6 },
    { id: 'vce-religion-society', title: 'VCE Religion and Society', author: 'VCAA Study Design 2024', desc: 'Role of religion in society, ethics, and social justice. Units 1-4.', category: 'vce', difficulty: 'intermediate', lessons: 17 },
    { id: 'vce-texts-traditions', title: 'VCE Texts and Traditions', author: 'VCAA Study Design 2024', desc: 'Sacred texts and their interpretation. Units 1-4.', category: 'vce', difficulty: 'intermediate', lessons: 17 },
    { id: 'vce-philosophy', title: 'VCE Philosophy', author: 'VCAA Study Design 2024', desc: 'Knowledge, existence, ethics, and the good life. Units 1-4.', category: 'vce', difficulty: 'advanced', lessons: 17 },
    { id: 'vce-english', title: 'VCE English', author: 'VCAA Study Design 2024', desc: 'Analytical and creative responses to texts. Units 1-4.', category: 'vce', difficulty: 'intermediate', lessons: 17 },
    { id: 'vce-maths-methods', title: 'VCE Mathematical Methods', author: 'VCAA Study Design 2024', desc: 'Functions, calculus, probability and statistics. Units 1-4.', category: 'vce', difficulty: 'advanced', lessons: 17 },
    { id: 'vce-biology', title: 'VCE Biology', author: 'VCAA Study Design 2024', desc: 'Cells to ecosystems — molecular biology and evolution. Units 1-4.', category: 'vce', difficulty: 'intermediate', lessons: 17 },
    { id: 'vce-psychology', title: 'VCE Psychology', author: 'VCAA Study Design 2024', desc: 'Science of behaviour and mental processes. Units 1-4.', category: 'vce', difficulty: 'intermediate', lessons: 17 },
    { id: 'vce-history-revolutions', title: 'VCE History: Revolutions', author: 'VCAA Study Design 2024', desc: 'Causes and consequences of significant revolutions. Units 3-4.', category: 'vce', difficulty: 'advanced', lessons: 17 },
  ]

  const filtered = filter === 'all' ? courses : courses.filter(c => c.category === filter)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">{t('title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t('subtitle')}</p>
      </div>

      {/* Clickable category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              filter === cat.key ? cat.activeColor : cat.color
            } hover:opacity-80`}
          >
            {t(`categories.${cat.key}`)}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} {t('lessons')}</p>

      {/* Course grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(course => (
          <Link key={course.id} href={`/courses/${course.id}`} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-primary-300 transition group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full">{course.category.replace(/-/g, ' ')}</span>
              <span className="text-xs text-gray-400">{course.lessons} {t('lessons')}</span>
            </div>
            <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-700 transition mb-1">{getTitle(course.id, course.title)}</h3>
            <p className="text-xs text-gray-500 mb-2">{course.author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{getDesc(course.id, course.desc)}</p>
            <div className="mt-3">
              <span className={`text-xs px-2 py-0.5 rounded ${course.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{t(`difficulty.${course.difficulty}`)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
