import Link from 'next/link'
import AuthForm from '../components/AuthForm'

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <AuthForm type="login" />
      <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}