import { ClipboardList } from "lucide-react";

import PersonalFullCalendar from "@/components/per-calendar";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <div>
      <div className="bg-muted sticky left-0 top-9 z-10 flex h-9 items-center justify-between border-b px-2">
        <h3 className="align-middle text-sm">개인 일정</h3>

        <Button variant="image-icon-none" size="icon-sm">
          <ClipboardList size={24} />
        </Button>
      </div>

      <PersonalFullCalendar />
    </div>
  );
}
