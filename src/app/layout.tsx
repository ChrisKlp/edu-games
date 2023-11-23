import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SessionProvider from './SessionProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'] })

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
          'grid min-h-screen grid-rows-[auto_1fr_auto]  antialiased',
        )}
      >
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {modal}
        </SessionProvider>
      </body>
    </html>
  )
}
