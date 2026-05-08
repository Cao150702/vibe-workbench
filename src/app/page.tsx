'use client'

import { useState } from 'react'

type Step = 'idea' | 'prd' | 'tech-stack' | 'tasks'

const STEPS: { id: Step; label: string }[] = [
  { id: 'idea', label: '💡 想法' },
  { id: 'prd', label: '📋 PRD' },
  { id: 'tech-stack', label: '🔧 技术栈' },
  { id: 'tasks', label: '✅ 任务' },
]

export default function Home() {
  const [idea, setIdea] = useState('')
  const [currentStep, setCurrentStep] = useState<Step>('idea')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!idea.trim()) return
    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, step: currentStep }),
      })
      const data = await res.json()
      setResult(data.result)
      // Move to next step
      const nextIndex = STEPS.findIndex(s => s.id === currentStep) + 1
      if (nextIndex < STEPS.length) {
        setCurrentStep(STEPS[nextIndex].id)
      }
    } catch (error) {
      setResult('生成失败，请重试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === step.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {step.label}
            </button>
            {i < STEPS.length - 1 && (
              <span className="text-gray-600">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Idea Input */}
      {currentStep === 'idea' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">描述你的想法</h2>
          <p className="text-gray-400">
            越具体越好：解决了什么问题？面向谁？核心功能是什么？
          </p>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="例如：我想做一个帮助开发者自动生成 Conventional Commits 的 CLI 工具..."
            className="w-full h-48 bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !idea.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            {loading ? '生成中...' : '生成 PRD'}
          </button>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">
            {STEPS.find(s => s.id === STEPS[Math.max(0, STEPS.findIndex(s2 => s2.id === currentStep) - 1)]?.id)?.label || '结果'}
          </h3>
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-300">{result}</pre>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? '生成中...' : `继续 → ${STEPS.find(s => s.id === currentStep)?.label}`}
          </button>
        </div>
      )}
    </div>
  )
}
