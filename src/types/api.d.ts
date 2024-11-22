interface GetSchedulesReq {
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  tag_ids?: number[];
}

interface GetSchedulesRes {
  schedules: Schedule[];
}

interface GetScheduleParam {
  sid: string;
}

interface GetScheduleRes extends ScheduleDetail {}

interface GetScheduleTagsRes {
  per_tags: Tag[];
  groups: {
    id: number;
    name: string;
    tags: Tag[];
  }[];
}

interface GetSummarySchedulesReq {
  selected_date: string; // ISO8601 (YYYY-MM-DD)
  tag_ids?: number[];
}

interface GetSummarySchedulesRes {
  side_schedules: SummarySchedule[];
}

interface SchedulePathParam {
  sid: string;
}

type ModifyScheduleParam = SchedulePathParam & {};
type DeleteScheduleParam = SchedulePathParam & {};

type ModifyScheduleReq = {
  tags?: number[];
  title?: string;
  description?: string;
  importance?: ScheduleImportanceType;
  color?: ColorType;
  start_date?: string; // ISO8601
  end_date?: string; // ISO8601
  is_repeat?: boolean;
  repeat_end_option?: RepeatEndOptionType;
  repeat_frequency?: RepeatFrequencyType;
  repeat_interval?: number;
  repeat_end_date?: string; // ISO8601
  repeat_end_count?: number;
  // reminder?: number[]; // minute
  // reminder_email_noti?: boolean;
};

type ModifyRepeatScheduleReq = ModifyScheduleReq & {
  modify_type: ModifyOptionType;
  before_start_date: string; // ISO8601
  before_end_date: string; // ISO8601
};

interface DeleteScheduleReq {
  delete_type: DeleteOptionType;
}

interface CreateScheduleReq {
  tags: number[];
  title: string;
  description: string;
  importance: ScheduleImportanceType;
  color: ColorType;
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  is_repeat: boolean;
  repeat_end_option?: RepeatEndOptionType;
  repeat_frequency?: RepeatFrequencyType | null;
  repeat_interval?: number | null;
  repeat_end_date?: string | null; // ISO8601
  repeat_end_count?: number | null;
}
