"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import FormFields, { FormValues, SIGNUP_SCHEMA } from "@/components/auth/signup/form-fields";
import { LoadingButton } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  CustomFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    mode: "onBlur",
    defaultValues: { id: "", email: "", password: "", confirmPassword: "", agreeToTerms: false },
  });

  const { mutate, isPending } = useMutation<null, DefaultError, SignupVariables>({
    mutationFn: ({ req }) => apiRequest("signup", req),
    onSuccess: () => router.push("/"),
    onError: () =>
      toast({ title: "회원가입이 정상적으로 처리되지 않았습니다. 잠시 후 다시 시도해주세요.", variant: "destructive" }),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => mutate({ req: data });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-6">
        <h1 className="text-xl font-medium">회원가입</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-y-4">
            <FormFields openVerifyEmail={() => setIsEmailModalOpen(true)} />
            <LoadingButton isLoading={isPending} className="w-full">
              회원가입
            </LoadingButton>
          </form>
        </Form>
      </div>

      {/* 이메일 인증 모달 */}
      {isEmailModalOpen && (
        <VerifyEmailModal
          changeIsOpen={(open: boolean) => setIsEmailModalOpen(open)}
          updateEmail={(email: string) => {
            form.setValue("email", email);
            form.trigger("email");
          }}
        />
      )}
    </>
  );
}

const SEND_CODE_SCHEMA = z.object({ email: z.string().email("유효한 email 주소를 입력해주세요.") });
const VERIFY_CODE_SCHEMA = z.object({
  code: z.string({ required_error: "인증코드를 입력해주세요" }).max(6, "인증코드는 6자 입니다."),
});

type SendCodeFormValues = z.infer<typeof SEND_CODE_SCHEMA>;
type VerifyCodeFormValues = z.infer<typeof VERIFY_CODE_SCHEMA>;

interface VerifyEmailModalProps {
  changeIsOpen: (open: boolean) => void;
  updateEmail: (email: string) => void;
}

const VerifyEmailModal = ({ changeIsOpen, updateEmail }: VerifyEmailModalProps) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"input" | "verify">("input");

  const sendEmailForm = useForm<SendCodeFormValues>({
    resolver: zodResolver(SEND_CODE_SCHEMA),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const verifyEmailForm = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(VERIFY_CODE_SCHEMA),
    defaultValues: { code: "" },
    mode: "onBlur",
  });

  const { email } = sendEmailForm.watch();
  const { code } = verifyEmailForm.watch();

  const { mutate: checkEmailMutate } = useMutation<CheckEmailRes, DefaultError, CheckEmailVariables>({
    mutationFn: ({ req }) => apiRequest("checkEmail", req),
    onSuccess: ({ available }) => {
      if (!available) sendEmailForm.setError("email", { type: "duplicate", message: "중복된 이메일입니다." });
    },
    onError: () => {
      sendEmailForm.setError("email", { type: "server", message: "이메일 중복확인이 완료되지 않았습니다." });
      toast({ title: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", variant: "destructive" });
    },
  });

  const sendCodeMutation = useMutation<null, DefaultError, SendEmailCodeVariables>({
    mutationFn: ({ req }) => apiRequest("sendEmailCode", req),
    onSuccess: () => setMode("verify"),
    onError: () => toast({ title: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", variant: "destructive" }),
  });
  const { mutate: sendCodeMutate, isPending: isSendCodePending } = sendCodeMutation;

  const verifyCodeMutation = useMutation<VerifyEmailCodeRes, DefaultError, VerifyEmailCodeVariables>({
    mutationFn: ({ req }) => apiRequest("verifyEmailCode", req),
    onSuccess: ({ success }) => {
      if (success) {
        updateEmail(email); // 인증코드 인증한 이메일을 회원가입 "email" 필드에 등록
        changeIsOpen(false);
      } else {
        toast({ title: "인증코드가 일치하지 않습니다", variant: "warning" });
      }
    },
    onError: () => toast({ title: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", variant: "destructive" }),
  });
  const { mutate: verifyCodeMutate, isPending: isVerifyCodePending } = verifyCodeMutation;

  const checkEmailValidation = async () => {
    if (!(await sendEmailForm.trigger("email"))) return;
    checkEmailMutate({ req: { email: email } });
  };

  return (
    <Dialog open={true} onOpenChange={changeIsOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        {mode === "input" && (
          <Form {...sendEmailForm}>
            <form
              onSubmit={sendEmailForm.handleSubmit(() => sendCodeMutate({ req: { email: email } }))}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle>이메일을 입력해주세요</DialogTitle>
                <DialogDescription>인증코드를 받을 이메일을 입력해해주세요.</DialogDescription>
              </DialogHeader>
              <FormField
                name="email"
                control={sendEmailForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일" {...field} onBlur={checkEmailValidation} />
                    </FormControl>
                    <CustomFormMessage retry={checkEmailValidation} />
                  </FormItem>
                )}
              />
              <LoadingButton isLoading={isSendCodePending} className="w-full">
                인증번호 발송
              </LoadingButton>
            </form>
          </Form>
        )}
        {mode === "verify" && (
          <Form {...verifyEmailForm}>
            <form
              onSubmit={verifyEmailForm.handleSubmit(() => verifyCodeMutate({ req: { email, code } }))}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle>인증 코드 확인</DialogTitle>
                <DialogDescription>이메일로 발송된 인증코드 6자리를 입력해주세요.</DialogDescription>
              </DialogHeader>
              <FormField
                name="code"
                control={verifyEmailForm.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-x-2">
                      <FormControl>
                        <Input placeholder="인증코드 입력" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton isLoading={isVerifyCodePending} className="w-full">
                인증
              </LoadingButton>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
