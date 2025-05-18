import type { NextApiRequest, NextApiResponse } from 'next'
import { db, storage } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { Configuration, OpenAIApi } from 'openai'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { imageBase64 } = req.body
  if (!imageBase64) return res.status(400).json({ error: 'No image' })

  const imageRef = ref(storage, `photos/${Date.now()}.jpg`)
  await uploadString(imageRef, imageBase64, 'data_url')
  const url = await getDownloadURL(imageRef)

  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))
  const gpt = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Give a funny title for a pet picture.' }],
  })
  const title = gpt.data.choices[0].message?.content || 'Cute Pet'

  await addDoc(collection(db, 'photos'), {
    url,
    title,
    createdAt: serverTimestamp(),
  })

  res.status(200).json({ url, title })
}
