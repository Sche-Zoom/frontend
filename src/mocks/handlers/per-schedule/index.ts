import { http, HttpResponse } from "msw";

import {
  MOCK_PERSONAL_SCHEDULES,
  MOCK_PERSONAL_SUMMARY_SCHEDULES,
  MOCK_PERSONAL_TAGS,
} from "@/mocks/handlers/per-schedule/mock-data";

const API_URL = "api/per-schedule";

export const PersonalScheduleHandlers = [
  //개인 일정(개인 일정 + 본인 참가 그룹 일정) 조회
  http.get<GetPersonalSchedulesReq, any, GetPersonalSchedulesRes>(`${API_URL}/view`, ({ request }) => {
    return HttpResponse.json(MOCK_PERSONAL_SCHEDULES);
  }),

  // 개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
  http.get<any, any, GetPersonalTagsRes>(`${API_URL}/total-tags`, ({ request }) => {
    return HttpResponse.json(MOCK_PERSONAL_TAGS);
  }),

  // 일자별로 요약된 개인 일정 목록과 다가올 일정 목록 조회
  http.get<GetPersonalSummarySchedulesReq, any, GetPersonalSummarySchedulesRes>(`${API_URL}/summary-list`, () => {
    return HttpResponse.json(MOCK_PERSONAL_SUMMARY_SCHEDULES);
  }),
];