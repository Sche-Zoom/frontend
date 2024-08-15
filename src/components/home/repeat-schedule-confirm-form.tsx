import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { modifyPersonalRepeatSchedule } from "@/api/personal-schedule";
import { AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { LoadingButton } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";
import { getNowDateTime } from "@/lib/date";

interface MutationVariables {
  req: ModifyPersonalRepeatScheduleReq;
  pathParam: string;
}

const RadioButtonItems = [
  {
    id: "only",
    label: "선택한 일정만 수정",
  },
  {
    id: "after_all",
    label: "선택한 일정 이후 모든 일정 수정",
  },
  {
    id: "all",
    label: "모든 일정 수정",
  },
] as const;

const FormSchema = z.object({ type: z.enum(["only", "after_all", "all"]) });

export default function RepeatScheduleConfirmForm() {
  const { scheduleChange, setUpdatedTime, setChangeConfirmOpen } = usePersonalCalendarContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { type: "only" },
  });

  const { mutate, isPending } = useMutation<null, DefaultError, MutationVariables>({
    mutationFn: ({ req, pathParam }) => modifyPersonalRepeatSchedule(req, pathParam),
    onSuccess: () => {
      alert("정상적으로 처리됐습니다.");
      setUpdatedTime(getNowDateTime());
      setChangeConfirmOpen(false);
    },
    onError: () => {
      alert("정상적으로 처리되지 않았습니다.");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!scheduleChange) return;

    const { id, isRepeat, ...rest } = scheduleChange;

    mutate({
      req: { modify_type: data.type, ...rest },
      pathParam: id,
    });
  }

  return (
    <Form {...form}>
      {/* 반복 일정 수정 처리 form  */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                {/* 반복 일정 수정 방식 radiobutton group  */}
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-y-4 pl-2">
                  {RadioButtonItems.map((item) => (
                    <FormItem key={item.id} className="m-0 flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={item.id} />
                      </FormControl>
                      <FormLabel>{item.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <LoadingButton type="submit" loading={isPending}>
            저장
          </LoadingButton>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
