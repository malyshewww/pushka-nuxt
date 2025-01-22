export const usePopupCallStore = defineStore("popup-call", () => {
  const isOpenPopup = ref(false);
  const errors = ref(0);
  const form = reactive({
    data: {
      webform_id: "callback",
      name: "",
      phone: "",
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
    form,
    errors,
  };
});
