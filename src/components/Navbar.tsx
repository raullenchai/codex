'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Petsy Fun
        </Link>
      </div>
    </nav>
  )
}
