import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import {
  DefaultValues,
  PERSONAL_SCHEDULE_FORM_SCHEMA,
  PersonalScheduleFormValues,
} from "@/components/personal-schedule-detail/detail-form-schema";

export default function useFormControl(defaultValues: DefaultValues) {
  const [confirmOpen, setConfirmOpen] = useState(false); // 일정 수정 확인 모달
  const [repeatConfirmOpen, setRepeatConfirmOpen] = useState(false); // 반복 일정 수정 확인 모달
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // 일정 삭제 확인 모달
  const [deleteRepeatConfirmOpen, setDeleteRepeatConfirmOpen] = useState(false); // 반복 일정 삭제 확인 모달

  // 상세 정보 form 관리를 위한 useForm
  const form = useForm<PersonalScheduleFormValues>({
    resolver: zodResolver(PERSONAL_SCHEDULE_FORM_SCHEMA),
    defaultValues,
  });

  const editMode = defaultValues.type === "personal";

  // form 제출 이벤트 핸들러 변경된 form 내용을 토대로 최종 확인 모달 open
  const onSubmit: SubmitHandler<PersonalScheduleFormValues> = (data, event) => {
    event?.preventDefault();

    // 일정 구분에 맞는 confirm 모달 open
    return defaultValues.is_repeat === "yes" ? setRepeatConfirmOpen(true) : setConfirmOpen(true);
  };

  // form 제출 시 오류발생시 이벤트 핸들러
  const onSubmitError: SubmitErrorHandler<PersonalScheduleFormValues> = (errors) => {
    // 최종 에러확인
    for (const key of Object.keys(errors)) {
      const fieldName = key as keyof FieldErrors<PersonalScheduleFormValues>;
      if (errors[fieldName]) return alert(errors[fieldName].message); // 에러메시지 노출
    }
    return alert("정상적으로 처리되지않았습니다.");
  };

  const onDelete = () => {
    defaultValues.is_repeat === "yes" ? setDeleteRepeatConfirmOpen(true) : setDeleteConfirmOpen(true);
  };

  const formHandler = { onSubmit, onSubmitError, onDelete };

  const modalControls = {
    confirmOpen,
    repeatConfirmOpen,
    deleteConfirmOpen,
    deleteRepeatConfirmOpen,
    setConfirmOpen,
    setRepeatConfirmOpen,
    setDeleteConfirmOpen,
    setDeleteRepeatConfirmOpen,
  };

  return { form, editMode, formHandler, modalControls };
}
