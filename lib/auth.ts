import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from './prisma'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as { userId: string }
  } catch (error) {
    return null
  }
}

export async function authenticateUser(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
  return user
}