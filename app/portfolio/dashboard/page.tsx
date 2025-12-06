"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import { PortfolioProvider } from "@/context/PortfolioContext";

export default function Page() {
  return (
    <PortfolioProvider>
      <Dashboard />
    </PortfolioProvider>
  );
}
