import { usePortfolio } from "@/context/PortfolioContext";
import { Experience } from "@/utils/types";
import { useState } from "react";

const AddExperienceForm: React.FC = () => {
  const [experience, setExperience] = useState<Omit<Experience, "id">>({
    role: "",
    company: "",
    period: "",
    description: "",
  });

  const { addExperience, removeExperience, data } = usePortfolio();

  function updateExperience(field: keyof Experience, value: string) {
    setExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience.role || !experience.company) return;
    addExperience(experience);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-4 rounded border border-slate-800 space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            value={experience.role}
            onChange={(e) => updateExperience("role", e.target.value)}
            placeholder="Role"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={experience.company}
            onChange={(e) => updateExperience("company", e.target.value)}
            placeholder="Company"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={experience.period}
            onChange={(e) => updateExperience("period", e.target.value)}
            placeholder="Period"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>
        <textarea
          value={experience.description}
          onChange={(e) => updateExperience("description", e.target.value)}
          placeholder="Description (new line for each item)"
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          rows={3}
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Add Experience
        </button>
      </form>
      <div className="space-y-4">
        {data.experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-slate-900 p-5 rounded border border-slate-800 relative"
          >
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-5 right-5 text-slate-600 hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="font-bold text-white">{exp.role}</h3>
            <div className="text-accent text-sm mb-1">{exp.company}</div>
            <div className="text-slate-500 text-xs mb-3">{exp.period}</div>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              {exp.description.split("|||").map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddExperienceForm;
