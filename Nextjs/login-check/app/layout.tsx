
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from './context/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Session-Kanri',
  description: 'Session Kanri No Rensyu Desu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="ja">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html >
  )
}
