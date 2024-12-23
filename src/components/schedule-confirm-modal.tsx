import { ReactNode, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants, LoadingButton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MODIFY_REPEAT_SCHEDULE_OPTIONS } from "@/constants";

type Props = {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
} & (
  | {
      isScheduleRepeat: false;
      onAction: () => void;
    }
  | {
      isScheduleRepeat: true;
      onAction: (option: ModifyOptionType) => void;
    }
);

function isSpecificValue(value: string): value is ModifyOptionType {
  return ["only", "after_all", "all"].includes(value);
}

export default function ScheduleConfirmModal(props: Props) {
  const { open, title, description, isScheduleRepeat = false, isLoading, onOpenChange, onAction } = props;

  // 반복 schedule 경우에 사용하는 수정 옵션 state
  const [modifyOption, setModifyOption] = useState<ModifyOptionType>("only");

  const onValueChange = (value: string) => {
    if (isSpecificValue(value)) setModifyOption(value);
  };

  return (
    <AlertDialog open={open} defaultOpen={true} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {isScheduleRepeat && (
          <RadioGroup onValueChange={onValueChange} defaultValue={modifyOption} className="flex flex-col gap-y-4 pl-2">
            {MODIFY_REPEAT_SCHEDULE_OPTIONS.map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-3">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel className={buttonVariants({ variant: "outline", size: "lg" })}>취소</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ size: "lg" })} onClick={() => onAction} asChild>
            <LoadingButton isLoading={isLoading}>확인</LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
