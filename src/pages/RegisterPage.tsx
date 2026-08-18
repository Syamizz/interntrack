import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      })

      alert('Registration successful')

      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)

      alert('Registration failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
        />

        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Register
        </button>
      </div>
    </main>
  )
}

export default RegisterPage