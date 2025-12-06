import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import image from "../../public/file.svg";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/utils/types";
import { ImagesUrl } from "@/utils/Constants";

const AddProjectForm: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [project, setProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    technologies: "",
    image: "",
    repourl: "",
    demourl: "",
  });
  const { addProject, removeProject, data } = usePortfolio();

  function updateProject(key: keyof Project, value: string) {
    setProject((prevProject) => ({
      ...prevProject,
      [key]: value,
    }));
  }

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileName(
        e.target.files[0].name + `${(Math.random() * 100).toFixed(2)}`
      );
    }

    const f = e?.target?.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.title) return;
    addProject(project, file as File, fileName as string);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-4 rounded-xl border border-white/5 space-y-4"
      >
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-40 h-40 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
            <Image
              priority
              decoding="async"
              width={160}
              height={160}
              src={photoPreview || image}
              alt="project preview"
              className="object-cover w-full h-full"
            />
          </div>

          <label className="mt-4 w-full text-center">
            <input onChange={handleSelectFile} type="file" className="hidden" />
            <span className="inline-block px-4 py-2 bg-sky-600 text-white rounded cursor-pointer text-sm">
              Choose image
            </span>
          </label>
          {fileName && (
            <p className="mt-2 text-sm text-gray-300 truncate w-40">
              {fileName}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={project.title}
            onChange={(e) => updateProject("title", e.target.value)}
            placeholder="Project Title"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={project.demourl}
            onChange={(e) => updateProject("demourl", e.target.value)}
            placeholder="Demo URL"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={project.repourl}
            onChange={(e) => updateProject("repourl", e.target.value)}
            placeholder="Repo URL"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={project.technologies}
            onChange={(e) => updateProject("technologies", e.target.value)}
            placeholder="Technologies (comma separated)"
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>
        <textarea
          value={project.description}
          onChange={(e) => updateProject("description", e.target.value)}
          placeholder="Description"
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          rows={2}
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Add Project
        </button>
      </form>
      <div className="grid md:grid-cols-2 gap-6">
        {data.projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-900 p-4 rounded border border-slate-800 flex gap-4 relative"
          >
            <button
              onClick={() => removeProject(proj.id)}
              className="absolute top-2 right-2 text-slate-600 hover:text-red-400 z-10 bg-slate-900 rounded-full p-1"
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
            <div className="w-20 h-20 bg-slate-800 rounded flex-shrink-0 overflow-hidden">
              <img
                src={ImagesUrl + proj.image}
                alt={proj.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{proj.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {proj.technologies.split(",").map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProjectForm;
