import { CheckedState } from "@radix-ui/react-checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getPersonalTags } from "@/api/personal-schedule";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export default function CalendarFilter() {
  const {
    checkedTagIds,
    startDate,
    endDate,
    setCheckedTagIds,
    getTagChecked,
    getTagAllChecked,
    setTagChecked,
    setAllSubtagsChecked,
  } = usePersonalCalendarContext();

  // 필터링용 태그 목록 요청 로직
  const { data: personalTagsData } = useSuspenseQuery({
    queryKey: ["personal_tag", "list", checkedTagIds, startDate, endDate],
    queryFn: getPersonalTags,
  });

  const { per_tags, groups } = personalTagsData;

  const personalTagIds = per_tags.map(({ id }) => id);
  const groupTagIds = groups.flatMap(({ tags }) => tags.map((tag) => tag.id));

  // 초기 태그 데이터 로드시 전체 태그 id 배열을 로컬변수 initialIds 에 저장, 이후 태그를 변경하는 시점부터 정상적으로 state 사용
  // 결과적으로 초기 비동기 데이터요청 후 state 를 저장하는 경우 생기는 불필요한 랜더링(state 값이 useQuery 의 key 이므로 비동기 요청이 중복으로 발생)을 방지
  const initialIds = checkedTagIds === null ? [...personalTagIds, ...groupTagIds] : null;

  // 상위 체크박스 체크 핸들링 함수
  function handleEntireCheckedChange(checked: CheckedState, tagIds: number[]) {
    // initialIds 비어있는 경우 즉 checkedTagIds 가 null 인 경우 선택해제된 id 목록을 제외한 배열을 state 에 저장
    if (initialIds) {
      const entireIdsSet = new Set(initialIds);
      tagIds.forEach((id) => entireIdsSet.delete(id));
      setCheckedTagIds(Array.from(entireIdsSet));
    } else {
      setAllSubtagsChecked(checked, tagIds);
    }
  }

  // 하위 체크박스 체크 핸들링 함수
  function handleCheckedChange(checked: CheckedState, tagId: number) {
    // initialIds 비어있는 경우 즉 checkedTagIds 가 null 인 경우 선택해제된 id 를 제외한 배열을 state 에 저장
    if (initialIds) {
      const entireIdsSet = new Set(initialIds);
      entireIdsSet.delete(tagId);
      setCheckedTagIds(Array.from(entireIdsSet));
    } else {
      setTagChecked(checked, tagId);
    }
  }

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
                onCheckedChange={(checked) => handleEntireCheckedChange(checked, personalTagIds)}
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
                      onCheckedChange={(checked) => handleCheckedChange(checked, tag.id)}
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
