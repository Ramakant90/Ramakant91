'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, email, password } = formData

    if (!username || !email || !password) {
      setError('सभी फील्ड भरना ज़रूरी है।')
      return
    }

    try {
      setError('')
      // TODO: Send request to backend
      console.log('Registering user:', formData)
    } catch (err) {
      setError('रजिस्ट्रेशन में कोई समस्या आ गई।')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded border border-gray-600 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {error && (
          <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="यूज़रनेम"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded border text-black placeholder-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="ईमेल"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded border text-black placeholder-gray-500"
          />
          <input
            type="password"
            name="password"
            placeholder="पासवर्ड"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded border text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded font-semibold"
          >
            रजिस्टर करें
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
