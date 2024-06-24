"use client";

import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

import { getPerSchedule, getPerScheduleFilters } from "@/api/per-schedule";
import PerCalendar from "@/components/per-calendar/calendar";
import PerCalendarController from "@/components/per-calendar/controller";
import { getMonthDateRange } from "@/lib/date";
import { usePerSchFilterStore } from "@/store/per-schedule-filter";

export default function PersonalFullCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const { setFilters, checkedTags } = usePerSchFilterStore();

  // 개인 일정 필터링 내용 조회
  const {
    data: filterData,
    isLoading: filterDataIsLoading,
    error: filterDataError,
  } = useQuery({
    queryKey: ["per_schedule_filter", "list"],
    queryFn: getPerScheduleFilters,
  });

  // 개인 일정 내용 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ["per_schedule", "list"],
    enabled: !!checkedTags, // checkedTags 생성 이후 쿼리 활성화
    queryFn: async () => {
      const [calendarStartDate, calendarEndDate] = getMonthDateRange(dayjs().format());
      return getPerSchedule({ start_date: calendarStartDate, end_date: calendarEndDate });
    },
  });

  // 개인 일정 필터링 내용 조회 이후 store 에 저장
  useEffect(() => {
    if (filterData) setFilters(filterData, filterDataIsLoading, filterDataError);
  }, [setFilters, filterData, filterDataError, filterDataIsLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>데이터를 정상적으로 불러오지 못했습니다.</div>;

  return (
    <div className="p-4">
      {/* 캘린더 전체 영역 */}
      {data && (
        <div className="relative">
          {/* 캘린더 컨트롤러 영역 */}
          <PerCalendarController calendarRef={calendarRef} />

          {/* 캘린더 일정 영역 */}
          <PerCalendar calendarRef={calendarRef} schedules={data.schedules} />
        </div>
      )}
    </div>
  );
}
