import Image from "next/image";
import { PortfolioData } from "@/utils/types";
import { ImagesUrl } from "@/utils/Constants";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./icons/Icons";

const Hero = (data: PortfolioData) => {
  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return <GithubIcon />;
    if (p.includes("linkedin")) return <LinkedinIcon />;
    if (p.includes("twitter")) return <TwitterIcon />;
    if (p.includes("youtube")) return <YoutubeIcon />;
    if (p.includes("facebook")) return <FacebookIcon />;
    if (p.includes("instagram")) return <InstagramIcon />;
    if (p.includes("phone")) return <PhoneIcon />;
    if (p.includes("email") || p.includes("mail")) return <MailIcon />;
    return null;
  };
  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-start">
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-8 animate-slide-up order-2 lg:order-1">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
                Available for new projects
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Building digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                products & brands.
              </span>
            </h1>

            <div className="space-y-4">
              <h2 className="text-2xl text-white font-medium">
                I'm {data.profile.name}, a{" "}
                <span className="text-accent">{data.profile.title}</span> based
                in {data.profile.location}.
              </h2>
              <p className="text-lg text-slate-400 font-light  leading-relaxed">
                {data.profile.summary}
              </p>
            </div>

            {/* Stats Row - Moved from Image Badge */}
            <div className="flex flex-wrap gap-8 py-2">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">
                  {new Date().getFullYear() - data.profile.yearsexperience}+
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  Years Of Experience
                </span>
              </div>
              <div className="w-px h-10 bg-slate-800 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">
                  {data.projects.length}+
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  Projects Completed
                </span>
              </div>
              <div className="w-px h-10 bg-slate-800 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">
                  {data.skills.length}+
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  Technologies Mastered
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              Check my work
            </a>

            <a
              href="#contact"
              className="px-8 py-4 bg-slate-800/50 text-white font-medium rounded-full border border-slate-700 hover:bg-slate-800 transition-colors backdrop-blur-sm"
            >
              Contact
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center gap-6 border-t border-slate-800/50 mt-8">
            {data.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label={social.platform}
              >
                <span className="sr-only">{social.platform}</span>
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* Hero Image / Visual */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2 lg:mt-14">
          <div className="relative w-72 h-72 md:w-96 md:h-96 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] rotate-6 group-hover:rotate-3 transition-transform duration-500 opacity-60 blur-lg"></div>
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
              <Image
                src={ImagesUrl + "profile-image/profile-image.png"}
                width={1000}
                height={1000}
                alt="../public/linkedin.png"
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
