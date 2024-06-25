import axios from "axios";

import { ApiEndpoint, apiEndpoint } from "@/lib/api-dict";

const api = (function () {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    timeout: 10000,
  });

  return instance;
})();

const apiRequest = async <T_Key extends keyof ApiEndpoint>(
  key: T_Key,
  req: ApiEndpoint[T_Key]["req"],
): Promise<ApiEndpoint[T_Key]["res"]> => {
  const { url, method } = apiEndpoint[key];

  const res = await api.request({
    url,
    method,
    data: method !== "GET" ? req : undefined,
    params: method === "GET" ? req : undefined,
  });

  // TODO: BackEnd에서 요청 실패 시 응답하는 정의 필요
  if (!res.data) throw new Error("데이터를 불러오지 못했습니다.");

  return res.data;
};

export default apiRequest;
