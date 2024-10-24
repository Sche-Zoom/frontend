"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { createPersonalSchedule } from "@/api/personal-schedule";
import {
  CREATE_SCHEDULE_FORM_SCHEMA,
  CreateScheduleFormValues,
  DefaultValues,
} from "@/components/create-personal-schedule/create-form-schema";
import ColorField from "@/components/form-fields/color-field";
import DateRangeField from "@/components/form-fields/date-range-field";
import DescriptionField from "@/components/form-fields/description";
import ImportanceField from "@/components/form-fields/importance";
import RepeatFields from "@/components/form-fields/repeat-field-group";
import TagsField from "@/components/form-fields/tags-field";
import TitleField from "@/components/form-fields/title-field";
import { getIsFormChange } from "@/components/personal-schedule-detail/utils";
import { Button } from "@/components/ui/button";
import { Form, FormItemGroup } from "@/components/ui/form";
import { getDefaultFormatDate } from "@/lib/date";

function CreateScheduleContent() {
  const router = useRouter();

  // 일정 삭제 mutate
  const { mutate } = useMutation<null, DefaultError, CreateScheduleVariables>({
    mutationFn: ({ req }) => createPersonalSchedule(req),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      router.back();
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const defaultValues: DefaultValues = {
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

  // 상세 정보 form 관리를 위한 useForm
  const form = useForm<CreateScheduleFormValues>({
    resolver: zodResolver(CREATE_SCHEDULE_FORM_SCHEMA),
    defaultValues,
  });

  const formValues = form.watch(); // 현재 form values
  const editMode = defaultValues.type === "personal";

  // form 제출 이벤트 핸들러 변경된 form 내용을 토대로 최종 확인 모달 open
  const onSubmit: SubmitHandler<CreateScheduleFormValues> = (data, event) => {
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
  const onSubmitError: SubmitErrorHandler<CreateScheduleFormValues> = (errors) => {
    // 최종 에러확인
    for (const key of Object.keys(errors)) {
      const fieldName = key as keyof FieldErrors<CreateScheduleFormValues>;
      if (errors[fieldName]) return alert(errors[fieldName].message); // 에러메시지 노출
    }
    return alert("정상적으로 처리되지않았습니다.");
  };

  return (
    <>
      <div className="size-full max-w-6xl px-6 py-4">
        {/* 상세정보 form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
            className="box-border flex w-full flex-col gap-y-4"
          >
            {/* color & title line */}
            <FormItemGroup>
              {/* color picker */} <ColorField editMode={editMode} form={form} />
              {/* title input */} <TitleField editMode={editMode} form={form} />
            </FormItemGroup>
            {/* Date Range */} <DateRangeField editMode={editMode} form={form} />
            {/* description */} <DescriptionField editMode={editMode} form={form} />
            {/* Tag List & Tag select */} <TagsField editMode={editMode} form={form} />
            {/* Importance select */} <ImportanceField editMode={editMode} form={form} />
            {/* RepeatFields */} <RepeatFields editMode={editMode} form={form} />
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={!getIsFormChange(formValues, defaultValues)}>
                완료
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default CreateScheduleContent;
