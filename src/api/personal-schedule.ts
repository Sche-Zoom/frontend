import apiRequest from "@/lib/api";

// 개인 일정(개인 일정 + 본인 참가 그룹 일정) 조회
export async function getPersonalSchedules(req: GetPersonalSchedulesReq): Promise<GetPersonalSchedulesRes> {
  return apiRequest("getPersonalSchedules", req);
}

//개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
export async function getPersonalTags(): Promise<GetPersonalTagsRes> {
  return apiRequest("getPersonalTags", null);
}

// 일자별로 요약된 개인 일정 목록과 다가올 일정 목록 조회
export async function getPersonalSummarySchedules(
  req: GetPersonalSummarySchedulesReq,
): Promise<GetPersonalSummarySchedulesRes> {
  return apiRequest("getPersonalSummarySchedules", req);
}

// 개인 일정 일부 수정
export async function modifyPersonalSchedule(req: ModifyPersonalScheduleReq, pathParam: string) {
  return apiRequest("modifyPersonalSchedule", req, pathParam);
}

//개인 반복 일정 수정
export async function modifyPersonalRepeatSchedule(req: ModifyPersonalRepeatScheduleReq, pathParam: string) {
  return apiRequest("modifyPersonalRepeatSchedule", req, pathParam);
}
