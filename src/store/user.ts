import { create } from "zustand";

export interface UserStore {
  id: string;
  email: string;
}

// 임시 테스트용 데이터 mock 서버 업데이트 이후 수정 예정
export const useUserStore = create<UserStore>(() => ({
  id: "user3356",
  email: "yiccfee@naver.com",
}));
