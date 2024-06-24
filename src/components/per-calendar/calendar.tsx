import { EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { RefObject } from "react";

import { PerSchedule } from "@/types/api/per-schedule";

interface Props {
  calendarRef: RefObject<FullCalendar>;
  schedules: PerSchedule[];
}

export default function PerCalendar({ calendarRef, schedules }: Props) {
  // 캘린더에 등록할 개인 일정 배열
  const calendarSchedules: EventSourceInput = schedules.flatMap((sch) => {
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
