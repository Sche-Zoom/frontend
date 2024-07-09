import { http, HttpResponse } from "msw";

const API_URL = "api/per-schedule";

export const PersonalScheduleHandlers = [
  //개인 일정(개인 일정 + 본인 참가 그룹 일정) 조회
  http.post<any, GetPerScheduleReq, GetPerScheduleRes>(`${API_URL}/view`, ({ request }) => {
    return HttpResponse.json({
      schedules: [
        {
          id: 1234,
          title: "Weekly Team Meeting",
          type: "Group",
          color: "#ffe12e",
          dates: [
            {
              start_date: "2024-06-10T09:00:00Z",
              end_date: "2024-06-10T10:00:00Z",
            },
          ],
        },
        {
          id: 234,
          title: "Gym Session",
          type: "Personal",
          color: "#ffe12e",
          dates: [
            {
              start_date: "2024-06-12T18:00:00Z",
              end_date: "2024-06-12T19:00:00Z",
            },
          ],
        },
        {
          id: 24,
          title: "Team Lunch",
          type: "Personal",
          color: "#ffe12e",
          dates: [
            {
              start_date: "2024-06-8T12:00:00Z",
              end_date: "2024-06-9T13:00:00Z",
            },
            {
              start_date: "2024-06-15T12:00:00Z",
              end_date: "2024-06-16T13:00:00Z",
            },
          ],
        },
      ],
    });
  }),

  // 개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
  http.get<any, any, GetPerScheduleFiltersRes>(`${API_URL}/total-tags`, ({ request }) => {
    return HttpResponse.json({
      per_tags: [
        {
          id: 1,
          name: "헬스",
        },
        {
          id: 2,
          name: "여행",
        },
      ],
      groups: [
        {
          id: 124,
          name: "group101",
          tags: [
            {
              id: 12,
              name: "A 개발팀",
            },
            {
              id: 13,
              name: "B 개발팀",
            },
          ],
        },
      ],
    });
  }),
];
