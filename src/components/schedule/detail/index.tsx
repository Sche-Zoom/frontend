"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";

import BasicLoader from "@/components/basic-loader";
import ErrorBoundary from "@/components/error-boundary";
import { FormValues, SCHEDULE_FORM_SCHEMA } from "@/components/schedule/common/form-fields/basic-form-schema";
import { getIsFormChange } from "@/components/schedule/common/form-utils";
import ScheduleForm from "@/components/schedule/common/schedule-form";
import { ChangeConfirm, DeleteConfirm } from "@/components/schedule/detail/confirms";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import apiRequest from "@/lib/api";

export default function ScheduleDetail({ scheduleId }: { scheduleId: number }) {
  const router = useRouter();
  return (
    <div className="absolute left-0 top-0 z-10 flex size-full flex-col bg-white">
      {/* content title */}
      <div className="border-b-muted flex h-12 items-center space-x-1 border border-b-2">
        <Button type="button" variant="image-icon-active" size="sm" onClick={router.back}>
          <ArrowLeft size={18} />
        </Button>
        <h2 className="font-medium">일정 상세 정보</h2>
      </div>

      {/* 일정 상세 정보 Form content */}
      <div className="size-full overflow-y-auto px-6 py-4">
        <ErrorBoundary>
          <Suspense fallback={<BasicLoader />}>
            {/* 상세정보 form */}
            <ScheduleDetailForm scheduleId={scheduleId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

const ScheduleDetailForm = ({ scheduleId }: { scheduleId: number }) => {
  const [confirmOpen, setConfirmOpen] = useState(false); // 일정 수정 확인 모달
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // 일정 삭제 확인 모달

  // 개인 일정 상세 정보 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["schedule", "detail", scheduleId],
    queryFn: () => apiRequest("getSchedule", null, scheduleId.toString()),
  });

  // form values 초기값
  const defaultValues: FormValues = {
    title: data.title,
    color: data.color,
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
  const form = useForm<FormValues>({ resolver: zodResolver(SCHEDULE_FORM_SCHEMA), defaultValues });
  const formValues = form.watch();

  return (
    <Form {...form}>
      <ScheduleForm onSubmit={() => setConfirmOpen(true)}>
        {/* 푸터 버튼 박스 */}
        <div className="mt-4 flex justify-between ">
          <Button type="button" variant="ghost" onClick={() => setDeleteConfirmOpen(true)}>
            <Trash2 className="mr-2" size={16} />
            일정 삭제
          </Button>
          <Button size="lg" disabled={!getIsFormChange(formValues, defaultValues)}>
            저장
          </Button>
        </div>
      </ScheduleForm>

      <ChangeConfirm
        open={confirmOpen}
        scheduleId={scheduleId}
        defaultValues={defaultValues}
        onOpenChange={(open: boolean) => setConfirmOpen(open)}
      />

      <DeleteConfirm
        open={deleteConfirmOpen}
        scheduleId={scheduleId}
        isRepeat={defaultValues.is_repeat === "yes"}
        onOpenChange={(open: boolean) => setDeleteConfirmOpen(open)}
      />
    </Form>
  );
};
