"use client";

import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import { modifyPersonalSchedule } from "@/api/personal-schedule";
import ScheduleConfirmModal from "@/components/confirm-modal";
import { DefaultValues, PersonalScheduleFormValues } from "@/components/personal-schedule-detail/detail-form-schema";
import { getIsChangeField, getIsChangeTags } from "@/components/personal-schedule-detail/utils";

interface Props {
  open: boolean;
  scheduleId: number;
  formValues: PersonalScheduleFormValues;
  defaultValues: DefaultValues;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeConfirm = ({ open, scheduleId, formValues, defaultValues, setOpen }: Props) => {
  const router = useRouter();

  // 일정 수정 mutate
  const { mutate } = useMutation<null, DefaultError, ModifyScheduleVariables>({
    mutationFn: ({ req, pathParam }) => modifyPersonalSchedule(req, pathParam),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      setOpen(false);
      router.back();
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  // 일정 수정 최종 확인 이벤트 핸들러
  const onSubmit = () => {
    const checkChangeField = (key: keyof PersonalScheduleFormValues) =>
      getIsChangeField(key, formValues, defaultValues);

    const request: ModifyPersonalScheduleReq = {
      start_date: checkChangeField("start_date") ? formValues.start_date : undefined,
      end_date: checkChangeField("end_date") ? formValues.end_date : undefined,
      title: checkChangeField("title") ? formValues.title : undefined,
      description: checkChangeField("description") ? formValues.description : undefined,
      importance: checkChangeField("importance") ? formValues.importance : undefined,
      color: checkChangeField("color") ? formValues.color : undefined,
      tags: getIsChangeTags(formValues, defaultValues) ? formValues.tags.map(({ id }) => id) : undefined,
      repeat_end_option: checkChangeField("repeat_end_option")
        ? formValues.repeat_end_option === "none"
          ? null
          : formValues.repeat_end_option
        : undefined,
      is_repeat: checkChangeField("is_repeat") ? formValues.is_repeat === "yes" : undefined,
      repeat_frequency: checkChangeField("repeat_frequency") ? formValues.repeat_frequency : undefined,
      repeat_interval: checkChangeField("repeat_interval") ? formValues.repeat_interval : undefined,
      repeat_end_date: checkChangeField("repeat_end_date") ? formValues.repeat_end_date : undefined,
      repeat_end_count: checkChangeField("repeat_end_count") ? formValues.repeat_end_count : undefined,
    };

    mutate({ req: request, pathParam: scheduleId.toString() });
  };

  return (
    <ScheduleConfirmModal
      title="일정을 수정하시겠습니까?"
      description="최종확인 후 일정이 수정됩니다."
      open={open}
      onOpenChange={setOpen}
      onSubmit={onSubmit}
    />
  );
};

export default ChangeConfirm;
