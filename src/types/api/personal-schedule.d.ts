interface Tag {
  id: number;
  name: string;
}

interface GetPersonalSchedulesReq {
  start_date: string; // ISO8601
  end_date: String; // ISO8601
  tags?: number[];
}

interface PersonalSchedule {
  id: number;
  title: string;
  type: "Group" | "Personal";
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
