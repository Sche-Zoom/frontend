import { DefaultError, useMutation } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomFormMessage, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";
import { SERVICE, TERMS } from "@/lib/policy";

export const SIGNUP_SCHEMA = z
  .object({
    id: z
      .string()
      .min(3, "아이디는 최소 3자 이상이어야 합니다.")
      .max(30, "아이디는 최대 30자 이하이어야 합니다.")
      .regex(/^[a-zA-Z0-9._-]+$/, "id는 영문자, 숫자, 점, 밑줄, 하이픈만 사용할 수 있습니다."),
    email: z.string().email("유효한 email 주소를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(100, "비밀번호는 최대 100자 이하이어야 합니다.")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/,
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.",
      ),
    confirmPassword: z.string().min(8, "비밀번호 확인은 최소 8자 이상이어야 합니다."),
    agreeToTerms: z.boolean().refine((value) => value === true, "약관 동의가 필요합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof SIGNUP_SCHEMA>;

export default function FormFields(props: { openVerifyEmail: () => void }) {
  const { openVerifyEmail } = props;
  return (
    <>
      <IdField />
      <EmailField openVerifyEmail={openVerifyEmail} />
      <PasswordField />
      <ConfirmPasswordField />
      <AgreeToTermsField />
    </>
  );
}

const IdField = () => {
  const { toast } = useToast();
  const { control, setError, getValues, trigger } = useFormContext<FormValues>();

  const { mutate: checkDuplicateIdMutate } = useMutation<CheckIdRes, DefaultError, CheckIdVariables>({
    mutationFn: ({ req }) => apiRequest("checkId", req),
    onSuccess: ({ available }) => {
      if (!available) setError("id", { type: "duplicate", message: "중복된 id 입니다." });
    },
    onError: () => {
      setError("id", { type: "server", message: "아이디 중복확인이 완료되지 않았습니다." });
      toast({ title: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", variant: "destructive" });
    },
  });

  const checkIdValidation = async () => {
    if (!(await trigger("id"))) return;
    checkDuplicateIdMutate({ req: { id: getValues("id") } });
  };

  return (
    <FormField
      name="id"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>아이디</FormLabel>
          <FormControl>
            <Input placeholder="아이디" {...field} onBlur={checkIdValidation} />
          </FormControl>
          <CustomFormMessage retry={checkIdValidation} />
        </FormItem>
      )}
    />
  );
};

const EmailField = ({ openVerifyEmail }: { openVerifyEmail: () => void }) => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      name="email"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <div className="flex items-center gap-x-2">
            <FormControl>
              <Input placeholder="이메일" {...field} className={"bg-muted text-muted-foreground"} readOnly />
            </FormControl>
            <Button type="button" variant="secondary" size="sm" className="font-medium" onClick={openVerifyEmail}>
              이메일 인증
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordField = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      name="password"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호</FormLabel>
          <FormControl>
            <Input type="password" placeholder="비밀번호" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ConfirmPasswordField = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      name="confirmPassword"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 확인</FormLabel>
          <FormControl>
            <Input type="password" placeholder="비밀번호 확인" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PolicyButton = (props: { children: ReactNode; onClick: () => void }) => (
  <Button type="button" variant="link" size={null} className="font-medium" {...props} />
);

interface PolicyModalProps {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
}

const PolicyModal = (props: PolicyModalProps) => {
  const { open, title, children, onOpenChange } = props;
  return (
    <AlertDialog open={open} defaultOpen={true} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <Textarea className="h-60 resize-none" readOnly>
          {children}
        </Textarea>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AgreeToTermsField = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const { control } = useFormContext<FormValues>();

  return (
    <>
      <FormField
        name="agreeToTerms"
        control={control}
        render={({ field }) => (
          <FormItem className="mb-4 mt-2">
            <div className="flex items-center gap-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">
                <PolicyButton onClick={() => setIsServiceOpen(true)}>이용약관</PolicyButton>
                &nbsp;및&nbsp;
                <PolicyButton onClick={() => setIsTermsOpen(true)}>개인정보처리방침</PolicyButton>에 동의합니다.
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 개인정보처리방침, 이용약관 modal */}
      <PolicyModal title="개인정보처리방침" open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        {TERMS}
      </PolicyModal>
      <PolicyModal title="이용약관" open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        {SERVICE}
      </PolicyModal>
    </>
  );
};
