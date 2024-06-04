import { create } from "zustand";

interface UserStore {
  id: number
  userId: string
  description: string
  email: string
  thumnail: string | null
  nickname: string
  groups: {
    gid: number,
    name: string,
    is_admin:boolean,
    channels: {
      type: "chat" | "voice" | "announe",
      name: string
    }[],
    thumbnail: string | null
  }[];
}




export const useUserStore = create<UserStore>(() => ({
  // groups: [],

  // 임시 테스트용 데이터 mock 서버 업데이트 이후 수정 예정
  id: 1244554,
  userId: "edstvb3356",
  description: "웹개발을 좋아합니다.",
  email: "yiccfee@naver.com",
  thumnail: null,
  nickname: "bob",
  groups: [
    {
      gid: 123,
      name: "Study Group",
      is_admin:true,
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
          type: "announe",
          name: "Announcements",
        },
      ],
      "thumbnail": null,
    },
    {
      "gid": 456,
      name: "Fitness Club",
      "is_admin":false,
      "channels": [
        {
          type: "chat",
          name: "General Chat",
        },
        {
          type: "voice",
          name: "Voice Channel",
        },
        {
          type: "announe",
          name: "Announcements",
        },
      ],
      "thumbnail": null,
    },
  ],
}));