import React, { useContext } from "react";

import SummarySchedules from "@/components/home/summary-schedules";
import { PersonalSideMenuContext } from "@/contexts/personal-side-menu";

interface Props {
  currentDate: string;
  checkedTagIds: number[] | null;
}

export default function PersonalSideMenu({ currentDate, checkedTagIds }: Props) {
  const { menuTab } = useContext(PersonalSideMenuContext);

  if (menuTab === null) return;

  return (
    <>
      {/* 월단위 일정 요약 사이드메뉴  */}
      {menuTab === "summarySchedules" && <SummarySchedules currentDate={currentDate} checkedTagIds={checkedTagIds} />}
    </>
  );
}
