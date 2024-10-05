import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../hooks/useCart'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h2 className="text-lg font-semibold mb-2 hover:text-blue-500">{product.name}</h2>
        </Link>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}