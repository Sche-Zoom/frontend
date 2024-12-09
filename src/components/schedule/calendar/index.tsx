"use client";

import FullCalendar from "@fullcalendar/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RefObject, Suspense, useRef, useState } from "react";

import BasicLoader from "@/components/basic-loader";
import ScheduleConfirmModal from "@/components/confirm-modal";
import ErrorBoundary from "@/components/error-boundary";
import RepeatScheduleConfirmModal from "@/components/repeat-confirm-modal";
import CalendarHeader from "@/components/schedule/calendar/calendar-header";
import useCalendar from "@/components/schedule/calendar/useCalendar";
import { Separator } from "@/components/ui/separator";
import { CalendarProvider, useCalendarContext } from "@/contexts/calendar";
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
              <Suspense
                fallback={
                  <div className="flex-1">
                    <BasicLoader />
                  </div>
                }
              >
                <CalendarContent calendarRef={calendarRef} />
              </Suspense>
            </ErrorBoundary>

            {isSideOpen && (
              // 사이드 메뉴
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <aside className={"border-box hidden h-full w-72 border p-4 lg:inline-block"}>
                      <BasicLoader />
                    </aside>
                  }
                >
                  <CalendarSideMenu />
                </Suspense>
              </ErrorBoundary>
            )}
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}

const CalendarContent = ({ calendarRef }: { calendarRef: RefObject<FullCalendar> }) => {
  const { checkedTagIds, startDate, endDate } = useCalendarContext();

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

  const {
    calendarOption,
    confirmModalOpen,
    repeatConfirmModalOpen,
    scheduleChange,
    setConfirmModalOpen,
    setRepeatConfirmModalOpen,
    onConfirmSubmit,
    onRepeatConfirmSubmit,
  } = useCalendar(calendarRef, schedulesData);

  return (
    <>
      {/* 실제 일정이 노출될 캘린더 content 부분 */}
      <div className="h-full flex-1 p-4 text-sm">
        <FullCalendar {...calendarOption} />
      </div>

      {/* 일정 수정 확인 모달 */}
      {scheduleChange && (
        <ScheduleConfirmModal
          title="일정을 수정하시겠습니까?"
          description="최종확인 후 일정이 수정됩니다."
          onSubmit={onConfirmSubmit}
          open={confirmModalOpen}
          onOpenChange={setConfirmModalOpen}
        />
      )}

      {/* 반복 일정 수정 확인 모달 */}
      {scheduleChange && (
        <RepeatScheduleConfirmModal
          title="일정을 수정하시겠습니까?"
          description="최종확인 후 일정이 수정됩니다."
          onSubmit={onRepeatConfirmSubmit}
          open={repeatConfirmModalOpen}
          onOpenChange={setRepeatConfirmModalOpen}
        />
      )}
    </>
  );
};

const CalendarSideMenu = () => {
  const router = useRouter();
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
    <aside className="border-box hidden h-full w-72 border-l p-4 lg:inline-block">
      <h3 className="mb-2 font-semibold">일정 목록</h3>
      {/*  해당월의 전체 일정 목록 */}
      {data.side_schedules.map((dailySchedules) => (
        <div key={dailySchedules.start_date}>
          {/* 일정 시작 날짜기준 일별 일정 목록 */}
          <div key={dailySchedules.start_date} className="p-2">
            <p className="mb-2 text-sm">{dailySchedules.start_date}</p>
            {/* 특정 날짜 일정 목록 */}
            {dailySchedules.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`mb-2 space-y-1 border-l-4 border-[hsl(var(--schedule))] bg-[hsl(var(--schedule-background))] p-2`}
                style={getScheduleColorVariable(schedule.color)}
                onClick={() => router.push(`/schedule/${schedule.id}`)}
              >
                <h4 className="text-sm">{schedule.title}</h4>
                <p className="text-muted-foreground flex text-xs">
                  {schedule.tag_names.length > 0 && `${schedule.tag_names.join(" · ")}`}
                </p>
              </div>
            ))}
          </div>
          <Separator className="mb-2" />
        </div>
      ))}
    </aside>
  );
};
