import TaskCard from './TaskCard';

export default function TaskList({ tasks, onStatusChange, onDeleteTask, deletingTaskId }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-10 text-center">
        <p className="text-gray-400 text-sm">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusChange={onStatusChange}
          onDeleteTask={onDeleteTask}
          deletingTaskId={deletingTaskId}
        />
      ))}
    </div>
  );
}