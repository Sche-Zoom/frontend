import { http, HttpResponse } from "msw";

import { MOCK_SCHEDULE, MOCK_SCHEDULES, MOCK_SUMMARY_SCHEDULES, MOCK_TAGS } from "@/mocks/handlers/schedule/mock-data";

const API_URL = "api/schedule";

export const ScheduleHandlers = [
  //개인 일정(개인 일정 + 본인 참가 그룹 일정) 목록 조회
  http.get<any, GetSchedulesReq, GetSchedulesRes>(`${API_URL}/list`, () => {
    return HttpResponse.json(MOCK_SCHEDULES);
  }),

  // 개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
  http.get<any, any, GetScheduleTagsRes>(`${API_URL}/total-tags`, () => {
    return HttpResponse.json(MOCK_TAGS);
  }),

  // 일자별로 요약된 개인 일정 목록과 다가올 일정 목록 조회
  http.get<any, GetSummarySchedulesReq, GetSummarySchedulesRes>(`${API_URL}/summary-list`, () => {
    return HttpResponse.json(MOCK_SUMMARY_SCHEDULES);
  }),

  //개인 일정(개인 일정 + 본인 참가 그룹 일정) 디테일 조회
  http.get<GetScheduleParam, any, GetScheduleRes>(`${API_URL}/:sid`, ({ params }) => {
    return HttpResponse.json({ id: Number(params.sid), ...MOCK_SCHEDULE });
  }),

  // 개인 반복 일정 수정
  http.patch<ModifyScheduleParam, ModifyRepeatScheduleReq, any>(`${API_URL}/repeat/:sid`, ({ params }) => {
    // const { sid } = params;
    return HttpResponse.text("ok");
  }),

  // 개인 일정 수정
  http.patch<ModifyScheduleParam, ModifyScheduleReq, any>(`${API_URL}/:sid`, ({ params }) => {
    // const { sid } = params;
    return HttpResponse.text("ok");
  }),

  // 개인 일정 삭제
  http.post<any, CreateScheduleReq, any>(API_URL, ({ params }) => {
    // const { sid } = params;
    return HttpResponse.text("ok");
  }),

  // 개인 일정 삭제
  http.delete<DeleteScheduleParam, DeleteScheduleReq, any>(`${API_URL}/:sid`, ({ params }) => {
    // const { sid } = params;
    return HttpResponse.text("ok");
  }),
];
