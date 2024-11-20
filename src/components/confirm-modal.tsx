import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

interface Props {
  open: boolean;
  title: ReactNode;
  description: ReactNode;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function ScheduleConfirmModal(props: Props) {
  const { open, title, description, onOpenChange, onSubmit, onCancel } = props;

  const form = useForm();
  return (
    <AlertDialog open={open} defaultOpen={true} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          {/* 반복 일정 수정 처리 form  */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button type="button" variant="outline" size="lg" onClick={onCancel}>
                  취소
                </Button>
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
