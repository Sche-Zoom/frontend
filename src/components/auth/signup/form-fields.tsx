import { DefaultError, useMutation } from "@tanstack/react-query";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiRequest from "@/lib/api";

export const SIGNUP_SCHEMA = z
  .object({
    id: z
      .string()
      .min(3, "id는 최소 3자 이상이어야 합니다.")
      .max(30, "id는 최대 30자 이하이어야 합니다.")
      .regex(/^[a-zA-Z0-9._-]+$/, "id는 영문자, 숫자, 점, 밑줄, 하이픈만 사용할 수 있습니다."),
    email: z.string().email("유효한 email 주소를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(100, "비밀번호는 최대 100자 이하이어야 합니다.")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

const PolicyButton = (props: { children: ReactNode; onClick: () => void }) => (
  <Button type="button" variant="ghost" size={null} className="font-medium" {...props} />
);

const DuplicationButton = ({ onClick }: { onClick: () => void }) => (
  <Button type="button" variant="secondary" size="sm" className="font-medium" onClick={onClick}>
    중복확인
  </Button>
);

export const IdField = ({ setIsIdChecked }: { setIsIdChecked: Dispatch<SetStateAction<boolean>> }) => {
  const { control, clearErrors, setError, getFieldState, getValues } = useFormContext<FormValues>();
  const { mutate: checkIdMutate } = useMutation<CheckIdRes, DefaultError, CheckIdVariables>({
    mutationFn: ({ req }) => apiRequest("checkId", req),
    onSuccess: ({ available }) => {
      if (available) {
        setIsIdChecked(true);
        clearErrors("id");
        alert(`id 중복확인이 완료됐습니다.`);
      } else {
        setIsIdChecked(false);
        setError("id", { message: "중복된 id 입니다." });
        alert("중복된 id 입니다.");
      }
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const checkDuplication = () => {
    if (getFieldState("id").error) return alert("유효한 id 를 작성해주세요");
    checkIdMutate({ req: { id: getValues("id") } });
  };

  return (
    <FormField
      name="id"
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>아이디</FormLabel>
          <div className="flex items-center gap-x-2">
            <FormControl>
              <Input placeholder="아이디" {...field} />
            </FormControl>
            <DuplicationButton onClick={checkDuplication} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const EmailField = ({ setIsEmailChecked }: { setIsEmailChecked: Dispatch<SetStateAction<boolean>> }) => {
  const { control, clearErrors, setError, getFieldState, getValues } = useFormContext<FormValues>();

  const { mutate: checkEmailMutate } = useMutation<CheckEmailRes, DefaultError, CheckEmailVariables>({
    mutationFn: ({ req }) => apiRequest("checkEmail", req),
    onSuccess: ({ available }) => {
      if (available) {
        setIsEmailChecked(true);
        clearErrors("email");
        alert(`email 중복확인이 완료됐습니다.`);
      } else {
        setIsEmailChecked(false);
        setError("email", { message: `중복된 email 입니다.` });
        alert(`중복된 email 입니다.`);
      }
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const checkDuplication = () => {
    if (getFieldState("email").error) return alert("유효한 email를 작성해주세요");
    checkEmailMutate({ req: { email: getValues("email") } });
  };

  return (
    <FormField
      name="email"
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>이메일</FormLabel>
          <div className="flex items-center gap-x-2">
            <FormControl>
              <Input placeholder="이메일" {...field} />
            </FormControl>
            <DuplicationButton onClick={checkDuplication} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const PasswordField = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      name="password"
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
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

export const ConfirmPasswordField = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      name="confirmPassword"
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
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

interface AgreeToTermsProps {
  servicePolicyOpen: () => void;
  termsServiceOpen: () => void;
}

export const AgreeToTermsField = ({ servicePolicyOpen, termsServiceOpen }: AgreeToTermsProps) => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      name="agreeToTerms"
      control={control}
      render={({ field }) => (
        <FormItem className="mb-4 mt-2 w-full space-y-0">
          <div className="flex items-center space-x-2 ">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="text-sm font-normal">
              <PolicyButton onClick={servicePolicyOpen}>이용약관</PolicyButton>
              &nbsp;및&nbsp;
              <PolicyButton onClick={termsServiceOpen}>개인정보처리방침</PolicyButton>에 동의합니다.
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
