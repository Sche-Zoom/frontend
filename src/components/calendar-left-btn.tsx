import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LeftBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick} className="size-8 p-0 text-xs sm:size-9 sm:text-sm">
      <ChevronLeft className="size-4" />
    </Button>
  );
}
