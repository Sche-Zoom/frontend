"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode, useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import PolicyModal from "@/components/auth/signup/policy-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiRequest from "@/lib/api";
import { SERVICE, TERMS } from "@/lib/policy";

const SIGNUP_SCHEMA = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
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

type FormValues = z.infer<typeof SIGNUP_SCHEMA>;

export default function Signup() {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    defaultValues: { email: "", password: "", confirmPassword: "", agreeToTerms: false },
  });

  const { mutate: signupMutate } = useMutation<null, DefaultError, SignupVariables>({
    mutationFn: ({ req }) => apiRequest("signup", req),
    onSuccess: () => {
      alert("정상적으로 회원가입이 완료됐습니다.");
      router.push("/");
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const { mutate: checkEmailMutate } = useMutation<CheckEmailRes, DefaultError, CheckEmailVariables>({
    mutationFn: async ({ req }) => apiRequest("checkEmail", req),
    onSuccess: ({ available }) => {
      if (available) {
        setIsEmailChecked(true);
        form.clearErrors("email");
        alert("중복확인 완료됐습니다.");
      } else {
        setIsEmailChecked(false);
        form.setError("email", { message: "중복된 이메일 입니다." });
        alert("중복된 이메일 입니다.");
      }
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const handleCheckEmail: MouseEventHandler<HTMLButtonElement> = (e) => {
    // 중복확인전 유요한 이메일 형식인지 확인
    if (form.getFieldState("email").error) return alert("유효한 이메일을 작성해주세요");
    checkEmailMutate({ req: { email: form.getValues("email") } });
  };

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    if (!isEmailChecked) {
      form.setError("email", { message: "중복된 이메일 입니다." });
      return alert("이메일 중복확인을 먼저 진행해주세요");
    }
    signupMutate({ req: data });
  };

  const onSubmitError: SubmitErrorHandler<FormValues> = (errors) => {
    // 최종 에러확인
    for (const key of Object.keys(errors)) {
      const fieldName = key as keyof FieldErrors<FormValues>;
      if (errors[fieldName]) return alert(errors[fieldName].message); // 에러메시지 노출
    }
    alert("정상적으로 처리되지않았습니다.");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-6">
      <h1 className="text-xl font-medium">회원가입</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="flex w-full flex-col gap-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>이메일(아이디)</FormLabel>
                <div className="flex items-center gap-x-2">
                  <FormControl>
                    <Input placeholder="이메일(아이디)" {...field} />
                  </FormControl>
                  <Button type="button" variant="secondary" size="sm" className="text-xs" onClick={handleCheckEmail}>
                    중복확인
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
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
          <FormField
            name="confirmPassword"
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
          <FormField
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="mb-4 mt-2 w-full space-y-0">
                <div className="flex items-center space-x-2 ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    <PolicyButton onClick={() => setIsServiceOpen(true)}>이용약관</PolicyButton>
                    &nbsp;및&nbsp;
                    <PolicyButton onClick={() => setIsTermsOpen(true)}>개인정보처리방침</PolicyButton>에 동의합니다.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">회원가입</Button>
        </form>
      </Form>

      {/* 개인정보처리방침 | 이용약관 modal*/}
      <PolicyModal title="개인정보처리방침" open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        {TERMS}
      </PolicyModal>
      <PolicyModal title="이용약관" open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        {SERVICE}
      </PolicyModal>
    </div>
  );
}

const PolicyButton = (props: { children: ReactNode; onClick: () => void }) => {
  return <Button type="button" variant="ghost" size={null} className="font-medium" {...props} />;
};
