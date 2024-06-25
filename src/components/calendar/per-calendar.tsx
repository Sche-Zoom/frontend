import { EventSourceInput } from "@fullcalendar/core/index.js";
import { RefObject } from "@fullcalendar/core/preact.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getPerSchedule } from "@/api/per-schedule";
import { getMonthDateRange } from "@/lib/date";
import { usePerSchFilterStore } from "@/store/per-schedule-filter";

interface PerCalendarProps {
  calendarRef: RefObject<FullCalendar>;
}

export default function PerCalendar({ calendarRef }: PerCalendarProps) {
  const { checkedTags } = usePerSchFilterStore();

  // 개인 일정 내용 조회
  const { data: schedules } = useSuspenseQuery({
    queryKey: ["per_schedule", "list", checkedTags],
    queryFn: async () => {
      const [start_date, end_date] = getMonthDateRange(dayjs().format());
      return getPerSchedule({
        start_date,
        end_date,
        tags: Array.from(checkedTags ?? []),
      });
    },
  });

  if (!schedules) return;

  // 캘린더에 등록할 개인 일정 배열
  const calendarSchedules: EventSourceInput = schedules.schedules.flatMap((sch) => {
    return sch.dates.map(({ start_date, end_date }, index) => ({
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
    }));
  });

  return (
    <div className="text-xs sm:text-sm">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: "", center: "title", right: "" }}
        editable={true}
        eventResizableFromStart={true}
        events={calendarSchedules}
        eventBorderColor="gray"
      />
    </div>
  );
}
