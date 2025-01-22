export const usePopupNoticeStore = defineStore("popup-notice", () => {
  const isOpenPopup = ref(false);
  const isValid = ref(true);
  const successText = ref("Спасибо! Мы свяжемся с вами в ближайшее время");
  const isOpenPopupProject = ref(false);
  const openPopupProject = () => {
    isOpenPopupProject.value = true;
  };
  const closePopupProject = () => {
    isOpenPopupProject.value = false;
  };
  const openPopup = () => {
    isOpenPopup.value = true;
  };
  const closePopup = () => {
    isOpenPopup.value = false;
  };
  return {
    isOpenPopup,
    isOpenPopupProject,
    isValid,
    openPopup,
    closePopup,
    openPopupProject,
    closePopupProject,
    successText,
  };
});
