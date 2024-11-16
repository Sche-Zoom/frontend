"use client";

import FullCalendar from "@fullcalendar/react";
import { ClipboardList } from "lucide-react";
import { RefObject, Suspense, useEffect, useRef } from "react";

import BasicLoader from "@/components/basic-loader";
import ScheduleConfirmModal from "@/components/confirm-modal";
import ErrorBoundary from "@/components/error-boundary";
import PersonalCalendarHeader from "@/components/home/calendar-header";
import CalendarSideMenu from "@/components/home/calendar-side-menu";
import useCalendar from "@/components/home/useCalendar";
import RepeatScheduleConfirmModal from "@/components/repeat-confirm-modal";
import { Button } from "@/components/ui/button";
import { CalendarProvider, useCalendarContext } from "@/contexts/calendar";

export default function Home() {
  const calendarRef = useRef<FullCalendar>(null);

  return (
    <CalendarProvider calendarRef={calendarRef}>
      <div className="z-0 flex size-full flex-col">
        {/* 콘텐츠 title */}
        <div className="bg-muted flex h-9 items-center justify-between border-b px-2">
          <h2 className="align-middle text-sm">개인 일정</h2>
          <PersonalSideButtons />
        </div>

        <div className="flex flex-1">
          <div className="relative flex-1">
            {/* 캘린더 전체 */}
            <div className="absolute flex size-full flex-col p-4">
              {/* 캘린더 조작을 위한 header 부분 */}
              <PersonalCalendarHeader />

              <ErrorBoundary>
                <Suspense fallback={<BasicLoader />}>
                  <CalendarContent calendarRef={calendarRef} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>

          {/* 사이드 메뉴 */}
          <CalendarSideMenu />
        </div>
      </div>
    </CalendarProvider>
  );
}

const CalendarContent = ({ calendarRef }: { calendarRef: RefObject<FullCalendar> }) => {
  const {
    calendarOption,
    confirmModalOpen,
    repeatConfirmModalOpen,
    scheduleChange,
    setConfirmModalOpen,
    setRepeatConfirmModalOpen,
    onConfirmSubmit,
    onRepeatConfirmSubmit,
  } = useCalendar(calendarRef);

  return (
    <>
      {/* 실제 일정이 노출될 캘린더 content 부분 */}
      <div className="flex-1 text-sm">
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

const PersonalSideButtons = () => {
  const { menuTab, updateMenuTab, updateSize } = useCalendarContext();

  useEffect(() => {
    updateSize();
  }, [menuTab, updateSize]);

  return (
    <div className="flex gap-2">
      <Button
        size="icon-sm"
        className="hidden lg:inline-block"
        variant={"summarySchedules" === menuTab ? "image-icon-active" : "image-icon-none"}
        onClick={() => updateMenuTab("summarySchedules")}
      >
        <ClipboardList size={24} />
      </Button>
    </div>
  );
};
