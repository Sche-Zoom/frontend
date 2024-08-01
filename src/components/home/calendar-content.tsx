import { EventChangeArg, EventInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RefObject } from "react";

import { getPersonalSchedules } from "@/api/personal-schedule";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";
import { changeDateIfMidnight } from "@/lib/date";
interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function CalendarContent({ calendarRef: calendarRef }: Props) {
  const { currentDate, checkedTagIds, startDate, endDate, viewType } = usePersonalCalendarContext();

  // 캘린더에 사용할 일정 목록 요청 로직
  const { data: personalSchedulesData } = useSuspenseQuery({
    queryKey: ["personal_schedule", "list", checkedTagIds, startDate, endDate],
    queryFn: () =>
      getPersonalSchedules({ start_date: startDate, end_date: endDate, tag_ids: checkedTagIds ?? undefined }),
  });

  // 캘린더에 등록할 개인 일정 배열
  const calendarSchedules: EventInput[] = personalSchedulesData.schedules.flatMap((sch) => {
    return sch.dates.map<EventInput>(({ start_date, end_date }, index) => ({
      id: `${sch.id}-${index}`,
      groupId: sch.id.toString(),
      title: sch.title,
      start: changeDateIfMidnight(start_date),
      end: changeDateIfMidnight(end_date),
      backgroundColor: sch.color,
      editable: sch.type === "personal",
      extendedProps: {
        isRepeat: sch.dates.length > 1,
        type: sch.type,
      },
    }));
  });

  const eventChange = (arg: EventChangeArg) => {};

  return (
    <div className="flex-1 text-sm">
      <FullCalendar
        initialDate={currentDate}
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={viewType}
        headerToolbar={false}
        views={{
          timeGridDay: {
            dayHeaderFormat: { month: "numeric", day: "numeric", weekday: "long", omitCommas: true },
          },
        }}
        eventResizableFromStart={true}
        events={calendarSchedules}
        eventBorderColor="gray"
        // eventChange={(arg) => d}
        expandRows={true}
        height="100%"
      />
    </div>
  );
}
