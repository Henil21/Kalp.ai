import { useEffect, useState } from "react";
import api from "../api/axios";
import ResearchCard from "../components/research/ResearchCard";
import PublishResearchModal from "../components/research/PublishResearchModal";
import ResearchPreview from "../components/research/ResearchPreview";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/layout/Navbar";
import { AnimatePresence } from "framer-motion";

export default function Research() {
  const [research, setResearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("ALL");
  const [selectedResearch, setSelectedResearch] = useState(null);
  const { user } = useAuth();

  const fetchResearch = async () => {
    const res = await api.get("/research");
    setResearch(res.data);
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  const domains = [
    "ALL",
    "Arificial Intelligence",
    "Computer Vision",
    "Blockchain",
    "NLP",
    "Robotics",
    "Ethics",
    "Philosophy"
  ];

  const filtered =
    selectedDomain === "ALL"
      ? research
      : research.filter((r) => r.domain === selectedDomain);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Navbar />

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">

          {/* ===== Header ===== */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif italic">
                Research Discovery
              </h1>
              <p className="text-text-muted mt-2 max-w-md">
                Explore published research and initiate collaboration.
              </p>
            </div>

            {user?.role === "RESEARCHER" && (
              <button
                onClick={() => setOpen(true)}
                className="h-10 px-6 rounded-full bg-primary font-bold hover:bg-yellow-300 transition"
              >
                Publish Research
              </button>
            )}
          </div>

          {/* ===== Domain Filters ===== */}
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    selectedDomain === d
                      ? "bg-text-main text-white"
                      : "bg-white border hover:text-text-muted"
                  }
                `}
              >
                {d}
              </button>
            ))}
          </div>

          {/* ===== Featured Research ===== */}
          {featured && (
            <div className="rounded-2xl border p-8 bg-white flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                <span>{featured.domain}</span>
                <span className="size-1 rounded-full bg-stone-300" />
                <span>
                  {new Date(featured.createdAt).getFullYear()}
                </span>
              </div>

              <h2 className="text-3xl font-serif italic">
                {featured.title}
              </h2>

              <p className="text-text-muted leading-relaxed max-w-3xl">
                {featured.abstract}
              </p>

              {featured.sourceCode && (
                <a
                  href={featured.sourceCode}
                  target="_blank"
                  className="text-sm font-bold underline underline-offset-4"
                >
                  View Source Code →
                </a>
              )}
            </div>
          )}

          {/* ===== Research Grid ===== */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {rest.map((item) => (
              <ResearchCard
                key={item._id}
                data={item}
                onClick={() => setSelectedResearch(item)}
              />
            ))}
          </div>

          {/* ===== Load More ===== */}
          <div className="flex justify-center pt-12">
            <button className="text-sm font-medium hover:text-text-muted">
              Explore More Research ↓
            </button>
          </div>

        </div>

        {/* ===== Publish Modal ===== */}
        {open && (
          <PublishResearchModal
            onClose={() => setOpen(false)}
            onSuccess={fetchResearch}
          />
        )}
      </section>

      {/* ===== Fullscreen Preview ===== */}
      <AnimatePresence>
        {selectedResearch && (
          <ResearchPreview
            data={selectedResearch}
            onClose={() => setSelectedResearch(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
