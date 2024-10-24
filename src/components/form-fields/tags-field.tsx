import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { getPersonalTags } from "@/api/personal-schedule";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  tags: Tag[];
}

/** ※ 주의사항 form value 형식에 "tags" 필수 ※ */
const TagsField = ({ form, editMode }: CommonFormFieldProps) => {
  const { data } = useQuery({ queryKey: ["personal_tag", "list"], queryFn: getPersonalTags });

  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const tagsForm = form as UseFormReturn<RequiredFormValues>;
  const { tags } = tagsForm.watch();

  // 현재 체크된 tag id 목록 state 초기값은 form 의 초기 tag id 목록
  const [checkedTagIds, setCheckedTagsIds] = useState<number[]>(tags.map(({ id }) => id));

  if (!data) return;

  const { per_tags } = data;
  const personalTagIdsMap = new Map(per_tags.map(({ id, name }) => [id, name]));

  // tag 목록 checkbox 클릭시 이벤트 핸들러
  const handleCheckedChange = (checked: CheckedState, tagId: number) => {
    const currentTagsSet = new Set(checkedTagIds);

    // 체크 여부에 따라 tag id 추가 및 제거
    checked ? currentTagsSet.add(tagId) : currentTagsSet.delete(tagId);
    setCheckedTagsIds(Array.from(currentTagsSet));

    // 체크된 tag id 기반으로 form value 변경
    tagsForm.setValue(
      "tags",
      per_tags.filter((tag) => currentTagsSet.has(tag.id)),
    );
  };

  // tag checkbox 체크 여부 반환
  const getCheckBoxChecked = (tagId: number) => new Set(checkedTagIds).has(tagId);

  return (
    <div>
      {/* tag 수정 popover */}
      <div className="mb-3 flex items-center gap-x-4">
        <span>분류</span>

        <Popover>
          <PopoverTrigger asChild disabled={!editMode}>
            <Button variant="default" size="sm">
              태그 변경
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="right">
            <h4 className="mb-4 font-medium">분류 수정</h4>
            <div className="space-y-2">
              {per_tags.map((tag, index) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${tag.id}-${tag.name}`}
                    defaultChecked={getCheckBoxChecked(tag.id)}
                    onCheckedChange={(checked) => handleCheckedChange(checked, tag.id)}
                  />
                  <Label htmlFor={`${tag.id}-${tag.name}`}>{tag.name}</Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-x-2">
        {/* 실제 tag 데이터 목록 */}
        {tags.map((tag, index) => (
          <FormField
            key={tag.id}
            control={tagsForm.control}
            name={`tags.${index}.name`}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormLabel className="border-muted-foreground rounded-full border px-2 py-1 text-sm">
                  {personalTagIdsMap.get(tag.id)}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsField;
