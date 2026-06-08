import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { userId, lessonId, courseId, completed } = await request.json()
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey || !userId) {
      return NextResponse.json({ saved: false, reason: 'not-authenticated' })
    }

    const supabase = createClient(supabaseUrl, supabaseKey, { db: { schema: 'emmaus' } })

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed: completed,
        completed_at: completed ? new Date().toISOString() : null,
      }, { onConflict: 'user_id,lesson_id' })

    if (error) {
      console.error('Progress save error:', error)
      return NextResponse.json({ saved: false, reason: error.message })
    }

    return NextResponse.json({ saved: true })
  } catch {
    return NextResponse.json({ saved: false, reason: 'server-error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const courseId = searchParams.get('courseId')

  if (!userId || !courseId) {
    return NextResponse.json({ progress: [] })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ progress: [] })
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { db: { schema: 'emmaus' } })

  const { data } = await supabase
    .from('user_progress')
    .select('lesson_id, completed, completed_at')
    .eq('user_id', userId)

  return NextResponse.json({ progress: data || [] })
}
