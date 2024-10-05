'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    name: string
  }
}

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })
  const { data: session } = useSession()

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      })
      if (response.ok) {
        setNewReview({ rating: 0, comment: '' })
        fetchReviews()
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <Card key={review.id} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-6 h-6 mr-2" />
              {review.user.name}
            </CardTitle>
            <CardDescription>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`inline-block w-4 h-4 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{review.comment}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      ))}
      {session ? (
        <form onSubmit={handleSubmitReview} className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
          <div className="mb-4">
            <label className="block mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`w-8 h-8 ${
                    star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2">Comment</label>
            <Textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              className="w-full"
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      ) : (
        <p className="mt-6">Please log in to leave a review.</p>
      )}
    </div>
  )
}