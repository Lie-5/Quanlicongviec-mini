"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#37352f",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          fontSize: "14px",
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "#0F7B6D",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#FF4618",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
