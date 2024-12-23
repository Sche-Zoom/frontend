"use client";

import { useEffect } from "react";

import ScheduleCalendar from "@/components/schedule/calendar";
import apiRequest from "@/lib/api";
import { useUserStore } from "@/store/user";

export default function Page() {
  const { id, setUser } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      const data = await apiRequest("getMyInfo");
      setUser(data);
    }
    if (!id) fetchData();
  }, [id, setUser]);
  return <ScheduleCalendar />;
}
