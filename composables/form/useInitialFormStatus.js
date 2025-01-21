export const useInitialFormStatus = (formStatus) => {
  formStatus.name.isValid = true;
  formStatus.name.message = "";
  formStatus.phone.isValid = true;
  formStatus.phone.message = "";
};
