"use client";

import { Bell, CalendarDays, LogOut, Settings, SquarePen, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserStore } from "@/store/user";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Nav() {
  const user = useUserStore();

  return (
    <div className="z-50 hidden h-[calc(100vh-36px)] w-16  bg-gray-200 pt-2 lg:sticky lg:left-0 lg:top-9 lg:block lg:py-3">
      <nav className="flex h-full flex-col justify-between">
        <TooltipProvider>
          {/* 개인 일정 메뉴 및 그룹 별 메뉴*/}
          <div className="flex flex-1  flex-col items-center space-y-2 overflow-auto">
            <Button variant={"icon"} size={"icon"}>
              <CalendarDays />
            </Button>

            {/* 그룹 아이콘 목록 */}
            {user.groups.map((group) => {
              return (
                <Tooltip key={group.gid} delayDuration={0}>
                  <TooltipTrigger>
                    <Link href={`/group/${group.gid}`}>
                      {/* 그룹 썸네일 이미지 */}
                      <Avatar className="size-12 bg-white p-1 hover:bg-gray-300">
                        <AvatarImage src={group.thumbnail ?? ""} />
                        <AvatarFallback className="justify-start truncate bg-white">{`${group.name}_thumbnail`}</AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>

                  {/* 마우스 hover 시 그룹 이름 노출 */}
                  <TooltipContent side="right" align="start">
                    <p>{group.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* 공통 메뉴 부분: 사용자 프로필, 설정, 알림 */}
          <div className="flex flex-col items-center gap-y-1">
            {/* 사용자 정보 Popover */}
            <Popover>
              <PopoverTrigger>
                <Avatar className="text-muted size-12">
                  <AvatarImage src={user.thumbnail ?? ""} />
                  <AvatarFallback>
                    <UserRound className="text-muted-foreground size-8" />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="mb-3 flex items-center space-x-6">
                  {/* 사용자 썸네일 이미지 */}
                  <Avatar className="size-16 bg-gray-100">
                    <AvatarImage src={user.thumbnail || ""} />
                    <AvatarFallback>
                      <UserRound size={48} className="text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  {/* 사용자 정보 */}
                  <div>
                    <p className="text-lg font-medium">{user.nickname}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>

                {/* 사용자 설명 부분 */}
                <p className="rounded-sm border bg-gray-100 p-2 text-sm">{user.description}</p>

                <Separator className="mb-2 mt-4" />

                {/* 정보 수정 및 로그아웃 메뉴 (기능은 추후 추가) */}
                <ul>
                  <li className="flex items-center space-x-4 p-2 font-medium">
                    <SquarePen size="18" />
                    <p>정보 수정</p>
                  </li>
                  <li className="flex items-center space-x-4 p-2 font-medium">
                    <LogOut size="18" />
                    <p>로그아웃</p>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>

            {/* 알림 내용이 없는 경우 노출 (알림 기능 구현 이후 보완 예정) */}
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <Bell size={32} color="dimgray" />
            </Button>

            {/* 설정 아이콘 (이후 기능 추가 예정) */}
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <Settings size={32} color="dimgray" />
            </Button>
          </div>
        </TooltipProvider>
      </nav>
    </div>
  );
}
