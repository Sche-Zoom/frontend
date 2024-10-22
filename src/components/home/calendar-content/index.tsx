import FullCalendar from "@fullcalendar/react";
import { RefObject } from "react";

import ScheduleConfirmModal from "@/components/confirm-modal";
import { CalendarContextMenu } from "@/components/home/calendar-content/calendar-context-menu";
import useCalendarContent from "@/components/home/calendar-content/useCalendarContent";
import RepeatScheduleConfirmModal from "@/components/repeat-confirm-modal";
interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function CalendarContent({ calendarRef }: Props) {
  const {
    calendarOption,
    contextMenuPosition,
    confirmModalOpen,
    repeatConfirmModalOpen,
    contextMenuOpen,
    scheduleChange,
    setConfirmModalOpen,
    setRepeatConfirmModalOpen,
    setContextMenuOpen,
    onConfirmSubmit,
    onRepeatConfirmSubmit,
  } = useCalendarContent(calendarRef);

  return (
    <>
      {/* 캘린더 날짜 우클릭 메뉴 */}
      <div className="fixed left-0 top-0">
        <CalendarContextMenu
          open={contextMenuOpen}
          menuPosition={contextMenuPosition}
          onOpenChange={setContextMenuOpen}
        />
      </div>

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
}
