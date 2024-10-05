'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from '../../hooks/useCart'
import ProductReviews from '../../components/ProductReviews'

export default function ProductDetail() {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">({product.numReviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          <Button onClick={() => addToCart(product)} className="w-full md:w-auto">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <ProductReviews productId={id} />
    </div>
  )
}