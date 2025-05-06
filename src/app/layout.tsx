import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Party Ticketing System',
  description: 'Book and manage party tickets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}