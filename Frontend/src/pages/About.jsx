import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/layout/Navbar";
import ResearchCard from "../components/research/ResearchCard";
import PublishResearchModal from "../components/research/PublishResearchModal";

export default function Profile() {
  const { user } = useAuth();
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // 👈 edit state

  const fetchMyResearch = () => {
    setLoading(true);
    api
      .get("/research/me")
      .then((res) => setResearch(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyResearch();
  }, []);

  /* ===== Owner Actions (Edit / Delete) ===== */
  const ResearchActions = ({ item }) => {
    const handleDelete = async () => {
      const ok = confirm("Are you sure you want to delete this research?");
      if (!ok) return;

      await api.delete(`/research/${item._id}`);
      fetchMyResearch();
    };

    const handleEdit = () => {
      setEditing(item); // 👈 open edit modal
    };

    return (
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="text-xs px-3 py-1 rounded-full border bg-white hover:bg-stone-50 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">

          {/* ===== Profile Header ===== */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-serif italic">Welcome {user?.name} !!</h1>
            <p className="text-text-muted max-w-lg">
              Manage your personal information, account security, and
              published research.
            </p>
          </div>

          {/* ===== Personal Information ===== */}
          <div className="bg-white border rounded-2xl p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-serif italic">Personal Information</h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-text-muted">Full Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>

              <div>
                <p className="text-text-muted">Role</p>
                <p className="font-medium capitalize">
                  {user?.role?.toLowerCase()}
                </p>
              </div>

              <div>
                <p className="text-text-muted">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>

              <div>
                <p className="text-text-muted">Expertise</p>
                <p className="font-medium">
                  {Array.isArray(user?.expertise)
                    ? user.expertise.join(", ")
                    : user?.expertise || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* ===== Account & Security ===== */}
          <div className="bg-white border rounded-2xl p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-serif italic">Account & Security</h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="h-11 px-6 rounded-full border font-medium hover:bg-stone-50 transition">
                Change Password
              </button>

              <button className="h-11 px-6 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition">
                Logout from all devices
              </button>
            </div>
          </div>

          {/* ===== Published Research ===== */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif italic">Published Research</h2>

            {loading ? (
              <p className="text-text-muted">Loading research…</p>
            ) : research.length === 0 ? (
              <p className="text-text-muted">
                You haven’t published any research yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {research.map((item) => (
                  <ResearchCard
                    key={item._id}
                    data={item}
                    actions={<ResearchActions item={item} />}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Edit Modal ===== */}
      {editing && (
        <PublishResearchModal
          initialData={editing}
          onClose={() => setEditing(null)}
          onSuccess={fetchMyResearch}
        />
      )}
    </>
  );
}
