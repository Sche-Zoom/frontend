"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { getPersonalSchedule } from "@/api/personal-schedule";
import * as FormFields from "@/components/form-fields";
import { FormValues, SCHEDULE_FORM_SCHEMA } from "@/components/form-fields/basic-form-schema";
import ChangeConfirm from "@/components/schedule/detail/change-confirm";
import ChangeRepeatConfirm from "@/components/schedule/detail/change-repeat-confirm";
import DeleteConfirm from "@/components/schedule/detail/delete-confirm";
import DeleteRepeatConfirm from "@/components/schedule/detail/delete-repeat-confirm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SCHEDULE_TYPE } from "@/constants";
import { getIsFormChange } from "@/lib/form-utils";

const PersonalDetailForm = ({ scheduleId }: { scheduleId: number }) => {
  const { ColorTitleField, DateRangeField, DescriptionField, ImportanceField, RepeatFields, TagsField } = FormFields;
  const [confirmOpen, setConfirmOpen] = useState(false); // 일정 수정 확인 모달
  const [repeatConfirmOpen, setRepeatConfirmOpen] = useState(false); // 반복 일정 수정 확인 모달
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // 일정 삭제 확인 모달
  const [deleteRepeatConfirmOpen, setDeleteRepeatConfirmOpen] = useState(false); // 반복 일정 삭제 확인 모달

  // 개인 일정 상세 정보 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["personal_schedule", "detail", scheduleId],
    queryFn: () => getPersonalSchedule(null, scheduleId.toString()),
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

  // form 제출 이벤트 핸들러 변경된 form 내용을 토대로 최종 확인 모달 open
  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    // 일정 구분에 맞는 confirm 모달 open
    return defaultValues.is_repeat === "yes" ? setRepeatConfirmOpen(true) : setConfirmOpen(true);
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

  // 일정 삭제
  const onDelete = () => {
    defaultValues.is_repeat === "yes" ? setDeleteRepeatConfirmOpen(true) : setDeleteConfirmOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="box-border flex w-full flex-col gap-y-4">
          {/* color & title line */}
          <ColorTitleField />
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium">분류</span>
            <p className="text-sm">{SCHEDULE_TYPE[form.getValues("type")]}</p>
          </div>
          <DateRangeField />
          <DescriptionField />
          <TagsField />
          <ImportanceField />
          <RepeatFields />

          {/* 푸터 버튼 박스 */}
          {defaultValues.type === "personal" && (
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={onDelete}>
                <Trash2 className="mr-2" size={16} />
                일정 삭제
              </Button>
              <Button type="submit" size="lg" disabled={!getIsFormChange(formValues, defaultValues)}>
                저장
              </Button>
            </div>
          )}
        </form>
      </Form>

      {defaultValues.is_repeat ? (
        <>
          {/* 반복 일정 변경 확인 모달 */}
          <ChangeRepeatConfirm
            open={repeatConfirmOpen}
            scheduleId={scheduleId}
            formValues={formValues}
            defaultValues={defaultValues}
            setOpen={setRepeatConfirmOpen}
          />
          {/* 반복 일정 삭제 모달 */}
          <DeleteRepeatConfirm
            open={deleteRepeatConfirmOpen}
            scheduleId={scheduleId}
            setOpen={setDeleteRepeatConfirmOpen}
          />
        </>
      ) : (
        <>
          {/* 일정 변경 확인 모달 */}
          <ChangeConfirm
            open={confirmOpen}
            scheduleId={scheduleId}
            formValues={formValues}
            defaultValues={defaultValues}
            setOpen={setConfirmOpen}
          />
          {/* 일정 삭제 확인 모달 */}
          <DeleteConfirm open={deleteConfirmOpen} scheduleId={scheduleId} setOpen={setDeleteConfirmOpen} />
        </>
      )}
    </>
  );
};

export default PersonalDetailForm;
