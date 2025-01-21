import { useInitialFormStatus } from "./useInitialFormStatus";

export const useFormValidate = (errors, formData, formStatus) => {
  errors = 0;
  useInitialFormStatus(formStatus);
  if (formData.name.length === 0) {
    formStatus.name.isValid = false;
    formStatus.name.message = `Поле Имя обязательно для заполнения`;
    errors++;
  }
  if (formData.phone.length === 0 || formData.phone.length < 18) {
    formStatus.phone.isValid = false;
    formStatus.phone.message = "Неверно введен телефон";
    errors++;
  }
  return {
    error: errors,
  };
};
