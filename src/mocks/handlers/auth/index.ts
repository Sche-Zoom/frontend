import { http, HttpResponse } from "msw";

const API_URL = "api/auth";

export const AuthHandlers = [
  // 로그인
  http.post<any, LoginReq, any>(`${API_URL}/login`, ({ params }) => {
    // 가짜 JWT 토큰 생성 (예제용)
    const mockJwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2Mjk3OTc3NzYsImV4cCI6MTYyOTgwMTM3Nn0.rR1fLPC-bkCvpIJyO6y5xETrX6AcP5E7bnEVYmP5tDU";

    return new HttpResponse("ok", {
      headers: { "Set-Cookie": `authToken=${mockJwtToken}; Path=/; HttpOnly` },
    });
  }),

  // 회원가입
  http.post<any, SignupReq, any>(`${API_URL}/signup`, ({ params }) => {
    return HttpResponse.text("ok");
  }),

  // 중복 email 확인
  http.post<any, CheckEmailReq, CheckEmailRes>(`${API_URL}/check-email`, ({ params }) => {
    return HttpResponse.json({ available: true });
  }),

  // 중복 id 확인
  http.post<any, CheckIdReq, CheckIdRes>(`${API_URL}/check-id`, ({ params }) => {
    return HttpResponse.json({ available: true });
  }),

  // id 찾기
  http.post<any, FindIdReq, FindIdRes>(`${API_URL}/find-id`, ({ params }) => {
    return HttpResponse.json({ success: true, id: "userid12332", created_at: "2024-07-23" });
  }),

  // 로그아웃
  http.post(`${API_URL}/logout`, ({ params }) => {
    return new HttpResponse("ok", {
      headers: {
        "Set-Cookie": "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
      },
    });
  }),

  // 이메일 인증코드 발송
  http.post(`${API_URL}/email/code`, ({ params }) => {
    return HttpResponse.text("ok");
  }),

  // 이메일 코드 인증
  http.post(`${API_URL}/email/verify-code`, ({ params }) => {
    return HttpResponse.json({ success: true });
  }),
];
