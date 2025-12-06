import Section from "./Section";
import { PortfolioData } from "@/utils/types";

const Contact = (data: PortfolioData) => {
  return (
    <Section id="contact" title="Get In Touch" className="text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <p className="text-slate-400 text-lg leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a
          question or just want to say hi, I'll try my best to get back to you!
        </p>

        <a
          href={`mailto:${data.profile.email}`}
          className="inline-block px-8 py-4 bg-transparent border border-accent text-accent font-bold rounded hover:bg-accent/10 transition-all duration-300 transform hover:-translate-y-1"
        >
          Say Hello
        </a>
      </div>
    </Section>
  );
};

export default Contact;
