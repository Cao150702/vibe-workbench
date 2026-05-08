import { type NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openai'
import { PRD_PROMPT_V5, TECH_STACK_PROMPT, TASK_BREAKDOWN_PROMPT, SYSTEM_PROMPT } from '@/lib/prompts'
import { validateInput } from '@/lib/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = validateInput(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 })
    }

    const { idea, step } = validation.data

    // Select prompt template
    let prompt = ''
    switch (step) {
      case 'prd':
        prompt = PRD_PROMPT_V5.replace('{idea}', idea)
        break
      case 'tech-stack': {
        // For tech-stack step, `idea` contains the PRD text
        prompt = TECH_STACK_PROMPT.replace('{prd}', idea)
        break
      }
      case 'tasks': {
        // For tasks step, `idea` is an object with {prd, techStack}
        if (typeof idea === 'object' && idea !== null) {
          const { prd, techStack } = idea as { prd: string; techStack: string }
          prompt = TASK_BREAKDOWN_PROMPT.replace('{prd}', prd).replace('{techStack}', techStack)
        }
        break
      }
    }

    if (!prompt) {
      return NextResponse.json({ error: 'Invalid step' }, { status: 400 })
    }

    const openai = getOpenAIClient()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return NextResponse.json({ result: completion.choices[0].message.content })
  } catch (error) {
    if (error instanceof Error && error.message.includes('OPENAI_API_KEY')) {
      return NextResponse.json({ error: 'OpenAI API Key not configured' }, { status: 500 })
    }
    console.error('AI generation error:', error)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
