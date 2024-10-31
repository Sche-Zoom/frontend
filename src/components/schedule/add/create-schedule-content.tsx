"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { createPersonalSchedule } from "@/api/personal-schedule";
import * as FormFields from "@/components/form-fields";
import { FormValues, SCHEDULE_FORM_SCHEMA } from "@/components/form-fields/basic-form-schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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

function CreateScheduleContent() {
  const { ColorTitleField, DateRangeField, DescriptionField, ImportanceField, RepeatFields, TagsField } = FormFields;
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
    <>
      <div className="size-full overflow-y-auto px-6 py-4">
        {/* 상세정보 form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
            className="box-border flex w-full flex-col gap-y-4"
          >
            <ColorTitleField />
            <DateRangeField />
            <DescriptionField />
            <TagsField />
            <ImportanceField />
            <RepeatFields />
            <div className="flex justify-end">
              <Button type="submit" size="lg">
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
