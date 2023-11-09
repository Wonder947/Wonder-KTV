import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wonder KTV',
  description: 'online KTV by Wonder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Link href='/search'>Search</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
