import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '../../../../lib/prisma'

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string }
    const { name, email } = await req.json()

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { name, email },
    })

    return NextResponse.json({ user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email } })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
  }
}