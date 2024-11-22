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
import { DefaultError, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

import { RepeatConfirmFormValues } from "@/components/repeat-confirm-modal";
import { SCHEDULE_VIEW_TYPE } from "@/constants";
import { useCalendarContext } from "@/contexts/calendar";
import apiRequest from "@/lib/api";
import { areDatesEqual, changeDateIfMidnight, getDefaultFormatDate } from "@/lib/date";

export interface ScheduleExtendedProps {
  isRepeat: boolean;
  type: ScheduleType;
  scheduleId: number;
}

export interface ScheduleInput extends EventInput {
  extendedProps: ScheduleExtendedProps;
}

export interface ScheduleEvent extends EventImpl {
  extendedProps: ScheduleExtendedProps;
}

export default function useCalendar(calendarRef: RefObject<FullCalendar>) {
  const { currentDate, checkedTagIds, startDate, endDate, viewType } = useCalendarContext();
  const router = useRouter();

  const [scheduleChange, setScheduleChange] = useState<ScheduleChangeObject | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [repeatConfirmModalOpen, setRepeatConfirmModalOpen] = useState(false);

  // 캘린더에 사용할 일정 목록 요청 로직
  const { data: schedulesData } = useSuspenseQuery({
    queryKey: ["personal_schedule", "list", checkedTagIds, startDate, endDate],
    queryFn: () =>
      apiRequest("getSchedules", {
        start_date: startDate,
        end_date: endDate,
        ...(checkedTagIds && { tag_ids: checkedTagIds }),
      }),
  });

  // 일정 수정 mutate
  const { mutate: modifyScheduleMutate } = useMutation<null, DefaultError, ModifyScheduleVariables>({
    mutationFn: ({ req, pathParam }) => apiRequest("modifySchedule", req, pathParam),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      setConfirmModalOpen(false);
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  // 반복 일정 수정 mutate
  const { mutate: modifyRepeatScheduleMutate } = useMutation<null, DefaultError, ModifyRepeatScheduleVariables>({
    mutationFn: ({ req, pathParam }) => apiRequest("modifyRepeatSchedule", req, pathParam),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      setRepeatConfirmModalOpen(false);
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

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
      editable: sch.type === "personal",
      extendedProps: {
        isRepeat: sch.dates.length > 1,
        type: sch.type,
        scheduleId: sch.id,
        color: sch.color,
      } as ScheduleExtendedProps,
    }));
  });

  const onEventChange = (arg: EventChangeArg) => {
    const { extendedProps } = arg.event as ScheduleEvent;
    extendedProps.type === "personal" ? setConfirmModalOpen(true) : setRepeatConfirmModalOpen(true);
  };

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

  // 일정 수정 최종 확인 이벤트 핸들러
  const onConfirmSubmit = () => {
    if (!scheduleChange) return;

    const { id, initialIsRepeat, initialStartDate, initialEndDate, ...rest } = scheduleChange;
    modifyScheduleMutate({ req: rest, pathParam: id.toString() });
  };

  // 반복 일정 수정 최종 확인 이벤트 핸들러
  const onRepeatConfirmSubmit = (data: RepeatConfirmFormValues) => {
    if (!scheduleChange) return;

    modifyRepeatScheduleMutate({
      req: {
        modify_type: data.type,
        start_date: scheduleChange.startDate,
        end_date: scheduleChange.endDate,
        before_start_date: scheduleChange.initialStartDate,
        before_end_date: scheduleChange.initialEndDate,
        title: scheduleChange.title,
        description: scheduleChange.description,
        importance: scheduleChange.importance,
        color: scheduleChange.color,
        tags: scheduleChange.tags,
        is_repeat: scheduleChange.isRepeat,
        repeat_frequency: scheduleChange.repeatFrequency,
        repeat_interval: scheduleChange.repeatInterval,
        repeat_end_date: scheduleChange.repeatEndDate,
        repeat_end_count: scheduleChange.repeatCount,
      },
      pathParam: scheduleChange.id.toString(),
    });
  };

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
    scheduleChange,
    confirmModalOpen,
    repeatConfirmModalOpen,
    calendarOption,
    setConfirmModalOpen,
    setRepeatConfirmModalOpen,
    onConfirmSubmit,
    onRepeatConfirmSubmit,
  };
}
