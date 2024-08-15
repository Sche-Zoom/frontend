type CalendarViewType = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

type ColorType = "pink" | "blue" | "green" | "yellow" | "purple" | "orange" | "mint" | "lavender" | "beige" | "coral";

type ScheduleType = "group" | "personal";

type RepeatIntervalType = "daily" | "weekly" | "monthly";

type ScheduleImportanceType = "very_low" | "low" | "medium" | "high" | "very_high";

type ModifyType = "only" | "after_all" | "all";

interface Tag {
  id: number;
  name: string;
}

interface ScheduleDetail {
  title: string;
  description: string;
  importance: ScheduleImportanceType;
  color: ColorType;
  tags: string[];
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  repeat: {
    interval: RepeatIntervalType;
    until: string | null; // ISO8601
    count: number | null;
  } | null;
  reminder: number[]; // minute
  reminder_email_noti: boolean;
}

interface ScheduleChangeObject {
  id: string;
  isRepeat: boolean;
  type: ScheduleType;
  before_start_date: string; // ISO8601

  title?: string;
  description?: string;
  importance?: ScheduleImportanceType;
  color?: ColorType;
  tags?: string[];
  start_date?: string; // ISO8601
  end_date?: string; // ISO8601
  repeat?: {
    interval: RepeatIntervalType;
    until: string | null; // ISO8601
    count: number | null;
  } | null;
  reminder?: number[]; // minute
  reminder_email_noti?: boolean;
}
