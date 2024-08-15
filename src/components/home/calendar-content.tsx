import { EventDropArg, EventMountArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RefObject } from "react";

import { getPersonalSchedules } from "@/api/personal-schedule";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";
import { areDatesEqual, changeDateIfMidnight, getDefaultFormatDate } from "@/lib/date";
import { PersonalScheduleEvent, PersonalScheduleExtendedProps, PersonalScheduleInput } from "@/types/personal-schedule";
interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function CalendarContent({ calendarRef }: Props) {
  const {
    currentDate,
    checkedTagIds,
    startDate,
    endDate,
    viewType,
    updatedTime,
    setChangeConfirmOpen,
    setScheduleChange,
  } = usePersonalCalendarContext();

  // 캘린더에 사용할 일정 목록 요청 로직
  const { data: personalSchedulesData } = useSuspenseQuery({
    queryKey: ["personal_schedule", "list", checkedTagIds, startDate, endDate, updatedTime],
    queryFn: () =>
      getPersonalSchedules({
        start_date: startDate,
        end_date: endDate,
        ...(checkedTagIds && { tag_ids: checkedTagIds }),
      }),
  });

  // 캘린더에 등록할 개인 일정 배열
  const calendarSchedules: PersonalScheduleInput[] = personalSchedulesData.schedules.flatMap((sch) => {
    return sch.dates.map<PersonalScheduleInput>(({ start_date, end_date }, index) => ({
      id: `${sch.id}-${index}`,
      // groupId: sch.id.toString(),
      title: sch.title,
      classNames: `font-medium`,
      start: changeDateIfMidnight(start_date),
      end: changeDateIfMidnight(end_date),
      backgroundColor: `hsl(var(--schedule))`,
      borderColor: `hsl(var(--schedule))`,
      editable: sch.type === "personal",
      extendedProps: {
        isRepeat: sch.dates.length > 1,
        type: sch.type,
        scheduleId: sch.id,
        color: sch.color,
      } as PersonalScheduleExtendedProps,
    }));
  });

  const eventChange = () => {
    setChangeConfirmOpen(true);
  };

  const eventResize = (arg: EventResizeDoneArg) => {
    const { oldEvent, event } = arg;
    const { start: beforeStart, end: beforeEnd } = oldEvent as PersonalScheduleEvent;
    const { start, end, extendedProps } = event as PersonalScheduleEvent;
    const { scheduleId, type, isRepeat } = extendedProps;

    setScheduleChange({
      id: scheduleId.toString(),
      isRepeat,
      type,
      before_start_date: getDefaultFormatDate(oldEvent.start), // ISO8601
      // 변경된 날짜만 전달
      ...(!areDatesEqual(beforeStart, start) && { start_date: getDefaultFormatDate(start) }),
      ...(!areDatesEqual(beforeEnd, end) && { end_date: getDefaultFormatDate(end) }),
    });
  };

  const eventDrop = (arg: EventDropArg) => {
    const { oldEvent, event } = arg;
    const { start, end, extendedProps } = event as PersonalScheduleEvent;
    const { scheduleId, type, isRepeat } = extendedProps;

    setScheduleChange({
      id: scheduleId.toString(),
      type,
      isRepeat,
      before_start_date: getDefaultFormatDate(oldEvent.start), // ISO8601
      start_date: getDefaultFormatDate(start), // ISO8601
      end_date: getDefaultFormatDate(end), // ISO8601
    });
  };

  const eventDidMount = (info: EventMountArg) => {
    const color = info.event.extendedProps.color;

    // CSS 변수를 이벤트 DOM 요소에 인라인으로 설정
    info.el.style.setProperty("--schedule-background", `var(--${color}-background)`);
    info.el.style.setProperty("--schedule", `var(--${color})`);
    // info.el.style.backgroundColor = "var(--schedule-background)";
  };

  // const eventClick = (arg: EventClickArg) => {};

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
        eventChange={eventChange}
        eventResize={eventResize}
        // eventClick={}
        eventDrop={eventDrop}
        eventDidMount={eventDidMount}
        expandRows={true}
        height="100%"
      />
    </div>
  );
}
