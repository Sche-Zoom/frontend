"use client";

import FullCalendar from "@fullcalendar/react";
import { Suspense, useRef } from "react";

import {
  CalendarHeader,
  CalendarHeaderContent,
  CalendarHeaderTitle,
  CalendarNext,
  CalendarPrev,
  CalendarViewButton,
} from "@/components/calendar/calendar-header";
import ErrorBoundary from "@/components/error-boundary";
import CalendarContent from "@/components/home/calendar-content";
import CalendarFilter from "@/components/home/calendar-filter";
import useCalendarControls from "@/hooks/useCalendarControls ";

export default function PersonalCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  // 캘린더 정보 및 제어를 위한 커스텀 훅 호출
  const {
    uncheckedTagIds,
    startDate,
    endDate,
    calendarTitle,
    currentDate,
    viewType,
    goPrev,
    goNext,
    getTagChecked,
    getTagAllChecked,
    setTagChecked,
    setAllSubtagsChecked,
    changeView,
  } = useCalendarControls(calendarRef);

  return (
    <main className="p-4">
      {/* 캘린더 조작을 위한 header 부분 */}
      <CalendarHeader>
        <CalendarHeaderContent>
          {/* 캘린더 view 이동 버튼 */}
          <CalendarPrev onClick={goPrev} />
          <CalendarNext onClick={goNext} />

          {/* 필터링을 위한 태그 체크박스 목록 */}
          <ErrorBoundary>
            <Suspense>
              <CalendarFilter
                uncheckedTagIds={uncheckedTagIds}
                startDate={startDate}
                endDate={endDate}
                getTagChecked={getTagChecked}
                getTagAllChecked={getTagAllChecked}
                setTagChecked={setTagChecked}
                setAllSubtagsChecked={setAllSubtagsChecked}
              />
            </Suspense>
          </ErrorBoundary>

          {/* 캘린더 title */}
          <CalendarHeaderTitle>{calendarTitle}</CalendarHeaderTitle>
        </CalendarHeaderContent>

        {/* view 모드 변경 버튼 목록 */}
        <CalendarHeaderContent>
          <CalendarViewButton primary={viewType === "dayGridMonth"} onClick={() => changeView("dayGridMonth")}>
            월
          </CalendarViewButton>
          <CalendarViewButton primary={viewType === "timeGridWeek"} onClick={() => changeView("timeGridWeek")}>
            주
          </CalendarViewButton>
          <CalendarViewButton primary={viewType === "timeGridDay"} onClick={() => changeView("timeGridDay")}>
            일
          </CalendarViewButton>
        </CalendarHeaderContent>
      </CalendarHeader>

      <ErrorBoundary>
        <Suspense>
          {/* 실제 일정이 노출될 content 부분 */}
          <CalendarContent
            calendarRef={calendarRef}
            currentDate={currentDate}
            uncheckedTagIds={uncheckedTagIds}
            startDate={startDate}
            endDate={endDate}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
