import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ScheduleAddForm } from "@/components/schedule/schedule-form";
import { Button } from "@/components/ui/button";

export default function ScheduleAdd() {
  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col bg-white">
      {/* content title */}
      <div className="border-b-muted flex h-12 items-center space-x-1 border border-b-2">
        <Link href="/">
          <Button type="button" variant="image-icon-active" size="sm">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <h2 className="font-medium">새 일정 생성</h2>
      </div>

      {/* 개인 일정 추가 Form content */}
      <div className="size-full overflow-y-auto px-6 py-4">
        <ScheduleAddForm />
      </div>
    </div>
  );
}
