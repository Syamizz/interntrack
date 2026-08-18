import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../api/axios'

import { useAppDispatch } from '../store/hooks'
import { loginSuccess } from '../features/auth/authSlice'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.token)

      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      )

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/70 lg:grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative background */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="mb-16 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                InternTrack
              </span>

            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Your internship journey
            </p>

            <h1 className="max-w-md text-4xl font-bold leading-tight">
              Track applications.
              <br />
              Stay organized.
              <br />
              <span className="text-blue-400">
                Land your opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Keep every internship application, interview and offer
              organized in one place.
            </p>

          </div>

          <div className="relative z-10 space-y-4 text-sm text-slate-300">

            <div className="flex items-center gap-3">
              <CheckIcon />
              <span>Manage all your applications</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckIcon />
              <span>Track application status</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckIcon />
              <span>Stay focused on your next opportunity</span>
            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}
        <section className="flex min-h-[620px] items-center p-7 sm:p-12 lg:p-14">

          <div className="mx-auto w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>

              <span className="text-xl font-bold text-slate-900">
                InternTrack
              </span>

            </div>

            <div className="mb-8">

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue managing your applications.
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  data-cy="email-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                </div>

                <input
                  id="password"
                  data-cy="password-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  data-cy="login-error"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                data-cy="login-button"
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

            </form>

            {/* REGISTER */}
            <div className="mt-8 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?{' '}

                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>

            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">
                INTERNTRACK
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-xs leading-5 text-slate-400">
              Organize your internship search and keep every opportunity
              within reach.
            </p>

          </div>

        </section>

      </div>

    </main>
  )
}

function CheckIcon() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-3.5 w-3.5"
      >
        <path d="M5 12l4 4L19 6" />
      </svg>

    </div>
  )
}

export default LoginPage