"use client";

import { useStore } from "../store/useStore";
import AuthPage from "../components/new/AuthPage";

export default function Auth() {
  const { language } = useStore();

  // Render auth page - no redirect logic here
  // Let the auth page handle post-login navigation
  return <AuthPage language={language} />;
}
