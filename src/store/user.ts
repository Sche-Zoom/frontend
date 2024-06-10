import { create } from "zustand";

export interface UserStore {
  id: number;
  userId: string;
  description: string;
  email: string;
  thumbnail: string | null;
  nickname: string;
  groups: MyGroup[];
}

export interface MyGroup {
  gid: number;
  name: string;
  isAdmin: boolean;
  channels: {
    type: "chat" | "voice" | "announce";
    name: string;
  }[];
  thumbnail: string | null;
}

export const useUserStore = create<UserStore>(() => ({
  // groups: [],

  // 임시 테스트용 데이터 mock 서버 업데이트 이후 수정 예정
  id: 1244554,
  userId: "edstvb3356",
  description: "웹개발을 좋아합니다.",
  email: "yiccfee@naver.com",
  thumbnail: null,
  nickname: "bob",
  groups: [
    {
      gid: 123,
      name: "Study Group",
      isAdmin: true,
      channels: [
        {
          type: "chat",
          name: "General Chat",
        },
        {
          type: "voice",
          name: "Voice Channel",
        },
        {
          type: "announce",
          name: "Announcements",
        },
      ],
      thumbnail: null,
    },
    {
      gid: 456,
      name: "Fitness Club",
      isAdmin: false,
      channels: [
        {
          type: "chat",
          name: "General Chat",
        },
        {
          type: "voice",
          name: "Voice Channel",
        },
        {
          type: "announce",
          name: "Announcements",
        },
      ],
      thumbnail: null,
    },
  ],
}));
