import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/auth/SessionProvider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Atma, Inter, Nunito } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const nunito = Nunito({ subsets: ['latin'], display: 'swap' })
const atma = Atma({
  subsets: ['latin'],
  variable: '--font-atma',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Math Games',
  description: 'Niecodzienna platforma do nauki cyfr dla najmłodszych',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          nunito.className,
          atma.variable,
          'grid min-h-screen grid-rows-[auto_1fr_auto]  antialiased',
        )}
      >
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {modal}
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  )
}
