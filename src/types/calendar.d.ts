type CalendarViewType = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

type ColorType = "pink" | "blue" | "green" | "yellow" | "purple" | "orange" | "mint" | "lavender" | "beige" | "coral";

type ScheduleType = "group" | "personal";

type RepeatIntervalType = "daily" | "weekly" | "monthly" | "yearly";

type ScheduleImportanceType = "very_low" | "low" | "medium" | "high" | "very_high";

type RepeatEndOptionType = "count" | "end_date" | null;

type ModifyOptionType = "only" | "after_all" | "all";

type DeleteOptionType = ModifyOptionType & {};

interface Tag {
  id: number;
  name: string;
}

interface ScheduleDetail {
  id: number;
  title: string;
  description: string;
  importance: ScheduleImportanceType;
  color: ColorType;
  tags: Tag[];
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  is_repeat?: boolean;
  repeat_end_option?: "count" | "end_date" | "none";
  repeat_frequency?: RepeatIntervalType;
  repeat_interval?: number;
  repeat_endDate?: string | null; // ISO8601
  repeat_end_count?: number | null;
  reminder: number[]; // minute
  reminder_email_noti: boolean;
}

interface ScheduleChangeObject {
  id: number;
  initialIsRepeat: boolean;
  initialStartDate: string; // ISO8601
  initialEndDate: string; // ISO8601

  title?: string;
  description?: string;
  importance?: ScheduleImportanceType;
  color?: ColorType;
  tags?: tag[];
  startDate?: string; // ISO8601
  endDate?: string; // ISO8601
  isRepeat?: boolean;
  repeatEndOption?: "count" | "endDate" | "none";
  repeatFrequency?: RepeatIntervalType;
  repeatInterval?: number;
  repeatEndDate?: string; // ISO8601
  repeatCount?: number;
  // reminder?: number[]; // minute
  // reminderEmailNoti?: boolean;
}
