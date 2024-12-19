"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, LoadingButton } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";

const FIND_ID_FORM_SCHEMA = z.object({ email: z.string().email("유효한 이메일 주소를 입력해주세요.") });
type FormValues = z.infer<typeof FIND_ID_FORM_SCHEMA>;

export default function FindId() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FIND_ID_FORM_SCHEMA),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const { mutate, data, isSuccess, isPending } = useMutation<FindIdRes, DefaultError, FindIdVariables>({
    mutationFn: ({ req }) => apiRequest("findId", req),
    onSuccess: (data) => {
      if (!data.success) return toast({ title: "등록된 이메일이 존재하지 않습니다.", variant: "warning" });
    },
    onError: () =>
      toast({
        title: "아이디 확인이 정상적으로 처리되지 않았습니다 잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      }),
  });

  return (
    <div className="flex flex-col items-center justify-center gap-y-6">
      {isSuccess && data.success ? (
        <>
          <h2 className="text-lg font-medium">아이디 정보 확인</h2>
          <p className="text-muted-foreground">등록하신 이메일정보를 확인해주세요.</p>
          <div className="border-border w-full space-y-4 rounded-lg border py-4 text-center">
            <p>아이디 : {data.id}</p>
            <p>생성일 : {data.created_at}</p>
          </div>
          <Button type="button" className="w-full" onClick={() => router.push("/auth/login")}>
            로그인 화면으로
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-medium">아이디 찾기</h2>
          <p className="text-muted-foreground">등록하신 이메일정보를 입력해주세요.</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutate({ req: data }))}
              className="flex w-full flex-col gap-y-4"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton isLoading={isPending} className="w-full">
                아이디 찾기
              </LoadingButton>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
