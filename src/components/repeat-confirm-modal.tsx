import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MODIFY_REPEAT_SCHEDULE_OPTIONS } from "@/constants";

interface MutationVariables {
  req: ModifyPersonalRepeatScheduleReq;
  pathParam: string;
}

interface Props {
  open: boolean;
  title: ReactNode;
  description: ReactNode;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof REPEAT_CONFIRM_FORM_SCHEMA>) => void;
  onCancel?: () => void;
}

export const REPEAT_CONFIRM_FORM_SCHEMA = z.object({ type: z.enum(["only", "after_all", "all"]) });

export type RepeatConfirmFormValues = z.infer<typeof REPEAT_CONFIRM_FORM_SCHEMA>;

export default function RepeatScheduleConfirmModal(props: Props) {
  const { open, title, description, onOpenChange, onSubmit, onCancel } = props;

  const form = useForm<RepeatConfirmFormValues>({
    resolver: zodResolver(REPEAT_CONFIRM_FORM_SCHEMA),
    defaultValues: { type: "only" },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          {/* 반복 일정 수정 처리 form  */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* 반복 일정 수정 방식 radiobutton group  */}
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col gap-y-4 pl-2"
                    >
                      {MODIFY_REPEAT_SCHEDULE_OPTIONS.map((item) => (
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
              <AlertDialogCancel asChild>
                <CancelButton onClick={onCancel} />
              </AlertDialogCancel>

              <Button type="submit" size="lg">
                확인
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const CancelButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick }, ref) => (
  <Button type="button" variant="outline" size="lg" onClick={onClick} ref={ref}>
    취소
  </Button>
));
CancelButton.displayName = "CancelButton";
