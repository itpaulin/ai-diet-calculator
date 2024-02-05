import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { diet, changes } = await req.json()

  const message = `
    Eu tenho esta dieta com base nas minhas necessidades calóricas e gramagem devida de macronutrientes, aqui está ela: ${diet}.
    
    Porém quero fazer essas alterações: ${changes}. 
    
    Me retorne somente a dieta com as devidas alterações.
  `.trim()
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content: message }],
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
