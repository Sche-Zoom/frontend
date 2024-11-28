"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiRequest from "@/lib/api";

const LOGIN_FORM_SCHEMA = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(100, "비밀번호는 최대 100자 이하이어야 합니다.")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.",
    ),
});

type FormValues = z.infer<typeof LOGIN_FORM_SCHEMA>;

export default function Login() {
  const form = useForm<FormValues>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();

  const { mutate } = useMutation<null, DefaultError, LoginVariables>({
    mutationFn: ({ req }) => apiRequest("login", req),
    onSuccess: () => router.push("/"),
    onError: () => alert("정상적으로 처리되지 않았습니다."),
  });

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();

    mutate({ req: data });
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
      <h2 className="text-lg font-medium">로그인</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="flex w-full flex-col gap-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>이메일(아이디)</FormLabel>
                <FormControl>
                  <Input placeholder="이메일(아이디)" {...field} />
                </FormControl>
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
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>
      </Form>

      <div className="text-muted-foreground divide-muted-foreground flex divide-x">
        <Link href="/auth/find-id" className="px-3 text-sm">
          아이디 찾기
        </Link>
        <Link href="/auth/find-pw" className="px-3 text-sm">
          비밀번호 찾기
        </Link>
        <Link href="/auth/signup" className="px-3 text-sm">
          회원가입
        </Link>
      </div>
    </div>
  );
}
