export const usePopupCallStore = defineStore("popup-call", () => {
  const isOpenPopup = ref(false);
  const errors = ref(0);
  const model = reactive({
    name: "",
    phone: "",
  });
  const form = reactive({
    data: {
      webform_id: "callback",
      name: model.name,
      phone: model.phone,
    },
    status: {
      name: {
        isValid: true,
        message: "",
      },
      phone: {
        isValid: true,
        message: "",
      },
    },
  });
  // const initialFormStatus = () => {
  //   form.status.name.isValid = true;
  //   form.status.name.message = "";
  //   form.status.phone.isValid = true;
  //   form.status.phone.message = "";
  // };
  // const resetValues = () => {
  //   form.data.name = "";
  //   form.data.phone = "";
  // };
  // const removeError = (key) => {
  //   if (key == "name") {
  //     form.status.name.isValid = true;
  //     form.status.name.message = "";
  //     form.data.name = "";
  //   }
  //   if (key == "phone") {
  //     form.status.phone.isValid = true;
  //     form.status.phone.message = "";
  //     form.data.phone = "";
  //   }
  // };
  // const formValidate = () => {
  //   errors.value = 0;
  //   initialFormStatus();
  //   if (form.data.name.length === 0) {
  //     form.status.name.isValid = false;
  //     form.status.name.message = `Поле Имя обязательно для заполнения`;
  //     errors.value++;
  //   }
  //   if (form.data.phone.length === 0 || form.data.phone.length < 18) {
  //     form.status.phone.isValid = false;
  //     form.status.phone.message = "Неверно введен телефон";
  //     errors.value++;
  //   }
  //   return {
  //     error: errors.value,
  //   };
  // };
  const openPopup = () => {
    body_lock_add();
    isOpenPopup.value = !isOpenPopup.value;
  };
  const closePopup = () => {
    body_lock_remove();
    isOpenPopup.value = !isOpenPopup.value;
  };
  return {
    isOpenPopup,
    openPopup,
    closePopup,
    // initialFormStatus,
    // resetValues,
    // removeError,
    // formValidate,
    model,
    form,
    errors,
  };
});
