import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApplicationCard from './ApplicationCard'

//Mock dark mode context
jest.mock('../../context/useTheme', () => ({
  useTheme: () => ({
    darkMode: false,
    toggleTheme: jest.fn(),
  }),
}))

test('calls delete function when Delete button is clicked', async () => {
  const user = userEvent.setup()

  const mockDelete = jest.fn()
  const mockEdit = jest.fn()

  render(
    <ApplicationCard
      id={1}
      company="Google"
      position="Software Engineer Intern"
      status="Applied"
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  )

  await user.click(
    screen.getByRole('button', { name: /delete/i })
  )

  expect(mockDelete).toHaveBeenCalledTimes(1)
})

test('calls edit function when Edit button is clicked', async () => {
  const user = userEvent.setup()

  const mockDelete = jest.fn()
  const mockEdit = jest.fn()

  render(
    <ApplicationCard
      id={1}
      company="Google"
      position="Software Engineer Intern"
      status="Applied"
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  )

  await user.click(
    screen.getByRole('button', { name: /edit/i })
  )

  expect(mockEdit).toHaveBeenCalledTimes(1)
})