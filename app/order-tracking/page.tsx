'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Truck, Package, ShoppingBag } from 'lucide-react'

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [orderStatus, setOrderStatus] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrderStatus(data.status)
      } else {
        setOrderStatus('not-found')
      }
    } catch (error) {
      console.error('Error fetching order status:', error)
      setOrderStatus('error')
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Circle className="w-6 h-6 text-blue-500" />
      case 'shipped':
        return <Truck className="w-6 h-6 text-green-500" />
      case 'delivered':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />
      default:
        return <Package className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <Input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            className="flex-grow"
          />
          <Button type="submit">Track Order</Button>
        </div>
      </form>

      {orderStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            {orderStatus === 'not-found' ? (
              <p>Order not found. Please check your order ID and try again.</p>
            ) : orderStatus === 'error' ? (
              <p>An error occurred. Please try again later.</p>
            ) : (
              <div className="flex items-center space-x-4">
                {getStatusIcon(orderStatus)}
                <div>
                  <p className="font-semibold">Order {orderId}</p>
                  <p className="text-sm text-gray-500 capitalize">{orderStatus}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Order Status Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold">Processing</p>
                <p className="text-sm text-gray-500">Your order is being prepared</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <Truck className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold">Shipped</p>
                <p className="text-sm text-gray-500">Your order is on its way</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold">Delivered</p>
                <p className="text-sm text-gray-500">Your order has been delivered</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}