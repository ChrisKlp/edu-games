import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Math Games',
  description: 'Niecodzienna platforma do nauki cyfr dla najmłodszych',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'grid min-h-screen grid-rows-[auto_1fr_auto]',
        )}
      >
        <Navbar />
        <main className="container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
