import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { RefObject } from "react";

import { getPerSchedule, getPerScheduleFilters } from "@/api/per-schedule";
import { getMonthDateRange, getWeekDateRange } from "@/lib/date";
import { usePerSchFilterStore } from "@/store/per-schedule-filter";

export default function useCalendarControls(calendarRef: RefObject<FullCalendar>) {
  const { checkedTags, setFilters } = usePerSchFilterStore();

  //  개인 일정 조회
  const { refetch: scheduleDataRefetch } = useQuery({
    queryKey: ["per_schedule", "list", checkedTags],
    enabled: false, // 초기 로딩 제한을 위해 enabled: false 설정, 이후 조회가 필요한 경우에 refetch 메서드를 활용
    queryFn: () => {
      const [start, end] = getDateRange();
      return getPerSchedule({ start_date: start, end_date: end, tags: Array.from(checkedTags ?? []) });
    },
  });

  // 개인 일정 필터 조회
  const { refetch: tagDataRefetch } = useQuery({
    queryKey: ["per_schedule_filter", "list"],
    enabled: false, // 초기 로딩 제한을 위해 enabled: false 설정, 이후 조회가 필요한 경우에 refetch 메서드를 활용
    queryFn: getPerScheduleFilters,
  });

  // 현재 캘린더 view 기준 시작과 끝 날짜 반환 함수
  const getDateRange = () => {
    let [start, end] = getMonthDateRange(dayjs().format()); // 기본값

    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      const viewName = calApi.view.type; // full view name  ex) "dayGridMonth"

      // 일 view 기준 날짜 시작과 끝 날짜 지정
      if (viewName.indexOf("Day")) start = end = calApi.getDate().toString();
      // 주 view 기준 날짜 시작과 끝 날짜 지정
      else if (viewName.indexOf("Week")) [start, end] = getWeekDateRange(calApi.getDate());
      // 월 view 기준 날짜 시작과 끝 날짜 지정
      else [start, end] = getMonthDateRange(calApi.getDate());
    }

    return [start, end];
  };

  // 캘린더 일정 목록 및 필터 내용 업데이트 함수
  const updateCalendar = () => {
    // 필터 내용 재조회 및 store 업데이트
    tagDataRefetch().then(({ data, isSuccess }) => isSuccess && setFilters(data));

    // 일정 재조회 및 캘린더 일정 업데이트
    scheduleDataRefetch().then(({ data, isSuccess }) => {
      if (calendarRef.current && isSuccess) {
        const calApi = calendarRef.current.getApi();

        // 캘린더에 기존 일정 내용 초기화
        calApi.removeAllEvents();

        // 새로 캘린더 일정 업데이트
        data.schedules.forEach((sch) => {
          sch.dates.forEach(({ start_date, end_date }, index) => {
            calApi.addEvent({
              id: `${sch.id}-${index}`,
              groupId: sch.id.toString(),
              title: sch.title,
              start: start_date,
              end: end_date,
              backgroundColor: sch.color,
              editable: sch.type === "Personal",
              extendedProps: {
                isRepeat: sch.dates.length > 1,
                type: sch.type,
              },
            });
          });
        });
      }
    });
  };

  // 현재 view 기준 다음 view 이동 함수
  const goNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      updateCalendar();
    }
  };

  // 이전 view 이동 이전 view 이동 함수
  const goPrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      updateCalendar();
    }
  };

  // 캘린더 특정 view 변경
  const changeView = (mode: string) => {
    if (calendarRef.current) calendarRef.current.getApi().changeView(mode);
  };

  const changeMonthView = () => changeView("dayGridMonth"); // 월 view 로 변경
  const changeWeekView = () => changeView("timeGridWeek"); // 주 view 로 변경
  const changeDayView = () => changeView("timeGridDay"); //일 view 로 변경

  return {
    goNext,
    goPrev,
    changeView,
    changeMonthView,
    changeWeekView,
    changeDayView,
  };
}
