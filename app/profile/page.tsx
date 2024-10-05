'use client'

import { useState, useEffect } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const res = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (res.ok) {
            const data = await res.json()
            setUser(data.user)
            setName(data.user.name)
            setEmail(data.user.email)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const res = await fetch('/api/user/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name, email })
        })
        if (res.ok) {
          setMessage('Profile updated successfully')
        } else {
          setMessage('Error updating profile')
        }
      } catch (error) {
        console.error('Error updating profile:', error)
        setMessage('Error updating profile')
      }
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {user && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Update Profile
            </button>
          </form>
        )}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </ProtectedRoute>
  )
}