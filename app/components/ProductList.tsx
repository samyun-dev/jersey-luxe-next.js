'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useSearchParams } from 'next/navigation'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        console.log('Fetching products...')
        const res = await fetch(`/api/products?category=${category || ''}&search=${search || ''}`)
        console.log('Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('Fetched products:', data)
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category, search])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (products.length === 0) return <div>No products found</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}