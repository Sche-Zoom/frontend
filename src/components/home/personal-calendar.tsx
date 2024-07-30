import FullCalendar from "@fullcalendar/react";
import { RefObject, Suspense } from "react";

import BasicLoader from "@/components/basic-loader";
import ErrorBoundary from "@/components/error-boundary";
import CalendarContent from "@/components/home/calendar-content";
import PersonalCalendarHeader from "@/components/home/calendar-header";

interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function PersonalCalendar({ calendarRef }: Props) {
  return (
    <div className="relative flex-1">
      {/* 캘린더 전체 */}
      <div className="absolute flex size-full flex-col p-4">
        {/* 캘린더 조작을 위한 header 부분 */}
        <PersonalCalendarHeader />

        <ErrorBoundary>
          <Suspense fallback={<BasicLoader />}>
            {/* 실제 일정이 노출될 content 부분 */}
            <CalendarContent calendarRef={calendarRef} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
