import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="text-lg">
        Page not found
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage