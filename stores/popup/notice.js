export const usePopupNoticeStore = defineStore("popup-notice", {
  state: () => ({
    isOpenPopup: false,
  }),
  actions: {
    openPopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    closePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
  },
});
