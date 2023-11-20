import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
