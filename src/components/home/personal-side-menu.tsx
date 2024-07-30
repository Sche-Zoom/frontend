import React, { Suspense } from "react";

import BasicLoader from "@/components/basic-loader";
import ErrorBoundary from "@/components/error-boundary";
import SummarySchedules from "@/components/home/summary-schedules";
import { SideMenuContent } from "@/components/side-menu";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export default function PersonalSideMenu() {
  const { menuTab } = usePersonalCalendarContext();

  // 어떤 메뉴도 활성화 되지 않은 경우
  if (menuTab === null) return;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <SideMenuContent>
            <BasicLoader />
          </SideMenuContent>
        }
      >
        {/* 월단위 일정 요약 사이드메뉴  */}
        {menuTab === "summarySchedules" && <SummarySchedules />}
      </Suspense>
    </ErrorBoundary>
  );
}
