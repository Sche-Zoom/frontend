import FullCalendar from "@fullcalendar/react";
import React, { RefObject } from "react";

import { LeftBtn } from "@/components/calendar-left-btn";
import { RightBtn } from "@/components/calendar-right-btn";
import CalendarViewBtn from "@/components/calendar-view-btn";
import PerScheduleFilter from "@/components/per-calendar/schedule-filter";
import useCalendarControls from "@/hooks/useCalendarControls ";

interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function PerCalendarController({ calendarRef }: Props) {
  const { goNext, goPrev, changeMonthView, changeWeekView, changeDayView } = useCalendarControls(calendarRef);

  return (
    <div className="mb-4 flex w-full justify-between text-xs md:absolute">
      {/* 좌측 캘린더 이동 및 필터 영역 */}
      <div className="flex h-fit gap-x-1">
        <LeftBtn onClick={goPrev} />
        <RightBtn onClick={goNext} />
        <PerScheduleFilter />
      </div>

      {/* 우측 view 버튼 영역 */}
      <div className="flex h-fit gap-x-1.5">
        <CalendarViewBtn onClick={changeMonthView}>월</CalendarViewBtn>
        <CalendarViewBtn onClick={changeWeekView}>주</CalendarViewBtn>
        <CalendarViewBtn onClick={changeDayView}>일</CalendarViewBtn>
      </div>
    </div>
  );
}
