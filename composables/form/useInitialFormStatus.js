export const useInitialFormStatus = (formStatus) => {
  if (formStatus.name) {
    formStatus.name.isValid = true;
    formStatus.name.message = "";
  }
  if (formStatus.phone) {
    formStatus.phone.isValid = true;
    formStatus.phone.message = "";
  }
};
