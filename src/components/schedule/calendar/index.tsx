"use client";

import FullCalendar from "@fullcalendar/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DefaultError, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";

import BasicLoader from "@/components/basic-loader";
import ScheduleConfirmModal from "@/components/confirm-modal";
import ErrorBoundary from "@/components/error-boundary";
import { RepeatScheduleConfirmModal } from "@/components/repeat-confirm-modal";
import { RepeatConfirmFormValues } from "@/components/repeat-confirm-modal";
import CalendarHeader from "@/components/schedule/calendar/calendar-header";
import useCalendar from "@/components/schedule/calendar/useCalendar";
import { Separator } from "@/components/ui/separator";
import { CalendarProvider, useCalendarContext } from "@/contexts/calendar";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";
import { getScheduleColorVariable } from "@/lib/calendar";

export default function ScheduleCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [isSideOpen, setIsSideOpen] = useState(false);

  return (
    <CalendarProvider calendarRef={calendarRef}>
      <div className="relative z-0 flex size-full flex-1">
        {/* 캘린더 전체 */}
        <div className="absolute flex size-full flex-col ">
          {/* 캘린더 조작을 위한 header 부분 */}
          <CalendarHeader isSideOpen={isSideOpen} onClickSideButton={() => setIsSideOpen((prev) => !prev)} />

          <div className="flex flex-1">
            {/* calendar */}
            <ErrorBoundary>
              <Suspense fallback={<BasicLoader />}>
                <CalendarContent />
              </Suspense>
            </ErrorBoundary>

            {isSideOpen && (
              // 사이드 메뉴
              <aside className="border-box hidden h-full w-72 border-l p-4 lg:inline-block">
                <ErrorBoundary>
                  <Suspense fallback={<BasicLoader />}>
                    <CalendarSideMenu />
                  </Suspense>
                </ErrorBoundary>
              </aside>
            )}
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}

const CalendarContent = () => {
  const { checkedTagIds, startDate, endDate, calendarRef } = useCalendarContext();

  // 캘린더에 사용할 일정 목록 요청 로직
  const { data: schedulesData } = useSuspenseQuery({
    queryKey: ["schedule", "list", checkedTagIds, startDate, endDate],
    queryFn: () =>
      apiRequest("getSchedules", {
        start_date: startDate,
        end_date: endDate,
        ...(checkedTagIds && { tag_ids: checkedTagIds }),
      }),
  });

  const { confirmOpen, calendarOption, scheduleChange, onConfirmOpenChange } = useCalendar(calendarRef, schedulesData);

  return (
    <>
      {/* 실제 일정이 노출될 캘린더 content 부분 */}
      <div className="h-full flex-1 p-4 text-sm">
        <FullCalendar {...calendarOption} />
      </div>

      {/* 일정 수정 확인 모달 */}
      {scheduleChange && (
        <ConfirmModal open={confirmOpen} onOpenChange={onConfirmOpenChange} scheduleChange={scheduleChange} />
      )}
    </>
  );
};

interface ConfirmModalProps {
  open: boolean;
  scheduleChange: ScheduleChangeObject;
  onOpenChange: (open: boolean) => void;
}

const ConfirmModal = ({ open, scheduleChange, onOpenChange }: ConfirmModalProps) => {
  const { toast } = useToast();

  const mutationCallbacks = {
    onSuccess: () => {
      onOpenChange(false);
      toast({ title: "일정 수정이 정상적으로 처리됐습니다.", variant: "success" });
    },
    onError: () =>
      toast({
        title: "일정 수정이 정상적으로 처리되지 않았습니다 잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      }),
  };

  // 일정 수정 mutate
  const modifyMutation = useMutation<null, DefaultError, ModifyScheduleVariables>({
    mutationFn: ({ req, pathParam }) => apiRequest("modifySchedule", req, pathParam),
    ...mutationCallbacks,
  });

  // 반복 일정 수정 mutate
  const modifyRepeatMutation = useMutation<null, DefaultError, ModifyRepeatScheduleVariables>({
    mutationFn: ({ req, pathParam }) => apiRequest("modifyRepeatSchedule", req, pathParam),
    ...mutationCallbacks,
  });

  const { mutate: modifyScheduleMutate, isPending: isModifyLoading } = modifyMutation;
  const { mutate: modifyRepeatScheduleMutate, isPending: isModifyRepeatLoading } = modifyRepeatMutation;

  // 일정 수정 최종 확인 이벤트 핸들러
  const onConfirmSubmit = () => {
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

  const modalProps = {
    open,
    title: "일정을 수정하시겠습니까?",
    description: "최종확인 후 일정이 수정됩니다.",
    onOpenChange,
  };

  return scheduleChange.initialIsRepeat ? (
    <RepeatScheduleConfirmModal isLoading={isModifyRepeatLoading} onSubmit={onRepeatConfirmSubmit} {...modalProps} />
  ) : (
    <ScheduleConfirmModal isLoading={isModifyLoading} onSubmit={onConfirmSubmit} {...modalProps} />
  );
};

const CalendarSideMenu = () => {
  const { checkedTagIds, currentDate } = useCalendarContext();

  const { data } = useSuspenseQuery({
    queryKey: ["schedule_summary", "list", checkedTagIds, currentDate],
    queryFn: () =>
      apiRequest("getSummarySchedules", {
        selected_date: currentDate,
        ...(checkedTagIds && { tag_ids: checkedTagIds }),
      }),
  });

  return (
    // 월단위 일정 요약 사이드메뉴
    <>
      <h3 className="mb-2 font-semibold">일정 목록</h3>
      {/*  해당월의 전체 일정 목록 */}
      {data.side_schedules.map((dailySchedules) => (
        <div key={dailySchedules.start_date}>
          {/* 일정 시작 날짜기준 일별 일정 목록 */}
          <div key={dailySchedules.start_date} className="p-2">
            <p className="mb-2 text-sm">{dailySchedules.start_date}</p>
            {/* 특정 날짜 일정 목록 */}
            {dailySchedules.schedules.map((schedule) => (
              <Link
                key={schedule.id}
                className="mb-2 block space-y-1 border-l-4 border-[hsl(var(--schedule))] bg-[hsl(var(--schedule-background))] p-2"
                style={getScheduleColorVariable(schedule.color)}
                href={`/schedule/${schedule.id}`}
              >
                <h4 className="text-sm">{schedule.title}</h4>
                <p className="text-muted-foreground flex text-xs">
                  {schedule.tag_names.length > 0 && `${schedule.tag_names.join(" · ")}`}
                </p>
              </Link>
            ))}
          </div>
          <Separator className="mb-2" />
        </div>
      ))}
    </>
  );
};
