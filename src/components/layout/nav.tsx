"use client";

import { Bell, CalendarDays, Settings } from "lucide-react";
import React from "react";

import GroupIcon from "@/components/layout/group-icon";
import Sign from "@/components/layout/sign";
import UserPopover from "@/components/layout/user-popover";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUserStore } from "@/store/user";

export default function Nav() {
  const user = useUserStore();

  return (
    <div className="bg-muted z-50 hidden h-[calc(100vh-36px)] w-16 border-r pt-2 lg:sticky lg:left-0 lg:top-9 lg:block lg:py-3 ">
      <nav className="flex h-full flex-col justify-between">
        <TooltipProvider>
          {/* 개인 일정 및 그룹별 아이콘 */}
          <div className="flex flex-1 flex-col items-center gap-y-2 overflow-auto">
            {/* 개인 일정 아이콘 */}
            <Button
              variant={"icon"}
              size={"icon"}
              className="bg-background border transition-all duration-300 ease-in-out hover:rounded-2xl hover:shadow-lg"
            >
              <CalendarDays size={32} />
            </Button>

            {/* 그룹별 아이콘 목록 */}
            {user.groups.map((group) => {
              return <GroupIcon key={group.gid} group={group} />;
            })}
          </div>

          {/* 개인 메뉴 아이콘 */}
          <div className="flex flex-col items-center gap-y-1">
            {/* 사용자 정보 팝오버 */}
            <UserPopover user={user} side="right">
              <Sign size={12} src={user.thumbnail} />
            </UserPopover>

            {/* 알림 내용이 없는 경우 노출 (알림 기능 구현 이후 보완 예정) */}
            <Button variant={"ghost"} size={"icon"} className="text-muted-foreground">
              <Bell size={24} />
            </Button>

            {/* 설정 아이콘 (이후 기능 추가 예정) */}
            <Button variant={"ghost"} size={"icon"} className="text-muted-foreground">
              <Settings size={24} />
            </Button>
          </div>
        </TooltipProvider>
      </nav>
    </div>
  );
}
