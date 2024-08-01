interface Tag {
  id: number;
  name: string;
}

type ColorType = "pink" | "blue" | "green" | "yellow" | "purple" | "orange" | "mint" | "lavender" | "beige" | "coral";

type ScheduleType = "group" | "personal";

interface GetPersonalSchedulesReq {
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  tag_ids?: number[];
}

interface PersonalSchedule {
  id: number;
  title: string;
  type: ScheduleType;
  color: ColorType;
  dates: {
    start_date: string; // ISO8601
    end_date: string; // ISO8601
  }[];
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

interface PersonalSummarySchedule {
  start_date: string; // ISO8601 (YYYY-MM-DD)
  schedules: {
    id: number;
    end_date: string; // ISO8601 (YYYY-MM-DD)
    title: string;
    type: ScheduleType;
    color: ColorType;
    tag_names: string[];
  }[];
}

interface GetPersonalSummarySchedulesReq {
  selected_date: string; // ISO8601 (YYYY-MM-DD)
  tag_ids?: number[];
}

interface GetPersonalSummarySchedulesRes {
  side_schedules: PersonalSummarySchedule[];
}
