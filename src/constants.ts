export const SCHEDULE_TYPE = {
  personal: "개인일정",
  group: "그룹일정",
} as const;

export const IMPORTANCE_TYPE = {
  very_low: "매우 낮음",
  low: "낮음",
  medium: "보통",
  high: "중요",
  very_high: "매우 중요",
} as const;

export const COLORS = [
  "pink",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "mint",
  "lavender",
  "beige",
  "coral",
] as const;

export const MODIFY_REPEAT_SCHEDULE_OPTIONS = [
  {
    id: "only",
    label: "선택한 일정만 수정",
  },
  {
    id: "after_all",
    label: "선택한 일정 이후 모든 일정 수정",
  },
  {
    id: "all",
    label: "모든 일정 수정",
  },
] as const;

export const INVALID_TYPE_ERROR = { message: "부적절한 값입니다." };
