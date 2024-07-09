import { CheckedState } from "@radix-ui/react-checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getScheduleTags } from "@/api/per-schedule";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  uncheckedTagIds: number[];
  startDate: string;
  endDate: string;
  getTagChecked: (id: number) => boolean;
  getTagAllChecked: (ids: number[]) => boolean;
  setTagChecked: (checked: CheckedState, id: number) => void;
  setAllSubtagsChecked: (checked: CheckedState, ids: number[]) => void;
}

export default function CalendarFilter(props: Props) {
  const { uncheckedTagIds, startDate, endDate, getTagChecked, getTagAllChecked, setTagChecked, setAllSubtagsChecked } =
    props;

  // 필터링용 태그 목록 요청 로직
  const { data: personalFilterData } = useSuspenseQuery({
    queryKey: ["personal_schedule_filter", "list", uncheckedTagIds, startDate, endDate],
    queryFn: getScheduleTags,
  });

  const { per_tags, groups } = personalFilterData;

  return (
    <Select>
      <SelectTrigger className="w-18 h-9 px-3 text-sm">
        <SelectValue placeholder="필터링" />
      </SelectTrigger>
      <SelectContent className="px-2 text-sm">
        <Accordion type="single" collapsible>
          {/* 개인 태그 목록 */}
          <AccordionItem value="personal">
            {/* 개인 태그 Accordion 부분 */}
            <div className="flex items-center py-2">
              <Checkbox
                checked={getTagAllChecked(per_tags.map(({ id }) => id))}
                onCheckedChange={(checked) =>
                  setAllSubtagsChecked(
                    checked,
                    per_tags.map(({ id }) => id),
                  )
                }
              />
              <AccordionTrigger className="ml-2 py-0">개인 태그</AccordionTrigger>
            </div>

            {/* Accordion 활성화 시 노출되는 개인 태그 목록*/}
            <AccordionContent className="pb-1.5 text-xs md:text-sm">
              <ul>
                {per_tags.map((tag) => (
                  <li className="my-1.5 ml-1 flex items-center" key={tag.id}>
                    <Checkbox
                      checked={getTagChecked(tag.id)}
                      onCheckedChange={(checked) => setTagChecked(checked, tag.id)}
                    />
                    <span className="ml-2">{tag.name}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* 그룹별 태그 목록 */}
          {groups.map((group) => (
            <AccordionItem key={group.id} value={`${group.name}_${group.id}`}>
              {/* 각 그룹의 태그 Accordion 부분 */}
              <div className="flex items-center py-2">
                <Checkbox
                  checked={getTagAllChecked(group.tags.map(({ id }) => id))}
                  onCheckedChange={(checked) =>
                    setAllSubtagsChecked(
                      checked,
                      group.tags.map(({ id }) => id),
                    )
                  }
                />
                <AccordionTrigger className="ml-2 py-0">{group.name}</AccordionTrigger>
              </div>

              {/* Accordion 활성화 시 노출되는 각 그룹의 태그 목록*/}
              <AccordionContent className="pb-1.5 text-xs md:text-sm">
                <ul>
                  {group.tags.map((tag) => (
                    <li className="my-1.5 ml-1 flex items-center" key={tag.id}>
                      <Checkbox
                        checked={getTagChecked(tag.id)}
                        onCheckedChange={(checked) => setTagChecked(checked, tag.id)}
                      />
                      <span className="ml-2">{tag.name}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SelectContent>
    </Select>
  );
}
