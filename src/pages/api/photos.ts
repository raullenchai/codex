import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt((req.query.page as string) || '1')
  const pageSize = 10
  let q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'), limit(pageSize))
  if (page > 1) {
    const snapshot = await getDocs(query(collection(db, 'photos'), orderBy('createdAt', 'desc'), limit((page - 1) * pageSize)))
    const last = snapshot.docs[snapshot.docs.length - 1]
    if (last) q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'), startAfter(last), limit(pageSize))
  }
  const snap = await getDocs(q)
  const photos = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  res.status(200).json({ photos })
}
