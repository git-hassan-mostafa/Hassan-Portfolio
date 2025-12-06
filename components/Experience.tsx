import { PortfolioData } from "@/utils/types";
import Section from "./Section";

const Experience = (data: PortfolioData) => {
  return (
    <Section id="experience" title="Work Experience">
      <div className="max-w-3xl border-l border-slate-800 ml-3 md:ml-6 space-y-12 pl-8 relative">
        {data.experience.map((job) => (
          <div key={job.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[42px] top-1.5 w-5 h-5 bg-primary border-4 border-slate-700 rounded-full"></div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-white">{job.role}</h3>
              <span className="text-sm font-mono text-slate-500">
                {job.period}
              </span>
            </div>

            <div className="text-accent font-medium mb-4">{job.company}</div>

            <ul className="space-y-2">
              {job.description.split("|||").map((desc, i) => (
                <li
                  key={i}
                  className="text-slate-400 text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-slate-600"
                >
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
