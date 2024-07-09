import apiRequest from "@/lib/api";

// 개인 일정(개인 일정 + 본인 참가 그룹 일정) 조회
export async function getPersonalSchedules(req: GetPersonalSchedulesReq): Promise<GetPersonalSchedulesRes> {
  return apiRequest("getPersonalSchedules", req);
}

//개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
export async function getPersonalTags(): Promise<GetPersonalTagsRes> {
  return apiRequest("getPersonalTags", null);
}
