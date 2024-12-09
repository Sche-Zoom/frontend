// mock data: get "/schedule/list"
export const MOCK_SCHEDULES: GetSchedulesRes = {
  schedules: [
    {
      id: 1234,
      title: "Weekly Team Meeting",
      color: "pink",
      dates: [
        {
          start_date: "2024-10-10T00:00:00",
          end_date: "2024-10-13T00:00:00",
        },
      ],
    },
    {
      id: 234,
      title: "Gym Session",
      color: "yellow",
      dates: [
        {
          start_date: "2024-10-12T18:00:00",
          end_date: "2024-10-12T19:00:00",
        },
      ],
    },
    {
      id: 24,
      title: "Team Lunch",
      color: "green",
      dates: [
        {
          start_date: "2024-10-08T12:00:00",
          end_date: "2024-10-09T13:00:00",
        },
        {
          start_date: "2024-10-15T00:00:00",
          end_date: "2024-10-18T00:00:00",
        },
      ],
    },
  ],
};

// mock data: get "/schedule/{sid}"
export const MOCK_SCHEDULE: Omit<GetScheduleRes, "id"> = {
  title: "Meeting with Client",
  description: "Discuss project details and deadlines",
  importance: "high",
  color: "pink",
  tags: [
    { id: 11, name: "Client" },
    { id: 22, name: "Meeting" },
  ],
  start_date: "2024-05-10T10:00:00",
  end_date: "2024-05-10T12:00:00",
  is_repeat: true,
  repeat_end_option: "count",
  repeat_frequency: "weekly",
  repeat_interval: 1,
  repeat_end_count: 1,
  repeat_endDate: null,
};

// mock data: get "/schedule/total-tags"
export const MOCK_TAGS: GetScheduleTagsRes = {
  schedule_tags: [
    { id: 1, name: "헬스" },
    { id: 2, name: "여행" },
    { id: 11, name: "Client" },
    { id: 22, name: "Meeting" },
  ],
};

// mock data: get "/schedule/summary-list"
export const MOCK_SUMMARY_SCHEDULES: GetSummarySchedulesRes = {
  side_schedules: [
    {
      start_date: "2024-07-01",
      schedules: [
        {
          id: 1,
          end_date: "2024-07-12",
          title: "Team Meeting",
          color: "pink",
          tag_names: ["study", "develop"],
        },
      ],
    },
    {
      start_date: "2024-07-15",
      schedules: [
        {
          id: 2,
          end_date: "2024-07-15",
          title: "Lunch with Team",
          color: "yellow",
          tag_names: [],
        },
        {
          id: 3,
          end_date: "2024-07-16",
          title: "Project Review",
          color: "green",
          tag_names: ["project", "develop"],
        },
      ],
    },
  ],
};
