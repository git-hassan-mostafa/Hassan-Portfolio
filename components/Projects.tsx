import Section from "./Section";
import { ImagesUrl } from "@/utils/Constants";
import { PortfolioData } from "@/utils/types";
import Image from "next/image";

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
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <Image
                  width={10000}
                  height={10000}
                  src={ImagesUrl + project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* View Project Button (Visible on Hover) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40 backdrop-blur-[2px]"></div>
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
                    .split(",")
                    .filter((t) => t.trim().length > 0)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex gap-6 pt-4">
                <a
                  href={project.demourl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white font-medium hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1"
                >
                  Live Demo
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <a
                  href={project.repourl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-400 font-medium hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                >
                  Source Code
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
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
