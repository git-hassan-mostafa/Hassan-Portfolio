import React from "react";
import Section from "./Section";
import { usePortfolio } from "../context/PortfolioContext";
import Image from "next/image";
import { ImagesUrl } from "@/utils/Constants";
import { ExternalLinkIcon, GithubIcon } from "./icons/Icons";
import { PortfolioData } from "@/utils/types";

const Projects = (data: PortfolioData) => {
  return (
    <Section id="projects" title="Selected Works">
      <div className="space-y-24 lg:space-y-32">
        {data.projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Side - Reduced width to 50% and aspect ratio to 16:9 */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl group">
                <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-slate-900/60 transition-colors duration-500 backdrop-blur-[0px] group-hover:backdrop-blur-[2px]"></div>
                <Image
                  width={10000}
                  height={10000}
                  src={ImagesUrl + project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Actions (Visible on Hover) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={project.demourl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-slate-200 hover:scale-105 flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                    <ExternalLinkIcon size={18} />
                  </a>

                  <a
                    href={project.repourl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-slate-800/90 text-white font-bold rounded-full border border-slate-600 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-xl hover:bg-slate-800 hover:border-white hover:scale-105 flex items-center gap-2"
                  >
                    <span>Code</span>
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Content Side - Increased width to 50% for balance */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
              <div>
                <span className="text-accent font-mono text-sm tracking-wider uppercase mb-3 block">
                  0{index + 1} — Featured Project
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
              </div>

              <p className="text-lg text-slate-400 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies
                    .replace(" ", "")
                    .split(",")
                    .map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
