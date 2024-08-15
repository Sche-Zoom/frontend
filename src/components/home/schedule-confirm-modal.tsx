import RepeatScheduleConfirmForm from "@/components/home/repeat-schedule-confirm-form";
import ScheduleConfirmForm from "@/components/home/schedule-confirm-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export interface MutationVariables {
  req: ModifyPersonalScheduleReq;
  pathParam: string;
}

export default function ScheduleConfirmModal() {
  const { changeConfirmOpen, scheduleChange, setChangeConfirmOpen } = usePersonalCalendarContext();

  if (!scheduleChange) return;

  return (
    <AlertDialog open={changeConfirmOpen} onOpenChange={setChangeConfirmOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>일정을 수정하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>최종확인 후 일정이 수정됩니다.</AlertDialogDescription>
        </AlertDialogHeader>
        {/* 그룹된 일정(반복 일정)이 있는 경우 반복 일정 처리 form 아닌 경우 일반 일정 처리 form */}
        {scheduleChange.isRepeat ? <RepeatScheduleConfirmForm /> : <ScheduleConfirmForm />}
      </AlertDialogContent>
    </AlertDialog>
  );
}
