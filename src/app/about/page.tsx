"use client";

import {
  AboutHero,
  AboutStats,
  AboutStory,
  AboutValues,
  AboutMission,
  AboutTeam,
} from "@/components/about";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutMission />
      <Footer />
    </div>
  );
}
