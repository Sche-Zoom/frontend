"use client";

import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import { getIsChangeField, getIsChangeTags } from "@/components/schedule/common/form-utils";
import ScheduleConfirmModal from "@/components/schedule-confirm-modal";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";

// confirms 의 공통 mutation callback 옵션 반환
const useMutationCallback = (processName: string, callback: (open: boolean) => void) => {
  const router = useRouter();
  const { toast } = useToast();
  return {
    onSuccess: () => {
      callback(false);
      router.back();
      toast({ title: `${processName}이(가) 정상적으로 처리됐습니다.`, variant: "success" });
    },
    onError: () =>
      toast({
        title: `${processName}이(가) 정상적으로 처리되지 않았습니다 잠시 후 다시 시도해 주세요.`,
        variant: "destructive",
      }),
  };
};

// confirms 의 공통 일정 수정 request 생성 함수
const createCommonModifyFields = (formValues: FormValues, defaultValues: FormValues) => {
  const checkChangeField = (key: keyof FormValues) => getIsChangeField(key, formValues, defaultValues);

  return {
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
};

interface BasicConfirmProps {
  open: boolean;
  scheduleId: number;
  onOpenChange: (open: boolean) => void;
}

interface ChangeConfirmProps extends BasicConfirmProps {
  defaultValues: FormValues;
}

const ChangeConfirm = ({ open, scheduleId, defaultValues, onOpenChange }: ChangeConfirmProps) => {
  const mutationCallbacks = useMutationCallback("일정 수정", onOpenChange);
  const { watch } = useFormContext<FormValues>();
  const formValues = watch();

  const { mutate: modifyMutate, isPending: isModifyLoading } = useMutation<null, DefaultError, ModifyScheduleVariables>(
    {
      mutationFn: ({ req, pathParam }) => apiRequest("modifySchedule", req, pathParam),
      ...mutationCallbacks,
    },
  );

  const { mutate: modifyRepeatMutate, isPending: isModifyRepeatLoading } = useMutation<
    null,
    DefaultError,
    ModifyRepeatScheduleVariables
  >({
    mutationFn: ({ req, pathParam }) => apiRequest("modifyRepeatSchedule", req, pathParam),
    ...mutationCallbacks,
  });

  const onModify = () => {
    const request: ModifyScheduleReq = createCommonModifyFields(formValues, defaultValues);
    modifyMutate({ req: request, pathParam: scheduleId.toString() });
  };

  const onRepeatModify = (option: ModifyOptionType) => {
    const request: ModifyRepeatScheduleReq = {
      modify_type: option,
      before_start_date: defaultValues.start_date,
      before_end_date: defaultValues.end_date,
      ...createCommonModifyFields(formValues, defaultValues),
    };
    modifyRepeatMutate({ req: request, pathParam: scheduleId.toString() });
  };

  const getModalProps = (isRepeat: boolean) => {
    const basicProps = {
      open,
      title: "일정을 수정하시겠습니까?",
      description: "최종확인 후 일정이 수정됩니다.",
      onOpenChange,
    };

    return isRepeat
      ? { ...basicProps, isScheduleRepeat: isRepeat, isLoading: isModifyRepeatLoading, onAction: onRepeatModify }
      : { ...basicProps, isScheduleRepeat: isRepeat, isLoading: isModifyLoading, onAction: onModify };
  };

  return <ScheduleConfirmModal {...getModalProps(defaultValues.is_repeat === "yes")} />;
};

interface DeleteConfirmProps extends BasicConfirmProps {
  isRepeat: boolean;
}

const DeleteConfirm = ({ open, scheduleId, isRepeat, onOpenChange }: DeleteConfirmProps) => {
  const mutationCallbacks = useMutationCallback("일정 삭제", onOpenChange);

  // 일정 삭제 mutate
  const { mutate, isPending } = useMutation<null, DefaultError, DeleteScheduleVariables>({
    mutationFn: ({ req, pathParam }) => apiRequest("deleteSchedule", req, pathParam),
    ...mutationCallbacks,
  });

  const onDelete = () => mutate({ req: { delete_type: "only" }, pathParam: scheduleId.toString() });

  const onRepeatDelete = (option: ModifyOptionType) =>
    mutate({ req: { delete_type: option }, pathParam: scheduleId.toString() });

  const getModalProps = (isRepeat: boolean) => {
    const basicProps = {
      open,
      title: "일정을 삭제하시겠습니까?",
      description: "최종확인 후 일정이 삭제됩니다.",
      isLoading: isPending,
      onOpenChange,
    };

    return isRepeat
      ? { ...basicProps, isScheduleRepeat: isRepeat, onAction: onRepeatDelete }
      : { ...basicProps, isScheduleRepeat: isRepeat, onAction: onDelete };
  };

  return <ScheduleConfirmModal {...getModalProps(isRepeat)} />;
};

export { ChangeConfirm, DeleteConfirm };
