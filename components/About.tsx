import { PortfolioData } from "@/utils/types";
import Section from "./Section";

export function About(data: PortfolioData) {
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-10 gap-12 items-stretch">
        <div className="md:col-span-6 space-y-8">
          <h3 className="text-3xl font-bold text-white leading-tight">
            I bridge the gap between <br />
            <span className="text-slate-400">design & engineering.</span>
          </h3>
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>{data.profile.summary}</p>
            <p>{data.profile.summary2}</p>
            <p>{data.profile.summary3}</p>
          </div>
        </div>

        {/* Terminal Aesthetic Block */}
        <div className="hidden md:block md:col-span-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm h-full">
            {/* Terminal Header */}
            <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-slate-500">
                {data.profile.name.split(" ")[0]}@dev-portfolio ~
              </span>
            </div>
            {/* Terminal Body */}
            <div className="p-6 space-y-4 text-slate-300">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-4">
                <span className="text-purple-400 font-bold">Role:</span>
                <span>{data.profile.title}</span>
                <span className="text-purple-400 font-bold">Email:</span>
                <span>{data.profile.email}</span>
                <span className="text-purple-400 font-bold">Phone:</span>
                <span>
                  {data.socials
                    .find((s) => s.platform.toLowerCase() == "phone")
                    ?.url.replace("tel:", "")}
                </span>
                <span className="text-purple-400 font-bold">Location:</span>
                <span>{data.profile.location}</span>

                <span className="text-purple-400 font-bold">Uptime:</span>
                <span>
                  {new Date().getFullYear() - data.profile.yearsexperience}+
                  Years
                </span>
              </div>
              <div className="mx-5 mt-10">
                C:\Users\{data.profile.name.split(" ")[0]}\portfolio&gt;
                <span className="text-green-400 ml-2">
                  npm install -g my-skills
                </span>
                <div className="mt-5">
                  <div className="text-green-400 mt-2">
                    [BOOT] Skill Engine v1.4.2
                  </div>
                  <div className="text-green-400">
                    [OK] Front-End.js enabled
                  </div>
                  <div className="text-green-400">
                    [OK] Loading Back-End.cs ...
                  </div>
                  <div className="text-green-400">
                    [OK] Compiling creativity.dll
                  </div>
                  <div className="text-green-400">
                    [OK] Deploying problem_solver.exe
                  </div>
                  <div className="text-green-300 mt-2 font-semibold">
                    System Status: RUNNING ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
