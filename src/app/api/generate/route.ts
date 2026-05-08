import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI()

// Prompt V5：最终版（详见 /docs/ai-dialogue/03-prompt-engineering-notes.md）
const PRD_PROMPT = `你是一位有 10 年经验的高级产品经理，擅长 MVP 设计。

## 任务
根据用户描述，生成结构化 PRD。

## 输出要求
1. 每个 section 不超过 200 字（强迫优先级判断）
2. 用户画像必须有"使用场景"，不能只有人口属性
3. 功能列表用 MoSCoW 分类，Must-have 不超过 5 个
4. 先输出"我们不做什么"，再做功能列表

## 格式
Markdown，用二级标题（##）分节。

## 用户描述
{idea}`

const TECH_STACK_PROMPT = `基于以下 PRD，推荐技术栈。

要求：
1. 每个推荐必须回答"为什么选它"
2. 每个推荐必须回答"为什么不选 XXX"
3. 基于实用性，不追新技术

## PRD
{prd}`

const TASK_BREAKDOWN_PROMPT = `基于以下 PRD 和技术栈，拆解开发任务。

要求：
1. 按 MVP → V1 → V2 分层
2. 每层不超过 5 个任务
3. 每个任务标注前置依赖

## PRD
{prd}

## 技术栈
{techStack}`

export async function POST(request: NextRequest) {
  try {
    const { idea, step } = await request.json()

    let prompt = ''
    switch (step) {
      case 'prd':
        prompt = PRD_PROMPT.replace('{idea}', idea)
        break
      case 'tech-stack':
        prompt = TECH_STACK_PROMPT.replace('{prd}', idea)
        break
      case 'tasks':
        prompt = TASK_BREAKDOWN_PROMPT.replace('{prd}', idea.prd).replace('{techStack}', idea.techStack)
        break
      default:
        return NextResponse.json({ error: 'Invalid step' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '你是一位专业产品经理和技术顾问。输出必须是 Markdown 格式。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return NextResponse.json({ result: completion.choices[0].message.content })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
