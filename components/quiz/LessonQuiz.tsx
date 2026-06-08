"use client"

import { useState } from 'react'
import { CheckCircle, XCircle, Award } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
}

interface LessonQuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number, total: number) => void
}

export default function LessonQuiz({ questions, onComplete }: LessonQuizProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)

  if (questions.length === 0) return null

  const q = questions[current]

  const handleSelect = (idx: number) => {
    if (showResult) return
    setSelected(idx)
    setShowResult(true)
    if (idx === q.correct) setScore(s => s + 1)
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
      const finalScore = selected === q.correct ? score + (showResult ? 0 : 1) : score
      onComplete?.(finalScore, questions.length)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowResult(false)
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6 text-center">
        <Award className={`w-12 h-12 mx-auto mb-3 ${pct >= 80 ? 'text-green-500' : pct >= 50 ? 'text-yellow-500' : 'text-red-500'}`} />
        <h3 className="text-lg font-bold text-secondary-900 dark:text-white">Quiz Complete!</h3>
        <p className="text-3xl font-bold mt-2 text-primary-600">{score}/{questions.length}</p>
        <p className="text-sm text-gray-500 mt-1">{pct}% correct</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500">Question {current + 1}/{questions.length}</span>
        <span className="text-xs text-primary-600 font-medium">Score: {score}</span>
      </div>

      <p className="text-sm font-medium text-secondary-900 dark:text-white mb-4">{q.question}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          let cls = 'border-gray-200 hover:border-primary-300'
          if (showResult && idx === q.correct) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20'
          else if (showResult && idx === selected && idx !== q.correct) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20'
          else if (selected === idx) cls = 'border-primary-500'

          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition ${cls}`}>
              <span className="flex items-center gap-2">
                {showResult && idx === q.correct && <CheckCircle className="w-4 h-4 text-green-500" />}
                {showResult && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 text-red-500" />}
                {opt}
              </span>
            </button>
          )
        })}
      </div>

      {showResult && (
        <button onClick={next} className="w-full py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition">
          {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
}
