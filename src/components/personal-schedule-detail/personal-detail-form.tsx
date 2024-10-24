import { Trash2 } from "lucide-react";

import ColorField from "@/components/form-fields/color-field";
import DateRangeField from "@/components/form-fields/date-range-field";
import DescriptionField from "@/components/form-fields/description";
import ImportanceField from "@/components/form-fields/importance";
import RepeatFields from "@/components/form-fields/repeat-field-group";
import TagsField from "@/components/form-fields/tags-field";
import TitleField from "@/components/form-fields/title-field";
import TypeField from "@/components/form-fields/type-field";
import ChangeConfirm from "@/components/personal-schedule-detail/change-confirm";
import ChangeRepeatConfirm from "@/components/personal-schedule-detail/change-repeat-confirm";
import DeleteConfirm from "@/components/personal-schedule-detail/delete-confirm";
import DeleteRepeatConfirm from "@/components/personal-schedule-detail/delete-repeat-confirm";
import { DefaultValues } from "@/components/personal-schedule-detail/detail-form-schema";
import useFormControl from "@/components/personal-schedule-detail/useFormControl";
import { getIsFormChange } from "@/components/personal-schedule-detail/utils";
import { Button } from "@/components/ui/button";
import { Form, FormItemGroup } from "@/components/ui/form";

interface Props {
  scheduleId: number;
  defaultValues: DefaultValues;
}

const PersonalDetailForm = (props: Props) => {
  const { scheduleId, defaultValues } = props;
  const { form, editMode, formHandler, modalControls } = useFormControl(defaultValues);

  const formValues = form.watch();
  const { onSubmit, onSubmitError, onDelete } = formHandler;
  const {
    confirmOpen,
    repeatConfirmOpen,
    deleteConfirmOpen,
    deleteRepeatConfirmOpen,
    setConfirmOpen,
    setRepeatConfirmOpen,
    setDeleteConfirmOpen,
    setDeleteRepeatConfirmOpen,
  } = modalControls;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="box-border flex w-full flex-col gap-y-4">
          {/* color & title line */}
          <FormItemGroup>
            {/* color picker */} <ColorField editMode={editMode} form={form} />
            {/* title input */} <TitleField editMode={editMode} form={form} />
          </FormItemGroup>
          {/* type */} <TypeField form={form} />
          {/* Date Range */} <DateRangeField editMode={editMode} form={form} />
          {/* description */} <DescriptionField editMode={editMode} form={form} />
          {/* Tag List & Tag select */} <TagsField editMode={editMode} form={form} />
          {/* Importance select */} <ImportanceField editMode={editMode} form={form} />
          {/* RepeatFields */} <RepeatFields editMode={editMode} form={form} />
          {/* 푸터 버튼 박스 */}
          <div className="flex justify-between">
            <Button type="button" variant="ghost" onClick={onDelete} disabled={defaultValues.type === "group"}>
              <Trash2 className="mr-2" size={16} />
              일정 삭제
            </Button>

            <Button type="submit" size="lg" disabled={!getIsFormChange(formValues, defaultValues)}>
              저장
            </Button>
          </div>
        </form>
      </Form>

      {/* 일정 변경 확인 모달 */}
      {confirmOpen && (
        <ChangeConfirm
          open={confirmOpen}
          scheduleId={scheduleId}
          formValues={formValues}
          defaultValues={defaultValues}
          setOpen={setConfirmOpen}
        />
      )}

      {/* 반복 일정 변경 확인 모달 */}
      <ChangeRepeatConfirm
        open={repeatConfirmOpen}
        scheduleId={scheduleId}
        formValues={formValues}
        defaultValues={defaultValues}
        setOpen={setRepeatConfirmOpen}
      />

      {/* 일정 삭제 확인 모달 */}
      <DeleteConfirm open={deleteConfirmOpen} scheduleId={scheduleId} setOpen={setDeleteConfirmOpen} />

      {/* 반복 일정 삭제 모달 */}
      <DeleteRepeatConfirm
        open={deleteRepeatConfirmOpen}
        scheduleId={scheduleId}
        setOpen={setDeleteRepeatConfirmOpen}
      />
    </>
  );
};

export default PersonalDetailForm;
