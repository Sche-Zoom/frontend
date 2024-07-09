import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

// 입력받은 특정 날짜의 해당 월의 달력 기준 시작과 끝 날짜 반환 함수
export function getMonthDateRange(date: Date | string) {
  // 입력받은 특정 날짜
  const currentDate = dayjs(date);

  // 해당 월의 첫째 날
  const startOfMonth = currentDate.startOf("month");

  // 해당 월의 마지막 날
  const endOfMonth = currentDate.endOf("month");

  // 달력의 시작 날짜 (첫째 주 일요일)
  const calendarMothStartDate = startOfMonth.startOf("week").format("YYYY-MM-DD");

  // 달력의 마지막 날짜 (마지막 주 토요일)
  const calendarMothEndDate = endOfMonth.endOf("week").format("YYYY-MM-DD");

  return { startDate: calendarMothStartDate, endDate: calendarMothEndDate };
}

// 입력받은 특정 날짜의 해당 주의 시작과 끝 날짜 반환 함수
export function getWeekDateRange(date: Date | string) {
  // 입력받은 특정 날짜
  const currentDate = dayjs(date);

  // 해당 주의 첫째 날
  const calendarWeekStartDate = currentDate.startOf("week").format("YYYY-MM-DD");

  // 해당 주의 마지막 날
  const calendarWeekEndDate = currentDate.endOf("week").format("YYYY-MM-DD");

  return { startDate: calendarWeekStartDate, endDate: calendarWeekEndDate };
}
