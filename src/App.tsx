import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react'
import StatCard from './assets/components/StatCard'
import ApplicationCard from './assets/components/ApplicationCard'
import { useTheme } from './context/useTheme'

//for route
import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

//for layout
import Layout from './assets/components/Layout'

//for redux
import { useAppDispatch, useAppSelector } from './store/hooks'

import {
  addApplication as addApplicationAction,
  deleteApplication as deleteApplicationAction,
  setApplications,
  updateApplication as updateApplicationAction,
} from './features/applications/applicationSlice'

//use axios
import api from './api/axios'

//protection
import ProtectedRoute from './assets/components/ProtectedRoute'

//login
import { loginSuccess } from './features/auth/authSlice'

import type { Application } from './types/application'

//application page
const ApplicationsPage = lazy(
  () => import('./pages/ApplicationsPage')
)

function App() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  //company,pos
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')

  //theme
  const { darkMode, toggleTheme } = useTheme()

  const [newStatus, setNewStatus] = useState<
    'Applied' | 'Interview' | 'Offer'
  >('Applied')

  //for loading data
  const [loadingApplications, setLoadingApplications] = useState(false)
  const [applicationsError, setApplicationsError] = useState('')

  //for refresh token
  const authToken = useAppSelector(
    (state) => state.auth.token
  )

  //app data
  const applications = useAppSelector(
    (state) => state.applications
  )

  const dispatch = useAppDispatch()

  //add new applied
  const addApplication = async () => {
    if (company.trim() === '' || position.trim() === '') {
      alert('Please fill in company and position')
      return
    }

    const newApplication: Application = {
      id: Date.now(),
      company: company,
      position: position,
      status: newStatus,
    }

    try {
      const response = await api.post('/applications', newApplication)

      dispatch(addApplicationAction(response.data))

      setCompany('')
      setPosition('')
      setNewStatus('Applied')
    } catch (error) {
      console.error('Error adding application:', error)
    }
  }

  //delete applications
  const deleteApplication = useCallback(async (id: number) => {
    try {
      await api.delete(`/applications/${id}`)

      dispatch(deleteApplicationAction(id))
    } catch (error) {
      console.error('Error deleting application:', error)
    }
  }, [dispatch])

  //edit data
  const [editingId, setEditingId] = useState<number | null>(null)
  const editApplication = (id: number) => {
    const application = applications.find(
      (application) => application.id === id
    )

    if (!application) {
      return
    }

    setEditingId(application.id)
    setCompany(application.company)
    setPosition(application.position)
    setNewStatus(application.status)
  }

  //save app
  const saveApplication = async () => {
    if (editingId === null) {
      return
    }

    if (company.trim() === '' || position.trim() === '') {
      alert('Please fill in company and position')
      return
    }

    const updatedApplication: Application = {
      id: editingId,
      company: company,
      position: position,
      status: newStatus,
    }

    try {
      const response = await api.put(
        `/applications/${editingId}`,
        updatedApplication
      )

      dispatch(updateApplicationAction(response.data))

      setEditingId(null)
      setCompany('')
      setPosition('')
      setNewStatus('Applied')
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  //for cancel
  const cancelEdit = () => {
    setEditingId(null)
    setCompany('')
    setPosition('')
    setNewStatus('Applied')
  }

  //use effect title
  useEffect(() => {
    document.title = `InternTrack (${applications.length})`
  }, [applications.length])

  //for axios
  useEffect(() => {
    if (!authToken) {
      dispatch(setApplications([]))
      return
    }


    const fetchApplications = async () => {

      setLoadingApplications(true)
      setApplicationsError('')

      try {
        const response = await api.get('/applications')

        dispatch(setApplications(response.data))
      } catch (error) {
        console.error('Error fetching applications:', error)

        setApplicationsError('Failed to load applications')
      } finally {
        setLoadingApplications(false)
      }
    }

    fetchApplications()
  }, [dispatch, authToken])

  //for login
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        return
      }

      try {
        const response = await api.get('/auth/me')

        dispatch(
          loginSuccess({
            user: response.data,
            token: token,
          })
        )
      } catch (error) {
        console.error('Failed to restore user:', error)
      }
    }

    restoreUser()
  }, [dispatch])

  //delay typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [search])

  const appliedCount = applications.filter(
    (application) => application.status === 'Applied'
  ).length

  const interviewCount = applications.filter(
    (application) => application.status === 'Interview'
  ).length

  const offerCount = applications.filter(
    (application) => application.status === 'Offer'
  ).length

  //filter apps
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch = application.company
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || application.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [applications, debouncedSearch, statusFilter])

  return (

    <Routes>

      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            path="/applications"
            element={
              <Suspense fallback={<p className="p-6">Loading...</p>}>
                <ApplicationsPage />
              </Suspense>
            }
          />


          <Route
            path="/"
            element={
              <div
                className="application-card"
                style={{
                  backgroundColor: darkMode ? '#1f2937' : '#f4f6f8',
                  color: darkMode ? 'white' : '#222',
                  minHeight: '100vh',
                }}
              >


                <button onClick={toggleTheme}>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <main className='p-6'>
                  <h2>Dashboard</h2>



                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="Applied" value={appliedCount} />
                    <StatCard title="Interview" value={interviewCount} />
                    <StatCard title="Offer" value={offerCount} />
                  </div>

                  {/*Application Part */}
                  <h2 className='text-2x1 font-bold mt-8 mb-4'>Applications</h2> <br />
                  <div
                    className={`p-5 rounded-xl border shadow-sm ${darkMode
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-white border-gray-200 text-gray-900'
                      }`}
                  >

                    <h3 className='text-lg font-semibold mb-4'>
                      Add New Application
                    </h3>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        data-cy="company-input"
                        type="text"
                        placeholder="Company name"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        className={`border rounded-lg px-3 py-2 mr-2 w-full md:w-72
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${darkMode
                            ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }
                        `}
                      />

                      <input
                        data-cy="position-input"
                        type="text"
                        placeholder="Position"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                        className={`border rounded-lg px-3 py-2 mr-2 w-full md:w-72
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${darkMode
                            ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }
                        `}
                      />

                      <select
                        data-cy="status-select"
                        value={newStatus}
                        onChange={(event) =>
                          setNewStatus(
                            event.target.value as 'Applied' | 'Interview' | 'Offer'
                          )
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 mr-2"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                      </select>

                      <button
                        data-cy="application-submit"
                        onClick={editingId === null ? addApplication : saveApplication}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        {editingId === null ? 'Add Application' : 'Save Changes'}
                      </button>
                      {editingId !== null && (
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <br /><br />
                  {/*Search company part */}
                  <input
                    type="text"
                    placeholder="Search company..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className={`border rounded-lg px-3 py-2 w-full md:w-72
                                  focus:outline-none focus:ring-2 focus:ring-blue-500
                                  ${darkMode
                        ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }
                    `}
                  />

                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                  </select>

                  {loadingApplications ? (
                    <p className="mt-6 text-gray-500">
                      Loading applications...
                    </p>
                  ) : applicationsError ? (
                    <p className="mt-6 text-red-500">
                      {applicationsError}
                    </p>
                  ) : filteredApplications.length === 0 ? (
                    <div className="mt-6 bg-white p-6 rounded-xl shadow text-center">
                      <h3 className="text-lg font-semibold">
                        No applications found
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Add your internship application above.
                      </p>
                    </div>
                  ) : (
                    <div className="applications-container">
                      {filteredApplications.map((application) => (
                        <ApplicationCard
                          key={application.id}
                          id={application.id}
                          company={application.company}
                          position={application.position}
                          status={application.status}
                          onDelete={deleteApplication}
                          onEdit={editApplication}
                        />
                      ))}
                    </div>
                  )}

                </main>
              </div>
            }
          />
        </Route>

      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>

  )
}

export default App