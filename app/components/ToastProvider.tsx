"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1a1a2e",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          borderRadius: "12px",
          fontSize: "14px",
          padding: "14px 18px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
          style: {
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            backdropFilter: "blur(8px)",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            backdropFilter: "blur(8px)",
          },
        },
        loading: {
          style: {
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    />
  );
}
