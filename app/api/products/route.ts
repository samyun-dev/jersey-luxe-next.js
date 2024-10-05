import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let whereClause: any = {}
    if (category) {
      whereClause.category = category
    }
    if (search) {
      whereClause.name = { contains: search, mode: 'insensitive' }
    }

    const products = await prisma.product.findMany({ where: whereClause })

    console.log('Fetched products:', products)

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}