"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import CreateScheduleContent from "@/components/create-personal-schedule/create-schedule-content";
import { Button } from "@/components/ui/button";

export default function AddPersonalSchedule() {
  const router = useRouter();

  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col bg-white">
      {/* content title */}
      <div className="border-b-muted flex h-12 items-center space-x-1 border border-b-2">
        <Button type="button" variant="image-icon-active" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={18} />
        </Button>
        <h2 className="font-medium">새 일정 생성</h2>
      </div>

      {/* 개인 일정 추가 Form content */}
      <CreateScheduleContent />
    </div>
  );
}
