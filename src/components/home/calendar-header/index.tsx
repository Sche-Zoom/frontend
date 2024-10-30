import { ChevronLeft, ChevronRight } from "lucide-react";

import CalendarFilter from "@/components/home/calendar-header/calendar-filter";
import { Button } from "@/components/ui/button";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

const ViewButtonsData = [
  {
    viewText: "월",
    viewType: "dayGridMonth",
  },
  {
    viewText: "주",
    viewType: "timeGridWeek",
  },
  {
    viewText: "일",
    viewType: "timeGridDay",
  },
] as const;

export default function PersonalCalendarHeader() {
  const { calendarTitle, viewType, goPrev, goNext, changeView } = usePersonalCalendarContext();

  return (
    <div className="mb-3 flex justify-between">
      <div className="flex items-center gap-x-1">
        {/* 캘린더 view 이동 버튼 */}
        <Button variant="outline" size="icon-sm" aria-label="이전으로" onClick={goPrev}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="다음으로" onClick={goNext}>
          <ChevronRight className="size-4" />
        </Button>

        {/* 필터링을 위한 태그 체크박스 목록 */}
        <CalendarFilter />

        {/* 캘린더 title */}
        <div className="ml-2 flex items-center gap-x-1">{calendarTitle}</div>
      </div>

      {/* view 모드 변경 버튼 목록 */}
      <div className="flex items-center gap-x-1">
        {ViewButtonsData.map((data) => (
          <Button
            key={data.viewType}
            variant={viewType === data.viewType ? "default" : "secondary"}
            onClick={() => changeView(data.viewType)}
            aria-label={`${data.viewText} 단위 화면으로`}
          >
            {data.viewText}
          </Button>
        ))}
      </div>
    </div>
  );
}
