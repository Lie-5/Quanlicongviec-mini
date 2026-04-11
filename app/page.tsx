"use client";

import { useStore } from "./store/useStore";
import LandingPage from "./components/new/LandingPage";

export default function RootPage() {
  const { language } = useStore();
  // Simply render landing page - no auto redirect
  return <LandingPage language={language} />;
}
