"use client"

import { useCart } from '../hooks/useCart'
import Link from 'next/link'
import Image from 'next/image'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="flex items-center border-b py-4">
              <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover mr-4" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(index, item.quantity - 1)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, item.quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}