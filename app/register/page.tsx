import AuthForm from '../components/AuthForm'

export default function Register() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <AuthForm type="register" />
    </div>
  )
}