import { DefaultError, useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

import { modifyPersonalSchedule } from "@/api/personal-schedule";
import { AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { LoadingButton } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";
import { getNowDateTime } from "@/lib/date";

interface MutationVariables {
  req: ModifyPersonalScheduleReq;
  pathParam: string;
}

export default function RepeatScheduleConfirmForm() {
  const { scheduleChange, setUpdatedTime, setChangeConfirmOpen } = usePersonalCalendarContext();
  const form = useForm();

  const { mutate, isPending } = useMutation<null, DefaultError, MutationVariables>({
    mutationFn: ({ req, pathParam }) => modifyPersonalSchedule(req, pathParam),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      setUpdatedTime(getNowDateTime());
      setChangeConfirmOpen(false);
    },
    onError: () => {
      alert("정상적으로 처리되지 않았습니다.");
    },
  });

  function onSubmit() {
    if (!scheduleChange) return;

    const { id, isRepeat, ...rest } = scheduleChange;
    mutate({ req: rest, pathParam: id });
  }

  return (
    <Form {...form}>
      {/* 반복 일정 수정 처리 form  */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <LoadingButton type="submit" loading={isPending}>
            저장
          </LoadingButton>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
