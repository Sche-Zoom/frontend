import { CheckedState } from "@radix-ui/react-checkbox";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePerSchFilterStore } from "@/store/per-schedule-filter";
export default function PerScheduleFilter() {
  const { isLoading, error, checkedTags, totalFilter, checkTag, unCheckTag, checkTags, unCheckTags } =
    usePerSchFilterStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>데이터를 정상적으로 불러오지 못했습니다.</div>;

  // 하위 체크박스 checked 값 변경 후 store 에 업데이트
  function handleCheckboxChange(checked: CheckedState, id: number) {
    if (checked) checkTag(id);
    else unCheckTag(id);
  }

  // 상위 체크박스 checked 값 변경 후 하위 체크박스 내용 store 에 업데이트
  function handleAllSelection(checked: CheckedState, ids: number[]) {
    if (checked) checkTags(ids);
    else unCheckTags(ids);
  }

  // 현재 상위 체크박스의 모든 하위 체크박스 체크된 지 여부를 반환
  function isAllChecked(ids: number[]) {
    const checkedTagsSet = new Set(checkedTags);
    return ids.every((id) => checkedTagsSet.has(id));
  }

  // 현재 하위 체크박스 체크 여부 반환
  function isChecked(id: number) {
    return new Set(checkedTags).has(id);
  }

  return (
    <Select>
      <SelectTrigger className="w-18 h-8 px-2 text-xs sm:h-9 sm:px-3 md:text-sm">
        <SelectValue placeholder="필터링" />
      </SelectTrigger>
      <SelectContent className="px-2 text-xs md:text-sm">
        <Accordion type="single" collapsible>
          {totalFilter && checkedTags && (
            <>
              {/* 개인 태그 목록 */}
              <AccordionItem value="personal">
                {/* 개인 태그 Accordion 부분 */}
                <div className="flex items-center py-2">
                  <Checkbox
                    checked={isAllChecked(totalFilter.per_tags.map(({ id }) => id))}
                    onCheckedChange={(checked) =>
                      handleAllSelection(
                        checked,
                        totalFilter.per_tags.map(({ id }) => id),
                      )
                    }
                  />
                  <AccordionTrigger className="ml-2 py-0">개인 태그</AccordionTrigger>
                </div>

                {/* Accordion 활성화 시 노출되는 개인 태그 목록*/}
                <AccordionContent className="pb-1.5 text-xs md:text-sm">
                  <ul>
                    {totalFilter.per_tags.map((tag) => (
                      <li className="my-1.5 ml-1 flex items-center" key={tag.id}>
                        <Checkbox
                          checked={isChecked(tag.id)}
                          onCheckedChange={(checked) => handleCheckboxChange(checked, tag.id)}
                        />
                        <span className="ml-2">{tag.name}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 그룹별 태그 목록 */}
              {totalFilter.groups.map((group) => (
                <AccordionItem key={group.id} value={`${group.name}_${group.id}`}>
                  {/* 각 그룹의 태그 Accordion 부분 */}
                  <div className="flex items-center py-2">
                    <Checkbox
                      defaultChecked={true}
                      onCheckedChange={(checked) =>
                        handleAllSelection(
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
                            checked={isChecked(tag.id)}
                            onCheckedChange={(checked) => handleCheckboxChange(checked, tag.id)}
                          />
                          <span className="ml-2">{tag.name}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </>
          )}
        </Accordion>
      </SelectContent>
    </Select>
  );
}
