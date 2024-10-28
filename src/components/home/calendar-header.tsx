import { ChevronLeft, ChevronRight } from "lucide-react";

import CalendarFilter from "@/components/home/calendar-filter";
import { Button } from "@/components/ui/button";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export default function PersonalCalendarHeader() {
  const { calendarTitle, viewType, goPrev, goNext, changeView } = usePersonalCalendarContext();

  return (
    <div className="mb-3 flex justify-between">
      <div className="flex items-center gap-x-1">
        {/* 캘린더 view 이동 버튼 */}
        <Button variant="outline" size="icon-sm" aria-label="이전으로" onClick={goPrev}>
          <ChevronLeft className="size-4" /> 이전으로
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="다음으로" onClick={goNext}>
          <ChevronRight className="size-4" /> 다음으로
        </Button>

        {/* 필터링을 위한 태그 체크박스 목록 */}
        <CalendarFilter />

        {/* 캘린더 title */}
        <div className="flex items-center gap-x-1">{calendarTitle}</div>
      </div>

      {/* view 모드 변경 버튼 목록 */}
      <div className="flex items-center gap-x-1">
        <Button
          variant={viewType === "dayGridMonth" ? "default" : "secondary"}
          onClick={() => changeView("dayGridMonth")}
        >
          월
        </Button>
        <Button
          variant={viewType === "timeGridWeek" ? "default" : "secondary"}
          onClick={() => changeView("timeGridWeek")}
        >
          주
        </Button>
        <Button
          variant={viewType === "timeGridDay" ? "default" : "secondary"}
          onClick={() => changeView("timeGridDay")}
        >
          일
        </Button>
      </div>
    </div>
  );
}
