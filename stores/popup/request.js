export const usePopupRequestStore = defineStore("popup-request", () => {
  const isOpenPopupRequest = ref(false);
  const openPopup = () => {
    body_lock_add();
    isOpenPopupRequest.value = !isOpenPopupRequest.value;
  };
  const closePopup = () => {
    body_lock_remove();
    isOpenPopupRequest.value = !isOpenPopupRequest.value;
  };
  return {
    isOpenPopupRequest,
    openPopup,
    closePopup,
  };
});
