interface GetPersonalSchedulesReq {
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  tag_ids?: number[];
}

interface GetPersonalSchedulesRes {
  schedules: PersonalSchedule[];
}

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

interface ModifyPersonalScheduleParam {
  sid: string;
}

type ModifyPersonalScheduleReq = Omit<ScheduleChangeObject, "id" | "isRepeat">;

interface ModifyPersonalRepeatScheduleReq extends ModifyPersonalScheduleReq {
  modify_type: ModifyType;
}
