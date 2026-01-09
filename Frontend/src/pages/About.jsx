import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/layout/Navbar";
import ResearchCard from "../components/research/ResearchCard";
import PublishResearchModal from "../components/research/PublishResearchModal";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import ConfirmDeleteModal from "../components/profile/ConfirmDeleteModal";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* ===== Logout ===== */
  const handleLogout = () => {
    setDeleteTarget({
      type: "logout",
    });
  };

  /* ===== Fetch Research ===== */
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

  /* ===== Confirm Delete / Logout ===== */
  const confirmAction = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      if (deleteTarget.type === "research") {
        await api.delete(`/research/${deleteTarget.item._id}`);
        fetchMyResearch();
      }

      if (deleteTarget.type === "logout") {
        logout();
        navigate("/login");
      }

      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  /* ===== Research Actions ===== */
  const ResearchActions = ({ item }) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setEditing(item)}
          className="text-xs px-3 py-1 rounded-full border bg-white hover:bg-stone-50 transition"
        >
          Edit
        </button>

        <button
          onClick={() =>
            setDeleteTarget({
              type: "research",
              item,
            })
          }
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
          <div className="flex items-center gap-6">
            {user?.avatar?.image ? (
              <img
                src={user.avatar.image}
                alt={user.avatar.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                {user?.name?.[0] || "U"}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-serif italic">
                Welcome {user?.name} 👋
              </h1>
              <p className="text-text-muted max-w-lg">
                Manage your personal information, account security, and
                published research.
              </p>
            </div>
          </div>

          {/* ===== Personal Info ===== */}
          <div className="bg-white border rounded-2xl p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-serif italic">
              Personal Information
            </h2>

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
            <h2 className="text-2xl font-serif italic">
              Account & Security
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowChangePassword(true)}
                className="h-11 px-6 rounded-full border font-medium hover:bg-stone-50 transition"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="h-11 px-6 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition"
              >
                Logout your Account
              </button>
            </div>
          </div>

          {/* ===== Published Research ===== */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif italic">
              Published Research
            </h2>

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

      {/* ===== Edit Research Modal ===== */}
      {editing && (
        <PublishResearchModal
          initialData={editing}
          onClose={() => setEditing(null)}
          onSuccess={fetchMyResearch}
        />
      )}

      {/* ===== Change Password Modal ===== */}
      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
        />
      )}

      {/* ===== Confirm Delete / Logout Modal ===== */}
      {deleteTarget && (
        <ConfirmDeleteModal
          title={
            deleteTarget.type === "logout"
              ? "Logout"
              : "Delete Research"
          }
          description={
            deleteTarget.type === "logout"
              ? "Are you sure you want to logout from your account?"
              : "Are you sure you want to delete this research? This action cannot be undone."
          }
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmAction}
          loading={deleting}
        />
      )}
    </>
  );
}
