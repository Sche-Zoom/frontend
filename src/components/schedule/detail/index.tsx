"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import BasicLoader from "@/components/basic-loader";
import { ScheduleDetailForm } from "@/components/schedule/schedule-form";
import { Button } from "@/components/ui/button";

interface Props {
  scheduleId: number;
}

export default function ScheduleDetail({ scheduleId }: Props) {
  const router = useRouter();

  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col bg-white">
      {/* content title */}
      <div className="border-b-muted flex h-12 items-center space-x-1 border border-b-2">
        <Button type="button" variant="image-icon-active" size="sm" onClick={router.back}>
          <ArrowLeft size={18} />
        </Button>

        <h2 className="font-medium">일정 상세 정보</h2>
      </div>

      {/* 일정 상세 정보 Form content */}
      <div className="size-full overflow-y-auto px-6 py-4">
        <Suspense fallback={<BasicLoader />}>
          {/* 상세정보 form */}
          <ScheduleDetailForm scheduleId={scheduleId} />
        </Suspense>
      </div>
    </div>
  );
}
