import { Loader } from "lucide-react";
import React from "react";

export default function BasicLoader() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader className="size-8 animate-spin" />
    </div>
  );
}
