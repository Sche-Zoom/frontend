import { http, HttpResponse } from "msw";

const API_URL = "api/auth";

export const AuthHandlers = [
  // 로그인
  http.post<any, LoginReq, any>(`${API_URL}/login`, () => {
    // 가짜 JWT 토큰 생성 (예제용)
    const mockJwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2Mjk3OTc3NzYsImV4cCI6MTYyOTgwMTM3Nn0.rR1fLPC-bkCvpIJyO6y5xETrX6AcP5E7bnEVYmP5tDU";

    const user = JSON.stringify({
      id: "user3356",
      email: "yiccfee@naver.com",
    });

    return new HttpResponse(user, {
      headers: { "Set-Cookie": `authToken=${mockJwtToken}; Path=/; HttpOnly` },
    });
  }),

  // 회원가입
  http.post<any, SignupReq, any>(`${API_URL}/signup`, () => {
    return HttpResponse.text("ok");
  }),

  // 중복 email 확인
  http.post<any, CheckEmailReq, CheckEmailRes>(`${API_URL}/check-email`, () => {
    return HttpResponse.json({ available: true });
  }),

  // 중복 id 확인
  http.post<any, CheckIdReq, CheckIdRes>(`${API_URL}/check-id`, () => {
    return HttpResponse.json({ available: true });
  }),

  // id 찾기
  http.post<any, FindIdReq, FindIdRes>(`${API_URL}/find-id`, () => {
    return HttpResponse.json({ success: true, id: "userid12332", created_at: "2024-07-23" });
  }),

  // 이메일 인증코드 발송
  http.post<any, SendEmailCodeReq, any>(`${API_URL}/email/code`, () => {
    return HttpResponse.text("ok");
  }),

  // 이메일 코드 인증
  http.post<any, VerifyEmailCodeReq, VerifyEmailCodeRes>(`${API_URL}/email/verify-code`, () => {
    return HttpResponse.json({ success: true });
  }),

  // 비밀번호 인증코드 발송
  http.post<any, SendPwCodeReq, SendPwCodeRes>(`${API_URL}/password/code`, () => {
    return HttpResponse.json({ success: true });
  }),

  // 비밀번호 코드 인증
  http.post<any, VerifyPwCodeReq, VerifyPwCodeRes>(`${API_URL}/password/verify-code`, () => {
    return HttpResponse.json({ success: true });
  }),

  // 비밀번호 재설정
  http.post<any, ResetPwReq>(`${API_URL}/password`, () => {
    return HttpResponse.text("ok");
  }),
];
