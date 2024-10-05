'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../hooks/useCart'
import { Search, ShoppingCart, User, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { cart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err))
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/?search=${searchQuery}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-500">Jersey Luxe</Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/category/home" className="hover:text-orange-500 transition-colors">Home Jerseys</Link>
            <Link href="/category/away" className="hover:text-orange-500 transition-colors">Away Jerseys</Link>
            <Link href="/category/third" className="hover:text-orange-500 transition-colors">Third Kits</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <Input
                type="search"
                placeholder="Search jerseys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-gray-800 text-white border-gray-700 focus:ring-orange-500 focus:border-orange-500"
              />
              <Button type="submit" variant="ghost" size="icon" className="ml-2">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <Link href="/cart" className="flex items-center hover:text-orange-500 transition-colors">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="text-sm">Cart ({cart.length})</span>
            </Link>
            <Link href="/order-tracking" className="flex items-center hover:text-orange-500 transition-colors">
              <Package className="h-5 w-5 mr-1" />
              <span className="text-sm">Track Order</span>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.push('/profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/wishlist')}>Wishlist</DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hover:text-orange-500 transition-colors">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}