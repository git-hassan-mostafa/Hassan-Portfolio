"use client";
import { About } from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";

import React from "react";

const PortfolioContent: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <div className="bg-primary min-h-screen text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar {...data} />
      <main className="relative">
        <Hero {...data} />
        <About {...data} />
        <Experience {...data} />
        <Projects {...data} />
        <Skills {...data} />
        <Contact {...data} />
      </main>
      <Footer {...data} />
    </div>
  );
};

export default function Home() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
