import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { PerScheduleFilter } from "@/types/api/per-schedule";

export interface PerSchFilterStore {
  isLoading: boolean;
  error: Error | null;
  totalFilter: PerScheduleFilter | null;
  checkedTags: number[] | null;
  setFilters: (filter: PerScheduleFilter, isLoading?: boolean, error?: Error | null) => void;
  checkTag: (id: number) => void;
  checkTags: (ids: number[]) => void;
  unCheckTag: (id: number) => void;
  unCheckTags: (ids: number[]) => void;
}

const store: StateCreator<PerSchFilterStore> = (set) => ({
  isLoading: false,
  error: null,
  totalFilter: null, // 개인 태그 목록 + 속한 각 그룹별 태그 목록
  checkedTags: null, // 활성화된 태그 id 목록

  // 전체 필터 세팅
  setFilters: (filter, isLoading, error) => {
    if (isLoading) set(() => ({ isLoading: true, totalFilter: null, checkedTags: null }));
    if (error) set(() => ({ isLoading: false, error }));
    set(({ checkedTags }) => {
      const checkedGroupTagIds = filter.groups.flatMap((group) => group.tags.map((tag) => tag.id));
      const checkedTagIds = filter.per_tags.map((tag) => tag.id);

      return { totalFilter: filter, checkedTags: checkedTags ?? [...checkedGroupTagIds, ...checkedTagIds] };
    });
  },

  // 체크 활성화된 태그 추가
  checkTag: (id) => set(({ checkedTags }) => ({ checkedTags: Array.from(new Set(checkedTags).add(id)) })),

  // 체크 활성화된 태그 목록 추가
  checkTags: (ids) =>
    set(({ checkedTags }) => {
      const tempSet = new Set(checkedTags);
      ids.forEach((id) => tempSet.add(id));
      return { checkedTags: Array.from(tempSet) };
    }),

  // 비활성화된 태그 checkedTags 에서 제거
  unCheckTag: (id) =>
    set(({ checkedTags }) => {
      const tempSet = new Set(checkedTags);
      tempSet?.delete(id);
      return { checkedTags: Array.from(tempSet) };
    }),

  // 비활성화된 태그 목록 checkedTags에서 제거
  unCheckTags: (ids) =>
    set(({ checkedTags }) => {
      const tempSet = new Set(checkedTags);
      ids.forEach((id) => tempSet.delete(id));
      return { checkedTags: Array.from(tempSet) };
    }),
});

// development 환경에서 devtools 활성화
export const usePerSchFilterStore = process.env.NODE_ENV === "production" ? create(store) : create(devtools(store));
