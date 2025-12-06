import { usePortfolio } from "@/context/PortfolioContext";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import image from "../../public/file.svg";
import { ImagesUrl } from "@/utils/Constants";

export function Profile() {
  const { data, updateProfile, saveProfile } = usePortfolio();

  const [file, setFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    const f = e?.target?.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile(file as File);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <div className="w-40 h-40 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
          <Image
            priority
            decoding="async"
            width={160}
            height={160}
            src={photoPreview || ImagesUrl + "profile-image/profile-image.png"}
            alt="project preview"
            className="object-cover w-full h-full"
          />
        </div>

        <label className="mt-4 w-full text-center">
          <input
            onChange={handleSelectFile}
            accept="image/png"
            type="file"
            className="hidden"
          />
          <span className="inline-block px-4 py-2 bg-sky-600 text-white rounded cursor-pointer text-sm">
            Choose image
          </span>
        </label>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            value={data.profile.name}
            onChange={(e) => updateProfile("name", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Job Title
          </label>
          <input
            type="text"
            value={data.profile.title}
            onChange={(e) => updateProfile("title", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-300">
            Summary
          </label>
          <textarea
            value={data.profile.summary}
            onChange={(e) => updateProfile("summary", e.target.value)}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-300">
            Summary 2
          </label>
          <textarea
            value={data.profile.summary2}
            onChange={(e) => updateProfile("summary2", e.target.value)}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-300">
            Summary 3
          </label>
          <textarea
            value={data.profile.summary3}
            onChange={(e) => updateProfile("summary3", e.target.value)}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Location
          </label>
          <input
            type="text"
            value={data.profile.location}
            onChange={(e) => updateProfile("location", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            type="email"
            value={data.profile.email}
            onChange={(e) => updateProfile("email", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Years of Experience
          </label>
          <input
            type="number"
            value={data.profile.yearsexperience}
            onChange={(e) => updateProfile("yearsexperience", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="p-3 px-5 bg-accent mt-5 cursor-pointer rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
}
