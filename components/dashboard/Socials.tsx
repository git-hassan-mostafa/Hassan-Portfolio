import { usePortfolio } from "@/context/PortfolioContext";
import { Skill, SocialLink } from "@/utils/types";
import { useState } from "react";

const AddSocialsForm: React.FC = () => {
  const [social, setSocial] = useState<SocialLink>({
    platform: "",
    url: "",
  });

  const { addSocialLink, removeSocialLink, data } = usePortfolio();

  function updateSocial(field: keyof SocialLink, value: string | number) {
    setSocial((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!social.platform || !social.url) return;
    addSocialLink(social);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-4 rounded border border-slate-800 grid md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="text-xs text-slate-400 block mb-1">Platform</label>
          <input
            type="text"
            value={social.platform}
            onChange={(e) => updateSocial("platform", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            placeholder="e.g. GitHub"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">URL</label>
          <input
            type="text"
            value={social.url}
            onChange={(e) => updateSocial("url", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            placeholder="e.g. https://github.com/username"
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
        {data.socials.map((social) => (
          <div
            key={social.platform}
            className="bg-slate-900 p-4 rounded border border-slate-800 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-white text-sm">
                {social.platform}
              </p>
              <p className="text-xs text-slate-500">{social.url}</p>
            </div>
            <button
              onClick={() => removeSocialLink(social.platform)}
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

export default AddSocialsForm;
