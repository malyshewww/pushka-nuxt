export const useRemoveError = (key, formData, formStatus) => {
  if (key == "name") {
    if (formStatus.name) {
      formStatus.name.isValid = true;
      formStatus.name.message = "";
    }
    if (formData.name) {
      formData.name = "";
    }
  }
  if (key == "phone") {
    if (formStatus.phone) {
      formStatus.phone.isValid = true;
      formStatus.phone.message = "";
    }
    if (formData.phone) {
      formData.phone = "";
    }
  }
};
