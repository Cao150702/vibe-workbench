import OpenAI from 'openai'

// Singleton OpenAI client — only created if API key exists
let _openai: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set. Please add it to your .env.local file.')
    }
    _openai = new OpenAI({ apiKey })
  }
  return _openai
}
