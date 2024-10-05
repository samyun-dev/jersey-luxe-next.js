import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      const resetToken = crypto.randomBytes(20).toString('hex')
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      })

      // Configure the email service
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      // Send email with reset link
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Password Reset - Jersey Luxe',
        text: `To reset your password, click the following link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`,
        html: `<p>To reset your password, click the following link: <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}">Reset Password</a></p>`,
      })
    }

    // Always return a success message to prevent email enumeration
    return NextResponse.json({ message: 'If an account with that email exists, a password reset link has been sent.' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}