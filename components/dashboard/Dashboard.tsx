import { usePortfolio } from "@/context/PortfolioContext";
import React, { useState } from "react";
import AddProjectForm from "./Projects";
import { ImagesUrl } from "@/utils/Constants";
import AddSkillForm from "./Skills";
import AddExperienceForm from "./Experience";
import { Profile } from "./Profile";
import AddSocialsForm from "./Socials";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "skills" | "experience" | "projects" | "socials"
  >("profile");

  return (
    <div className="min-h-screen pt-28 pb-12 px-6 max-w-6xl mx-auto">
      <div className="bg-secondary/40 border border-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-800 pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Content Editor</h2>
            <p className="text-slate-400 text-sm">
              Update your portfolio information in real-time.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-8">
          {(
            ["profile", "skills", "experience", "projects", "socials"] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {activeTab === "profile" && <Profile />}
          {activeTab === "skills" && <AddSkillForm />}
          {activeTab === "experience" && <AddExperienceForm />}
          {activeTab === "projects" && <AddProjectForm />}
          {activeTab === "socials" && <AddSocialsForm />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
