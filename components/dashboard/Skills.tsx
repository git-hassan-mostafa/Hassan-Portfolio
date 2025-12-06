import { usePortfolio } from "@/context/PortfolioContext";
import { Skill } from "@/utils/types";
import { useState } from "react";

const AddSkillForm: React.FC = () => {
  const [skill, setSkill] = useState<Omit<Skill, "id">>({
    name: "",
    category: "",
    level: 10,
  });

  const { addSkill, removeSkill, data } = usePortfolio();

  function updateSkill(field: keyof Skill, value: string | number) {
    setSkill((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill.name || !skill.category) return;
    addSkill(skill);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-4 rounded border border-slate-800 grid md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="text-xs text-slate-400 block mb-1">Skill</label>
          <input
            type="text"
            value={skill.name}
            onChange={(e) => updateSkill("name", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            placeholder="e.g. React"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Category</label>
          <input
            type="text"
            value={skill.category}
            onChange={(e) => updateSkill("category", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            placeholder="e.g. Frontend"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">
            Proficiency {"("}
            {skill.level}%{")"}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={skill.level}
            onChange={(e) => updateSkill("level", Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Add
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-slate-900 p-4 rounded border border-slate-800 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-white text-sm">{skill.name}</p>
              <p className="text-xs text-slate-500">{skill.category}</p>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-slate-600 hover:text-red-400"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSkillForm;
