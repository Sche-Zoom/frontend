"use client";

import { Bell, ChevronRight, CircleUserRoundIcon, Menu, Settings } from "lucide-react";
import Link from "next/link";

import GroupAccordionMenu from "@/components/layout/group-accordion-menu";
import UserPopover from "@/components/layout/user-popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useUserStore } from "@/store/user";

import { Button } from "../ui/button";

export default function MobileNav() {
  const user = useUserStore();

  return (
    <Sheet>
      {/* 메뉴 버튼 */}
      <SheetTrigger className="p-0.5 lg:hidden">
        <Menu size={21} />
      </SheetTrigger>

      {/* 메뉴 버튼 클릭시 노출되는 사이드 메뉴   */}
      <SheetContent side="left" className="flex w-4/5 flex-col sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col justify-between text-sm">
          {/* 개인 일정 및 그륩 메뉴  */}
          <div className="flex-1 flex-col overflow-y-auto transition-opacity duration-500">
            <ul>
              <li className="border-b py-4 font-medium">
                <Link href="/" className="flex items-center justify-between">
                  개인 일정
                  <ChevronRight size={16} />
                </Link>
              </li>

              {/* 그룹별 메뉴 목록 */}
              {user.groups.map((group) => {
                return (
                  <li key={group.name}>
                    <GroupAccordionMenu group={group} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 개인 메뉴 */}
          <div className="flex flex-col">
            <Button variant={"ghost"} className="justify-start gap-5">
              <Bell className="text-muted-foreground" />
              알림
            </Button>
            {/* 사용자 정보 팝오버 */}
            <UserPopover user={user} side="top">
              <div className="hover:bg-accent hover:text-accent-foreground flex items-center justify-start gap-5 px-4 py-2 font-medium">
                <CircleUserRoundIcon className="text-muted-foreground" />
                프로필
              </div>
            </UserPopover>
            <Button variant={"ghost"} className="justify-start gap-5">
              <Settings className="text-muted-foreground" />
              설정
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
