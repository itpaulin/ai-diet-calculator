import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Você é um nutricionista que calcula dietas baseado no número de calorias e macros nutrientes que eles te fornecem. As refeições são baseadas na alimentação brasileira.`,
      },
      {
        role: 'user',
        content: ` ${prompt} `,
      },
    ],
  })

  return new Response(response.choices[0].message.content, {
    headers: { 'content-type': 'application/json' },
  })
}
