"use client";

import { Bell, ChevronRight, CircleUserRoundIcon, Settings } from "lucide-react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useUserStore } from "@/store/user";

import { Button } from "./ui/button";

export default function MobileNav() {
  const groups = useUserStore((state) => state.groups);

  return (
    <nav className="flex flex-1 flex-col justify-between text-sm">
      <div className="flex-1 flex-col overflow-y-auto transition-opacity duration-500">
        <ul>
          <li className="border-b py-4 font-medium">
            <Link href="/" className="flex items-center justify-between">
              개인 일정
              <ChevronRight size={16} />
            </Link>
          </li>

          {/* 각 그룹별 메뉴 */}
          {groups.map((group) => {
            return (
              <li key={group.name}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="group-1">
                    <AccordionTrigger>{group.name}</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li className="mb-2 ml-2">일정</li>
                        <li className="mb-2 ml-2">일정 투표</li>
                        <li className="mb-2 ml-2">일정 종합</li>
                        <li className="mb-2 ml-2">공지사항</li>
                      </ul>

                      {/* 관리 권한이 있는 경우 관리자 메뉴 노출 */}
                      {group.isAdmin && (
                        <>
                          <div className="mb-1.5 ml-1 mt-3 font-medium text-gray-600">관리자 메뉴</div>
                          <ul>
                            <li className="mb-2 ml-2">일정 관리</li>
                            <li className="mb-2 ml-2">일정 투표 관리</li>
                            <li className="mb-2 ml-2">일정 종합 관리</li>
                          </ul>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col text-sm ">
        <Button variant={"ghost"} className="justify-start">
          <Bell className="mr-5" />
          알림
        </Button>
        <Button variant={"ghost"} className="justify-start">
          <CircleUserRoundIcon className="mr-5" />
          프로필
        </Button>
        <Button variant={"ghost"} className="justify-start">
          <Settings className="mr-5" />
          설정
        </Button>
      </div>
    </nav>
  );
}
