import FullCalendar from "@fullcalendar/react";
import { CheckedState } from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { RefObject, useState } from "react";

import { getMonthDateRange, getWeekDateRange } from "@/lib/date";
import { CalendarViewType } from "@/types/calendar";

interface CalendarDateState {
  startDate: string;
  endDate: string;
  currentDate: string;
}

/**
  캘린더 관련 상태 및 제어 메서드를 제공하는 커스텀 훅
  @param calendarRef: FullCalendar 컴포넌트의 Ref
 */
export default function useCalendarControls(calendarRef: RefObject<FullCalendar>) {
  // 현재 캘린더 view 형식
  const [viewType, setViewType] = useState<CalendarViewType>("dayGridMonth");

  // 필터에서 체크된 태그 id 목록, 초기값 null 은 초기 모든 태그들이 선택된 상태를 의미하며
  // 이후 체크 상태가 변경되는 경우 체크된 id 배열로 상태를 유지
  const [checkedTagIds, setCheckedTagIds] = useState<number[] | null>(null);

  // 캘린더 헤더에 노출될 날짜형식의 title ex) 2024년 06월, 2024년 06월 30일 ~ 07월 06일
  const [calendarTitle, setCalendarTitle] = useState(dayjs().format("YYYY년 MM월"));

  // 캘린더에서 사용될 객체형식의 날짜 데이터
  const [dateObj, setDateObj] = useState<CalendarDateState>(() => {
    const today = dayjs().format("YYYY-MM-DD");
    return {
      currentDate: today,
      ...getMonthDateRange(today),
    };
  });

  const { currentDate, startDate, endDate } = dateObj;

  /**
  주어진 캘린더 정보에 맞게 `calendarTitle` state 를 업데이트하는 함수
  @param dateObj: 캘린더 날짜 데이터 객체
  @param mode: 캘린더 view type
 */
  const updateCalendarTitle = (dateObj: CalendarDateState, mode: CalendarViewType) => {
    const { currentDate, startDate, endDate } = dateObj;
    const currentDayjs = dayjs(currentDate);

    // 주어진 view type 에 맞게 각각 calendarTitle 설정 함수 구현
    const viewTypeHandlers: Record<string, () => void> = {
      Day: () => setCalendarTitle(currentDayjs.format("YYYY년 MM월 DD일")),
      Week: () =>
        setCalendarTitle(`${dayjs(startDate).format("YYYY년 MM월 DD일")} ~ ${dayjs(endDate).format("MM월 DD일")}`),
      Month: () => setCalendarTitle(currentDayjs.format("YYYY년 MM월")),
    };

    // view type 에 맞게 calendarTitle 설정 함수 실행
    const handler = Object.keys(viewTypeHandlers).find((key) => mode.includes(key));
    handler && viewTypeHandlers[handler]();
  };

  /**
  주어진 콜백함수로 `checkedTagIds` state 를 `Set` 형태로 변환하여 수정 후 다시 배열의 형태로 state 업데이트하는 함수
  @param callback Set 형태의 인자를 받아 처리하는 콜백함수
  @param mode 캘린더 view type
 */
  const updateCheckedTagIds = (callback: (set: Set<number>) => void) => {
    // checkedTagIds state 를 Set 으로 변환하여 checkedTagIdsSet 변수에 저장
    const checkedTagIdsSet = new Set(checkedTagIds);

    //checkedTagIdsSet 를 콜백함수의 매개변수로 전달
    callback(checkedTagIdsSet);

    // checkedTagIdsSet 을 다시 배열의 형태로 state 업데이트
    setCheckedTagIds(Array.from(checkedTagIdsSet));
  };

  /**
  특정 태그 선택 및 해제 여부에 따라 `checkedTagIds` state 를 업데이트하는 함수
  @param checked 태그 선택 및 해제 여부
  @param id 해당하는 태그 `id`
 */
  const setTagChecked = (checked: CheckedState, id: number) => {
    updateCheckedTagIds((set) => (checked ? set.add(id) : set.delete(id)));
  };

  /**
  특정 태그 목록의 전체 선택 및 해제 여부에 따라 `checkedTagIds` state 를 업데이트하는 함수
  @param checked 태그 선택 여부
  @param ids 해당하는 하위 태그들의 `id` 목록
 */
  const setAllSubtagsChecked = (checked: CheckedState, ids: number[]) => {
    updateCheckedTagIds((set) => {
      if (checked) {
        ids.forEach((id) => set.add(id));
      } else {
        ids.forEach((id) => set.delete(id));
      }
    });
  };

  /**
  특정 태그 목록 모두 선택된 상태인지 여부를 boolean 값 으로 반환하는 함수
  @param ids 특정 태그들의 `id` 목록
 */
  const getTagAllChecked = (ids: number[]) => {
    // 초기상태의 경우 true 반환
    if (checkedTagIds === null) return true;

    const checkedTagIdsSet = new Set(checkedTagIds);
    return ids.every((id) => checkedTagIdsSet.has(id));
  };

  /**
  특정 태그가 선택된 상태인지 여부를 boolean 값 으로 반환하는 함수
  @param id 특정 태그의 `id` 값
 */
  const getTagChecked = (id: number) => {
    // 초기상태의 경우 true 반환
    if (checkedTagIds === null) return true;

    const checkedTagIdsSet = new Set(checkedTagIds);
    return checkedTagIdsSet.has(id);
  };

  /** 현재 캘린더 `viewType` 기준 다음 (월/주/일) 로 이동 및 관련 state 업데이트 함수 */
  const goNext = () => {
    if (!calendarRef.current) return;

    calendarRef.current.getApi().next(); // 캘린더에서 다음 (월/주/일) 이동

    // `viewType` 별 사용할 실제 날짜 데이터 및 캘린더 제목 등 state 업데이트 로직
    const viewTypeHandlers: Record<string, () => void> = {
      Day: () =>
        setDateObj((prev) => {
          const nextDay = dayjs(prev.currentDate).add(1, "day").format("YYYY-MM-DD");
          const updatedDateObj = { currentDate: nextDay, startDate: nextDay, endDate: nextDay };
          updateCalendarTitle(updatedDateObj, viewType);
          return updatedDateObj;
        }),
      Week: () =>
        setDateObj((prev) => {
          const nextWeek = dayjs(prev.currentDate).add(1, "week").startOf("week").format("YYYY-MM-DD");
          const updatedDateObj = { currentDate: nextWeek, ...getWeekDateRange(nextWeek) };
          updateCalendarTitle(updatedDateObj, viewType);
          return updatedDateObj;
        }),
      Month: () =>
        setDateObj((prev) => {
          const nextMonth = dayjs(prev.currentDate).add(1, "month").startOf("month").format("YYYY-MM-DD");
          const updatedDateObj = { currentDate: nextMonth, ...getMonthDateRange(nextMonth) };
          updateCalendarTitle(updatedDateObj, viewType);
          return updatedDateObj;
        }),
    };

    // 현재 `viewType` state 에 맞는 핸들러 지정해 `handler` 에 저장
    const handler = Object.keys(viewTypeHandlers).find((key) => viewType.includes(key));
    handler && viewTypeHandlers[handler]();
  };

  /** 현재 캘린더 `viewType` 기준 이전 (월/주/일) 로 이동 및 관련 state 업데이트 함수 */
  const goPrev = () => {
    if (!calendarRef.current) return;

    calendarRef.current.getApi().prev(); // 캘린더에서 이전 (월/주/일) 이동

    // `viewType` 별 사용할 실제 날짜 데이터 및 캘린더 제목 등 state 업데이트 로직
    const viewTypeHandlers: Record<string, () => void> = {
      Day: () =>
        setDateObj((prev) => {
          const prevDay = dayjs(prev.currentDate).subtract(1, "day").format("YYYY-MM-DD");
          const updatedDateObj = { currentDate: prevDay, startDate: prevDay, endDate: prevDay };
          updateCalendarTitle(updatedDateObj, viewType);
          return updatedDateObj;
        }),
      Week: () =>
        setDateObj((prev) => {
          const prevWeek = dayjs(prev.currentDate).subtract(1, "week").startOf("week").format("YYYY-MM-DD");
          const updatedDateObj = { currentDate: prevWeek, ...getWeekDateRange(prevWeek) };
          updateCalendarTitle(updatedDateObj, viewType);
          return updatedDateObj;
        }),
      Month: () =>
        setDateObj((prev) => {
          const prevMonth = dayjs(prev.currentDate).subtract(1, "month").startOf("month").format("YYYY-MM-DD");
          const updatedDateObj = { currentDate: prevMonth, ...getMonthDateRange(prevMonth) };
          updateCalendarTitle(updatedDateObj, viewType);
          return updatedDateObj;
        }),
    };

    // 현재 `viewType` state 에 맞는 핸들러 지정해 `handler` 에 저장
    const handler = Object.keys(viewTypeHandlers).find((key) => viewType.includes(key));
    handler && viewTypeHandlers[handler]();
  };

  /**
  캘린더 `viewType` 변경 함수
  @param mode 변경될 `viewType`
 */
  const changeView = (mode: CalendarViewType) => {
    if (!calendarRef.current) return;

    calendarRef.current.getApi().changeView(mode); // 캘린더에서 view 변경
    setViewType(mode); // `viewType` state 변경

    // `viewType` 별 사용할 실제 날짜 데이터 및 캘린더 제목 등 state 업데이트 로직
    const viewTypeHandlers: Record<string, () => void> = {
      Day: () =>
        setDateObj((prev) => {
          const updatedDateObj = { ...prev, startDate: prev.currentDate, endDate: prev.currentDate };
          updateCalendarTitle(updatedDateObj, mode);
          return updatedDateObj;
        }),
      Week: () =>
        setDateObj((prev) => {
          const updatedDateObj = {
            currentDate: dayjs(prev.currentDate).startOf("week").format("YYYY-MM-DD"),
            ...getWeekDateRange(prev.currentDate),
          };
          updateCalendarTitle(updatedDateObj, mode);
          return updatedDateObj;
        }),
      Month: () =>
        setDateObj((prev) => {
          const updatedDateObj = { ...prev, ...getMonthDateRange(prev.currentDate) };
          updateCalendarTitle(updatedDateObj, mode);
          return updatedDateObj;
        }),
    };

    // // 현재 `viewType` state 에 맞는 핸들러 지정해 `handler` 에 저장
    const handler = Object.keys(viewTypeHandlers).find((key) => mode.includes(key));
    handler && viewTypeHandlers[handler]();
  };

  const getIsCurrentView = (mode: CalendarViewType) => mode === viewType;

  return {
    viewType,
    checkedTagIds,
    currentDate,
    startDate,
    endDate,
    calendarTitle,
    setCheckedTagIds,
    goNext,
    goPrev,
    changeView,
    setTagChecked,
    setAllSubtagsChecked,
    getTagChecked,
    getTagAllChecked,
    getIsCurrentView,
  };
}
