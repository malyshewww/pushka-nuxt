export const usePopupDynamicStore = defineStore("popup-dynamic", () => {
  const isOpenPopupDynamic = ref(false);
  const openPopupDynamic = () => {
    body_lock_add();
    isOpenPopupDynamic.value = !isOpenPopupDynamic.value;
  };
  const closePopupDynamic = () => {
    body_lock_remove();
    isOpenPopupDynamic.value = !isOpenPopupDynamic.value;
  };
  return {
    isOpenPopupDynamic,
    openPopupDynamic,
    closePopupDynamic,
  };
});
