import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages, lessonContext } = await request.json()

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured. GROQ_API_KEY missing.' },
        { status: 503 }
      )
    }

    const systemPrompt = `You are EmmausAI Bible Tutor — a knowledgeable, warm, and encouraging biblical teacher.

Your role:
- Help users understand Bible passages and Christian theology
- Answer questions about the current lesson they are studying
- Provide historical context, cross-references, and practical application
- Be theologically sound (evangelical Protestant perspective)
- Keep responses concise (2-4 paragraphs) unless asked for more detail
- Use Scripture references to support your answers
- Be encouraging and pastorally sensitive

${lessonContext ? `Current lesson context:
- Course: ${lessonContext.courseTitle}
- Lesson: ${lessonContext.lessonTitle}
- Bible References: ${lessonContext.bibleRefs}
- Content: ${lessonContext.content?.substring(0, 500)}` : ''}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Groq API error:', response.status, errText)
      return NextResponse.json(
        { error: `Groq API error (${response.status}): ${errText.substring(0, 200)}` },
        { status: 502 }
      )
    }

    const data = await response.json()
    const aiMessage = data.choices?.[0]?.message?.content || 'I could not generate a response.'

    return NextResponse.json({ message: aiMessage })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Bible chat error:', errorMessage)
    return NextResponse.json(
      { error: `Server error: ${errorMessage}` },
      { status: 500 }
    )
  }
}
