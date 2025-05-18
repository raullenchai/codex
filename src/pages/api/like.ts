import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { photoId, userId } = req.body
  if (!photoId || !userId) return res.status(400).end()
  const photoRef = doc(db, 'photos', photoId)
  await updateDoc(photoRef, { likes: arrayUnion(userId) })
  res.status(200).end()
}
