import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import ClickSound from '@/components/ui/click-sound'
import MusicPlayer from '@/components/ui/music-player'
import { Analytics } from '@vercel/analytics/react'

const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken' })

export const metadata: Metadata = {
  title: 'ibrahim ansari',
  description: 'learning to post-train models',
  icons: { icon: '/logo.png' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${hanken.className} bg-black text-white min-h-screen`}>
        <ClickSound />
        <MusicPlayer />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
