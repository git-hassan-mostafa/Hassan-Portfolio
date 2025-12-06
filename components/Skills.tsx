import React, { useState } from "react";
import Section from "./Section";
import { usePortfolio } from "../context/PortfolioContext";
import { PortfolioData } from "@/utils/types";

const Skills = (data: PortfolioData) => {
  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(data.skills.map((s) => s.category))).sort(),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? data.skills.sort((a, b) => b.level - a.level)
      : data.skills
          .filter((s) => s.category === activeCategory)
          .sort((a, b) => b.level - a.level);

  return (
    <Section id="skills" title="Technical Expertise">
      <div className="space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-white text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-slate-900/50 text-slate-400 border-slate-700 hover:text-white hover:border-slate-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 animate-fade-in">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-accent/50 transition-colors duration-300 flex flex-col justify-between h-32 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500"></div>

              <div>
                <div className="text-xs font-mono text-accent mb-2 uppercase tracking-wider opacity-70">
                  {skill.category}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {skill.name}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden mr-4">
                  <div
                    className="h-full bg-slate-500 group-hover:bg-accent transition-all duration-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors tabular-nums">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
            <p className="text-slate-500">No skills found in this category.</p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Skills;
