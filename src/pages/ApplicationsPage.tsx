import { useAppDispatch, useAppSelector } from '../store/hooks'
import ApplicationCard from '../assets/components/ApplicationCard'
import { deleteApplication } from '../features/applications/applicationSlice'

import api from '../api/axios'
import { updateApplication } from '../features/applications/applicationSlice'

// dark mode
import { useTheme } from '../context/useTheme'

function ApplicationsPage() {
  const applications = useAppSelector(
    (state) => state.applications
  )

  const dispatch = useAppDispatch()

  // dark mode
  const { darkMode } = useTheme()

  const handleDelete = (id: number) => {
    dispatch(deleteApplication(id))
  }

  const handleEdit = async (id: number) => {
    const application = applications.find(
      (application) => application.id === id
    )

    if (!application) {
      return
    }

    const newCompany = prompt(
      'Company name:',
      application.company
    )

    const newPosition = prompt(
      'Position:',
      application.position
    )

    const newStatus = prompt(
      'Status: Applied, Interview, or Offer',
      application.status
    )

    if (!newCompany || !newPosition || !newStatus) {
      return
    }

    if (
      newStatus !== 'Applied' &&
      newStatus !== 'Interview' &&
      newStatus !== 'Offer'
    ) {
      alert('Invalid status')
      return
    }

    const updatedApplication = {
      id: application.id,
      company: newCompany,
      position: newPosition,
      status: newStatus,
    }

    try {
      const response = await api.put(
        `/applications/${id}`,
        updatedApplication
      )

      dispatch(updateApplication(response.data))
    } catch (error) {
      console.error(
        'Error updating application:',
        error
      )
    }
  }

  return (
    <main
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-800 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >

      
      <h1
        className={`text-2xl font-bold mb-6 ${
          darkMode
            ? 'text-white'
            : 'text-gray-900'
        }`}
      >
        All Applications
      </h1>

      {applications.length === 0 ? (
        <div
          className={`p-6 rounded-xl border text-center ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-300'
              : 'bg-white border-gray-200 text-gray-600'
          }`}
        >
          No applications found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              id={application.id}
              company={application.company}
              position={application.position}
              status={application.status}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default ApplicationsPage