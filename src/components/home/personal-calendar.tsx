"use client";

import FullCalendar from "@fullcalendar/react";
import { Loader } from "lucide-react";
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
    checkedTagIds,
    startDate,
    endDate,
    calendarTitle,
    currentDate,
    viewType,
    setCheckedTagIds,
    goPrev,
    goNext,
    getTagChecked,
    getTagAllChecked,
    setTagChecked,
    setAllSubtagsChecked,
    changeView,
    getIsCurrentView,
  } = useCalendarControls(calendarRef);

  return (
    <div className="flex flex-1">
      {/* 캘린더 전체 */}
      <div className="flex w-full flex-col p-4">
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
                  checkedTagIds={checkedTagIds}
                  startDate={startDate}
                  endDate={endDate}
                  getTagChecked={getTagChecked}
                  getTagAllChecked={getTagAllChecked}
                  setCheckedTagIds={setCheckedTagIds}
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

        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex h-screen flex-col items-center justify-center">
                <Loader className="size-8 animate-spin" />
              </div>
            }
          >
            {/* 실제 일정이 노출될 content 부분 */}
            <CalendarContent
              calendarRef={calendarRef}
              currentDate={currentDate}
              viewType={viewType}
              checkedTagIds={checkedTagIds}
              startDate={startDate}
              endDate={endDate}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
