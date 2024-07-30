import { Suspense } from "react";

import {
  CalendarHeader,
  CalendarHeaderContent,
  CalendarHeaderTitle,
  CalendarNext,
  CalendarPrev,
  CalendarViewButton,
} from "@/components/calendar/calendar-header";
import ErrorBoundary from "@/components/error-boundary";
import CalendarFilter from "@/components/home/calendar-filter";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export default function PersonalCalendarHeader() {
  const { calendarTitle, goPrev, goNext, getIsCurrentView, changeView } = usePersonalCalendarContext();

  return (
    <CalendarHeader>
      <CalendarHeaderContent>
        {/* 캘린더 view 이동 버튼 */}
        <CalendarPrev onClick={goPrev} />
        <CalendarNext onClick={goNext} />

        {/* 필터링을 위한 태그 체크박스 목록 */}
        <ErrorBoundary>
          <Suspense>
            <CalendarFilter />
          </Suspense>
        </ErrorBoundary>

        {/* 캘린더 title */}
        <CalendarHeaderTitle>{calendarTitle}</CalendarHeaderTitle>
      </CalendarHeaderContent>

      {/* view 모드 변경 버튼 목록 */}
      <CalendarHeaderContent>
        <CalendarViewButton primary={getIsCurrentView("dayGridMonth")} onClick={() => changeView("dayGridMonth")}>
          월
        </CalendarViewButton>
        <CalendarViewButton primary={getIsCurrentView("timeGridWeek")} onClick={() => changeView("timeGridWeek")}>
          주
        </CalendarViewButton>
        <CalendarViewButton primary={getIsCurrentView("timeGridDay")} onClick={() => changeView("timeGridDay")}>
          일
        </CalendarViewButton>
      </CalendarHeaderContent>
    </CalendarHeader>
  );
}
