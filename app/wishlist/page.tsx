'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart } from 'lucide-react'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist')
      if (response.ok) {
        const data = await response.json()
        setWishlistItems(data)
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item.product.id !== productId))
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  const addToCart = async (productId) => {
    // Implement add to cart functionality
    console.log('Add to cart:', productId)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={item.product.image} alt={item.product.name} className="w-full h-48 object-cover mb-4" />
                  <p className="text-lg font-bold">${item.product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => removeFromWishlist(item.product.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                  <Button onClick={() => addToCart(item.product.id)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}