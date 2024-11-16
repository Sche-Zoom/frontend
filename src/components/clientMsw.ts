"use client";

import { useEffect } from "react";

export default function ClientMsw() {
  useEffect(() => {
    async function enableApiMocking() {
      if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        const { worker } = await import("../mocks/browser");
        worker.start();
      }
    }
  }, []);

  return null;
}
