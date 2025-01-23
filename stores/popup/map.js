export const usePopupMapStore = defineStore("popup-map", () => {
  const isOpenPopup = ref(false);
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
  };
});
