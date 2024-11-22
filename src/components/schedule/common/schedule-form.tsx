"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm, useFormContext } from "react-hook-form";

import * as FormFields from "@/components/schedule/common/form-fields";
import { FormValues, SCHEDULE_FORM_SCHEMA } from "@/components/schedule/common/form-fields/basic-form-schema";
import { getIsFormChange } from "@/components/schedule/common/form-utils";
import { ChangeConfirm, ChangeRepeatConfirm } from "@/components/schedule/detail/change-confirm";
import { DeleteConfirm, DeleteRepeatConfirm } from "@/components/schedule/detail/delete-confirm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SCHEDULE_TYPE } from "@/constants";
import apiRequest from "@/lib/api";
import { getDefaultFormatDate } from "@/lib/date";

const INIT_FORM_VALUES: FormValues = {
  title: "",
  color: "pink",
  type: "personal",
  description: "",
  tags: [],
  importance: "medium",
  start_date: getDefaultFormatDate(dayjs()),
  end_date: getDefaultFormatDate(dayjs().add(1, "day")),
  is_repeat: "no",
  repeat_interval: 1,
  repeat_frequency: "weekly",
  repeat_end_option: "none",
  repeat_end_count: 1,
  repeat_end_date: undefined,
} as const;

const ScheduleAddForm = () => {
  const router = useRouter();

  // 일정 삭제 mutate
  const { mutate } = useMutation<null, DefaultError, CreateScheduleVariables>({
    mutationFn: ({ req }) => apiRequest("createSchedule", req),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      router.back();
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  // 상세 정보 form 관리를 위한 useForm
  const form = useForm<FormValues>({
    resolver: zodResolver(SCHEDULE_FORM_SCHEMA),
    defaultValues: INIT_FORM_VALUES,
  });

  const formValues = form.watch(); // 현재 form values

  // form 제출 이벤트 핸들러 변경된 form 내용을 토대로 최종 확인 모달 open
  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();

    const request = {
      start_date: data.start_date,
      end_date: data.end_date,
      title: data.title,
      description: data.description,
      importance: data.importance,
      color: data.color,
      tags: data.tags.map(({ id }) => id),
      is_repeat: data.is_repeat === "yes",
      repeat_end_option: formValues.repeat_end_option === "none" ? null : formValues.repeat_end_option,
      repeat_frequency: data.repeat_frequency,
      repeat_interval: data.repeat_interval,
      repeat_end_date: data.repeat_end_date,
      repeat_end_count: data.repeat_end_count,
    };

    mutate({ req: request });
  };

  // form 제출 시 오류발생시 이벤트 핸들러
  const onSubmitError: SubmitErrorHandler<FormValues> = (errors) => {
    // 최종 에러확인
    for (const key of Object.keys(errors)) {
      const fieldName = key as keyof FieldErrors<FormValues>;
      if (errors[fieldName]) return alert(errors[fieldName].message); // 에러메시지 노출
    }
    return alert("정상적으로 처리되지않았습니다.");
  };
  return (
    <Form {...form}>
      <ScheduleForm type="add" onSubmit={onSubmit} onSubmitError={onSubmitError}>
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            완료
          </Button>
        </div>
      </ScheduleForm>
    </Form>
  );
};

const ScheduleDetailForm = ({ scheduleId }: { scheduleId: number }) => {
  const [confirmOpen, setConfirmOpen] = useState(false); // 일정 수정 확인 모달
  const [repeatConfirmOpen, setRepeatConfirmOpen] = useState(false); // 반복 일정 수정 확인 모달
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // 일정 삭제 확인 모달
  const [deleteRepeatConfirmOpen, setDeleteRepeatConfirmOpen] = useState(false); // 반복 일정 삭제 확인 모달

  // 개인 일정 상세 정보 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["personal_schedule", "detail", scheduleId],
    queryFn: () => apiRequest("getSchedule", null, scheduleId.toString()),
  });

  // form values 초기값
  const defaultValues: FormValues = {
    title: data.title,
    color: data.color,
    type: data.type,
    description: data.description,
    tags: data.tags,
    importance: data.importance,
    start_date: data.start_date,
    end_date: data.end_date,
    is_repeat: data.is_repeat ? "yes" : "no",
    repeat_interval: data.repeat_interval,
    repeat_frequency: data.repeat_frequency,
    repeat_end_option: data.repeat_end_option,
    repeat_end_count: data.repeat_end_count ?? undefined,
    repeat_end_date: data.repeat_endDate ?? undefined,
  } as const;

  // 상세 정보 form 관리를 위한 useForm
  const form = useForm<FormValues>({
    resolver: zodResolver(SCHEDULE_FORM_SCHEMA),
    defaultValues,
    disabled: defaultValues.type === "group",
  });
  const formValues = form.watch();

  const confirmOption = {
    open: defaultValues.is_repeat ? repeatConfirmOpen : confirmOpen,
    setOpen: () => (defaultValues.is_repeat ? setRepeatConfirmOpen(true) : setConfirmOpen(true)),
    scheduleId,
    defaultValues,
  };

  const deleteConfirmOption = {
    open: defaultValues.is_repeat ? deleteRepeatConfirmOpen : deleteConfirmOpen,
    setOpen: () => (defaultValues.is_repeat ? setDeleteRepeatConfirmOpen(true) : setDeleteConfirmOpen(true)),
    scheduleId,
  };

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    confirmOption.setOpen();
  };

  const onSubmitError: SubmitErrorHandler<FormValues> = (errors) => {
    // 최종 에러확인
    for (const key of Object.keys(errors)) {
      const fieldName = key as keyof FieldErrors<FormValues>;
      if (errors[fieldName]) return alert(errors[fieldName].message); // 에러메시지 노출
    }
    alert("정상적으로 처리되지않았습니다.");
  };

  return (
    <Form {...form}>
      <ScheduleForm type="detail" onSubmit={onSubmit} onSubmitError={onSubmitError}>
        {/* 푸터 버튼 박스 */}
        {defaultValues.type === "personal" && (
          <div className="flex justify-between">
            <Button type="button" variant="ghost" onClick={() => deleteConfirmOption.setOpen()}>
              <Trash2 className="mr-2" size={16} />
              일정 삭제
            </Button>
            <Button type="submit" size="lg" disabled={!getIsFormChange(formValues, defaultValues)}>
              저장
            </Button>
          </div>
        )}
      </ScheduleForm>

      {defaultValues.is_repeat ? (
        <>
          {/* 반복 일정 변경 확인 모달 */}
          <ChangeRepeatConfirm {...confirmOption} />
          {/* 반복 일정 삭제 모달 */}
          <DeleteRepeatConfirm {...deleteConfirmOption} />
        </>
      ) : (
        <>
          {/* 일정 변경 확인 모달 */}
          <ChangeConfirm {...confirmOption} />
          {/* 일정 삭제 확인 모달 */}
          <DeleteConfirm {...deleteConfirmOption} />
        </>
      )}
    </Form>
  );
};

interface ScheduleFormProps {
  type: "add" | "detail";
  children: ReactNode;
  onSubmit: SubmitHandler<FormValues>;
  onSubmitError: SubmitErrorHandler<FormValues>;
}

const ScheduleForm = ({ type, children, onSubmit, onSubmitError }: ScheduleFormProps) => {
  const { ColorTitleField, DateRangeField, DescriptionField, ImportanceField, RepeatFieldGroup, TagsField } =
    FormFields;
  const form = useFormContext<FormValues>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="box-border flex w-full flex-col gap-y-4">
      <ColorTitleField />
      {type === "detail" && (
        <div className="flex items-center">
          <span className="mr-4 text-sm font-medium">분류</span>
          <p className="text-sm">{SCHEDULE_TYPE[form.getValues("type")]}</p>
        </div>
      )}
      <DateRangeField />
      <DescriptionField />
      <TagsField />
      <ImportanceField />
      <RepeatFieldGroup />
      {children}
    </form>
  );
};

export { ScheduleAddForm, ScheduleDetailForm };
