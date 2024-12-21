import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import apiRequest from "@/lib/api";

export default function TagsField() {
  const { data } = useQuery({ queryKey: ["schedule_tag", "list"], queryFn: () => apiRequest("getScheduleTags", null) });
  const { control, watch, setValue } = useFormContext<FormValues>();
  const { field } = useController<FormValues, "tags">({ name: "tags" });
  const { tags } = watch();

  // 현재 체크된 tag id 목록 state 초기값은 form 의 초기 tag id 목록
  const [checkedTagIds, setCheckedTagsIds] = useState<number[]>(tags.map(({ id }) => id));

  if (!data) return;

  const { schedule_tags } = data;
  const scheduleTagIdsMap = new Map(schedule_tags.map(({ id, name }) => [id, name]));

  // tag 목록 checkbox 클릭시 이벤트 핸들러
  const handleCheckedChange = (checked: CheckedState, tagId: number) => {
    const currentTagsSet = new Set(checkedTagIds);
    checked ? currentTagsSet.add(tagId) : currentTagsSet.delete(tagId);
    setCheckedTagsIds(Array.from(currentTagsSet));

    // 체크된 tag id 기반으로 form value 변경
    setValue(
      "tags",
      schedule_tags.filter((tag) => currentTagsSet.has(tag.id)),
    );
  };

  // tag checkbox 체크 여부 반환
  const getCheckBoxChecked = (tagId: number) => new Set(checkedTagIds).has(tagId);

  return (
    <div>
      <div className="mb-3 flex items-center gap-x-4">
        <span className="text-sm font-medium">분류</span>

        {/* tag 수정 popover */}
        <Popover>
          <PopoverTrigger asChild disabled={field.disabled}>
            <Button type="button" variant="default" size="sm">
              태그 변경
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="right">
            <h4 className="mb-4 font-medium">분류 수정</h4>
            <div className="space-y-2">
              {schedule_tags.map((tag) => (
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
            control={control}
            name={`tags.${index}.name`}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormLabel className="border-muted-foreground rounded-full border px-2 py-1 text-sm">
                  {scheduleTagIdsMap.get(tag.id)}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
