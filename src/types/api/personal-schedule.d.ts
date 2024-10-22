interface GetPersonalSchedulesReq {
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  tag_ids?: number[];
}

interface GetPersonalSchedulesRes {
  schedules: PersonalSchedule[];
}

interface GetPersonalScheduleParam {
  sid: string;
}

interface GetPersonalScheduleRes extends PersonalScheduleDetail {}

interface GetPersonalTagsRes {
  per_tags: Tag[];
  groups: {
    id: number;
    name: string;
    tags: Tag[];
  }[];
}

interface GetPersonalSummarySchedulesReq {
  selected_date: string; // ISO8601 (YYYY-MM-DD)
  tag_ids?: number[];
}

interface GetPersonalSummarySchedulesRes {
  side_schedules: PersonalSummarySchedule[];
}

interface PersonalSchedulePathParam {
  sid: string;
}

type ModifyPersonalScheduleParam = PersonalSchedulePathParam & {};
type DeletePersonalScheduleParam = PersonalSchedulePathParam & {};

type ModifyPersonalScheduleReq = {
  tags?: number[];
  title?: string;
  description?: string;
  importance?: ScheduleImportanceType;
  color?: ColorType;
  start_date?: string; // ISO8601
  end_date?: string; // ISO8601
  is_repeat?: boolean;
  repeat_end_option?: RepeatEndOptionType;
  repeat_frequency?: RepeatIntervalType;
  repeat_interval?: number;
  repeat_end_date?: string; // ISO8601
  repeat_end_count?: number;
  // reminder?: number[]; // minute
  // reminder_email_noti?: boolean;
};

type ModifyPersonalRepeatScheduleReq = ModifyPersonalScheduleReq & {
  modify_type: ModifyOptionType;
  before_start_date: string; // ISO8601
  before_end_date: string; // ISO8601
};

interface DeletePersonalScheduleReq {
  delete_type: DeleteOptionType;
}

interface CreatePersonalScheduleReq {
  tags: number[];
  title: string;
  description: string;
  importance: ScheduleImportanceType;
  color: ColorType;
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  is_repeat: boolean;
  repeat_end_option?: RepeatEndOptionType;
  repeat_frequency?: RepeatIntervalType | null;
  repeat_interval?: number | null;
  repeat_end_date?: string | null; // ISO8601
  repeat_end_count?: number | null;
}
