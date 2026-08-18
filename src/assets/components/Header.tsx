import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../../features/auth/authSlice'

import { useAppDispatch, useAppSelector } from '../../store/hooks'

function Header() {

  //reads data from the Redux store and subscribes the component to changes
  const user = useAppSelector(
    (state) => state.auth.user
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')

    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          InternTrack
        </h1>

        <p className="text-sm text-gray-500">
          Internship Application Tracker
        </p>
      </div>

      <nav className="flex gap-6">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-600"
        >
          Dashboard
        </Link>

        <Link
          to="/applications"
          className="text-gray-600 hover:text-blue-600"
        >
          Applications
        </Link>

        {user && (
          <span className="text-gray-500">
            Hi, {user.name}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
        >
          Logout
        </button>
        
      </nav>

    </header>
  )
}

export default Header