"use client";

import { Suspense } from "react";

import BasicLoader from "@/components/basic-loader";
import PersonalDetailForm from "@/components/schedule/detail/personal-detail-form";

interface Props {
  scheduleId: number;
}

export const PersonalScheduleContent = ({ scheduleId }: Props) => {
  return (
    <div className="size-full overflow-y-auto px-6 py-4">
      <Suspense fallback={<BasicLoader />}>
        {/* 상세정보 form */}
        <PersonalDetailForm scheduleId={scheduleId} />
      </Suspense>
    </div>
  );
};

export default PersonalScheduleContent;
