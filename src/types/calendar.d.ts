type CalendarViewType = "month" | "week" | "day";

type ColorType = "pink" | "blue" | "green" | "yellow" | "purple" | "orange" | "mint" | "lavender" | "beige" | "coral";

type RepeatFrequencyType = "daily" | "weekly" | "monthly" | "yearly";

type ScheduleImportanceType = "very_low" | "low" | "medium" | "high" | "very_high";

type RepeatEndOptionType = "count" | "end_date" | null;

type ModifyOptionType = "only" | "after_all" | "all";

type DeleteOptionType = ModifyOptionType & {};

type SideMenuType = "summarySchedules" | null;

type ScheduleViewType = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

interface CalendarDateState {
  startDate: string;
  endDate: string;
  currentDate: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Schedule {
  id: number;
  title: string;
  color: ColorType;
  dates: {
    start_date: string; // ISO8601
    end_date: string; // ISO8601
  }[];
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
  repeat_frequency?: RepeatFrequencyType;
  repeat_interval?: number;
  repeat_endDate?: string | null; // ISO8601
  repeat_end_count?: number | null;
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
  repeatFrequency?: RepeatFrequencyType;
  repeatInterval?: number;
  repeatEndDate?: string; // ISO8601
  repeatCount?: number;
}

interface SummarySchedule {
  start_date: string; // ISO8601 (YYYY-MM-DD)
  schedules: {
    id: number;
    end_date: string; // ISO8601 (YYYY-MM-DD)
    title: string;
    color: ColorType;
    tag_names: string[];
  }[];
}

interface ModifyScheduleVariables {
  req: ModifyScheduleReq;
  pathParam: string;
}

interface ModifyRepeatScheduleVariables {
  req: ModifyRepeatScheduleReq;
  pathParam: string;
}

interface DeleteScheduleVariables {
  req: DeleteScheduleReq;
  pathParam: string;
}

interface CreateScheduleVariables {
  req: CreateScheduleReq;
}

interface LoginVariables {
  req: LoginReq;
}

interface SignupVariables {
  req: SignupReq;
}

interface CheckIdVariables {
  req: CheckIdReq;
}

interface CheckEmailVariables {
  req: CheckEmailReq;
}

interface FindIdVariables {
  req: FindIdReq;
}
