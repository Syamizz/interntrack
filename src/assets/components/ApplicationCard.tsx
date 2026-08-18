import { memo } from "react"

type ApplicationCardProps = {
  id: number
  company: string
  position: string
  status: string
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const ApplicationCard = memo(function ApplicationCard({
  id,
  company,
  position,
  status,
  onDelete,
  onEdit,
}: ApplicationCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-xl font-bold">{company}</h3>
      <p className="text-gray-500 mt-2">{position}</p>

      <span className={`status-badge status-${status.toLowerCase()}`}>
        {status}
      </span>

      <br />

      <button
        data-cy="delete-application"
        onClick={() => onDelete(id)}
        className="mt-4 mr-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
      >
        Delete
      </button>

      <button
        data-cy="edit-application"
        onClick={() => onEdit(id)}
        className="mt-4 ml-2 mr-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
      >
        Edit
      </button>
    </div>


  )

})

export default ApplicationCard