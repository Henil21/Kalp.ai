import { useState } from "react";
import api from "../../api/axios";

const DOMAIN_SUGGESTIONS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Robotics",
  "Bioinformatics",
  "Biotech",
  "Cybersecurity",
  "Blockchain",
  "Data Science",
  "Ethics",
  "Healthcare",
  "Climate Tech",
  "Quantum Computing",
  "Human-Computer Interaction",
  "Philosophy"
];

export default function PublishResearchModal({
  onClose,
  onSuccess,
  initialData = null,
}) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    abstract: initialData?.abstract || "",
    domains: initialData?.domains || [],
    links: initialData?.links?.join(", ") || "",
    sourceCode: initialData?.sourceCode || "",
  });

  const [domainInput, setDomainInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isEdit = Boolean(initialData);

  const filteredSuggestions = DOMAIN_SUGGESTIONS.filter(
    (d) =>
      d.toLowerCase().includes(domainInput.toLowerCase()) &&
      !form.domains.includes(d)
  );

  const addDomain = (domain) => {
    setForm((prev) => ({
      ...prev,
      domains: [...prev.domains, domain],
    }));
    setDomainInput("");
    setShowSuggestions(false);
  };

  const removeDomain = (domain) => {
    setForm((prev) => ({
      ...prev,
      domains: prev.domains.filter((d) => d !== domain),
    }));
  };

 const handleSubmit = async () => {
  if (form.domains.length === 0) {
    alert("Please select at least one domain");
    return;
  }

  const payload = {
    title: form.title,
    abstract: form.abstract,
    domain: form.domains[0], // ✅ BACKWARD COMPATIBLE
    links: form.links
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean),
    sourceCode: form.sourceCode,
  };

  if (isEdit) {
    await api.put(`/research/${initialData._id}`, payload);
  } else {
    await api.post("/research", payload);
  }

  onSuccess();
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="bg-white w-full max-w-xl rounded-xl border border-[#e6e6db] p-8 flex flex-col gap-6">

        {/* ===== Header ===== */}
        <h2 className="text-2xl font-serif italic">
          {isEdit ? "Edit Research" : "Publish Research"}
        </h2>

        {/* ===== Title ===== */}
        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Research title"
          className="border border-[#e6e6db] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* ===== Domain Selector ===== */}
        <div className="relative">
          <input
            value={domainInput}
            onChange={(e) => {
              setDomainInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Type domains (e.g. AI, Vision, Biotech)"
            className="w-full border border-[#e6e6db] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />

          {showSuggestions && domainInput && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-sm">
              {filteredSuggestions.map((d) => (
                <button
                  key={d}
                  onClick={() => addDomain(d)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50"
                >
                  {d}
                </button>
              ))}
            </div>
          )}

          {/* Selected Domains */}
          {form.domains.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.domains.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-2 px-3 py-1 text-xs border rounded-md bg-stone-50"
                >
                  {d}
                  <button
                    onClick={() => removeDomain(d)}
                    className="text-text-muted hover:text-text-main"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ===== Abstract ===== */}
        <textarea
          value={form.abstract}
          onChange={(e) =>
            setForm({ ...form, abstract: e.target.value })
          }
          placeholder="Abstract"
          rows={5}
          className="border border-[#e6e6db] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* ===== Links ===== */}
        <input
          value={form.links}
          onChange={(e) =>
            setForm({ ...form, links: e.target.value })
          }
          placeholder="Reference links (comma separated)"
          className="border border-[#e6e6db] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* ===== Source Code ===== */}
        <input
          value={form.sourceCode}
          onChange={(e) =>
            setForm({ ...form, sourceCode: e.target.value })
          }
          placeholder="Source code URL (optional)"
          className="border border-[#e6e6db] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* ===== Actions ===== */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm hover:bg-stone-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary font-bold rounded-md hover:bg-yellow-300 transition"
          >
            {isEdit ? "Update Research" : "Publish Research"}
          </button>
        </div>

      </div>
    </div>
  );
}
