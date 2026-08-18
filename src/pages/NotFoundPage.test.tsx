import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

test('shows 404 page', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  )

  expect(
    screen.getByRole('heading', { name: '404' })
  ).toBeInTheDocument()

  expect(
    screen.getByText('Page not found')
  ).toBeInTheDocument()

  expect(
    screen.getByRole('link', { name: 'Back to Dashboard' })
  ).toBeInTheDocument()
})