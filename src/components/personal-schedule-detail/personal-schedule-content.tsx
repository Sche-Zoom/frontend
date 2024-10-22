"use client";

import { useQuery } from "@tanstack/react-query";

import { getPersonalSchedule } from "@/api/personal-schedule";
import { DefaultValues } from "@/components/personal-schedule-detail/detail-form-schema";
import PersonalDetailForm from "@/components/personal-schedule-detail/personal-detail-form";

interface Props {
  scheduleId: number;
}

export const PersonalScheduleContent = ({ scheduleId }: Props) => {
  // 개인 일정 상세 정보 조회 api
  const { data, isSuccess } = useQuery({
    queryKey: ["personal_schedule", "detail", scheduleId],
    queryFn: () => getPersonalSchedule(null, scheduleId.toString()),
  });

  if (!isSuccess) return;

  // form values 초기값
  const defaultValues: DefaultValues = {
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

  return (
    <div className="size-full max-w-6xl px-6 py-4">
      {/* 상세정보 form */}
      <PersonalDetailForm scheduleId={scheduleId} defaultValues={defaultValues} />
    </div>
  );
};

export default PersonalScheduleContent;
