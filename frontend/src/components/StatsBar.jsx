export default function StatsBar({ stats }) {
  const cards = [
    { label: 'Total Tasks', value: stats.total, color: 'text-gray-700', bg: 'bg-white' },
    { label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'In Progress', value: stats.inProgress, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: stats.completed, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Overdue', value: stats.overdue, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-5 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} border border-gray-200 rounded-xl px-4 py-3 text-center`}
        >
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}