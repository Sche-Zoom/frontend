"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormValues, SCHEDULE_FORM_SCHEMA } from "@/components/schedule/common/form-fields/basic-form-schema";
import ScheduleForm from "@/components/schedule/common/schedule-form";
import { Button, LoadingButton } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";
import { getDefaultFormatDate } from "@/lib/date";

export default function ScheduleAdd() {
  const router = useRouter();

  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col bg-white">
      {/* content title */}
      <div className="border-b-muted flex h-12 items-center space-x-1 border border-b-2">
        <Button type="button" variant="image-icon-active" size="sm" onClick={router.back}>
          <ArrowLeft size={18} />
        </Button>
        <h2 className="font-medium">새 일정 생성</h2>
      </div>

      {/* 개인 일정 추가 Form content */}
      <div className="overflow-y-auto px-6 py-4">
        <ScheduleAddForm />
      </div>
    </div>
  );
}

const INIT_FORM_VALUES: FormValues = {
  title: "",
  color: "pink",
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
  const { toast } = useToast();

  // 일정 추가 mutate
  const { mutate, isPending } = useMutation<null, DefaultError, CreateScheduleVariables>({
    mutationFn: ({ req }) => apiRequest("createSchedule", req),
    onSuccess: () => {
      router.back();
      toast({ title: "일정 생성이 정상적으로 처리됐습니다.", variant: "success" });
    },
    onError: () =>
      toast({
        title: "일정 생성이 정상적으로 처리되지 않았습니다 잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      }),
  });

  // 상세 정보 form 관리를 위한 useForm
  const form = useForm<FormValues>({
    resolver: zodResolver(SCHEDULE_FORM_SCHEMA),
    defaultValues: INIT_FORM_VALUES,
  });

  const formValues = form.watch(); // 현재 form values

  // form 제출 이벤트 핸들러 변경된 form 내용을 토대로 최종 확인 모달 open
  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
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

  return (
    <Form {...form}>
      <ScheduleForm onSubmit={onSubmit}>
        <LoadingButton isLoading={isPending} size="lg" className="mt-4 self-end">
          완료
        </LoadingButton>
      </ScheduleForm>
    </Form>
  );
};
