"use client";

import FullCalendar from "@fullcalendar/react";
import { Suspense, useRef } from "react";

import BasicLoader from "@/components/basic-loader";
import { ContentHeader, ContentTitle } from "@/components/content-header";
import ErrorBoundary from "@/components/error-boundary";
import PersonalCalendar from "@/components/home/personal-calendar";
import PersonalSideButtons from "@/components/home/personal-side-buttons";
import { PersonalSideMenuProvider } from "@/contexts/personal-side-menu";

export default function HomePage() {
  const calendarRef = useRef<FullCalendar>(null);
  return (
    <PersonalSideMenuProvider>
      <div className="flex size-full flex-col">
        {/* 콘텐츠 title */}
        <ContentHeader>
          <ContentTitle>개인 일정</ContentTitle>

          <PersonalSideButtons calendarRef={calendarRef} />
        </ContentHeader>

        {/* 전체 캘린더 */}
        <ErrorBoundary>
          <Suspense fallback={<BasicLoader />}>
            <PersonalCalendar calendarRef={calendarRef} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </PersonalSideMenuProvider>
  );
}
