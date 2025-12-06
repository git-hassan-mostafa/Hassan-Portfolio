import React, { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-6 max-w-7xl mx-auto ${className}`}
    >
      <div className="mb-12 md:mb-16 group inline-block cursor-default">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight relative z-10">
          {title}
          <span className="text-accent w-2 h-2 ml-1 bg-accent rounded-full inline-block transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1"></span>
        </h2>
        {/* Simple decorative line that expands on hover */}
        <div className="h-1.5 w-12 bg-accent mt-3 rounded-full transition-all duration-500 ease-out group-hover:w-full group-hover:opacity-50"></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
