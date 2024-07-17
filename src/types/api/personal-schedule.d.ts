interface Tag {
  id: number;
  name: string;
}

type ScheduleType = "group" | "personal";

interface GetPersonalSchedulesReq {
  start_date: string; // ISO8601
  end_date: string; // ISO8601
  tag_ids: number[] | undefined;
}

interface PersonalSchedule {
  id: number;
  title: string;
  type: ScheduleType;
  color: string;
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
