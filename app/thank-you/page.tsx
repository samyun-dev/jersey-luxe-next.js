import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="mb-8">Your order has been received and is being processed.</p>
      <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  )
}