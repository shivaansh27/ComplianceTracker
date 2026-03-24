const priorityStyles = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-yellow-100 text-yellow-600',
  Low: 'bg-gray-100 text-gray-500',
};

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

export default function TaskCard({ task, onStatusChange }) {
  const isOverdue =
    task.status !== 'Completed' && new Date(task.due_date) < new Date();

  const formattedDate = new Date(task.due_date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className={`bg-white border rounded-xl px-5 py-4 flex items-center justify-between gap-4
        ${isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-semibold ${isOverdue ? 'text-red-700' : 'text-gray-800'}`}>
            {task.title}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          {isOverdue && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-200 text-red-700">
              Overdue
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs text-gray-400">📁 {task.category}</span>
          <span className={`text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
            📅 {isOverdue ? `Due ${formattedDate}` : `Due ${formattedDate}`}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[task.status]}`}>
            {task.status}
          </span>
        </div>
        {task.description && (
          <p className="text-xs text-gray-400 mt-1 truncate">{task.description}</p>
        )}
      </div>

      <select
        className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-300 bg-white shrink-0"
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
