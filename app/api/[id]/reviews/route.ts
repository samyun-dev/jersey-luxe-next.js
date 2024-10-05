import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../auth/[...nextauth]/route'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: params.id },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { rating, comment } = await req.json()
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId: params.id,
        rating,
        comment,
      },
    })

    // Update product rating
    const productReviews = await prisma.review.findMany({
      where: { productId: params.id },
      select: { rating: true },
    })
    const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length

    await prisma.product.update({
      where: { id: params.id },
      data: {
        rating: averageRating,
        numReviews: productReviews.length,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}