import { FormValues } from "@/components/schedule/form-fields/basic-form-schema";

/** field 의 value 변경 여부 반환 함수 */
export const getIsChangeField = (key: keyof FormValues, formValues: FormValues, defaultValues: FormValues) => {
  if (formValues[key] === undefined) return false; // field 가 정의 되지 않은 경우 false 반환

  // 값이 초기값기준에서 변경됐는지 여부 반환
  return defaultValues[key] !== formValues[key];
};

/** "tags" filed value 변경 여부 반환 함수 */
export const getIsChangeTags = (formValues: FormValues, defaultValues: FormValues) => {
  // tag 목록 요소의 개수가 다른 경우 변경됨을 의미하므로 true 반환
  if (defaultValues.tags.length !== formValues.tags.length) return true;

  const currentIdsSet = new Set(formValues.tags.map((tag) => tag.id));

  // 초기 tag 들의 id 와 현재 form tag 들의 id 목록이 모두 같은 경우 false 반환
  return !defaultValues.tags.every((tag) => currentIdsSet.has(tag.id));
};

// ※ form.formState.isDirty 를 활용하지않은 이유 ※
// 배열, 객체 형식의 데이터의 경우 값이 변경된 여부를 명확히 구분할 수 없으므로 사용 불가
export const getIsFormChange = (formValues: FormValues, defaultValues: FormValues) => {
  return Object.entries(defaultValues).some(([key, value]) => {
    const realKey = key as keyof FormValues;
    return realKey === "tags"
      ? getIsChangeTags(formValues, defaultValues)
      : getIsChangeField(realKey, formValues, defaultValues);
  });
};
