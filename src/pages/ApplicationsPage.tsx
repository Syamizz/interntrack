import { useAppDispatch, useAppSelector } from '../store/hooks'
import ApplicationCard from '../assets/components/ApplicationCard'
import { deleteApplication } from '../features/applications/applicationSlice'

import api from '../api/axios'
import { updateApplication } from '../features/applications/applicationSlice'

function ApplicationsPage() {
  const applications = useAppSelector(
    (state) => state.applications
  )

  const dispatch = useAppDispatch()

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

  const newCompany = prompt('Company name:', application.company)
  const newPosition = prompt('Position:', application.position)
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
    console.error('Error updating application:', error)
  }
}

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        All Applications
      </h1>

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
    </main>
  )
}

export default ApplicationsPage