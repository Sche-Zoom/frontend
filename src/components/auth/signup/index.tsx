"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import {
  AgreeToTermsField,
  ConfirmPasswordField,
  EmailField,
  FormValues,
  IdField,
  PasswordField,
  SIGNUP_SCHEMA,
} from "@/components/auth/signup/form-fields";
import PolicyModal from "@/components/auth/signup/policy-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import apiRequest from "@/lib/api";
import { SERVICE, TERMS } from "@/lib/policy";

export default function Signup() {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    mode: "onBlur",
    defaultValues: { id: "", email: "", password: "", confirmPassword: "", agreeToTerms: false },
  });

  const { mutate: signupMutate } = useMutation<null, DefaultError, SignupVariables>({
    mutationFn: ({ req }) => apiRequest("signup", req),
    onSuccess: () => {
      alert("정상적으로 회원가입이 완료됐습니다.");
      router.push("/");
    },
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    if (!isEmailChecked) {
      form.setError("email", { message: "중복된 email 입니다." });
      return alert("email 중복확인을 먼저 진행해주세요");
    }

    if (!isIdChecked) {
      form.setError("id", { message: "중복된 id 입니다." });
      return alert("id 중복확인을 먼저 진행해주세요");
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
          <IdField setIsIdChecked={setIsIdChecked} />
          <EmailField setIsEmailChecked={setIsEmailChecked} />
          <PasswordField />
          <ConfirmPasswordField />
          <AgreeToTermsField
            servicePolicyOpen={() => setIsServiceOpen(true)}
            termsServiceOpen={() => setIsTermsOpen(true)}
          />
          <Button className="w-full">회원가입</Button>
        </form>
      </Form>

      {/* 개인정보처리방침 | 이용약관 modal */}
      <PolicyModal title="개인정보처리방침" open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        {TERMS}
      </PolicyModal>
      <PolicyModal title="이용약관" open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        {SERVICE}
      </PolicyModal>
    </div>
  );
}
