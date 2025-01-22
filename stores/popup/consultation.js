export const usePopupConsultationStore = defineStore(
  "popup-consultation",
  () => {
    const isOpenPopup = ref(false);
    const errors = ref(0);
    const form = reactive({
      data: {
        webform_id: "consultation",
        name: "",
        phone: "",
        number: "",
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
      body_lock_remove(0);
      isOpenPopup.value = !isOpenPopup.value;
    };
    return {
      isOpenPopup,
      openPopup,
      closePopup,
      errors,
      form,
    };
  }
);
