import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddTaskForm from "../components/AddTaskForm";
import api from "../api/axios";
import TaskList from "../components/TaskList";
import StatsBar from "../components/StatsBar";

export default function Dashboard() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ status: "", category: "" });

  const fetchAll = async () => {
    try {
      setError("");
      const [clientRes, taskRes, statsRes] = await Promise.all([
        api.get(`/clients/${clientId}`),
        api.get(`/tasks/client/${clientId}`, { params: filters }),
        api.get(`/tasks/client/${clientId}/stats`),
      ]);
      setClient(clientRes.data.data);
      setTasks(taskRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      setError(
        err.userMessage ||
          err.response?.data?.message ||
          "Failed to load dashboard data",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [clientId, filters]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <div className="p-8 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-indigo-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-800">
              {client?.company_name}
              <span className="text-gray-400 font-normal text-sm ml-2">
                · {client?.entity_type}
              </span>
            </h1>
            <p className="text-xs text-gray-400">Main Compliance Dashboard</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {stats && <StatsBar stats={stats} />}

        <AddTaskForm clientId={clientId} onTaskAdded={fetchAll} />

        <div className="flex items-center gap-3">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Status: All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">Category: All</option>
            <option value="Tax">Tax</option>
            <option value="Filing">Filing</option>
            <option value="Compliance">Compliance</option>
            <option value="Other">Other</option>
          </select>

          <span className="text-xs text-gray-400 ml-auto">
            Showing {tasks.length} tasks
          </span>
        </div>

        <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
