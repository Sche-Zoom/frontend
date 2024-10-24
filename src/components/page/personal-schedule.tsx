"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import PersonalScheduleContent from "@/components/personal-schedule-detail/personal-schedule-content";
import { Button } from "@/components/ui/button";

export default function PersonalSchedule({ sid }: { sid: string }) {
  const router = useRouter();

  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col bg-white">
      {/* content title */}
      <div className="border-b-muted flex h-12 items-center space-x-1 border border-b-2">
        <Button type="button" variant="image-icon-active" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={18} />
        </Button>
        <h2 className="font-medium">일정 상세 정보</h2>
      </div>

      {/* 일정 상세 정보 Form content */}
      <PersonalScheduleContent scheduleId={Number(sid)} />
    </div>
  );
}
