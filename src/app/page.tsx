'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import Navbar from '../components/Navbar'
import { fetcher } from '../lib/fetcher'

export default function Home() {
  const { data, size, setSize } = useSWR(`/api/photos?page=1`, fetcher)
  const [photos, setPhotos] = useState<any[]>([])

  useEffect(() => {
    if (data) setPhotos(data.photos)
  }, [data])

  const loadMore = () => setSize(size + 1)

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="break-inside-avoid">
              <Image src={photo.url} alt={photo.title} width={500} height={500} className="rounded-lg" />
              <p className="mt-2 text-sm text-center">{photo.title}</p>
            </div>
          ))}
        </div>
        <button onClick={loadMore} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
          Load More
        </button>
      </div>
    </div>
  )
}
