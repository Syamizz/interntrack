import { useState } from 'react'
import api from '../api/axios'

//for redux
import { useAppDispatch } from '../store/hooks'
import { loginSuccess } from '../features/auth/authSlice'

//navigate
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //for dispatch data
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      })

      console.log('LOGIN SUCCESS:', response.data)

      localStorage.setItem('token', response.data.token)

      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      )

      alert('Login successful')
      navigate('/')

    } catch (error) {
      console.error('Login failed:', error)

      alert('Invalid email or password')
    }



  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Login to InternTrack
        </h1>

        <input
          data-cy="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
        />

        <input
          data-cy="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
        />

        <button
          data-cy="login-button"
          type="submit"
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
          Login
        </button>
      </div>
    </main>
  )
}

export default LoginPage