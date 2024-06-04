"use client";

import { Bell, ChevronRight, CircleUserRoundIcon, Settings } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useUserStore } from "@/store/user";

export default function MobileNav() {
  const groups = useUserStore((state) => state.groups);

  return (
    <nav className="flex flex-1 flex-col justify-between text-sm">
      <div className="flex-1 flex-col overflow-y-auto transition-opacity duration-500">
        <ul>
          <Link href="/">
            <li className="flex items-center justify-between border-b py-4 font-medium">
              개인 일정
              <ChevronRight size={16} />
            </li>
          </Link>

          {/* 각 그룹별 메뉴 */}
          {groups.map((group) => {
            return (<li key={group.name}>
              <Accordion type="single" collapsible>
                <AccordionItem value="group-1">
                  <AccordionTrigger>{group.name}</AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      <li className="mb-2 ml-2">일정</li>
                      <li className="mb-2 ml-2">일정 투표</li>
                      <li className="mb-2 ml-2">일정 종합</li>
                      <li className="mb-2 ml-2">공지사항</li>

                      {/* 관리 권한이 있는 경우 관리자 메뉴 노출 */}
                      {group.is_admin && <>
                        <div className="mb-1.5 ml-1 mt-3 font-medium text-gray-600">관리자 메뉴</div>
                        <li className="mb-2 ml-2">일정 관리</li>
                        <li className="mb-2 ml-2">일정 투표 관리</li>
                        <li className="mb-2 ml-2">일정 종합 관리</li>
                      </>}
                    </ul>


                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>);
          })}
          <li />
        </ul>
      </div>

      <div className="flex-col text-sm">
        <button className="flex flex-wrap items-center py-2"><Bell className="mr-5" />알림</button>
        <button className="flex flex-wrap items-center py-2"><CircleUserRoundIcon className="mr-5" /> 프로필</button>
        <button className="flex flex-wrap items-center py-2"><Settings className="mr-5" /> 설정</button>
      </div>
    </nav>
  );
}
