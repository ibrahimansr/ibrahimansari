import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <p className="text-base font-semibold text-white mb-4">Back soon.</p>
      <Link href="/" className="text-white underline underline-offset-2 hover:opacity-80 transition-opacity">
        ← home
      </Link>
    </main>
  )
}
