import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MyGroup } from "@/store/user";

interface Props {
  group: MyGroup;
}

export default function GroupAccordionMenu({ group }: Props) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`${group.gid}`}>
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
              <div className="text-muted-foreground mb-2 ml-1 mt-4 text-xs font-medium">관리자 메뉴</div>
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
  );
}
