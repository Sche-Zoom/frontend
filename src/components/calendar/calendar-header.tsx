import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { RefObject, useEffect } from "react";

import { getScheduleTags } from "@/api/per-schedule";
import PerScheduleFilter from "@/components/calendar/schedule-filter";
import { Button } from "@/components/ui/button";
import useCalendarControls from "@/hooks/useCalendarControls ";
import { usePerSchFilterStore } from "@/store/per-schedule-filter";

interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function CalendarHeader({ calendarRef }: Props) {
  const { goNext, goPrev, changeMonthView, changeWeekView, changeDayView } = useCalendarControls(calendarRef);
  const { setFilters, checkedTags } = usePerSchFilterStore();

  const {
    data: tagList,
    isLoading: filterDataIsLoading,
    error: filterDataError,
  } = useQuery({
    queryKey: ["per_schedule_filter", "list", checkedTags],
    queryFn: getScheduleTags,
  });

  // 개인 일정 필터링 내용 조회 이후 store 에 저장
  useEffect(() => {
    if (tagList) setFilters(tagList, filterDataIsLoading, filterDataError);
  }, [setFilters, tagList, filterDataError, filterDataIsLoading]);

  return (
    <div className="mb-4 flex w-full justify-between text-xs md:absolute">
      {/* 좌측 캘린더 이동 및 필터 영역 */}
      <div className="flex h-fit gap-x-1">
        <Button variant="outline" size="icon-sm" onClick={goPrev}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={goNext}>
          <ChevronRight className="size-4" />
        </Button>
        <PerScheduleFilter />
      </div>

      {/* 우측 view 버튼 영역 */}
      <div className="flex h-fit gap-x-1.5">
        <Button variant="default" size="icon-sm" onClick={changeMonthView}>
          월
        </Button>
        <Button variant="outline" size="icon-sm" onClick={changeWeekView}>
          주
        </Button>
        <Button variant="outline" size="icon-sm" onClick={changeDayView}>
          일
        </Button>
      </div>
    </div>
  );
}
