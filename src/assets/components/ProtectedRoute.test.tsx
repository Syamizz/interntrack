import { render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

test('redirects user to login when there is no token', () => {
  localStorage.removeItem('token')

  render(
    <MemoryRouter initialEntries={['/applications']}>
      <Routes>
        <Route
          path="/login"
          element={<h1>Login Page</h1>}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/applications"
            element={<h1>Applications Page</h1>}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  )

  expect(
    screen.getByRole('heading', { name: 'Login Page' })
  ).toBeInTheDocument()

  expect(
    screen.queryByRole('heading', { name: 'Applications Page' })
  ).not.toBeInTheDocument()
})

test('allows user to access applications when token exists', () => {
  localStorage.setItem('token', 'fake-test-token')

  render(
    <MemoryRouter initialEntries={['/applications']}>
      <Routes>
        <Route
          path="/login"
          element={<h1>Login Page</h1>}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/applications"
            element={<h1>Applications Page</h1>}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  )

  expect(
    screen.getByRole('heading', { name: 'Applications Page' })
  ).toBeInTheDocument()

  expect(
    screen.queryByRole('heading', { name: 'Login Page' })
  ).not.toBeInTheDocument()
})