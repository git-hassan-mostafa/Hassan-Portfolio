import { PortfolioData } from "@/utils/types";

const Footer = (data: PortfolioData) => {
  return (
    <footer className="py-8 text-center text-slate-500 text-sm bg-primary border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <p className="mb-2">
          Designed & Built by{" "}
          <span className="text-accent font-bold">{data.profile.name}</span>
        </p>
        <p className="text-xs">
          Built with Next JS, Tailwind CSS, and Supabase.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
