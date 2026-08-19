import { useTheme } from '../../context/useTheme'

type StatCardProps = {
  title: string
  value: number
}

function StatCard({ title, value }: StatCardProps) {
  const { darkMode } = useTheme()

  return (
    <div
      className={`p-5 rounded-xl border shadow-sm ${
        darkMode
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <h3
        className={`text-sm ${
          darkMode
            ? 'text-slate-400'
            : 'text-gray-500'
        }`}
      >
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  )
}

export default StatCard