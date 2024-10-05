import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jersey Luxe - Premium Sports Jerseys',
  description: 'Shop the latest and greatest sports jerseys from around the world.',
  keywords: 'sports jerseys, football shirts, soccer kits, premium jerseys',
  openGraph: {
    title: 'Jersey Luxe - Premium Sports Jerseys',
    description: 'Shop the latest and greatest sports jerseys from around the world.',
    images: [{ url: '/og-image.jpg' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}