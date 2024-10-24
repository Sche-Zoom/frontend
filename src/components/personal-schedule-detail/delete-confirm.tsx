"use client";

import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import { deletePersonalSchedule } from "@/api/personal-schedule";
import ScheduleConfirmModal from "@/components/confirm-modal";

interface Props {
  open: boolean;
  scheduleId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteConfirm = ({ open, scheduleId, setOpen }: Props) => {
  const router = useRouter();

  // 일정 삭제 mutate
  const { mutate } = useMutation<null, DefaultError, DeleteScheduleVariables>({
    mutationFn: ({ req, pathParam }) => deletePersonalSchedule(req, pathParam),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      setOpen(false);
      router.back();
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  // 일정 삭제 최종 확인 이벤트 핸들러
  const onSubmit = () => mutate({ req: { delete_type: "only" }, pathParam: scheduleId.toString() });

  return (
    <ScheduleConfirmModal
      title="일정을 삭제하시겠습니까?"
      description="최종확인 후 일정이 삭제됩니다."
      open={open}
      onOpenChange={setOpen}
      onSubmit={onSubmit}
    />
  );
};

export default DeleteConfirm;
