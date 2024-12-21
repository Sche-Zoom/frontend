"use client";

import {
  CalendarOptions,
  DayCellMountArg,
  EventChangeArg,
  EventClickArg,
  EventDropArg,
  EventInput,
  EventMountArg,
} from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

import { SCHEDULE_VIEW_TYPE } from "@/constants";
import { useCalendarContext } from "@/contexts/calendar";
import { areDatesEqual, changeDateIfMidnight, getDefaultFormatDate } from "@/lib/date";

export interface ScheduleExtendedProps {
  isRepeat: boolean;
  scheduleId: number;
}

export interface ScheduleInput extends EventInput {
  extendedProps: ScheduleExtendedProps;
}

export interface ScheduleEvent extends EventImpl {
  extendedProps: ScheduleExtendedProps;
}

export default function useCalendar(calendarRef: RefObject<FullCalendar>, schedulesData: GetSchedulesRes) {
  const router = useRouter();
  const { currentDate, viewType } = useCalendarContext();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [scheduleChange, setScheduleChange] = useState<ScheduleChangeObject | null>(null);

  // 캘린더에 등록할 개인 일정 배열
  const calendarSchedules: ScheduleInput[] = schedulesData.schedules.flatMap((sch) => {
    return sch.dates.map<ScheduleInput>(({ start_date, end_date }, index) => ({
      id: `${sch.id}-${index}`,
      title: sch.title,
      classNames: `font-medium`,
      start: changeDateIfMidnight(start_date),
      end: changeDateIfMidnight(end_date),
      backgroundColor: `hsl(var(--schedule))`,
      borderColor: `hsl(var(--schedule))`,
      editable: true,
      extendedProps: {
        isRepeat: sch.dates.length > 1,
        scheduleId: sch.id,
        color: sch.color,
      } as ScheduleExtendedProps,
    }));
  });

  const onEventChange = (arg: EventChangeArg) => setConfirmOpen(true);

  const onEventResize = (arg: EventResizeDoneArg) => {
    const { oldEvent, event } = arg;
    const { start: beforeStart, end: beforeEnd } = oldEvent;
    const { start, end, extendedProps } = event as ScheduleEvent;
    const { scheduleId, isRepeat } = extendedProps;

    setScheduleChange({
      id: scheduleId,
      initialIsRepeat: isRepeat,
      initialStartDate: getDefaultFormatDate(beforeStart),
      initialEndDate: getDefaultFormatDate(beforeEnd),
      // 변경된 날짜만 전달
      ...(!areDatesEqual(beforeStart, start) && { startDate: getDefaultFormatDate(start) }),
      ...(!areDatesEqual(beforeEnd, end) && { endDate: getDefaultFormatDate(end) }),
    });
  };

  const onEventDrop = (arg: EventDropArg) => {
    const { oldEvent, event } = arg;
    const { start: beforeStart, end: beforeEnd } = oldEvent;
    const { start, end, extendedProps } = event as ScheduleEvent;
    const { scheduleId, isRepeat } = extendedProps;

    setScheduleChange({
      id: scheduleId,
      initialIsRepeat: isRepeat,
      initialStartDate: getDefaultFormatDate(beforeStart),
      initialEndDate: getDefaultFormatDate(beforeEnd),
      startDate: getDefaultFormatDate(start), // ISO8601
      endDate: getDefaultFormatDate(end), // ISO8601
    });
  };

  const onEventDidMount = (info: EventMountArg) => {
    const color = info.event.extendedProps.color;

    // CSS 변수를 이벤트 DOM 요소에 인라인으로 설정
    info.el.style.setProperty("--schedule-background", `var(--${color}-background)`);
    info.el.style.setProperty("--schedule", `var(--${color})`);
  };

  const onEventClick = (arg: EventClickArg) => {
    const { extendedProps } = arg.event as ScheduleEvent;
    router.push(`/schedule/${extendedProps.scheduleId}`);
  };

  const onDayCellDidMount = (info: DayCellMountArg) => {
    info.el.style.setProperty("cursor", "pointer");
  };

  const onDateClick = (arg: DateClickArg) => router.push("/schedule/add");

  // Fullcalendar props 객체
  const calendarOption: CalendarOptions & { ref: RefObject<FullCalendar> } = {
    // data
    initialDate: currentDate,
    ref: calendarRef,
    events: calendarSchedules,
    // setting & style
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: SCHEDULE_VIEW_TYPE[viewType],
    headerToolbar: false,
    views: {
      timeGridDay: {
        dayHeaderFormat: { month: "numeric", day: "numeric", weekday: "long", omitCommas: true },
      },
    },
    expandRows: true,
    height: "100%",
    eventResizableFromStart: true,
    // 일정 상호작용 관련
    eventChange: onEventChange,
    eventResize: onEventResize,
    eventClick: onEventClick,
    eventDrop: onEventDrop,
    eventDidMount: onEventDidMount,
    dayCellDidMount: onDayCellDidMount,
    dateClick: onDateClick,
  };

  return {
    confirmOpen,
    scheduleChange,
    calendarOption,
    onConfirmOpenChange: (open: boolean) => setConfirmOpen(open),
  };
}
