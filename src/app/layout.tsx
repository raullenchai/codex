import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Petsy Fun',
  description: 'Funny pet pictures',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  )
}
