"use client";

import FullCalendar from "@fullcalendar/react";
import { useRef } from "react";

import { ContentHeader, ContentTitle } from "@/components/content-header";
import PersonalCalendar from "@/components/home/personal-calendar";
import PersonalSideButtons from "@/components/home/personal-side-buttons";
import PersonalSideMenu from "@/components/home/personal-side-menu";
import { PersonalCalendarProvider } from "@/contexts/personal-calendar";

export default function HomePage() {
  const calendarRef = useRef<FullCalendar>(null);
  return (
    <PersonalCalendarProvider calendarRef={calendarRef}>
      <div className="flex size-full flex-col">
        {/* 콘텐츠 title */}
        <ContentHeader>
          <ContentTitle>개인 일정</ContentTitle>

          <PersonalSideButtons />
        </ContentHeader>

        <div className="flex flex-1">
          {/* 전체 캘린더 */}
          <PersonalCalendar calendarRef={calendarRef} />

          {/* 사이드 메뉴 */}
          <PersonalSideMenu />
        </div>
      </div>
    </PersonalCalendarProvider>
  );
}
