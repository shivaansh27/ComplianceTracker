import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    country: "",
    entity_type: "Pvt Ltd",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      setError("");
      const res = await api.get("/clients");
      setClients(res.data.data);
    } catch (err) {
      setError(
        err.userMessage ||
          err.response?.data?.message ||
          "Failed to load clients",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company_name || !form.country) return;
    setError("");
    setSubmitting(true);
    try {
      await api.post("/clients", form);
      setForm({ company_name: "", country: "", entity_type: "Pvt Ltd" });
      setShowForm(false);
      await fetchClients();
    } catch (err) {
      setError(
        err.userMessage ||
          err.response?.data?.message ||
          "Failed to create client",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-indigo-600 tracking-wide">
            COMPLIANCE TRACKER
          </h1>
          <p className="text-xs text-gray-400">INSTITUTIONAL LEDGER</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          + Add Client
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Your Clients
        </h2>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-gray-600 mb-4">
              New Client
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Company Name *"
                value={form.company_name}
                onChange={(e) =>
                  setForm({ ...form, company_name: e.target.value })
                }
                required
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Country *"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
              />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                value={form.entity_type}
                onChange={(e) =>
                  setForm({ ...form, entity_type: e.target.value })
                }
              >
                {[
                  "Pvt Ltd",
                  "LLC",
                  "LLP",
                  "Sole Proprietor",
                  "Partnership",
                  "Other",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {submitting ? "Adding..." : "Add Client"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {loading ? (
          <p className="text-gray-400 text-sm">Loading clients...</p>
        ) : clients.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No clients yet. Add one above.
          </p>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => (
              <div
                key={client._id}
                onClick={() => navigate(`/client/${client._id}`)}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:border-indigo-300 hover:shadow-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {client.company_name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {client.entity_type} · {client.country}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
