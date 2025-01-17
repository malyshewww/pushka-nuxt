export const usePopupConsultationStore = defineStore("popup-consultation", {
  state: () => ({
    isOpenPopupConsultation: false,
  }),
  actions: {
    openPopup() {
      body_lock_add();
      this.isOpenPopupConsultation = !this.isOpenPopupConsultation;
    },
    closePopup() {
      body_lock_remove(0);
      this.isOpenPopupConsultation = !this.isOpenPopupConsultation;
    },
  },
});
