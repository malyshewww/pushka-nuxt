export const usePopupNoticeStore = defineStore("popup-notice", {
  state: () => ({
    isOpenPopupNotice: false,
    isValid: true,
  }),
  actions: {
    openPopup() {
      this.isOpenPopupNotice = true;
    },
    closePopup() {
      this.isOpenPopupNotice = false;
    },
  },
});
