import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LeftBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick} className="size-9 p-0">
      <ChevronLeft className="size-4" />
    </Button>
  );
}
