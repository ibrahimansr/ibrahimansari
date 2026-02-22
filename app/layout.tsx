import type { Metadata } from 'next'
import './globals.css'
import BackgroundAudio from '@/components/ui/background-audio'
import ClickSound from '@/components/ui/click-sound'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'ibrahim ansari',
  description: 'learning to post-train models',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white min-h-screen">
        <BackgroundAudio />
        <ClickSound />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
