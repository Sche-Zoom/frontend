import dayjs from "dayjs";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { COLORS, INVALID_TYPE_ERROR } from "@/constants";

/**
 * form 일부 요소의 경우 특정상황에 편집제한을 위해 disabled 처리하여 유효성 검사시
 * value 가 undefined 로 보아 유효성 검사를 통과하지못해 required 메시지를 띄우므로
 * disabled 처리 될 수 있는 일부 요소는 .optional() 처리
 */
export const PERSONAL_SCHEDULE_FORM_SCHEMA = z
  .object({
    title: z
      .string(INVALID_TYPE_ERROR)
      .max(50, { message: "제목은 최대 50자까지 작성가능합니다." })
      .min(2, { message: "제목은 최소 2자 이상 작성해야합니다." })
      .optional(),
    color: z.enum([...COLORS], INVALID_TYPE_ERROR).optional(),
    type: z.enum(["personal", "group"]).readonly(),
    start_date: z.string(INVALID_TYPE_ERROR).refine((start_date) => dayjs(start_date).isValid(), {
      ...INVALID_TYPE_ERROR,
      path: ["start_date"],
    }),
    end_date: z.string(INVALID_TYPE_ERROR).refine((end_date) => dayjs(end_date).isValid(), {
      ...INVALID_TYPE_ERROR,
      path: ["end_date"],
    }),
    description: z
      .string(INVALID_TYPE_ERROR)
      .max(200, { message: "설명은 최대 200자까지 작성가능합니다." })
      .min(2, { message: "설명은 최소 2자 이상 작성해야합니다." })
      .optional(),
    tags: z.array(
      z.object(
        {
          id: z.number(),
          name: z.string(),
        },
        INVALID_TYPE_ERROR,
      ),
    ),
    importance: z.enum(["very_low", "low", "medium", "high", "very_high"], INVALID_TYPE_ERROR).optional(),
    is_repeat: z.enum(["yes", "no"], INVALID_TYPE_ERROR).optional(),
    repeat_end_option: z.enum(["none", "count", "end_date"], INVALID_TYPE_ERROR).optional(),
    repeat_interval: z.coerce
      .number(INVALID_TYPE_ERROR)
      .min(1, { message: "반복 횟수 최소값은 1입니다." })
      .max(30, { message: "반복 횟수 최대값은 30입니다." })
      .optional(),
    repeat_frequency: z.enum(["daily", "weekly", "monthly", "yearly"], INVALID_TYPE_ERROR).optional(),
    repeat_end_count: z.coerce
      .number(INVALID_TYPE_ERROR)
      .min(1, { message: "반복 종료 횟수 최소값은 1입니다." })
      .max(30, { message: "반복 종료 횟수 최대값은 30입니다." })
      .optional(),
    repeat_end_date: z
      .string(INVALID_TYPE_ERROR)
      .refine((repeat_end_date) => dayjs(repeat_end_date).isValid(), {
        ...INVALID_TYPE_ERROR,
        path: ["repeat_end_date"],
      })
      .optional(),
  })
  .refine(({ start_date, end_date }) => dayjs(start_date).isBefore(end_date), {
    message: "정상적인 기간이 아닙니다.",
    path: ["start_date"],
  })
  .refine(({ start_date, end_date }) => dayjs(start_date).isBefore(end_date), {
    message: "정상적인 기간이 아닙니다.",
    path: ["end_date"],
  });

export type PersonalScheduleFormValues = z.infer<typeof PERSONAL_SCHEDULE_FORM_SCHEMA>;

export interface DefaultValues {
  title: string;
  color: ColorType;
  type: ScheduleType;
  start_date: string;
  end_date: string;
  description: string;
  tags: Tag[];
  importance: ScheduleImportanceType;
  is_repeat: "yes" | "no";
  repeat_end_option?: "end_date" | "none" | "count";
  repeat_interval?: number;
  repeat_frequency?: RepeatIntervalType;
  repeat_end_count?: number;
  repeat_end_date?: string;
}

export interface DetailFormFieldProps {
  form: UseFormReturn<PersonalScheduleFormValues>;
  editMode: boolean;
}
