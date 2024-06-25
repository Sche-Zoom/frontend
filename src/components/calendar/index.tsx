"use client";

import FullCalendar from "@fullcalendar/react";
import { Loader } from "lucide-react";
import { Suspense, useRef } from "react";

import CalendarHeader from "@/components/calendar/calendar-header";
import PerCalendar from "@/components/calendar/per-calendar";

export default function PersonalFullCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  return (
    <div className="p-4">
      {/* 캘린더 전체 영역 */}
      <div className="relative">
        {/* 캘린더 컨트롤러 영역 */}
        <CalendarHeader calendarRef={calendarRef} />
        {/* 캘린더 일정 영역 */}
        <Suspense
          fallback={
            <div className="flex h-screen flex-col items-center justify-center">
              <Loader className="size-8 animate-spin" />
            </div>
          }
        >
          <PerCalendar calendarRef={calendarRef} />
        </Suspense>
      </div>
    </div>
  );
}
