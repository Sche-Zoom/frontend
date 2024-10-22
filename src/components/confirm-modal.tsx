import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { forwardRef, ReactNode } from "react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
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
