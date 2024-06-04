"use client";

import { Bell, CalendarDays, LogOut, Settings, SquarePen, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useUserStore } from "@/store/user";

import { Separator } from "./ui/separator";




export default function Nav() {
  const user = useUserStore();

  return (
    <div className="z-50 hidden h-[calc(100vh-36px)] w-16  bg-gray-200 pt-2 lg:sticky lg:left-0 lg:top-9 lg:block lg:py-3">
      <nav className="flex h-full flex-col justify-between">
        <TooltipProvider>
          {/* 개인 일정 메뉴 및 그룹 별 메뉴*/}
          <div className="flex flex-1  flex-col items-center space-y-2 overflow-auto">
            <button className="size-12 rounded-full  bg-white p-2 hover:bg-gray-300">
              <CalendarDays size={32} />
            </button>
          
            {/* 그룹 아이콘 목록 */}
            {user.groups.map((group) => {
              return (
                <Tooltip key={group.gid}>
                  <TooltipTrigger>                    
                    <Link  href={`/group/${group.gid}`}>
                      {/* 그룹 썸네일 이미지 */}
                      <div className="flex size-12 items-center rounded-full bg-white p-1 hover:bg-gray-300">    
                        {group.thumbnail !== null 
                          ? <Avatar>
                            <AvatarImage src={group.thumbnail} />
                            <AvatarFallback>{`${group.name}_thumbnail`}</AvatarFallback>
                          </Avatar>
                          : <div className="truncate">{group.name}</div>                          
                        }        
                      </div>                
                    </Link>
                  </TooltipTrigger>
                    
                  {/* 마우스 hover 시 그룹 이름 노출 */}
                  <TooltipContent className="absolute z-20 translate-x-7"><p>{group.name}</p></TooltipContent>
                </Tooltip>        
              );
            })}
          </div>

          {/* 공통 메뉴 부분: 사용자 프로필, 설정, 알림 */}
          <div className="flex flex-col items-center space-y-1" >

            {/* 사용자 정보 Popover */}
            <Popover>
              <PopoverTrigger>
                {user.thumnail !== null 
                  ? <Avatar className="size-12 bg-gray-100">
                    <AvatarImage src={user.thumnail} />
                    <AvatarFallback>{`${user.nickname}_thumbnail`}</AvatarFallback>
                  </Avatar>
                  : <div className="flex size-12 items-center justify-center rounded-full bg-gray-100">                
                    <UserRound size={32} color="dimgray" />
                  </div>
                }

              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="mb-3 flex space-x-6">
                  {/* 사용자 썸네일 이미지 */}
                  {user.thumnail !== null 
                    ? <Avatar className="size-16 bg-gray-100">
                      <AvatarImage src={user.thumnail} />
                      <AvatarFallback>{`${user.nickname}_thumbnail`}</AvatarFallback>
                    </Avatar>
                    : <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">                
                      <UserRound size={48} color="dimgray" />
                    </div>
                  }

                  {/* 사용자 정보 */}
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-lg font-medium">{user.nickname}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>

                {/* 사용자 설명 부분 */}
                <p className="rounded-sm border bg-gray-100 p-2 text-sm">
                  {user.description}
                </p>

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
            <button className="flex size-12 items-center justify-center">                
              <Bell size={32} color="dimgray" />
            </button>

            {/* 설정 아이콘 (이후 기능 추가 예정) */}
            <button className="flex size-12 items-center justify-center">                
              <Settings size={32} color="dimgray" />
            </button>
          </div>
        </TooltipProvider>
      </nav>
    </div>
  );
}
