import type { Application } from '../../types/application'
import applicationReducer, {
  addApplication,
  deleteApplication,
  updateApplication,
  setApplications,
} from './applicationSlice'

//test add
test('adds a new application', () => {
  const initialState: Application[] = []

  const newApplication = {
    id: 1,
    company: 'Google',
    position: 'Software Engineer Intern',
    status: 'Applied' as const,
  }

  const newState = applicationReducer(
    initialState,
    addApplication(newApplication)
  )

  expect(newState).toHaveLength(1)

  expect(newState[0]).toEqual(newApplication)
})

//test delete
test('deletes an application', () => {
  const initialState: Application[] = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'Applied',
    },
    {
      id: 2,
      company: 'Shopee',
      position: 'Frontend Intern',
      status: 'Interview',
    },
  ]

  const newState = applicationReducer(
    initialState,
    deleteApplication(1)
  )

  expect(newState).toHaveLength(1)

  expect(newState[0].company).toBe('Shopee')
})

//test update
test('updates an application', () => {
  const initialState: Application[] = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'Applied',
    },
  ]

  const updatedApplication: Application = {
    id: 1,
    company: 'Google',
    position: 'Software Engineer Intern',
    status: 'Interview',
  }

  const newState = applicationReducer(
    initialState,
    updateApplication(updatedApplication)
  )

  expect(newState[0].status).toBe('Interview')

  expect(newState[0]).toEqual(updatedApplication)
})

//test sets
test('sets applications from API data', () => {
  const initialState: Application[] = []

  const apiApplications: Application[] = [
    {
      id: 1,
      company: 'Microsoft',
      position: 'Frontend Intern',
      status: 'Applied',
    },
    {
      id: 2,
      company: 'Shopee',
      position: 'Software Engineer Intern',
      status: 'Interview',
    },
  ]

  const newState = applicationReducer(
    initialState,
    setApplications(apiApplications)
  )

  expect(newState).toHaveLength(2)

  expect(newState).toEqual(apiApplications)
})