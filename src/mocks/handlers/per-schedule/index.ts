import { http, HttpResponse } from "msw";

import {
  MOCK_PERSONAL_SCHEDULE,
  MOCK_PERSONAL_SCHEDULES,
  MOCK_PERSONAL_SUMMARY_SCHEDULES,
  MOCK_PERSONAL_TAGS,
} from "@/mocks/handlers/per-schedule/mock-data";

const API_URL = "api/per-schedule";

export const PersonalScheduleHandlers = [
  //개인 일정(개인 일정 + 본인 참가 그룹 일정) 목록 조회
  http.get<any, GetPersonalSchedulesReq, GetPersonalSchedulesRes>(`${API_URL}/list`, () => {
    return HttpResponse.json(MOCK_PERSONAL_SCHEDULES);
  }),

  // 개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
  http.get<any, any, GetPersonalTagsRes>(`${API_URL}/total-tags`, () => {
    return HttpResponse.json(MOCK_PERSONAL_TAGS);
  }),

  // 일자별로 요약된 개인 일정 목록과 다가올 일정 목록 조회
  http.get<any, GetPersonalSummarySchedulesReq, GetPersonalSummarySchedulesRes>(`${API_URL}/summary-list`, () => {
    return HttpResponse.json(MOCK_PERSONAL_SUMMARY_SCHEDULES);
  }),

  //개인 일정(개인 일정 + 본인 참가 그룹 일정) 디테일 조회
  http.get<GetPersonalScheduleParam, any, GetPersonalScheduleRes>(`${API_URL}/:sid`, ({ params }) => {
    return HttpResponse.json({ id: Number(params.sid), ...MOCK_PERSONAL_SCHEDULE });
  }),

  // 개인 반복 일정 수정
  http.patch<ModifyPersonalScheduleParam, ModifyPersonalRepeatScheduleReq, any>(
    `${API_URL}/repeat/:sid`,
    ({ params }) => {
      // const { sid } = params;
      return HttpResponse.text("ok");
    },
  ),

  // 개인 일정 수정
  http.patch<ModifyPersonalScheduleParam, ModifyPersonalScheduleReq, any>(`${API_URL}/:sid`, ({ params }) => {
    // const { sid } = params;
    return HttpResponse.text("ok");
  }),

  // 개인 일정 삭제
  http.delete<DeletePersonalScheduleParam, DeletePersonalScheduleReq, any>(`${API_URL}/:sid`, ({ params }) => {
    // const { sid } = params;
    return HttpResponse.text("ok");
  }),
];
