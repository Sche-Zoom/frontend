import { create } from "zustand";

export interface UserStore {
  id: string | null;
  email: string | null;
  setUser: (userData: { id: string; email: string }) => void;
}

// 임시 테스트용 데이터 mock 서버 업데이트 이후 수정 예정
export const useUserStore = create<UserStore>((set) => ({
  id: null,
  email: null,
  setUser: (userData) => set(userData),
}));
